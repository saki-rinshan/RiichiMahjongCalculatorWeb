import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Suuankou extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 0;
		const closed_han: number = 13;

		const nameEN: String = "Suu Ankou";
		const nameJP: String = "四暗刻";
		const tooltipEN: String = "A hand that has four closed triplets/quads. This means that if you have 3 triplets in hand and a double wait on two tiles, then you cannot ron for Suu Ankou because the fourth triplet will be open. However, if you already have 4 triplets, and a single wait, then you can either ron or tsumo for yakuman.";
		const tooltipJP: String = "暗刻を4つ作って和了した時に成立する。四暗刻は4面子すべてを暗刻にしなければならない。シャンポン待ちの場合はツモ和了しなければ四暗刻にならない。単騎待ちの場合は手の内に4つの暗刻が確定しているため、ツモ・ロンにかかわらず役満となる。";
		const pronounciationEN: String = "Sue Ahncle";
		const pronounciationJP: String = "スー​アンコー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }


	validate(hand: Hand): boolean {
		if(hand.isOpen) {
			return false;
		}
		var ponCounter = 0;
		for (let set of hand.sets) {
			
			if(set.stype == SetType.Jantou) {
				continue;
			}
			if (set.stype == SetType.Koutsu || set.stype == SetType.Kantsu) {
				ponCounter++;
			}
		}
		if(ponCounter != 4) {
			return false;
		} else {
			return true;
		}
	}
}


