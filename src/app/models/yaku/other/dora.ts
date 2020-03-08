import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class Dora extends Yaku {
	
	extraInfoService: ExtraInfoService;
	open_han: number;
	closed_han: number;
	
	constructor(extraInfoService: ExtraInfoService, language: number) {
		const closed_han: number = 0;
		const open_han: number = 0;
		const nameEN: String = "Dora";
		const nameJP: String = "ドラ";
		const tooltipEN: String = "Dora (ドラ) is a bonus tile that adds han value to a hand. Every kind of tile can become a dora tile. A dora tile adds the same number of han value as the number of its corresponding 'dora indicator' tiles. The dora tile becomes the next tile ahead of the dora indicator. However dora is not yaku.　For example: 9 manzu is the dora indicator -> 1 manzu becomes the dora.";
		const tooltipJP: String = "ドラとは、麻雀において、和了したときに得点の加算につながる特定の牌のことをいう。 ドラになる牌はドラ表示牌の次位牌。 例えば９ピンはドラ表示牌ー＞１ピンはドラになる。";
		const pronounciationEN: String = "Dora";
		const pronounciationJP: String = "ドラ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
		this.open_han = open_han;
		this.closed_han = closed_han;
	}
	
	validate(hand: Hand): boolean {
		var doraCount = 0;
		for(let doraIndicator of this.extraInfoService.doraTiles) {
			for(let tile of hand.getAllTiles()) {
				if(this.extraInfoService.getDoraFromIndicator(doraIndicator).equals(tile)) {
					doraCount++;
				}
			}
		} 
		if(doraCount > 0) {
			this.open_han = doraCount;
			this.closed_han = doraCount;
			return true;
		}
		return false;
	}
}