import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

  search(item:string){
    this.gifsService.searchGif(item);
  }

  get history():string[]{
    return this.gifsService.history;
  }
  constructor(private gifsService:GifsService){

  }
}
