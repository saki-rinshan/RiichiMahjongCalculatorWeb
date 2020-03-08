import { Fu } from '../fu';
import { Hand } from '../hand';

export class BasePoints extends Fu {
	
	fu: number;
	
	constructor(language: number) {
        const fu: number = 20;

		const nameEN: String = "Base Points";
		const nameJP: String = "副底";
		const tooltipEN: String = "Every hand begins with a default start value of 20 fu.";
		const tooltipJP: String = "和了すると必ず与えられる20符。";
		const pronounciationEN: String = "Base points";
		const pronounciationJP: String = "フーテイ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.fu = fu;
    }
	
	validate(hand: Hand): boolean {
		return true;
	}
}


