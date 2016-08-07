$('img[alt*="g%"]').each(function(k,v){
	var alt = $(this).attr("alt");
	x = alt.search("g%");
	v = alt.charAt(x+2)
	$(this).wrap("<div class='image x"+v+"' />");
	$(this).before("<div class='overlay'><span class='icon-zoom-in'></span></div>");
	if(k === 0) {
		$(this).parent().before("<div class='fix' />");
	}
});

$(function(){
    $.fn.reverse = [].reverse;
    var target = '.image', // the class of the elements to group
        invert = ':not(' + target + ')', // we create the invert to find the breakpoints
        wrap = '<div class="img_gallery">', // what to wrap with
        breakpoints = $('p > *'+invert); // find the breakpoints in our container
   breakpoints.each(function(){
        $(this).nextUntil(invert).wrapAll( wrap ); // get the matching elements efter this breakpoint and wrap them
    });
    breakpoints.first().prevUntil(invert).reverse().wrapAll( wrap ); // wrap the elements before the first breakpoint
});

function setHeight() {
	$(".image").each(function() {
		w = $(this).width();
		sh = w * 9/14;
		$(this).height(sh);
		$(this).find(".overlay").width(w);
		$(this).children().height(sh);
	});
}

$(".overlay").click(function(){
	var i = $(this).next().attr("src");
	console.log(i);
});

$(window).load(function(){
	setHeight();
	$(window).resize(function(){
		setHeight();
	});
});