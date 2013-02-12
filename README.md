JavaScript Color Object
========
Your library to manipulate HTML colors with JavaScript

Creating new object
-------

By specifying red, blue and green

    var myColor = new Color(127, 255, 212);
    
By specifying red, blue, green and opacity
    
    var myColor = new Color(127, 255, 212, 0.5);
    
By specifying HTML rgb string

    var myColor = new Color("rgb(127, 255, 212)");
    
    
By specifying HTML rgba string
    
    var myColor = new Color("rgba(127, 255, 212, 0.5)");
    
    
By specifying hex string
    
    var myColor = new Color("#7FFFD4");
    
By specifying known X11 color ([Full list](http://en.wikipedia.org/wiki/X11_color_names))
    
    var myColor = new Color("Aquamarine");

Creating from DOM object color

    var myColor = new Color(document.body.style.backgroundColor);

Output formats
------

 *  String outputs:
 *	`myColor.hex();` => #7FFFD4
 *	`myColor.rgb();` => rgb(127,255,212)
 *	`myColor.rgba();` => rgba(127,255,212,0.5)
 *	`myColor.toString();` => rgba(127,255,212,0.5)
