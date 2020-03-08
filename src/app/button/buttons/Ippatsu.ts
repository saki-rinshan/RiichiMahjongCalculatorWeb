import { Button } from '../button';

export class IppatsuButton extends Button {
	
	constructor(language: number) {
		const nameEN: String = "Ippatsu";
		const nameJP: String = "一発";
		const tooltipEN: String = "Win during the first round after declaring Riichi. (before discarding another tile after the riichi tile) (Note that a call of any kind negates Ippatsu.)";
		const tooltipJP: String = "リーチが掛かる一順（リーチ牌を捨てる後けど自分が他の牌を捨てる前に）後の間に和了する。";
		const pronounciationEN: String = "Yi-pa-tsu";
		const pronounciationJP: String = "イッパツ";
		const names = [ nameEN, nameJP ];
		const tooltips = [ tooltipEN, tooltipJP ];
		const pronounciations = [ pronounciationEN, pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips);
	}
}