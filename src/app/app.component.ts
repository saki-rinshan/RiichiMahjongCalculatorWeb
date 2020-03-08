import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MainTilesService } from './tiles/main-tiles.service'
import { ExtraInfoService } from './extra-info/extra-info.service'
import { ResultDisplayService } from './calculator/result-display.service';
import { LanguageService } from './language/language-service';
import { TilesButtonComponent } from './tiles/tiles-buttons.component';
import { ModalService } from './modal/modal.service'
import { ModalComponent } from './modal/modal.component'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './modal/modal.component.css'],
  providers: [TilesButtonComponent]
})
  
export class AppComponent implements OnInit { 
  
  
  public sidebarOpened: boolean;

  
  constructor(public extraInfoService: ExtraInfoService, public mainTilesService: MainTilesService, public resultDisplayService: ResultDisplayService, public tilesButtonComponent: TilesButtonComponent, public modalService: ModalService, public languageService: LanguageService ) {
	  this.sidebarOpened = false;
  }
  
  ngOnInit() {
	setTimeout(this.smorcScroll, 1);
  }
  
  smorcScroll() {
	var element = document.getElementById("title");
	element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  
  clear() {
	  this.tilesButtonComponent.disableAllSetButtons();
	  this.mainTilesService.clearAll();
	  this.extraInfoService.clearAll();
	  this.resultDisplayService.clearAll();
  }
  
  openModal(id: string) {
      this.modalService.open(id);
   }
   
   tenhouMe() {
	   var allTiles = this.extraInfoService.tileList.tiles;
	   if(this.mainTilesService.totalTiles == 14) {
		   this.mainTilesService.clearAll();
	   }
	   while(this.mainTilesService.totalTiles < 14) {
			this.mainTilesService.add(allTiles[Math.floor(Math.random() * allTiles.length)], false);
		}
   }
   
   
}
