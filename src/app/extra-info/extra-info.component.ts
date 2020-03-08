import { Component } from '@angular/core';
import { Button } from '../button/button'
import { ButtonList } from '../button/buttonList'
import { Tile, TileValue } from '../models/tile'
import { ModalComponent } from '../modal/modal.component'
import { ModalService } from '../modal/modal.service'
import { TilesComponent } from '../tiles/dumb_components/tiles.component'
import { ResultDisplayService } from '../calculator/result-display.service'
import { ExtraInfoService } from './extra-info.service'
import { LanguageService } from '../language/language-service'
  
@Component({
  selector: 'extra-info',
  templateUrl: './extra-info.component.html',
  styleUrls: ['./extra-info.component.css', '../modal/modal.component.css', ]
})     

export class ExtraInfoComponent {
	public imgFolder = "assets\\img\\tiles\\Export\\Regular\\";
	doraTiles: Tile[] = [];
	buttons: Button[];
	
	TileValue = TileValue;
	
	
	constructor(public extraInfoService: ExtraInfoService, public modalService: ModalService, public resultDisplayService: ResultDisplayService, public languageService: LanguageService) {
		this.buttons = extraInfoService.get_buttons().filter(button => button.shouldDisplay == true);
		this.doraTiles = this.extraInfoService.doraTiles;
		
	}
	
	onClickMe(button: Button): void {
		button.toggle();
		this.resultDisplayService.onChange();
	}
	
	addDora(tile: Tile): void {
		this.extraInfoService.addDora(tile);
		this.resultDisplayService.onChange();
		this.modalService.close('dora-selector'); 
	}
	
	removeDora(tileIndex: number): void {
		this.extraInfoService.removeDora(tileIndex);
		this.resultDisplayService.onChange();
	}
	
	toggleWind(isSeat: boolean, wind: number):void {
		this.extraInfoService.toggleWind(isSeat, wind);
		this.resultDisplayService.onChange();
	}
	
	getDoraFile(int: number): String {
		if(int == -1) {
			return this.imgFolder+"Front"+".png";
		} else {
			return this.imgFolder+this.doraTiles[int].name+".png";
		}
	}
	
	incrementRenchan():void {
		this.extraInfoService.incrementRenchan();
		this.resultDisplayService.onChange();
	}
	
	decrementRenchan():void  {
		this.extraInfoService.decrementRenchan();
		this.resultDisplayService.onChange();
	}
	
}