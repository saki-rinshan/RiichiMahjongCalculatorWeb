import { Hand } from './hand';
import { Yaku } from './yaku';
import { Set } from './set';
import { SetType } from './set';
import { ExtraInfoService } from '../extra-info/extra-info.service';

import { Chanta } from './yaku/chanta';
import { Chiitoitsu } from './yaku/chiitoitsu';
import { Chinitsu } from './yaku/chinitsu';
import { Chinroutou } from './yaku/chinroutou';
import { ChuurenPoutou } from './yaku/chuuren_poutou';
import { Daisangen } from './yaku/daisangen';
import { Daisuushii } from './yaku/daisuushii';
import { Honitsu } from './yaku/honitsu';
import { Honroutou } from './yaku/honroutou';
import { Iipeikou } from './yaku/iipeikou';
import { Ittsuu } from './yaku/ittsuu';
import { JunchanTayao } from './yaku/junchan_tayao';
import { KokushiMusou } from './yaku/kokushi_musou';
import { Ryanpeikou } from './yaku/ryanpeikou';
import { Ryuuiisou } from './yaku/ryuuiisou';
import { Sanankou } from './yaku/sanankou';
import { Suuankou } from './yaku/suuankou';
import { Sankantsu } from './yaku/sankantsu';
import { SanshokuDoujun } from './yaku/sanshoku_doujun';
import { SanshokuDoukou } from './yaku/sanshoku_doukou';
import { Shousangen } from './yaku/shousangen';
import { Shousuushii } from './yaku/shousuushii';
import { Suukantsu } from './yaku/suukantsu';
import { Tanyao } from './yaku/tanyao';
import { Toitoi } from './yaku/toitoi';
import { Tsuuiisou } from './yaku/tsuuiisou';
import { Yakuhai } from './yaku/yakuhai';


import { AkaDora } from './yaku/other/akaDora';
import { Chankan } from './yaku/other/chankan';
import { Dora } from './yaku/other/dora';
import { DoubleRiichi } from './yaku/other/doubleRiichi';
import { HaiteiHoutei } from './yaku/other/haiteiHoutei';
import { Ippatsu } from './yaku/other/ippatsu';
import { MenzenTsumo } from './yaku/other/menzenTsumo';
import { Pinfu } from './yaku/other/pinfu';
import { Riichi } from './yaku/other/riichi';
import { RinshanKaihou } from './yaku/other/rinshanKaihou';

export class YakuList {
	
	yaku: Yaku[] = new Array<Yaku>();
	specialYaku: Yaku[] = new Array<Yaku>();
	otherYaku: Yaku[] = new Array<Yaku>();
	
