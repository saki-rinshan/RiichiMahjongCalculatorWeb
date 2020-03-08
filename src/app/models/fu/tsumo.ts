import { Fu } from '../fu';
import { Hand } from '../hand';
import { ExtraInfoService } from '../../extra-info/extra-info.service';

export class Tsumo extends Fu {
	fu: number;
	extraInfoService: ExtraInfoService;
	
	constructor(extraInfoService: ExtraInfoService, language: number) {
        const fu: number = 2;

		const nameEN: String = "Self Draw";
		const nameJP: String = "ツモ";
		const tooltipEN: String = "+2 fu for self drawing the winning tile, regardless of an open or closed hand.";
		const tooltipJP: String = "ツモ和了した場合に与えられる2符。";
		const pronounciationEN: String = "Self draw";
		const pronounciationJP: String = "メンゼンカフ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.fu = fu;
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		if(this.extraInfoService.buttonList.isToggled("Tsumo")) {
			return true;
		}
		return false;
	}
}