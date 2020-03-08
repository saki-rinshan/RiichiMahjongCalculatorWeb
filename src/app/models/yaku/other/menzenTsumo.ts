import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class MenzenTsumo extends Yaku {
	extraInfoService: ExtraInfoService;
	constructor(extraInfoService: ExtraInfoService, language: number) {
		const open_han: number = 1;
		const closed_han: number = 1;
		const nameEN: String = "Menzen Tsumo";
		const nameJP: String = "門前清自摸和";
		const tooltipEN: String = "Win by drawing your winning tile with a closed hand";
		const tooltipJP: String = "門前で山から自分のアガリ牌を自摸して和了する";
		const pronounciationEN: String = "Tsu-mow";
		const pronounciationJP: String = "メンゼンチンツモホ";
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		if (this.extraInfoService.buttonList.buttons[0].isToggled) {
			if(!hand.isOpen) {
				return true;
			}
		}
		return false;
	}
}