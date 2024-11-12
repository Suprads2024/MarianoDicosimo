(function($) {
	
	"use strict";

	// 1. revolution slider
function revolutionSliderActiver () {
	if ($('.rev_slider_wrapper #rev_slider_one').length) {
		jQuery("#rev_slider_one").revolution({
			sliderType:"standard",
			sliderLayout:"auto",
			dottedOverlay:"yes",
			delay:5000,
			navigation: {
				arrows:{enable:true,
						left: {
                        h_align: "left",
                        v_align: "center",
                        h_offset: 60,
                        v_offset: 0
                    },
                    right: {
                        h_align: "right",
                        v_align: "center",
                        h_offset: 60,
                        v_offset: 0
                    }

				} 
			}, 
            gridwidth: [1200, 940, 720, 480],
            gridheight: [800, 700, 600, 500],
            lazyType: "none",
            parallax: {
                type: "mouse",
                origo: "slidercenter",
                speed: 2000,
                levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50],
            },
            shadow: 0,
            spinner: "off",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            hideThumbsOnMobile: "off",
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            debugMode: false,
            fallbacks: {
                simplifyAll: "off",
                nextSlideOnWindowFocus: "off",
                disableFocusListener: false,
            }
		});
	};
}

	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}

	function headerStyle() {
		if($('.main-menu').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-menu');
			var scrollLink = $('.scroll-to-top');
			if (windowpos >= 250) {
				siteHeader.addClass('fixed-menu');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-menu');
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();
	
	//Submenu Dropdown Toggle
	if($('.main-menu .navbar-nav li.dropdown ul').length){
		$('.main-menu .navbar-nav li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-menu .navbar-nav li.dropdown .dropdown-btn').click(function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.main-menu .navbar-nav li.dropdown > a').click(function(e) {
			e.preventDefault();
		});
	}
	

	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	

	//Single Item Carousel
	if ($('.single-item-carousel').length) {
		$('.single-item-carousel').owlCarousel({
			loop: true,
		    margin: 30,
		    nav: false,
	        dots: false,
		    autoWidth: false,
		    autoplay:true,
		    autoplayTimeout:3000,
		    autoplayHoverPause:true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});    		
	}	
				
	//six Item Carousel
	if ($('.six-item-carousel').length) {
		$('.six-item-carousel').owlCarousel({
			loop:true,
			margin:10,
			nav:true,
			smartSpeed: 700,
			autoplay: 4000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				767:{
					items:3
				},
				900:{
					items:4
				},
				1024:{
					items:5
				},
				1200:{
					items:6
				}
			}
		});    		
	}
	

	//Jquery Knob animation 
	if($('.dial').length){
		$('.dial').appear(function(){
          var elm = $(this);
          var color = elm.attr('data-fgColor');  
          var perc = elm.attr('value');  
 
          elm.knob({ 
               'value': 0, 
                'min':0,
                'max':100,
                'skin':'tron',
                'readOnly':true,
                'thickness':0.10,
				'dynamicDraw': true,
				'displayInput':false
          });

          $({value: 0}).animate({ value: perc }, {
			  duration: 2000,
              easing: 'swing',
              progress: function () { elm.val(Math.ceil(this.value)).trigger('change');
              }
          });

          //circular progress bar color
          $(this).append(function() {
             // elm.parent().parent().find('.circular-bar-content').css('color',color);
              //elm.parent().parent().find('.circular-bar-content .txt').text(perc);
          });

          },{accY: 20});
    }


	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.masonry-gallery').length){

			var winDow = $(window);
			// Needed variables
			var $container=$('.masonry-gallery .items-container');
			var $filter=$('.filter-btns');

			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : 0
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});


			// Isotope Filter
			$filter.find('li').click(function(){
				var selector = $(this).attr('data-filter');

				try {
					$container.isotope({
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {

				}
				return false;
			});


			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});


			var filterItemA	= $('.filter-btns li');

			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}

	enableMasonry();
		

	function lightboximage() {
		//LightBox / Fancybox
		if($('.lightbox-image').length) {
			$('.lightbox-image').fancybox({
				openEffect  : 'fade',
				closeEffect : 'fade',
				helpers : {
					media : {}
				}
			});
		}

	}
	lightboximage();
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true
				},
				phone: {
					required: true,
				},
				subject: {
					required: true,
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").click(function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1000);
	
		});
	}
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}


// instance of fuction while Document ready event	
jQuery(document).ready(function () {
	(function ($) {
		revolutionSliderActiver();
	})(jQuery);
});

/*
============================================================
   When document is Scrollig, do
============================================================
*/
	
	$(window).scroll(function() {
		headerStyle();
	});
	
/*
============================================================
   When document is loaded, do
============================================================
*/
	
	$(window).load(function() {
		handlePreloader();
		lightboximage();
		enableMasonry();
	});	

})(window.jQuery);