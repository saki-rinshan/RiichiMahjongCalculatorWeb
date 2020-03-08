import { Component, Injectable } from '@angular/core';
import { Hand } from '../models/hand';
import { Set, SetType } from '../models/set';
import { Tile, TileSuit } from '../models/tile';
import { Yaku } from '../models/yaku'
import { YakuList } from '../models/yakuList'
import { Fu } from '../models/fu';
import { FuList } from '../models/fuList';
import { Payout } from '../models/payout'
import { Machi }  from '../models/machi';
import { ButtonList } from '../button/buttonList';
import { ExtraInfoService } from '../extra-info/extra-info.service';
import { LanguageService } from '../language/language-service'
import { StatisticsService } from './statisticsService';

@Injectable()
export class CalculatorService {
	
	yakuList: YakuList;
	fuList: FuList;
	public statisticsService: StatisticsService;
	constructor(public extraInfoService: ExtraInfoService, public languageService: LanguageService, ) {
		this.yakuList  = languageService.yakuList;
		this.fuList = languageService.fuList;
		this.statisticsService = new StatisticsService(languageService);
	}

	calculatePayout(hand: Hand): Payout {
		this.statisticsService.emitCalculatorTriggered();
		var han = this.getHan(hand);
		var fu = this.getFu(hand);
		hand.fu = fu;
		hand.han = han;
		var payout = new Payout(this.extraInfoService.isDealer(), this.extraInfoService.buttonList.isToggled("Tsumo"), this.extraInfoService.renchanCounter, han, fu, this.languageService, hand);
		return payout;
	}

	getFu(hand: Hand): number {
		if(!hand.containsYakuman()) {
			this.fuList.validate(hand);
			return hand.fu;
		} else {
			return 0; 
		}		
	}

	getHan(hand: Hand): number {
		var han = 0;
		
		this.yakuList.validateOther(hand);
		
		for(let yaku of hand.validYaku) {
			if(hand.isOpen) {
				han += yaku.open_han; 
			} else { 
				han += yaku.closed_han; 
			}
		}
		
		for(let yaku of hand.otherYaku) {
			if(hand.isOpen) {
				han += yaku.open_han; 
			} else { 
				han += yaku.closed_han;
			}
		}
		
		return han;
	}
}
