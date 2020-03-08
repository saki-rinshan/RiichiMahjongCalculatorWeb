import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Chiitoitsu extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) {
        const open_han: number = 0;
		const closed_han: number = 2;

		const nameEN: String = "Chiitoitsu";
		const nameJP: String = "七対子";
		const tooltipEN: String = "A special yaku where the winning hand is composed of 7 pairs. Must be closed and no pairs can be repeated.";
		const tooltipJP: String = "通常、麻雀の和了形は4面子1雀頭によって構成されるが、例外となるのが国士無双とこの七対子である。 その名の通り、対子を7組そろえることで成立する。 門前役で対子は多発出来ない。";
		const pronounciationEN: String = "Chii-toy-tzu";
		const pronounciationJP: String = "チートイツ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		if (hand.sets.filter(set => set.stype == SetType.Jantou).length <= 2) {
			return false;
		}
		for(var i = 1; i < hand.sets.length; i++) {
			if(hand.sets[i-1].equals(hand.sets[i])) {
				return false;
			}
			if (hand.sets[i].stype != SetType.Jantou) {
				return false;
			}
		}	
		return true;
	}
}


