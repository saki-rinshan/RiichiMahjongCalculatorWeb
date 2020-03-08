import { Hand } from './hand';
import { Fu } from './fu';
import { Set, SetType } from './set';
import { Machi } from './machi';
import { ExtraInfoService } from '../extra-info/extra-info.service';
import { LanguageService } from '../language/language-service';

import { BasePoints } from './fu/basePoints';
import { ChiitoitsuBasePoints } from './fu/chiitoitsuBasePoints';
import { ClosedRon } from './fu/closedRon';
import { Tsumo } from './fu/tsumo';
import { OpenPinfuBasePoints } from './fu/openPinfuBasePoints';
import { RoundUpFu } from './fu/roundUp';
import { Pair } from './fu/generic/pair';
import { SetFu } from './fu/generic/setFu';
import { MachiFu } from './fu/generic/machiFu';

export class FuList {
	
	fu: Fu[];
	fuToUpdate: Fu[];
	languageService: LanguageService;
	
	constructor(public extraInfoService: ExtraInfoService, language: number) {
		var basePoints = new BasePoints(language);
		var closedRon = new ClosedRon(extraInfoService, language);
		var tsumo = new Tsumo(extraInfoService, language);
		
		this.fu = new Array<Fu>();
		this.fuToUpdate = new Array<Fu>();
		
		this.fuToUpdate.push(basePoints);
		this.fuToUpdate.push(closedRon);
		this.fuToUpdate.push(tsumo);
		
		this.fu.push(basePoints);
		this.fu.push(closedRon);
		this.fu.push(tsumo);
	}
	
	setLanguageService(languageService: LanguageService): void {
		this.languageService = languageService;
	}
	
	validate(hand: Hand): void {
		this.updateText(this.languageService.currentLanguage);
		this.fuToUpdate = [];
		
		for(let fu of this.fu) {
			if(fu.validate(hand)) {
				this.addFuToHand(hand, fu);
			}
		}
		
		for (let set of hand.sets) {
			var fu: Fu;
			if(set.stype == SetType.Shuntsu) {
				continue;
			}
			if(!(set.stype == SetType.Jantou)) {
				fu = new SetFu(set.stype, set.is_open, set.tile.isSimple(), this.languageService.currentLanguage);
			} else {
				fu = new Pair(this.extraInfoService, set.tile, this.languageService.currentLanguage);
				if(!fu.name) {
					continue;
				}
			}
			this.addFuToHand(hand, fu);
		}
		
		var machiFu = new MachiFu(this.determineMachi(hand), this.languageService.currentLanguage);
		this.addFuToHand(hand, machiFu);
		
		var roundUp:Fu = new RoundUpFu(this.languageService.currentLanguage);
		if(roundUp.validate(hand)) {
			this.addFuToHand(hand, roundUp);
		}
		
		
		var chiitoitsuBasePoints = new ChiitoitsuBasePoints(this.languageService.currentLanguage);
		if(chiitoitsuBasePoints.validate(hand)) {
			hand.fus = [];
			hand.fu = 0;
			this.fuToUpdate = [];
			this.addFuToHand(hand, chiitoitsuBasePoints);
		}
		
		
		var openPinfuBasePoints = new OpenPinfuBasePoints(this.languageService.currentLanguage);
		if(openPinfuBasePoints.validate(hand)) {
			hand.fus = [];
			hand.fu = 0;
			this.fuToUpdate = [];
			this.addFuToHand(hand, openPinfuBasePoints);
		}
	}
	
	determineMachi(hand: Hand): number {
		if(!hand.agariSet) {
			return Machi.Tanki;
		}
		if(hand.agariSet.stype == SetType.Shuntsu) {
			if(hand.agari.equals(hand.agariSet.getTiles()[0]) || hand.agari.equals(hand.agariSet.getTiles()[2])) {
				if(hand.agari.value == 3 && hand.agariSet.getTiles()[0].value == 1) {
					return Machi.Penchan;
				} else if(hand.agari.value == 7 && hand.agariSet.getTiles()[2].value == 9) {
					return Machi.Penchan;
				}
				return Machi.Ryanmen;
			} else if (hand.agari.equals(hand.agariSet.getTiles()[1])) {
				return Machi.Kanchan;
			}
		} else if(hand.agariSet.stype == SetType.Jantou) {
			return Machi.Tanki;
		} else {
			return Machi.Shanpon;
		}
	}
	
	updateText(language: number) {
		for(let fu of this.fuToUpdate) {
			this.updateFu(fu, language);
		}
	}
	
	updateFu(fu: Fu, language: number) {
			fu.name = fu.names[language];
			fu.pronounciation = fu.pronounciations[language];
			fu.tooltip = fu.tooltips[language];
	}
	
	addFuToHand(hand: Hand, fu: Fu) {
		hand.addFu(fu);
		this.fuToUpdate.push(fu);
	}
}