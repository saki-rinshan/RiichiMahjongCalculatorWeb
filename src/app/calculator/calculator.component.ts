import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Hand } from '../models/hand';
import { Tile } from '../models/tile';
import { Set } from '../models/set';
import { Payout } from '../models/payout';
import { Yaku } from '../models/yaku';
import { CalculatorService } from './calculator.service';
import { RecognizerService } from './recognizer/recognizer.service'
import { NaiveRecognizerService } from './recognizer/naiveRecognizer.service'
import { LanguageService } from '../language/language-service'

@Component({
  selector: 'calculator',
  templateUrl: './newcalculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent {
	 
	constructor(public calculatorService: CalculatorService, public recognizerService: RecognizerService, public naiveRecognizerService: NaiveRecognizerService, public languageService: LanguageService) {
		
	}
	
	getHanString(hand: Hand): String {
		if(!hand.containsYakuman()) {
			if(hand.han >= 13) {
				return this.languageService.strings.kazoeYakumanText;
			}
			//return hand.han + " " + this.languageService.strings.hanText;
			return this.languageService.strings.getHanName(hand);
		} else { 
			return "";
		}
	}
	
}
