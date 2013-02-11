/*
 *  Color class by Stasel v0.5
 *	2013-02-11
 *	This class makes easy to use CSS colors from JavaScript
 *
 *	Usage (initialization): 
 *	var myColor = new Color(127, 255, 212);
 *	var myColor = new Color(127, 255, 212, 0.5); //with opacity. (default=1)
 *	var myColor = new Color("rgb(127, 255, 212)");
 *	var myColor = new Color("rgba(127, 255, 212, 0.5)");
 *	var myColor = new Color("#7FFFD4");
 *	var myColor = new Color("Aquamarine");
 * 
 *	String outputs:
 *	myColor.hex();  	//#7FFFD4
 *	myColor.rgb();  	//rgb(127,255,212)
 *	myColor.rgba(); 	//rgba(127,255,212,0.5)
 *	myColor.toString(); //rgba format
 */
var Color = function(red,green,blue,alpha) {

	//rgb(000,000,000)
	Color.rgbRegex = /^\s*rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)\s*$/i;
	//rgba(000,000,000,0.000)
	Color.rgbaRegex = /^\s*rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*((1|0\.\d+))\s*\)\s*$/i;
	//#xxxxxx
	Color.hexRegex = /^\s*#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})\s*$/i;
	//#xxx
	Color.hex3Regex = /^\s*#([0-9A-F])([0-9A-F])([0-9A-F])\s*$/i;
	
	// List of X11 known color names and their hex values
	// Source: http://en.wikipedia.org/wiki/X11_color_names
	Color.knownColors = { 
						"AliceBlue"     	:       "#F0F8FF",
						"AntiqueWhite"  	:       "#FAEBD7",
						"Aqua"  			:       "#00FFFF",
						"Aquamarine"    	:       "#7FFFD4",
						"Azure" 			:       "#F0FFFF",
						"Beige" 			:       "#F5F5DC",
						"Bisque"        	:       "#FFE4C4",
						"Black" 			:       "#000000",
						"BlanchedAlmond"    :       "#FFEBCD",
						"Blue"  			:       "#0000FF",
						"BlueViolet"    	:       "#8A2BE2",
						"Brown" 			:       "#A52A2A",
						"Burlywood"     	:       "#DEB887",
						"CadetBlue"     	:       "#5F9EA0",
						"Chartreuse"    	:       "#7FFF00",
						"Chocolate"     	:       "#D2691E",
						"Coral" 			:       "#FF7F50",
						"Cornflower"    	:       "#6495ED",
						"Cornsilk"      	:       "#FFF8DC",
						"Crimson"       	:       "#DC143C",
						"Cyan"  			:       "#00FFFF",
						"DarkBlue"      	:       "#00008B",
						"DarkCyan"     		:       "#008B8B",
						"DarkGoldenrod" 	:       "#B8860B",
						"DarkGray"      	:       "#A9A9A9",
						"DarkGreen"     	:       "#006400",
						"DarkKhaki"     	:       "#BDB76B",
						"DarkMagenta"   	:       "#8B008B",
						"DarkOliveGreen"    :       "#556B2F",
						"DarkOrange"    	:       "#FF8C00",
						"DarkOrchid"    	:       "#9932CC",
						"DarkRed"       	:       "#8B0000",
						"DarkSalmon"    	:       "#E9967A",
						"DarkSeaGreen"  	:       "#8FBC8F",
						"DarkSlateBlue" 	:       "#483D8B",
						"DarkSlateGray" 	:       "#2F4F4F",
						"DarkTurquoise" 	:       "#00CED1",
						"DarkViolet"    	:       "#9400D3",
						"DeepPink"      	:       "#FF1493",
						"DeepSkyBlue"   	:       "#00BFFF",
						"DimGray"       	:       "#696969",
						"DodgerBlue"    	:       "#1E90FF",
						"Firebrick"     	:       "#B22222",
						"FloralWhite"   	:       "#FFFAF0",
						"ForestGreen"   	:       "#228B22",
						"Fuchsia"       	:       "#FF00FF",
						"Gainsboro"     	:       "#DCDCDC",
						"GhostWhite"    	:       "#F8F8FF",
						"Gold"  			:       "#FFD700",
						"Goldenrod"     	:       "#DAA520",
						"Gray"     			:       "#808080",
						"Green"    			:       "#008000",
						"GreenYellow"   	:       "#ADFF2F",
						"Honeydew"      	:       "#F0FFF0",
						"HotPink"       	:       "#FF69B4",
						"IndianRed"     	:       "#CD5C5C",
						"Indigo"        	:       "#4B0082",
						"Ivory" 			:       "#FFFFF0",
						"Khaki" 			:       "#F0E68C",
						"Lavender"      	:       "#E6E6FA",
						"LavenderBlush" 	:       "#FFF0F5",
						"LawnGreen"     	:       "#7CFC00",
						"LemonChiffon"  	:       "#FFFACD",
						"LightBlue"     	:       "#ADD8E6",
						"LightCoral"    	:       "#F08080",
						"LightCyan"     	:       "#E0FFFF",
						"LightGoldenrod"    :       "#FAFAD2",
						"LightGray"     	:       "#D3D3D3",
						"LightGreen"    	:       "#90EE90",
						"LightPink"     	:       "#FFB6C1",
						"LightSalmon"   	:       "#FFA07A",
						"LightSeaGreen" 	:       "#20B2AA",
						"LightSkyBlue"  	:       "#87CEFA",
						"LightSlateGray"    :       "#778899",
						"LightSteelBlue"    :       "#B0C4DE",
						"LightYellow"   	:       "#FFFFE0",
						"Lime"     			:       "#00FF00",
						"LimeGreen"     	:       "#32CD32",
						"Linen" 			:       "#FAF0E6",
						"Magenta"       	:       "#FF00FF",
						"Maroon"   			:       "#800000",
						"MediumAquamarine"  :       "#66CDAA",
						"MediumBlue"    	:       "#0000CD",
						"MediumOrchid"  	:       "#BA55D3",
						"MediumPurple"  	:       "#9370DB",
						"MediumSeaGreen"    :       "#3CB371",
						"MediumSlateBlue"   :       "#7B68EE",
						"MediumSpringGreen" :       "#00FA9A",
						"MediumTurquoise"   :       "#48D1CC",
						"MediumVioletRed"   :       "#C71585",
						"MidnightBlue" 		:       "#191970",
						"MintCream"    		:       "#F5FFFA",
						"MistyRose"    		:       "#FFE4E1",
						"Moccasin"      	:       "#FFE4B5",
						"NavajoWhite"   	:       "#FFDEAD",
						"Navy"  			:       "#000080",
						"OldLace"       	:       "#FDF5E6",
						"Olive" 			:       "#808000",
						"OliveDrab"     	:       "#6B8E23",
						"Orange"        	:       "#FFA500",
						"OrangeRed"     	:       "#FF4500",
						"Orchid"        	:       "#DA70D6",
						"PaleGoldenrod" 	:       "#EEE8AA",
						"PaleGreen"     	:       "#98FB98",
						"PaleTurquoise" 	:       "#AFEEEE",
						"PaleVioletRed" 	:       "#DB7093",
						"PapayaWhip"    	:       "#FFEFD5",
						"PeachPuff"     	:       "#FFDAB9",
						"Peru"  			:       "#CD853F",
						"Pink"  			:       "#FFC0CB",
						"Plum"  			:       "#DDA0DD",
						"PowderBlue"    	:       "#B0E0E6",
						"Purple"   			:       "#800080",
						"Red"   			:       "#FF0000",
						"RosyBrown"     	:       "#BC8F8F",
						"RoyalBlue"     	:       "#4169E1",
						"SaddleBrown"   	:       "#8B4513",
						"Salmon"        	:       "#FA8072",
						"SandyBrown"    	:       "#F4A460",
						"SeaGreen"      	:       "#2E8B57",
						"Seashell"      	:       "#FFF5EE",
						"Sienna"        	:       "#A0522D",
						"Silver"   			:       "#C0C0C0",
						"SkyBlue"       	:       "#87CEEB",
						"SlateBlue"     	:       "#6A5ACD",
						"SlateGray"     	:       "#708090",
						"Snow" 				:       "#FFFAFA",
						"SpringGreen"   	:       "#00FF7F",
						"SteelBlue"     	:       "#4682B4",
						"Tan"   			:       "#D2B48C",
						"Teal"  			:       "#008080",
						"Thistle"       	:       "#D8BFD8",
						"Tomato"        	:       "#FF6347",
						"Turquoise"     	:       "#40E0D0",
						"Violet"        	:       "#EE82EE",
						"Wheat" 			:       "#F5DEB3",
						"White" 			:       "#FFFFFF",
						"WhiteSmoke"    	:       "#F5F5F5",
						"Yellow"        	:       "#FFFF00",
						"YellowGreen"   	:       "#9ACD32"
					};
					
	/*****************************************
		Hex string -> Color object
	******************************************/
	Color.parseHex = function(hex) {
		var regexTester = Color.hexRegex.exec(hex);
		if(regexTester)
			return new Color(parseInt(regexTester[1],16), parseInt(regexTester[2],16), parseInt(regexTester[3],16));
		
		var regexTester = Color.hex3Regex.exec(hex);
		if(regexTester)
			return new Color(parseInt(regexTester[1]+regexTester[1],16), parseInt(regexTester[2]+regexTester[2],16), parseInt(regexTester[3]+regexTester[3],16));
		
		return null;
	};
	
	/*****************************************
		rgb string -> Color object
	******************************************/
	Color.parseRgb = function(rgb){
		var regexTester = Color.rgbRegex.exec(rgb);
		if(regexTester)
			return new Color(parseInt(regexTester[1]), parseInt(regexTester[2]), parseInt(regexTester[3]))
	};
	
	/*****************************************
		rgba string -> Color object
	******************************************/
	Color.parseRgba = function(rgba){
		var regexTester = Color.rgbaRegex.exec(rgba);
		if(regexTester)
			return new Color(parseInt(regexTester[1]), parseInt(regexTester[2]), parseInt(regexTester[3]), parseInt(regexTester[4]))
	};
	
	/*****************************************
		known color name -> Color object
	******************************************/
	Color.parseKnownColor = function(colorName) {
		if(!colorName)
			return null;
			
		colorName = colorName.toString().replace(" ","");
		for(var color in Color.knownColors)
		{
			if(colorName.toLowerCase() == color.toLowerCase()) {
				return Color.parseHex(Color.knownColors[color]);
			}
		}
		
		return null;
	};
	
	
	/*****************************************************************
		constructor logic.
		First, it tries to find 3 rgb values or 4 rgba values.
		If less then 3 parametes are defined, the constructor will try 
		to parse the first parameter to a valid color
	******************************************************************/
	if(	isNumeric(red)	&& red >= 0 && red <= 255 && 
		isNumeric(green)&& green >= 0 && green <= 255 && 
		isNumeric(blue)	&& blue >= 0 && blue <= 255)
	{
		this.r = parseInt(red);
		this.g = parseInt(green);
		this.b = parseInt(blue);
		
		if(isNumeric(alpha) && alpha >= 0 && alpha <= 1)
			this.a = parseInt(alpha);
		else
			this.a = 1;
	}
	else if(red)
	{
		//Try to parse the first parameter (red) from any kind of known html color
		//in the following order: hex string, rgb string, rgba string, known color name
		//If we could not parse any color, the constructor will return a transparent black color: rgba(0,0,0,0)
		var newColor = Color.parseHex(red) || Color.parseRgb(red) || Color.parseRgba(red) || Color.parseKnownColor(red) || new Color();
		this.r = newColor.r;
		this.g = newColor.g;
		this.b = newColor.b;
		this.a = newColor.a;
	}
	else
	{
		//no parameters specefied will return a transparent black color: rgba(0,0,0,0)
		this.r = this.g = this.b = this.a = 0;
	}
	
	
	/*****************************************
		Color object -> hex string
	******************************************/
	this.hex = function() {
		var hexR = this.r.toString(16);
		var hexG = this.g.toString(16);
		var hexB = this.b.toString(16);
		
		hexR = hexR.length==1 ? "0"+hexR : hexR;
		hexG = hexG.length==1 ? "0"+hexG : hexG;
		hexB = hexB.length==1 ? "0"+hexB : hexB;
		
		return "#" + hexR + hexG + hexB;
	};
	
	/*****************************************
		Color object -> rgb string
	******************************************/
	this.rgb = function() {
		return "rgb("+this.r+","+this.g+","+this.b+")";
	};
	
	/*****************************************
		Color object -> rgba string
	******************************************/
	this.rgba = function() {
		return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
	};
	
	/*****************************************
		Color toString function.
		By default converts to rgba format.
	******************************************/
	this.toString = this.rgba;
};


//returns true if expr is a valid base 10 number
function isNumeric(expr)
{
	return !isNaN(parseFloat(expr)) && isFinite(expr);
}