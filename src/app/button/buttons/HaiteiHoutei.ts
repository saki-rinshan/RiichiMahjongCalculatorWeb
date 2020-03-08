import { Button } from '../button';

export class HaiteiHouteiButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Haitei/Houtei";
		const nameJP: String = "海底・河底";
		const tooltipEN: String = "Win via tsumo on the last tile in the wall/Win via ron on the very last discard.";
		const tooltipJP: String = "山にある最後の牌を自摸して和了する・最後の捨て牌にロンして。";
		const pronounciationEN: String = "Hai-tay/Hou-tay";
		const pronounciationJP: String = "ハイテイ・ホウテイ"; 
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}