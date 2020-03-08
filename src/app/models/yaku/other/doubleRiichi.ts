import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class DoubleRiichi extends Yaku {

	
	extraInfoService: ExtraInfoService;
	
	constructor(extraInfoService: ExtraInfoService, language: number) {
		const open_han: number = 0;
		const closed_han: number = 2;
		
		const nameEN: String = "Double Riichi";
		const nameJP: String = "ダブル立直";
		const tooltipEN: String = "Win after declaring Riichi on the first discard";
		const tooltipJP: String = "最初の捨て牌にリーチが掛かる場合に与えられる";
		const pronounciationEN: String = "Double Reeeachi";
		const pronounciationJP: String = "ダブルリーチ";
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
	}
	
	validate(hand: Hand): boolean {
		if(this.extraInfoService.buttonList.buttons[3].isToggled) {
			if(!hand.isOpen) {			
				return true;
			}
		}
		return false;
	}
}