
//import io from "socket.io-client";
import { LanguageService } from '../language/language-service';

export class StatisticsService {
	
	private url: String = 'https://saki.rinshan.com';
	
	constructor(public languageService: LanguageService) {
		//this.socket = io.connect(this.url);
	}
	
	
	emitCalculatorTriggered(): void {
		//this.socket.emit('a', this.languageService.currentLanguage);
	}
}