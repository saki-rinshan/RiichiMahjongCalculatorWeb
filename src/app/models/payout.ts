import { LanguageService } from '../language/language-service';
import { LanguageValue } from '../language/languageEnum';
import { Hand } from '../models/hand';
export class Payout {
	
	isDealer: boolean;
	isTsumo: boolean;
	renchanCounter: number;
	han: number;
	fu: number;
	score: string;
	tally: number;
	basePoints:number;
	hand: Hand;
	
	constructor(isDealer: boolean, isTsumo: boolean, renchanCounter: number, han:number, fu:number, public languageService: LanguageService, hand: Hand) {
		this.isDealer = isDealer;
		this.isTsumo = isTsumo;
		this.renchanCounter = renchanCounter;
		this.han = han;
		this.fu = fu;
		this.hand = hand;
	}
	
	generatePayoutCalculationString(): String {
		if (this.han >= 5 || (this.han == 3 && this.fu >= 70) || (this.han == 4 && this.fu >=50)) {
			if(this.languageService.currentLanguage == LanguageValue.Japanese) {
				return "基本点 = " + this.basePoints + " (" + this.languageService.strings.getHanName(this.hand) +")";
			} else {
				return "Base points = " + this.basePoints + " (" + this.languageService.strings.getHanName(this.hand) +")";
			}
		} else {
			return this.tally + " = " +  Math.pow(2,this.han + 2) + " * " + this.fu;
		}
		
	}
	
	generatePayoutDistributionString(): String {
		var s: string;
		if(this.isTsumo) {
			if(this.isDealer) {
				if(this.languageService.currentLanguage == LanguageValue.Japanese) {
					s = "親のツモ和了: 基本点×2を子3名がそれぞれ支払う。"
				} else {
					s = "When the dealer goes out by tsumo, all three non-dealers pay the winner 2 × basic points."
				}
			} else {
				if(this.languageService.currentLanguage == LanguageValue.Japanese) {
					s = "子のツモ和了: 基本点×2を親が支払い、子2名がそれぞれ基本点×1を支払う。";
				} else {
					s = "When a non-dealer goes out by tsumo, the dealer pays the winner 2 × basic points, and the other two non-dealers pay the winner 1 × basic points."
				}
			}
		} else {
			if(this.isDealer) {
				if(this.languageService.currentLanguage == LanguageValue.Japanese) {
					s = "親のロン和了: 親のロン和了基本点×6を放銃者が支払う。"
				} else {
					s ="When the dealer goes out by ron, the discarding non-dealer pays the winner 6 × basic points."
				}
			} else {
				if(this.languageService.currentLanguage == LanguageValue.Japanese) {
					s = "子のロン和了: 基本点×4を放銃者が支払う。"
				} else {
					s = "When a non-dealer goes out by ron, the discarding player pays the winner 4 × basic points."
				}
			}
		}
		return s;
	}
	
	
	generatePayoutString(): String {
		var tally:number = this.fu * Math.pow(2,this.han + 2);
		if (this.han > 4 || this.han == 4 && this.fu >= 40) {
			switch (this.han) {
				case 4: 
				case 5: tally = 8000;
				this.basePoints = 2000;
				break;	

				case 6:
				case 7: tally = 12000;
				this.basePoints = 3000;
				break;

				case 8:
				case 9:
				case 10: tally = 16000;
				this.basePoints = 4000;
				break;

				case 11:
				case 12: tally = 24000;
				this.basePoints = 6000;
				break;

				default: tally = 32000;
				this.basePoints = 8000;
				break;
			}
			
		    this.tally = tally;
			return this.determinePayoutsBigBoi(tally);
		} else {
			
			this.tally = tally;
			return this.determinePayoutsSmallPenor(tally);
		}
	}
	
	determinePayoutsSmallPenor(tally: number): String {
		if(this.isTsumo) {
			if(!this.isDealer) {
				if(this.renchanCounter != 0) {
					return  (Math.ceil(tally/100) * 100) + 100*this.renchanCounter + "/" + ((Math.ceil((tally * 2)/100) * 100)+(100*this.renchanCounter));
				}
				return  Math.ceil(tally/100) * 100 + "/" + Math.ceil((tally * 2)/100) * 100;
			} else {
				if(this.renchanCounter != 0) {
					if(this.languageService.currentLanguage == LanguageValue.Japanese) {
						return (Math.ceil((tally * 2)/100) * 100) + (100*this.renchanCounter) + "オール";
					} else {
						return (Math.ceil((tally * 2)/100) * 100) + (100*this.renchanCounter) + " all";
					}
				}
				if(this.languageService.currentLanguage == LanguageValue.Japanese) {
					return (Math.ceil((tally * 2)/100) * 100) + "オール";
				} else {
					return (Math.ceil((tally * 2)/100) * 100) + " all";
				}
			}
		} else {
			if(!this.isDealer) {
				if(this.renchanCounter != 0) {
					return  (Math.ceil((tally * 6)/100) * 100) + (300*this.renchanCounter)  + "";
				}
				return  Math.ceil((tally * 4)/100) * 100  + "";
			} else {
				if(this.renchanCounter != 0) {
					return  (Math.ceil((tally * 6)/100) * 100)  + (300*this.renchanCounter)  + "";
				}
				return  Math.ceil((tally * 6)/100) * 100 + "";
			}
		}
	}
	
	determinePayoutsBigBoi(tally: number): String {
		var renchanValue: number = 100 * this.renchanCounter;
		if(this.isTsumo) {
			if(!this.isDealer) {
				if(this.renchanCounter != 0) {
					return ((tally/4) + renchanValue) + "/" + ((tally/2) + renchanValue);
				}
				return tally/4 + "/" + tally/2;
			} else {
				if(this.renchanCounter != 0) {
					if(this.languageService.currentLanguage == LanguageValue.Japanese) {
						return ((tally*3/2)/3) + renchanValue + "オール";
					} else {
						return ((tally*3/2)/3)  + renchanValue + " All";
					}
				}
				if(this.languageService.currentLanguage == LanguageValue.Japanese) {
					return (tally*3/2)/3 + "オール";
				} else {
					return (tally*3/2)/3 + " all";
				}
			}
		} else {
			if(!this.isDealer) {
				if(this.renchanCounter != 0) {
					return tally + (3 * renchanValue) + "";
				}
				return tally + "";
			} else {
				if(this.renchanCounter != 0) {
					return ((tally*3/2) + (3 * renchanValue)) + "";
				}
				return (tally*3/2) + "";
			}
		}
	}
}