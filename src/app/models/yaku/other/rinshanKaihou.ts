import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class RinshanKaihou extends Yaku {
	extraInfoService: ExtraInfoService;
	constructor(extraInfoService: ExtraInfoService, language: number) {
		const open_han: number = 1;
		const closed_han: number = 1;
		const nameEN: String = "Rinshan Kaihou";
		const nameJP: String = "嶺上開花";
		const tooltipEN: String = "The most aesthetic yaku in all of mahjong. Win by drawing the winning tile from the deadwall is considered automatic yakuman in all rulesets.";
		const tooltipJP: String = "槓を行い、不足した牌を補充するため嶺上牌を引いた際に、引いた牌が自らの和了牌であった場合に与えられる";
		const pronounciationEN: String = "Rin-shan Kai-hou";
		const pronounciationJP: String = "リンシャンカイホウ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		
		if(this.extraInfoService.buttonList.buttons[6].isToggled) {
			return true;
		}
		return false;
	}
}