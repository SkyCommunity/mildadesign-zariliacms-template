var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
		this.cookies = new Array(); // taked and modified from http://www.quirksmode.org/js/cookies.html
		this.cookies.create = function(name,value,days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime()+(days*24*60*60*1000));
				var expires = "; expires="+date.toGMTString();
			}
			else var expires = "";
			document.cookie = name+"="+value+expires+"; path=/";
		}
		this.cookies.read = function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		}
		this.cookies.erase = function (name) {
			createCookie(name,"",-1);
		}
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	],
	browserIsBetter: function (min_version) {
		return this.version > (min_version-1)
	},
	isThatBrowser: function(name) {
		return this.browser==name;
	},
	isThatSupported: function() {
		if (!arguments) return true;
		var rez = true;
		for(i=0;i<arguments.length;i++) {
			switch (arguments[i]) {
				case 'png-tranparency':
					if (this.isThatBrowser('Explorer')) 	rez = rez && this.browserIsBetter(7);
					if (this.isThatBrowser('Konqueror')) rez = rez && this.browserIsBetter(3);
					if (this.isThatBrowser('Netscape')) rez = rez && this.browserIsBetter(3);
					if (this.isThatBrowser('OmniWeb')) rez = rez && this.browserIsBetter(3);
					if (this.isThatBrowser('Opera')) rez = rez && this.browserIsBetter(6);
					if (this.isThatBrowser('iCab')) rez = rez && this.browserIsBetter(2);
				break;
			}
		}
		return rez;
	},
	whenBrowserIsUnsupported: function (url) {  // params url, properies
		if (this.cookies.read('zcSmartBrowserCheck')=='1')  return;
		var rez = true;
		for(var i=1;i<arguments.length;i++) {
			rez = rez && this.isThatSupported(arguments[i]);
		}
		this.cookies.create('zcSmartBrowserCheck', '1', 10);
		if (!rez) window.location=url;
	},
	applyStyleForSomeIDs: function (stylefunc, prefix, sufix) {
		var id = prefix + this.browser.ucFirst() + sufix;
		var obj = document.getElementById(id);
		if (!obj) return;
		stylefunc(obj);
	}
};

//----- (c)GPL, apv
String.prototype.ucFirst = function () {
   return this.substr(0,1).toUpperCase() + this.substr(1,this.length);
}

function zcBrowserStyle(obj) {
	obj.style.fontStyle += 'italic';
}

BrowserDetect.init();
BrowserDetect.whenBrowserIsUnsupported('http://skycommunity.lt/index.php?page_type=static&id=10', 'png-tranparency');
BrowserDetect.applyStyleForSomeIDs(function (obj) {obj.style.fontStyle += 'italic';}, 'browser');


/*var list = $$('li.menuitem a');
//alert(list);
list.each(function(element) {
 
	var fx = new Fx.Styles(element, {duration:150, wait:false});
	var fx2 = new Fx.Styles(element, {duration:21, wait:false});
 
	element.addEvent('mouseenter', function(){
		fx2.start({
			'background-color': '#FFCC66',
			color: '#FFF'
		});
	});
 
	element.addEvent('mouseleave', function(){
		fx.start({
			'background-color': '#1AA9E6',
			'color': '#FFF'
		});
	});
 
});*/

//f

//alert(document.getElementById('hedermovie'));

/*document.getElementById('heder').addEvent('domready', function() {
	// HERE IS WHAT YOU READ IN JS CODE
	document.getElementById('heder').style.visibility = 'visible';
});*/

