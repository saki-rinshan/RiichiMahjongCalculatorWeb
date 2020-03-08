import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class AkaDora extends Yaku {
	extraInfoService: ExtraInfoService;
	open_han: number;
	closed_han: number;
	constructor(extraInfoService: ExtraInfoService, language: number) {
		
		const open_han: number = 0;
		const closed_han: number = 0;

		const nameEN: String = "Aka dora";
		const nameJP: String = "赤ドラ";
		const tooltipEN: String = "Bonus Han from a special red tile";
		const tooltipJP: String = "図柄の彫り込み部分全体を赤く着色した牌を赤牌のドラ";
		const pronounciationEN: String = "Aka-dora";
		const pronounciationJP: String = "あかドラ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
		this.open_han = open_han;
		this.closed_han = closed_han;
    }
	
	validate(hand: Hand): boolean {
		var akaDoraCount = 0;
		for(let tile of hand.getAllTiles()) {
			//console.log(tile.toString());
			if(tile.isAka) {
				akaDoraCount++;
			}
		}
		if(akaDoraCount > 0) {
			this.open_han = akaDoraCount;
			this.closed_han = akaDoraCount;
			return true;
		}
		return false;
	}
}