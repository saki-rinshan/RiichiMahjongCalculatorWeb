import { Fu } from '../fu';
import { Hand } from '../hand';
import { ExtraInfoService } from '../../extra-info/extra-info.service';
import { Set } from '../set';
import { SetType } from '../set';

export class OpenPinfuBasePoints extends Fu {
	fu: number;
	extraInfoService: ExtraInfoService;
	
	constructor(language: number) {
        const fu: number = 30;

		const nameEN: String = "Open Pinfu Base Points";
		const nameJP: String = "食い平和";
		const tooltipEN: String = "Some open hands produce 0 fu based on composition alone, such as a hand of all sequences. These hands are automatically granted 30 fu. This is because the automic 20 base points from winning and 2 fu from either ron or tsumo gets rounded to 30.";
		const tooltipJP: String = "食い平和は一律30符で計算する。";
		const pronounciationEN: String = "Open Pin-fu";
		const pronounciationJP: String = "クイピンフ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.fu = fu;
    }
	
	validate(hand: Hand): boolean {
		if(hand.isOpen) {
			for(let set of hand.sets) {
				if(set.stype == SetType.Jantou) {
					continue;
				}
				if(set.stype != SetType.Shuntsu) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
}