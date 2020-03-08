import { Component, Input, Output  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainTilesService } from './main-tiles.service'
import { LanguageService } from '../language/language-service';
import { Button, SetButtonType } from '../button/button';

@Component({
  selector: 'tiles-buttons', 
  templateUrl: './tiles-buttons.component.html',
  styleUrls: ['./tiles-buttons.component.css'],
})

export class TilesButtonComponent {
	
	public setButtons: Button[];
	public toggledSetButton: Button = undefined;
	
	constructor(public mainTilesService: MainTilesService, public languageService: LanguageService) {
		this.setButtons = this.mainTilesService.setButtonList.buttons;
	}
	
	akaChange(): void {
		this.mainTilesService.akaToggled = !this.mainTilesService.akaToggled;
	}
	
	openChange(): void  {
		this.mainTilesService.openToggled = !this.mainTilesService.openToggled;
	}
	
	onClickMe(button: Button): void {
		button.toggle();
		if(button.isToggled) {
			this.toggledSetButton = button;
		} else {
			this.toggledSetButton = undefined;
		}
	}
	
	shouldDisableSetButton(button: Button): boolean {
		if(this.mainTilesService.totalTiles >= 12) {
			this.disableAllSetButtons();
			return true;
		}
		if(!this.mainTilesService.openToggled && 
		(button.defaultName.indexOf("Kan") != -1)) {
			return true;
		}
		return false;
	}
	
	disableAllSetButtons(): void {
		for(let button of this.setButtons) {
			button.isToggled = false;
		}
	}
}
