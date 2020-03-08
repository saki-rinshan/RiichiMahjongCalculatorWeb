import { Yaku } from '../yaku';
import { Hand } from '../hand';
import { Set, SetType } from '../set';
import { Tile, TileSuit } from '../tile';
import { ExtraInfoService } from '../../extra-info/extra-info.service';
import { ButtonList } from '../../button/buttonList';

export class Yakuhai extends Yaku {
	open_han: number;
	closed_han: number;
	obj:ButtonList;
	extraInfoService: ExtraInfoService; 
	constructor(extraInfoService: ExtraInfoService, language: number) { 
		const open_han: number = 1;
		const closed_han: number = 1;

		const nameEN: String = "Yakuhai";
		const nameJP: String = "役牌";
		const tooltipEN: String = "Any triplets or quads of dragons, the player’s wind or the prevailing wind. If a wind is both the player’s wind and the round wind, it is worth two han per group. Each triplet is stackable.";
		const tooltipJP: String = "この役を成立させる牌は、以下の3種類である。圏風牌：東場の東など、場と同じ牌。門風牌：北家の北など、自分の位置と同じ牌。三元牌：白・發・中。これらの牌が刻子または槓子になっている場合に役が成立する。なお、該当する刻子（または槓子）が複数ある場合には、それぞれを1翻として数える。";
		const pronounciationEN: String = "Yaku-hai";
		const pronounciationJP: String = "ヤクハイ"; 
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, open_han, closed_han);
		this.open_han = open_han;
		this.closed_han = closed_han;
		this.extraInfoService = extraInfoService; 
	}

	validate(hand: Hand): boolean {
		this.open_han = 0;
		this.closed_han = 0;
		for (let set of hand.sets) {
			// Preliminary check
			if(set.stype == SetType.Jantou || set.stype == SetType.Shuntsu || set.tile.value < 9) {
				continue;
			}

			// Check dragon set
			this.open_han += (set.tile.suit == TileSuit.Dragon) ? 1 : 0;

			// Check seat, prevalent wind
			switch (set.tile.value) {
			case 12: // East Wind Tile
				if (this.extraInfoService.buttonList.isToggled("Wind_Ton") || this.extraInfoService.buttonList.isToggled("Wind_Oya_Ton")) {
					this.open_han += (this.extraInfoService.buttonList.areMatchingWinds()) ? 2 : 1;
				} break; 
			case 13: // South Wind Tile
				if (this.extraInfoService.buttonList.isToggled("Wind_Nan") || this.extraInfoService.buttonList.isToggled("Wind_Oya_Nan")) {
					this.open_han += (this.extraInfoService.buttonList.areMatchingWinds()) ? 2 : 1; 
				} break;
			case 14: // West Wind Tile
				if (this.extraInfoService.buttonList.isToggled("Wind_Xia") || this.extraInfoService.buttonList.isToggled("Wind_Oya_Xia")) {
					this.open_han += (this.extraInfoService.buttonList.areMatchingWinds()) ? 2 : 1;
				} break;
			case 15: // North Wind Tile
				if (this.extraInfoService.buttonList.isToggled("Wind_Pei") || this.extraInfoService.buttonList.isToggled("Wind_Oya_Pei")) {
					this.open_han += (this.extraInfoService.buttonList.areMatchingWinds()) ? 2 : 1;
				}break;
			}

			this.closed_han = this.open_han;
		}
		return this.open_han > 0 && this.closed_han > 0;
	}
}
