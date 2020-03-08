import { Component, Input, OnInit } from '@angular/core';
import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Tile } from '../tile';
import { LanguageService } from '../../language/language-service';

@Component({
    selector: 'yaku',
    templateUrl: './yaku.component.html',
	styleUrls: ['../../calculator/calculator.component.css', './yaku.component.css']

})

export class YakuComponent {
	
	
	@Input() yaku: Yaku;
	@Input() isOpen: boolean;
	@Input() isYakuman: boolean;
	num_han: number;
	displayed_han: string;
	
	ngOnInit() {
		if(this.isOpen) {
			this.num_han = this.yaku.open_han;
		} else {
			this.num_han = this.yaku.closed_han;
		}
		
		this.displayed_han = this.num_han + " ";
	}
	
	constructor(public languageService: LanguageService) {
		
    }
	
	 validate(hand: Hand) : boolean {
		return false;
	 }
}
