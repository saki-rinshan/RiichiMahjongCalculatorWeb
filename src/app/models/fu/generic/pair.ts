import { Fu } from '../../fu';
import { Hand } from '../../hand';
import { ExtraInfoService } from '../../../extra-info/extra-info.service';
import { Tile, TileSuit } from '../../tile';

export class Pair extends Fu {
	name:String;
	constructor(extraInfoService: ExtraInfoService, tile: Tile, language: number) {
        var fu = 2;
		var nameEN:string = "";
		var nameJP:string;
		
		var tooltipEN: string;
		var tooltipJP: string;
		var pronounciationEN: string;
		var pronounciationJP: string;
		
		if(tile.suit == TileSuit.Dragon) {
			nameEN = "Dragon Pair";
			tooltipEN = "A pair of dragon tiles.";
			nameJP = "三元牌雀頭";
			tooltipJP = "白・發・中の雀頭。"
			pronounciationJP = "サンゲンパイジャントウ";
		}
		if(tile.suit == TileSuit.Wind) {
			if(tile.name === extraInfoService.buttonList.getOyaWind()) {
				nameEN = "Prevailing Wind Pair";
				tooltipEN = "The pair matches the wind of the current round.";
				nameJP = "場風雀頭";
				tooltipJP = "場と同じ雀頭。"
				pronounciationJP = "オタフウジャントウ";
			}
			if(tile.name === extraInfoService.buttonList.getSeatWind()) {
				nameEN = "Seat Wind Pair";
				tooltipEN = "The pair matches the wind of the current seat.";
				nameJP = "自風雀頭";
				tooltipJP = "自分の位置と同じ雀頭。"
				pronounciationJP = "ジフウジャントウ";
			}
			if(tile.name === extraInfoService.buttonList.getOyaWind() && 
			tile.name === extraInfoService.buttonList.getSeatWind()) {
				nameEN = "Prevailing + Seat Wind pair";
				tooltipEN = "The pair matches the wind of the current round and also the current seat.";
				nameJP = "連風牌雀頭";
				tooltipJP = "自分の位置と同じ雀頭。そして場と同じ雀頭。"
				pronounciationJP = "リェンフォンパイジャントウ";
				fu=4;
			}
		}
		
		
		pronounciationEN = nameEN;
		const names = [  nameEN,  nameJP ];
		const tooltips = [  tooltipEN,  tooltipJP ];
		const pronounciations = [  pronounciationEN,  pronounciationJP ];
		super(nameEN, language, names, pronounciations, tooltips, fu);
    }
	
	validate(hand: Hand): boolean {
		return false;
	}
}