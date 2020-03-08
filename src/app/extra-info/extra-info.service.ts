import { Injectable } from '@angular/core';
import { Button } from '../button/button';
import { ButtonList } from '../button/buttonList';
import { Tile, TileList, TileSuit, TileValue } from '../models/tile';
import { LanguageService } from '../language/language-service'

@Injectable()
export class ExtraInfoService {
	
	doraTiles: Tile[] = [];
	
	prevailingWind: number = TileValue.East;
	seatWind: number = TileValue.South;
	
	prevailingWindButton: Button;
	seatWindButton: Button;
	
	renchanCounter = 0;
	
	public tileList: TileList;
	buttonList: ButtonList;
	
	constructor(public languageService: LanguageService) {
		this.tileList = new TileList();
		this.languageService.setExtraInfoService(this);
		
		this.buttonList = this.languageService.buttonList;
	}
	
	
	get_buttons(): Button[] {
		return this.buttonList.buttons;
	}
	
	toggleWind(isSeat: boolean, wind: number):void {
		//how the fuck did i do this lol
		//actual spahgetti
		if(isSeat) {
			this.seatWind=wind;
			this.seatWindButton = this.get_buttons()[wind];
			this.get_buttons()[wind-4].toggle();
			//console.log(this.get_buttons()[wind-4].name +"toggled");
		} else {
			this.prevailingWind=wind;
			this.prevailingWindButton = this.get_buttons()[wind];
			this.get_buttons()[wind].toggle();
			//console.log(this.get_buttons()[wind].name +"toggled");
		}
	}
	
	addDora(tile: Tile): void {
		if(this.doraTiles.length < 5) {
			tile.instances++;
			this.doraTiles.push(tile);
			this.updateDoraValues();
		}
	}
	
	removeDora(tileIndex: number): void {
		var tile = this.doraTiles[tileIndex];
		tile.instances--;
		var index = this.doraTiles.indexOf(tile, 0);
		if (index > -1) {
			if(this.doraTiles.filter(tilex => tilex.suit == tile.suit && tilex.value == tile.value).length == 1){
				this.removeDoraValues(tile);
			}
			this.doraTiles.splice(index, 1);
		}
	}
	
	updateDoraValues() {
		for(let doraMarker of this.doraTiles) {
			var dora = this.getDoraFromIndicator(doraMarker);
			var actualDora = this.tileList.tiles.filter(tile => tile.equals(dora));
			for(let dora of actualDora) {
				dora.isDora = true;
			}
		}
	}
	
	removeDoraValues(doraMarker: Tile) {
		var dora = this.getDoraFromIndicator(doraMarker);
		var actualDora = this.tileList.tiles.filter(tile => tile.equals(dora));
		for(let dora of actualDora) {
			dora.isDora = false;
		}
	}
	
	getDoraFromIndicator(doraMarker: Tile): Tile {
		var doraSuit = doraMarker.suit;
		var doraValue = doraMarker.value + 1; 
		if(doraSuit == TileSuit.Wind) {
			if(doraValue >= 16) {
				doraValue -= 4;
			}
		} else if(doraSuit == TileSuit.Dragon) {
			if(doraValue >= 19) {
				doraValue -= 3;
			}
		} else { 
			doraValue = doraValue % 10;
			if(doraValue == 0) {
				doraValue++;
			}
		}
		return new Tile(doraValue, doraSuit);
	}


	
	isDealer(): boolean {
		return this.buttonList.getOyaWind() === this.buttonList.getSeatWind();
	}
	
	
	incrementRenchan():void {
		this.renchanCounter++;
	}
	
	decrementRenchan():void  {
		if(this.renchanCounter - 1 < 0) {
			this.renchanCounter = 0;
		} else {
			this.renchanCounter--;
		}
	}
	
	clearAll(): void {
		while(this.doraTiles.length > 0) {
			this.removeDora(0);
		}
		this.buttonList.resetDefaultButtons();
		
		this.prevailingWind = TileValue.East;
		this.seatWind = TileValue.South;
		this.renchanCounter = 0;
	}
}
