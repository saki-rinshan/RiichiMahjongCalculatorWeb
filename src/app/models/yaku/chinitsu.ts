import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile'

export class Chinitsu extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) {
        const open_han: number = 5;
		const closed_han: number = 6;

		const nameEN: String = "Chinitsu";
		const nameJP: String = "清一色";
		const tooltipEN: String = "All tiles in the hand are exclusively of one suit with no honor tiles. 6 Han if the hand is closed. Not stackable with Honitsu.";
		const tooltipJP: String = "筒子のいずれか一種の牌だけを使って和了した時に成立する。門前では6翻。混一色と組む事が出来ない。";
		const pronounciationEN: String = "Cheen-iit-su";
		const pronounciationJP: String = "チン​イーソー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		for(var i = 1; i < hand.sets.length; i++) {
			//is honor
			if (hand.sets[i].tile.value > 9) {
					return false;
			}
			if (hand.sets[i].tile.suit != hand.sets[i-1].tile.suit) {
				return false;
			}
		}
		return true;	
	}
}
