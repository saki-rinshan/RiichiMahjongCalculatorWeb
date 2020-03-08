import { Fu } from '../fu';
import { Hand } from '../hand';
import { ExtraInfoService } from '../../extra-info/extra-info.service';

export class RoundUpFu extends Fu {
	fu: number;
	extraInfoService: ExtraInfoService;
	
	constructor(language: number) {
        const fu: number = 30;

		const nameEN: String = "Round Up";
		const nameJP: String = "切り上げ";
		const tooltipEN: String = "To determine the final number of fu, the sources of fu are added up along with the base number and then rounded up to the nearest 10.";
		const tooltipJP: String = "符をすべて加算し、その合計を10符単位に切り上げたものである。たとえば、合計が34符なら、切り上げて40符となる。";
		const pronounciationEN: String = "Round Up";
		const pronounciationJP: String = "キリアゲ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.fu = fu;
    }
	
	validate(hand: Hand): boolean {
		var fu = hand.fu;
		var oldFu = fu + 0;
		fu = Math.ceil(fu / 10) * 10;
		if(oldFu != fu) {
			this.fu = fu - oldFu;
			return true;
		} else {
			return false;
		}
	}
}