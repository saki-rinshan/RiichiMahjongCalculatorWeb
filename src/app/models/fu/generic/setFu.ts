import { Fu } from '../../fu';
import { Hand } from '../../hand';
import { Set, SetType } from '../../set';
import { LanguageValue } from '../../../language/languageEnum';

export class SetFu extends Fu {
	
	constructor(setType: number, isOpen: boolean, isSimple: boolean, language: number) {
		
		var fu = 0;
		
		//name
		var nameEN: string = "";
		var nameJP: string = "";
		var typeEN: string = "";
		var typeJP: string = "";
		var closedOpenEN: string = "";
		var closedOpenJP: string = "";
		var simpleEN: string = "";
		var simpleJP: string = "";
		
		
		//tooltip
		var tooltipEN: string = "";
		var tooltipJP: string = "";
		var pronounciationEN: string = "";
		var pronounciationJP: string = ""; 
		
		var typetooltipEN: string = "";
		var typetooltipJP: string = "";
		var typePronouciationJP: string = "";
		var closedOpentooltipEN: string = "";
		var closedOpentooltipJP: string = "";
		var closedOpenPronouciationJP: string = "";
		var simplePronouciationJP: string = "";
		var simpletooltipEN: string = "";
		var simpletooltipJP: string = "";
		
        if(setType == SetType.Koutsu) {
			typeEN = "Triplet";
			typeJP = "刻子";
			typetooltipEN = "A triplet worth 2 fu.";
			typetooltipJP = "刻子は２符。";
			typePronouciationJP = "コーツ";
			fu += 2;
		} else if(setType == SetType.Kantsu) {
			typeEN = "Quad";
			typeJP = "槓子";
			typetooltipEN = "A quad worth 4 fu.";
			typetooltipJP = "槓子は4符。";
			typePronouciationJP = "カンツ";
			fu += 8;
		}
		
		if(isOpen) {
			closedOpenEN = "Open";
			closedOpenJP = "明";
			closedOpenPronouciationJP = "ミン";
		} else {
			closedOpenEN = "Closed";
			closedOpenJP = "暗";
			closedOpentooltipEN = "Being closed doubles the total fu.";
			closedOpentooltipJP = "門前の場合は符の2倍になる。";
			closedOpenPronouciationJP = "アン";
			fu *= 2;
		}
		
		if(isSimple) {
			simpleEN = "Simple"
			simpleJP = "中張";
			simplePronouciationJP = "チュンチャン";
		} else {
			simpleEN = "Honor/Terminal";
			simpleJP = "么九";
			simpletooltipEN = "Being a honor/terminal also doubles the total fu.";
			simpletooltipJP = "么九牌の場合も符の2倍になる。";
			simplePronouciationJP = "ヤオチュー";
			fu *= 2;
		}
		
		nameEN = closedOpenEN + " " + typeEN + " " + simpleEN;
		nameJP = closedOpenJP + typeJP + simpleJP;
		pronounciationEN = nameEN;
		pronounciationJP = closedOpenPronouciationJP + typePronouciationJP + simplePronouciationJP;
		tooltipEN = typetooltipEN + " " + closedOpentooltipEN + " " + simpletooltipEN;
		tooltipJP = typetooltipJP + closedOpentooltipJP + simpletooltipJP;
		
		
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		
        super(nameEN, language, names, pronounciations, tooltips, fu);
    }
	
	validate(hand: Hand): boolean {
		return false;
	}
}