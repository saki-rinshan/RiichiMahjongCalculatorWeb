import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainTilesService } from './main-tiles.service'
import { Tile, TileList} from '../models/tile';
import { Set, SetType } from '../models/set';
import { TilesComponent } from './dumb_components/tiles.component';
import { TilesButtonComponent } from './tiles-buttons.component';
import { Button, SetButtonType } from '../button/button';

@Component({
  selector: 'main-tiles-selection', 
  template: ` <tiles-buttons></tiles-buttons> 
				<div
				[ngClass]="{'disable': this.mainTilesService.isHandFull()}"
				 >
				<tiles (clicked)="add($event)"></tiles> 
				</div>`,
  styleUrls: ['./dumb_components/tiles.component.css', './tiles-buttons.component.css',]
})
 
export class MainTilesSelectionComponent {
	
	public imgFolder = "assets\\img\\tiles\\Export\\Regular\\";
	
	public setButtons: Button[];
	public tileList: TileList;
	public shouldDisableParent: boolean = false;
	
	constructor(public mainTilesService: MainTilesService) {
			this.setButtons = this.mainTilesService.setButtonList.buttons;
			this.tileList = this.mainTilesService.tileList;
	}
	
	add(tile: Tile): void {
		var toggledButton = this.setButtons.find(button => button.isToggled);
		if(toggledButton != undefined) {
			this.mainTilesService.addSet(tile, toggledButton);
		} else {
			this.mainTilesService.add(tile);
		}
	}
	
}
