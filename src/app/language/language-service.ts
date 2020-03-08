import { Injectable } from '@angular/core';
import { LanguageValue } from './languageEnum';
import { CookieManager } from './cookieManager';


import { ExtraInfoService } from '../extra-info/extra-info.service';

import { SetButtonList } from '../button/buttonList';
import { ButtonList } from '../button/buttonList';
import { FuList } from '../models/fuList';
import { YakuList } from '../models/yakuList'

import { Strings } from './strings';


@Injectable()
export class LanguageService {
	
	maxLanguages: number = 2;
	
	cookieManager: CookieManager;
	currentLanguage: number;
	
	extraInfoService: ExtraInfoService;
	
	setButtonList: SetButtonList;
	buttonList: ButtonList;
	yakuList: YakuList;
	fuList: FuList;
	
	strings: Strings;
	
	constructor() {
		
	}
	
	//the real constructor
	setExtraInfoService(extraInfoService: ExtraInfoService) {
		this.cookieManager = new CookieManager();
		this.currentLanguage = parseInt(this.cookieManager.getCookie("language") + "");
		
		this.extraInfoService = extraInfoService;
		
		
		this.buttonList = new ButtonList(this.currentLanguage);
		this.setButtonList = new SetButtonList(this.currentLanguage);
		this.yakuList = new YakuList(this.extraInfoService, this.currentLanguage);
		this.fuList = new FuList(this.extraInfoService, this.currentLanguage);
		
		this.fuList.setLanguageService(this);
		this.strings = new Strings(this);
	}
	
	updateText(language: number) {
		this.buttonList.updateText(language);
		this.setButtonList.updateText(language);
		this.yakuList.updateText(language);
		this.strings.updateText(language);
		this.fuList.updateText(language);
	}
	
	toggleLanguage(): void {
		this.currentLanguage = (this.currentLanguage + 1) % this.maxLanguages;
		this.cookieManager.setCookie("language", this.currentLanguage + "", 2000);
		
		this.updateText(this.currentLanguage);
	}
  
	getLanguageString():String {
		if(this.currentLanguage == 0) {
		  return "English";
		} else if(this.currentLanguage == 1) {
			return "日本語";
		}
	}
}

