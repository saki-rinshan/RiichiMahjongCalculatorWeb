import { Yaku } from '../../yaku';
import { Hand } from '../../hand';
import { Fu } from '../../fu';
import { Machi } from '../../machi';
import { MachiFu } from '../../fu/generic/machiFu';
import { Set, SetType } from '../../set';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';

export class Pinfu extends Yaku {

	extraInfoService: ExtraInfoService;
	constructor(extraInfoService: ExtraInfoService, language: number) {
        
		const open_han: number = 0;
		const closed_han: number = 1;
		const nameEN: String = "Pinfu";
		const nameJP: String = "平和";
		const tooltipEN: String = "A hand with no fu. Must have all sets be sequences, no dragon pair or prevailing wind pair or own seat pair. And must have a ryanmen(two-sided) wait.";
		const tooltipJP: String = "平和の成立条件は以下の4つである。門前であること。 符のつかない面子で手牌が構成されていること。すなわち4面子すべてが順子であること。符のつかない対子が雀頭であること、すなわち役牌が雀頭の時は平和にならない。符のつかない待ち、すなわち両面待ちであること。";
		const pronounciationEN: String = "Pin-fu";
		const pronounciationJP: String = "ピンフ";
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.extraInfoService = extraInfoService;
    }
	
	validate(hand: Hand): boolean {
		for (let set of hand.sets) {
			if(set.stype == SetType.Jantou) {
				var tileVal = set.tile.value;
				if(tileVal > 9) {
					if(tileVal >= 16) {
						return false;
					}
					if(tileVal == this.extraInfoService.seatWind || tileVal == this.extraInfoService.prevailingWind) {
						return false;
					}
				}
				continue;
			}
			if(set.stype != SetType.Shuntsu || set.is_open) {
				return false;
			}
		}
		if(this.determineMachi(hand).machi == Machi.Ryanmen && hand.sets.filter(set => set.stype == SetType.Shuntsu).length == 4) {
			return true;
		}
	}
	
	determineMachi(hand: Hand): MachiFu {
		if(!hand.agariSet) {
			return new MachiFu(Machi.Tanki);
		}
		if(hand.agariSet.stype == SetType.Shuntsu) {
			if(hand.agari.equals(hand.agariSet.getTiles()[0]) || hand.agari.equals(hand.agariSet.getTiles()[2])) {
				if(hand.agari.value == 3 && hand.agariSet.getTiles()[0].value == 1) {
					return new MachiFu(Machi.Penchan);
				} else if(hand.agari.value == 7 && hand.agariSet.getTiles()[2].value == 9) {
					return new MachiFu(Machi.Penchan);
				}
				return new MachiFu(Machi.Ryanmen);
			} else if (hand.agari.equals(hand.agariSet.getTiles()[1])) {
				return new MachiFu(Machi.Kanchan);
			}
		} else if(hand.agariSet.stype == SetType.Jantou) {
			return new MachiFu(Machi.Tanki);
		} else {
			return new MachiFu(Machi.Shanpon);
		}
	}
}