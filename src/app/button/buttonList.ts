import { TsumoButton } from './buttons/Tsumo';
import { RonButton } from './buttons/Ron';
import { RiichiButton } from './buttons/Riichi';
import { DoubleRiichiButton } from './buttons/DoubleRiichi';
import { IppatsuButton } from './buttons/Ippatsu';
import { ChankanButton } from './buttons/Chankan';
import { HaiteiHouteiButton } from './buttons/HaiteiHoutei';
import { RinshanKaihouButton } from './buttons/RinshanKaihou';
import { Button, SetButtonType, ButtonGroup, RiichiButtonGroup } from './button';

import { ChiButton } from './buttons/set/Chi'
import { PonButton } from './buttons/set/Pon'
import { ClosedKanButton } from './buttons/set/ClosedKan'
import { OpenKanButton } from './buttons/set/OpenKan'

 
export class SetButtonList {
	buttons: Button[] = new Array();
	set_group: ButtonGroup = new ButtonGroup();
	
	constructor(language: number) {
		var chi = new ChiButton(language);
		var pon = new PonButton(language);
		var open_kan = new ClosedKanButton(language);
		var closed_kan = new OpenKanButton(language);
		
		this.buttons.push(chi);
		this.buttons.push(pon);
		this.buttons.push(open_kan);
		this.buttons.push(closed_kan);
		
		this.set_group.add(chi);
		this.set_group.add(pon);
		this.set_group.add(open_kan);
		this.set_group.add(closed_kan);
	}
	 
	updateText(language: number) {
		for(let button of this.buttons) {
			button.name = button.names[language];
		}
	}
}

export class ButtonList {
	
	buttons: Button[] = new Array();
	oya_wind_group: ButtonGroup;
	seat_wind_group: ButtonGroup;
	
	defaultButtons: Button[];
	tsumo_ron_group: ButtonGroup;
	riichi_group: RiichiButtonGroup;
	kan_last_draw_group: ButtonGroup;
	

	
	constructor(language: number) {
		
		this.oya_wind_group = new ButtonGroup();
		this.seat_wind_group = new ButtonGroup();
		
		var oya_ton = new Button("Wind_Oya_Ton");
		var oya_nan = new Button("Wind_Oya_Nan");
		var oya_xia = new Button("Wind_Oya_Xia");
		var oya_pei = new Button("Wind_Oya_Pei");
		var seat_ton = new Button("Wind_Ton");
		var seat_nan = new Button("Wind_Nan");
		var seat_xia = new Button("Wind_Xia");
		var seat_pei = new Button("Wind_Pei");
		
		var tsumo = new TsumoButton(language);
		var ron = new RonButton(language);
		var riichi = new RiichiButton(language);
		var double_riichi = new DoubleRiichiButton(language);
		var ippatsu = new IppatsuButton(language);
		var chankan = new ChankanButton(language);
		var rinshan_kaihou = new RinshanKaihouButton(language); 
		var haitei_houtei = new HaiteiHouteiButton(language);
		 
		 
		this.buttons.push(tsumo);
		this.buttons.push(ron);
		this.buttons.push(riichi);
		this.buttons.push(double_riichi);
		this.buttons.push(ippatsu);
		this.buttons.push(chankan);
		this.buttons.push(rinshan_kaihou);
		this.buttons.push(haitei_houtei);
		
		
		
		this.buttons.push(seat_ton);	
		this.buttons.push(seat_nan);	
		this.buttons.push(seat_xia);	
		this.buttons.push(seat_pei);
		this.buttons.push(oya_ton);	
		this.buttons.push(oya_nan);	
		this.buttons.push(oya_xia);	
		this.buttons.push(oya_pei);	
		
		
		
		
		this.seat_wind_group.add(seat_ton);
		this.seat_wind_group.add(seat_nan);
		this.seat_wind_group.add(seat_xia);
		this.seat_wind_group.add(seat_pei);
		
		
		this.oya_wind_group.add(oya_ton);
		this.oya_wind_group.add(oya_nan);
		this.oya_wind_group.add(oya_xia);
		this.oya_wind_group.add(oya_pei);
		
		//toggle by default buttons
		oya_ton.toggle();
		seat_nan.toggle();
		tsumo.toggle();
		
		this.tsumo_ron_group = new ButtonGroup();
		this.tsumo_ron_group.add(tsumo);
		this.tsumo_ron_group.add(ron);
		
		this.riichi_group = new RiichiButtonGroup();
		this.riichi_group.add(riichi);
		this.riichi_group.add(double_riichi);
		this.riichi_group.add(ippatsu);
		
		this.kan_last_draw_group = new ButtonGroup();
		this.kan_last_draw_group.add(chankan);
		this.kan_last_draw_group.add(rinshan_kaihou);
		this.kan_last_draw_group.add(haitei_houtei);
		
	}
	
	updateText(language: number) {
		for(let button of this.buttons) {
			if(!button.shouldDisplay) {
				continue;
			}
			button.name = button.names[language];
			button.pronounciation = button.pronounciations[language];
			button.tooltip = button.tooltips[language];
		}
	}
	
	get(buttonName: String): Button {
		return this.buttons.find(button => button.defaultName === buttonName);
	}
	
	getOyaWind(): String {
		return this.oya_wind_group.sharedButtons.filter(button => button.isToggled == true)[0].defaultName.split("_")[2];
	}
	
	getSeatWind(): String {
		return this.seat_wind_group.sharedButtons.filter(button => button.isToggled == true)[0].defaultName.split("_")[1];
	}
	
	areMatchingWinds():boolean {
		return this.getOyaWind() === this.getSeatWind();
	}
	
	isToggled(buttonName: String): boolean {
		return this.get(buttonName).isToggled;
	}
	
	resetDefaultButtons(): void {
		this.seat_wind_group.toggleAllOffForce();
		this.oya_wind_group.toggleAllOffForce();
		this.riichi_group.toggleAllOffForce();
		this.kan_last_draw_group.toggleAllOffForce();
		this.tsumo_ron_group.toggleAllOffForce();
		
		if(this.oya_wind_group.sharedButtons.filter(button => button.defaultName.indexOf("Oya_Ton") != -1).length == 1) {
			this.oya_wind_group.sharedButtons.filter(button => button.defaultName.indexOf("Oya_Ton") != -1)[0].isToggled = true;
		}
		
		if(this.seat_wind_group.sharedButtons.filter(button => button.defaultName.indexOf("Wind_Nan") != -1).length == 1) {
			this.seat_wind_group.sharedButtons.filter(button => button.defaultName.indexOf("Wind_Nan") != -1)[0].isToggled = true;
		}
		if(this.tsumo_ron_group.sharedButtons.filter(button => button.defaultName.indexOf("Tsumo") != -1).length == 1) {
			this.tsumo_ron_group.sharedButtons.filter(button => button.defaultName.indexOf("Tsumo") != -1)[0].isToggled = true;
		}
	}
}