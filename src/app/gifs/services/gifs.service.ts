import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey:string = 'R6viYM8otCCjUYio7T9wNSS0EVy7VvpD';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  private _history:string[] = [];
  private _results:Gif[]= [];
  get history():string[]{
    return [...this._history]
  }
  get results():Gif[]{
    return this._results;
  }
  constructor(private http:HttpClient){
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this._results = JSON.parse(localStorage.getItem('results')!) || [];

  }

  searchGif(query:string){
    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history = this._history.slice(0,10);
      localStorage.setItem('history',JSON.stringify(this._history));
    }
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('q',query)
    .set('limit',10);
    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe(resp=>{
      this._results = resp.data;
      localStorage.setItem('results',JSON.stringify(this._results));

    });


  }
}
