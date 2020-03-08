import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class SanshokuDoukou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 2;
		const closed_han: number = 2;

		const nameEN: String = "Sanshoku Doukou";
		const nameJP: String = "三色同刻";
		const tooltipEN: String = "Three triplets consisting of the same numbers in all three suits.";
		const tooltipJP: String = "萬子・索子・筒子それぞれの色で同じ数字の刻子（槓子も含む）を作ったときに成立する。";
		const pronounciationEN: String = "San-show-ko Doe-koe";
		const pronounciationJP: String = "サンショク​ドーコー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		for (var i=0; i<hand.sets.length; i++) {
			if(hand.sets.filter(set => set.stype == SetType.Koutsu && set.tile.value == hand.sets[i].tile.value).length ==3) {
				return true;
			}
		}
		return false;
	}
}

