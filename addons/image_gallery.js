$('img[alt*="g%"]').each(function(k,v){
	var alt = $(this).attr("alt");
	x = alt.search("g%");
	v = alt.charAt(x+2)
	$(this).wrap("<div class='image_gallery x"+v+"' />");
	$(this).before("<div class='overlay'><span class='icon-zoom-in'></span></div>");
	if(k === 0) {
		$(this).parent().before("<div class='fix' />");
	}
});

$(function(){
    $.fn.reverse = [].reverse;
    var target = '.image_gallery', // the class of the elements to group
        invert = ':not(' + target + ')', // we create the invert to find the breakpoints
        wrap = '<div class="img_gallery">', // what to wrap with
        breakpoints = $('p > *'+invert); // find the breakpoints in our container
   breakpoints.each(function(){
        $(this).nextUntil(invert).wrapAll( wrap ); // get the matching elements efter this breakpoint and wrap them
    });
    breakpoints.first().prevUntil(invert).reverse().wrapAll( wrap ); // wrap the elements before the first breakpoint
});

function setHeight() {
	$(".image_gallery").each(function() {
		w = $(this).width();
		sh = w * 9/14;
		$(this).height(sh);
		$(this).find(".overlay").width(w);
		$(this).children().height(sh);
	});
}

$(".overlay").click(function(){
	var url = $(this).next().attr("src");
	var ghost = $(".site-wrapper");
	var iv = $("<div id='image_viewer'/>");
	var x = $("<div id='close_image_viewer' class='icon-close'></div>");
	var ph = $("<div class='image_placeholder'/>");
	var img = $('<img>').attr('src', url);
	
	if($('#image_viewer').length == 0) {
		iv.prependTo(ghost);
		x.appendTo(iv);
		ph.appendTo(iv);
		img.appendTo(ph);
		
		iv.hide();
		iv.fadeIn('slow');
		x.on("click",function(){
			iv.fadeOut('slow', function(){
				$(this).remove();
			});
		});
	}
});

$(window).load(function(){
	setHeight();
	$(window).resize(function(){
		setHeight();
	});
});