import { Button } from '../button';

export class RiichiButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Riichi";
		const nameJP: String = "立直";
		const tooltipEN: String = "Win after declaring riichi To make a declaration:　(The hand must be closed and in tenpai. The player declares “riichi”, discards their tile sideways, and places a 1,000-point stick on the table as a deposit. From this point onward, the player cannot change their hand and must discard every drawn tile except for the winning one.)";
		const tooltipJP: String = "リーチ掛かる後の和了　リーチが掛かる状況：　（門前（メンゼン）で聴牌（テンパイ）し、今後一切手を変えない。　「リーチ」を宣言する。1000点棒を供託して聴は横に捨てる。）";
		const pronounciationEN: String = "Reeeachi";
		const pronounciationJP: String = "リーチ";
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}