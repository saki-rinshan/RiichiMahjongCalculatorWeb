import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';

export class Ittsuu extends Yaku {
	open_han: number;
	closed_han: number;
	
	constructor(language: number) { 
        const open_han: number = 1;
		const closed_han: number = 2;

		const nameEN: String = "Ittsuu";
		const nameJP: String = "一気通貫";
		const tooltipEN: String = "A straight from number 1 through 9 of one suit, namely, three sequences of 1-2-3, 4-5-6 and 7-8-9. 2 Han if closed.";
		const tooltipJP: String = "同種の数牌で123・456・789と揃えると成立する。門前2翻。";
		const pronounciationEN: String = "Yi-ttzu";
		const pronounciationJP: String = "イッツー"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
    }

	validate(hand: Hand): boolean {
		var manzuSequences: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu && set.tile.suit == TileSuit.Manzu);
		var pinzuzuSequences: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu && set.tile.suit == TileSuit.Pinzu);
		var souzuSequences: Set[] = hand.sets.filter(set => set.stype == SetType.Shuntsu &&  set.tile.suit == TileSuit.Souzu);
		
		var totalSets: Set[][] = [manzuSequences, pinzuzuSequences, souzuSequences];
		
			var ittsuuValues: number[] = [1,4,7];
			for(let sets of totalSets) {
				var tileValues: number[] = [];
				var correctCounter  = 0;
				for(let set of sets) { 
					tileValues.push(set.tile.value);
				}
				
				for(var i = 0; i < 3; i++) {
					if(tileValues[i] == ittsuuValues[i]) {
						correctCounter++;
					}
				}
				if(correctCounter == 3) {
					return true;
				}
			}
		return false;
	}
}

