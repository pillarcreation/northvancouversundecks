/* 
 *
*** * Plugins
 *
 */

/*
	Double Tap to Go Plugin
	AUTHOR: Osvaldas Valutis, www.osvaldas.info
	http://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly
*/
;(function(t,n,r,i){t.fn.doubleTapToGo=function(i){if(!("ontouchstart"in n)&&!n.navigator.msPointerEnabled&&!navigator.userAgent.toLowerCase().match(/windows phone os 7/i))return false;this.each(function(){var n=false;t(this).on("click",function(e){var r=t(this);if(r[0]!=n[0]){e.preventDefault();n=r}});t(r).on("click touchstart MSPointerDown",function(e){var r=true,i=t(e.target).parents();for(var s=0;s<i.length;s++)if(i[s]==n[0])r=false;if(r)n=false})});return this}})(jQuery,window,document);

$(function(){
	$( 'nav li:has(ul)' ).doubleTapToGo();
});

/* 
	breadcrumbs(separator): Renders breadcrumbs onto the page, based on the URL 
*/
(function($) {
	$.fn.breadcrumbs = function(options) {

		var settings = $.extend({
			separator: '/',
			makespace: '-',
			capitals: 'title'
		},options);

		var separator = ' '+settings.separator+' ';
		var makespace = settings.makespace;
		var capitals = settings.capitals;

		var breadcrumbs;
		var pathURL = window.location.pathname;
		if (makespace !== '') {
			pathURL = pathURL.replace(RegExp(makespace,'g'),' ');
		}
		switch (capitals) {
			case 'lower' :
				breadcrumbs = '<a href="/">home</a>';
				pathURL = pathURL.toLowerCase();
				break;
			case 'upper' :
				breadcrumbs = '<a href="/">HOME</a>';
				pathURL = pathURL.toUpperCase();
				break;
			default :
				breadcrumbs = '<a href="/">Home</a>';
				pathURL = pathURL.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
		var pathParam = window.location.search;
		var paramArray = pathParam.split('&');
		var pathArray = pathURL.split('/');
		var i=0;
		var url = '';
		var crumb;

		if (pathArray.length === 1) {
			return this.addClass('hide');
		}
		while (i<pathArray.length) {
			if (!i) {i++;}
			crumb = pathArray[i];
			url += '/'+crumb;

			switch (crumb) {
				case 'OrderRetrievev2.aspx' : crumb = 'cart';break;
				default : crumb = crumb;
			}
			if (i<pathArray.length-1) {
				breadcrumbs += separator+'<a href="'+url+'">'+crumb+'</a>';
			}else if(paramArray[0]==='?Step=13') {
				breadcrumbs += separator+'<a href="'+url+'">'+crumb+'</a>'+separator+'<span class="this_crumb">checkout</span>';
			}
			else {
				breadcrumbs += separator+'<span class="this_crumb">'+crumb+'</span>';
			}
			i++;
		}
		breadcrumbs = '<span>'+breadcrumbs+'</span>';
		return this.html(breadcrumbs);
	};
})(jQuery);

/* 
 *
*** * Scripts
 *
 */

$(function () {
	var Engine = {
		utils : {
			breadcrumbs : function(){
				$('#breadcrumbs').breadcrumbs();
			},
			secureRedirect : function() {
				var pagename = location.pathname.substring(1);
				if (pagename === "OrderRetrievev2.aspx") {
					// redirect to non-secure version of page
					var href;
					$("a").each(function (idx) {
						href = $(this).attr("href");
						if (href === undefined) {
							href = '';
						};
						if (href.indexOf("http") == -1 && href.indexOf("https") == -1) {
							href = siteURL + href;
							$(this).attr("href", href);
						}
					});
				}
			}
		},
		ui : {
			userForms : function(){
				// When user clicks on forgot password link:
				// Sign In form hides, Forgot password form shows
				$("#btn-password").on('click', function (e) {
					e.preventDefault();
					$("#form-login").fadeOut(function(){
						$("#form-password").fadeIn();
					});
				});
				// When user clicks on Nevermind link:
				// Sign In form shows, Forgot password form hides
				$("#btn-login").on('click', function (e) {
					e.preventDefault();
					$("#form-password").fadeOut(function(){
						$("#form-login").fadeIn();
					});
				});
				// Will show the Create Account form once clicked
				$("#needCreate").on('click', function (e) {
					e.preventDefault();
					$(".create-form").fadeIn();
				});
			}
		},
		fixes : {
			functionName : function(){
				// some code
			}
		},
		tweaks : {
			functionName : function(){
				// some code
			}
		}
	};

	Engine.utils.breadcrumbs();
	Engine.utils.secureRedirect();
	Engine.ui.userForms();
});