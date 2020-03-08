import { Component, Input, OnInit } from '@angular/core';
import { Hand } from '../hand';
import { Tile } from '../tile';
import { LanguageService } from '../../language/language-service';

@Component({
    selector: 'fu',
    templateUrl: './fu.component.html',
	styleUrls: ['./fu.component.css', '../../calculator/calculator.component.css']

})
export class FuComponent {
	@Input() name: string;
	@Input() fu: number;
	
	example: Tile[];
	
	ngOnInit() {
			
	}
	
	constructor(public languageService: LanguageService) {
		
    }
	
}