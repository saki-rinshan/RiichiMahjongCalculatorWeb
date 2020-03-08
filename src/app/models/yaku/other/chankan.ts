import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class Chankan extends Yaku {
	extraInfoService: ExtraInfoService;
	constructor(extraInfoService: ExtraInfoService, language: number) {
		const open_han: number = 1;
		const closed_han: number = 1;
		const nameEN: String = "Chankan";
		const nameJP: String = "槍槓";
		const tooltipEN: String = "If a player has an open triplet and draws the fourth tile, they can add it to the triplet to make a quad. At the time, another player can win on the tile, namely, they can 'rob' that tile.";
		const tooltipJP: String = "他のプレイヤーは加槓を作くる時：　加槓を作る牌は自分のアガリ牌と同じなら和了する　加槓とは、ポンした明刻子に、その牌の4枚目を加えて槓子とする行為である。";
		const pronounciationEN: String = "Chan-kan";
		const pronounciationJP: String = "チャンカン"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
	}
	
	validate(hand: Hand): boolean {
		if(this.extraInfoService.buttonList.buttons[5].isToggled) {
			return true;
		}
		return false;
	}
}