define(["jquery", "underscore", "enquire", "scrollMagic"],
function ($, _, enquire, ScrollMagic) {
	$(document).ready(function() {
	    'use strict';
	    var subMenuModule = {
	        init: function() {

				enquire.register('screen and (max-width: 480px)', {
					//match: _.bind(this.resultsBindMobile, this) 
				});

				enquire.register('screen and (min-width: 481px)', {
					match: _.bind(this.subMenuEvent, this) 
				});
			},

			variables : {
				topHeaderSelector: ".topheader",
				heroSectionBackgroundSelector: ".background",
				menuAnchorSelector: "#menuAnchor"
			},

			subMenuEvent: function() {
				this.pinFiltersBar();
				this.smothscrollToggleActive();
			},

			pinFiltersBar: function() {
				var controller = new ScrollMagic.Controller();
				var scene = new ScrollMagic.Scene({
					triggerElement: this.variables.menuAnchorSelector,
					triggerHook:0,
					offset:-90
				})
					.setPin(this.variables.menuAnchorSelector)
					.setClassToggle(".nav", "no-shadow")
					.addTo(controller);
			},

			smothscrollToggleActive: function() {
				$('a[href^="#"]').click(function(event) {
						var id = $(this).attr("href");

						var target = $(id).offset().top;
						$('html, body').animate({scrollTop:target}, 500);
						event.preventDefault();

					});

				function getTargetTop(elem){
				 	var id = elem.attr("href");
				 	var offset = 60;
				 	return $(id).offset().top - offset;
				 }


				$(window).scroll(function(e){
			 		isSelected($(window).scrollTop())
				});

				var sections = $('a[href^="#"]');

				function isSelected(scrolledTo){
				   
					var threshold = 100;
					var i;

					for (i = 0; i < sections.length; i++) {
						var section = $(sections[i]);
						var target = getTargetTop(section);
					   
						if (scrolledTo > target - threshold && scrolledTo < target + threshold) {
							sections.removeClass("active");
							section.addClass("active");
						}

					};
				}
			}
	    }
	    subMenuModule.init();
	});
});