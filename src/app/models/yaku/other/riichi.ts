import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class Riichi extends Yaku {
	
	extraInfoService: ExtraInfoService;
	
	constructor(extraInfoService: ExtraInfoService, language: number) {
        const open_han: number = 1;
		const closed_han: number = 1;
		const nameEN: String = "Riichi";
		const nameJP: String = "立直";
		const tooltipEN: String = "Win after declaring riichi To make a declaration:　(The hand must be closed and in tenpai. The player declares “riichi”, discards their tile sideways, and places a 1,000-point stick on the table as a deposit. From this point onward, the player cannot change their hand and must discard every drawn tile except for the winning one.)";
		const tooltipJP: String = "リーチ掛かる後の和了　リーチが掛かる状況：　（門前（メンゼン）で聴牌（テンパイ）し、今後一切手を変えない。　「リーチ」を宣言する。1000点棒を供託して聴は横に捨てる。）";
		const pronounciationEN: String = "Reeeachi";
		const pronounciationJP: String = "リーチ";
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		if(this.extraInfoService.buttonList.buttons[2].isToggled) {
			if(!hand.isOpen) {		
				return true;
			}
		}
		return false;
	}
}