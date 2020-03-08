import { Fu } from '../../fu';
import { Hand } from '../../hand';
import { Machi } from '../../machi';
import { Set, SetType } from '../../set';
import { Tile, TileSuit } from '../../tile';

export class MachiFu extends Fu {
	
	
	machi: number;

	constructor(machi: number, language?: number) {
		
		
		var fu: number = 0;

		var nameEN: string;
		var nameJP: string;
		var tooltipEN: string;
		var tooltipJP: string;
		var pronounciationEN: string;
		var pronounciationJP: string; 
		
		if(machi == Machi.Ryanmen) {
			nameEN = "Ryanmen Wait";
			pronounciationEN = "Ree-ahn-men";
			tooltipEN = "When the winning tile is a double sided wait. For example, waiting to complete a sequence: 45 remaining and waiting on 3 or 6, or 78 waiting on a 6 or 9."
			nameJP = "両面待ち";
			pronounciationJP = "リャンメンマチ";
			tooltipJP = "聴牌時において3つの面子と雀頭が完成しており、最後に両面搭子が残された状態をいう。例え残り牌は「三索　四索」待ち牌は二索五索。"
		} else if(machi == Machi.Kanchan) {
			nameEN = "Kanchan Wait";
			pronounciationEN = "Kahn-chan";
			tooltipEN = "When the winning tile is a middle wait. For example, waiting to complete a sequence: 46 remaining and waiting on a 5, or 79 remaining and waiting on an 8."
			fu = 2;
			nameJP = "嵌張待ち";
			pronounciationJP = "カンチャンマチ";
			tooltipJP = "聴牌時において3つの面子と雀頭が完成しており、最後に嵌搭子が残された状態をいう。例え残り牌は「四索　六索」待ち牌は五索。"
		
		} else if(machi == Machi.Penchan) {
			nameEN = "Penchan Wait";
			pronounciationEN = "Pen-chan";
			tooltipEN = "When the winning tile is a edge wait. For example, waiting to complete a sequence: 89 remaining and waiting on a 7, or 12 waiting on a 3."
			fu = 2;
			nameJP = "嵌張待ち";
			pronounciationJP = "ペンチャンマチ";
			tooltipJP = "聴牌時において3つの面子と雀頭が完成しており、最後に辺搭子が残された状態をいう。例え残り牌は「八萬　九萬」待ち牌は七萬"
		} else if(machi == Machi.Tanki) {
			nameEN = "Tanki Wait";
			pronounciationEN = "Tahn-key";
			tooltipEN = "When the winning tile is a single wait. For example, waiting to complete a pair: 2 remaining waiting on a 2."
			fu = 2;
			nameJP = "単騎待ち";
			pronounciationJP = "タンキマチ";
			tooltipJP = "聴牌時において4つの面子が完成しており、雀頭となる対子が1枚欠けている状態を指す。例え残り牌は「三索」待ち牌は三索。"
		} else if(machi == Machi.Shanpon) {
			nameEN = "Shanpon Wait";
			pronounciationEN = "Shan-pwn";
			tooltipEN = "When the winning tile is a double wait. For example, waiting to complete a set: 22 and 33 remaining and waiting on either a 2 or 3, or HakuHaku and ChunChun remaining and waiting for either a Haku or Chun."
			nameJP = "双碰待ち";
			pronounciationJP = "シャンポンマチ";
			tooltipJP = "聴牌時において3つの面子が完成しており、その他に対子が2つある状態を指す。例え残り牌は「發發 五萬五萬」待ち牌は發と五萬。"
		}
		
		
		var names = [  nameEN,  nameJP ];
		var tooltips = [  tooltipEN,  tooltipJP ];
		var pronounciations = [  pronounciationEN,  pronounciationJP ];
        
		super(nameEN, language, names, pronounciations, tooltips, fu);
		this.machi = machi;
    }
	
	validate(hand: Hand): boolean {
		return false;
	}
}