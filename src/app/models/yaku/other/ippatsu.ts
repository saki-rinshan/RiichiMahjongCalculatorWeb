import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class Ippatsu extends Yaku {
	
	extraInfoService: ExtraInfoService;
	constructor(extraInfoService: ExtraInfoService, language: number) {
        const open_han: number = 1;
		const closed_han: number = 1;
		const nameEN: String = "Ippatsu";
		const nameJP: String = "一発";
		const tooltipEN: String = "Win during the first round (before discarding another tile after the riichi tile) after declaring Riichi";
		const tooltipJP: String = "リーチが掛かる一順（リーチ牌を捨てる後けど自分が他の牌を捨てる前に）後の間に和了する";
		const pronounciationEN: String = "Yi-pa-tsu";
		const pronounciationJP: String = "イッパツ";
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		if (this.extraInfoService.buttonList.buttons[4].isToggled) {
			if(!hand.isOpen) {
				return true;
			}
		}
		return false;
	}
}