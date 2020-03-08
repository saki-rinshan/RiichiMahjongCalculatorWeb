
/*https://www.w3schools.com/js/js_cookies.asp*/
export class CookieManager {
	
	constructor() {
		//document.cookie = "language=0; expires=Thu, 18 Dec 2031 12:00:00 UTC";
		if(this.getCookie("language") === "") {
			this.setCookie("language", "0", 2000);
		}
	}
	
	setCookie(cname: String, cvalue: String, exdays: number): void {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
  
	getCookie(cname: String): String {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
}