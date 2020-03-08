import { Fu } from '../fu';
import { Hand } from '../hand';
import { ExtraInfoService } from '../../extra-info/extra-info.service';

export class ClosedRon extends Fu {
	
	fu: number;
	extraInfoService: ExtraInfoService;
	
	constructor(extraInfoService: ExtraInfoService, language: number) {
        const fu: number = 10;

		const nameEN: String = "Closed Ron";
		const nameJP: String = "門前加符";
		const tooltipEN: String = "If the hand is closed and the win is via ron, +10 fu.";
		const tooltipJP: String = "門前でロン和了した場合に与えられる10符。";
		const pronounciationEN: String = "Closed Roh-n";
		const pronounciationJP: String = "メンゼンカフ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.fu = fu;
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		if (!hand.isOpen && this.extraInfoService.buttonList.isToggled("Ron")) {
			return true;
		}
	}
}