	constructor(public extraInfoService: ExtraInfoService, language: number) { 
		var chanta: Chanta = new Chanta(language); 
		var chiitoitsu: Chiitoitsu = new Chiitoitsu(language);
		var chinitsu: Chinitsu = new Chinitsu(language);
		var chinroutou: Chinroutou = new Chinroutou(language);
		var chuuren: ChuurenPoutou = new ChuurenPoutou(language);
		var daisangen: Daisangen = new Daisangen(language); 
		var daisuushii: Daisuushii = new Daisuushii(language);
		var honitsu: Honitsu = new Honitsu(language);
		var honroutou: Honroutou = new Honroutou(language);
		var iipeikou: Iipeikou = new Iipeikou(language);
		var ittsuu: Ittsuu = new Ittsuu(language);
		var junchan: JunchanTayao = new JunchanTayao(language);
		var kokushi: KokushiMusou = new KokushiMusou(language);
		var ryanpeikou: Ryanpeikou = new Ryanpeikou(language);
		var ryuuiisou: Ryuuiisou = new Ryuuiisou(language);
		var sanankou: Sanankou = new Sanankou(language);
		var suuankou: Suuankou = new Suuankou(language);
		var sankantsu: Sankantsu = new Sankantsu(language);
		var sanshoku_dj: SanshokuDoujun = new SanshokuDoujun(language);
		var sanshoku_dk: SanshokuDoukou = new SanshokuDoukou(language);
		var shousangen: Shousangen = new Shousangen(language);
		var shousuushii: Shousuushii = new Shousuushii(language);
		var suukantsu: Suukantsu = new Suukantsu(language);
		var tanyao: Tanyao = new Tanyao(language); 
		var toitoi: Toitoi = new Toitoi(language); 
		var tsuuiisou: Tsuuiisou = new Tsuuiisou(language); 
		var yakuhai: Yakuhai = new Yakuhai(extraInfoService, language);
		
		this.yaku.push(chanta);
		this.yaku.push(junchan);
		//
		this.yaku.push(ittsuu);
		this.yaku.push(honitsu);
		this.yaku.push(chinitsu);
		//
		this.yaku.push(iipeikou);
		this.yaku.push(ryanpeikou);
		//
		//
		this.yaku.push(yakuhai);
		this.yaku.push(shousangen);
		this.yaku.push(daisangen);
		//
		this.yaku.push(shousuushii);
		this.yaku.push(daisuushii);
		//
		this.yaku.push(toitoi);
		//
		this.yaku.push(sankantsu);
		this.yaku.push(suukantsu);
		//
		this.yaku.push(sanankou);
		this.yaku.push(suuankou);
		//
		this.yaku.push(chinroutou);
		this.yaku.push(chuuren);
		this.yaku.push(honroutou);
		this.yaku.push(ryuuiisou);
		this.yaku.push(sanshoku_dj);
		this.yaku.push(sanshoku_dk);
		this.yaku.push(tanyao);
		this.yaku.push(tsuuiisou);
		
		this.specialYaku.push(kokushi);
		this.specialYaku.push(chiitoitsu);
		
		var akaDora = new AkaDora(extraInfoService, language);		
		var chankan = new Chankan(extraInfoService, language);		
		var dora = new Dora(extraInfoService, language);		
		var doubleRiichi = new DoubleRiichi(extraInfoService, language);	

		var haiteiHoutei = new HaiteiHoutei(extraInfoService, language);		
		var ippatsu = new Ippatsu(extraInfoService, language);		
		var menzenTsumo = new MenzenTsumo(extraInfoService, language);		
		var pinfu = new Pinfu(extraInfoService, language);		
		var riichi = new Riichi(extraInfoService, language);
		var rinshanKaihou = new RinshanKaihou(extraInfoService, language);

		this.otherYaku.push(chankan);
		this.otherYaku.push(doubleRiichi);
		this.otherYaku.push(haiteiHoutei);
		this.otherYaku.push(ippatsu);
		this.otherYaku.push(menzenTsumo);
		this.otherYaku.push(pinfu);
		this.otherYaku.push(rinshanKaihou);
		this.otherYaku.push(riichi);
		this.otherYaku.push(dora);
		this.otherYaku.push(akaDora);
		
	}
	
	validate(hand: Hand): Yaku[] {
		var matchedYaku: Yaku[] = new Array<Yaku>();
		if(hand.sets.filter(set => set.stype == SetType.Jantou).length >= 2) {
			return matchedYaku;
		}
		for(let yaku of this.yaku) {
			if(yaku.validate(hand)) {
				matchedYaku.push(yaku);
				hand.addYaku(yaku);
			}
		}
		return matchedYaku;
	}
	
	validateSpecial(hand: Hand): Yaku[] {
		var matchedYaku: Yaku[] = new Array<Yaku>();
		for(let yaku of this.specialYaku) {
			if(yaku.validate(hand)) {
				matchedYaku.push(yaku);
				hand.addYaku(yaku);
			}
		}
		if(matchedYaku.length >= 1) {
			if(matchedYaku[0].defaultName.indexOf("Chii") != -1) {
				for(let yaku of this.yaku) {
					if(yaku.validate(hand)) {
						if(yaku.defaultName.indexOf("Chanta") == -1) {
							matchedYaku.push(yaku);
							hand.addYaku(yaku);
						}
					}
				}
			}
		}
		return matchedYaku;
	}
	
	validateOther(hand: Hand): Yaku[] {
		var matchedYaku: Yaku[] = new Array<Yaku>();
		for(let yaku of this.otherYaku) {
			if(yaku.validate(hand)) {
				matchedYaku.push(yaku);
				hand.addYaku(yaku);
			}
		}
		return matchedYaku;
	}
	
	updateText(language: number) {
		for(let yaku of this.yaku) {
			this.updateYaku(yaku, language);
		}
		
		for(let yaku of this.otherYaku) {
			this.updateYaku(yaku, language);
		}
		
		for(let yaku of this.specialYaku) {
			this.updateYaku(yaku, language);
		}
	}
	
	updateYaku(yaku: Yaku, language: number) {
			yaku.name = yaku.names[language];
			yaku.pronounciation = yaku.pronounciations[language];
			yaku.tooltip = yaku.tooltips[language];
	}
}
