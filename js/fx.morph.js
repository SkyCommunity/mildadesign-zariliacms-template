Fx.Morph = Fx.Styles.extend({
 
	start: function(className){
 
		var to = {};
 
		$each(document.styleSheets, function(style){
			var rules = style.rules || style.cssRules;
			$each(rules, function(rule){
				if (!rule.selectorText.test('\.' + className + '$')) return;
				Fx.CSS.Styles.each(function(style){
					if (!rule.style || !rule.style[style]) return;
					var ruleStyle = rule.style[style];
					to[style] = (style.test(/color/i) && ruleStyle.test(/^rgb/)) ? ruleStyle.rgbToHex() : ruleStyle;
				});
			});
		});
		return this.parent(to);
	}
 
});
 
Fx.CSS.Styles = ["backgroundColor", "backgroundPosition", "color", "width", "height", "left", "top", "bottom", "right", "fontSize", "letterSpacing", "lineHeight", "textIndent", "opacity"];
 
Fx.CSS.Styles.extend(Element.Styles.padding);
Fx.CSS.Styles.extend(Element.Styles.margin);

Element.Styles.border.each(function(border){
	['Width', 'Color'].each(function(property){
		Fx.CSS.Styles.push(border + property);
	});
});

var myMorph = new Fx.Morph('morpher', {wait: false});