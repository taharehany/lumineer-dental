/*jshint jquery:true */

$(document).ready(function ($) {
	"use strict";

	//wow
	new WOW().init();
	/* global google: false */
	/*jshint -W018 */

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
	// Needed variables
	var $container = $('.iso-call');
	var $filter = $('.filter');

	$container.imagesLoaded(function () {
		$container.trigger('resize');
		$container.isotope({
			filter: '*',
			layoutMode: 'masonry',
			animationOptions: {
				duration: 750,
				easing: 'linear'
			}
		});

		setTimeout(Resize, 1500);
	});

	winDow.on('resize', function () {
		var selector = $filter.find('a.active').attr('data-filter');

		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});

		return false;
	});

	// Isotope Filter 
	$filter.find('a').on('click', function () {
		var selector = $(this).attr('data-filter');

		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});

		return false;
	});


	var filterItemA = $('.filter li a');

	filterItemA.on('click', function () {
		var $this = $(this);
		if (!$this.hasClass('active')) {
			filterItemA.removeClass('active');
			$this.addClass('active');
		}
	});

	/*-------------------------------------------------*/
	/* =  OWL carousell
	/*-------------------------------------------------*/

	$(".before_after_carousel").owlCarousel({
		loop: true,
		margin: 30,
		items: 2,
		dots: true,
		dotsEach: 3,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 2
			},
			1000: {
				items: 2,
			}
		}
	});

	/*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

	var slidertestimonial = $('.bxslider');

	slidertestimonial.bxSlider();

	/*-------------------------------------------------*/
	/* =  count increment
	/*-------------------------------------------------*/

	$('.statistic-post').appear(function () {
		$('.timer').countTo({
			speed: 4000,
			refreshInterval: 60,
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			}
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function (e) {
		e.preventDefault();

		var $this = $(this);

		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function (data) {

				if (data.info !== 'error') {
					$this.parents('form').find('input[type=text],textarea,select').filter(':visible').val('');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});

	/*-------------------------------------------------*/
	/* =  scroll between sections
	/*-------------------------------------------------*/

	$('.navigate-section > li > a[href*=#]').on('click', function (event) {
		event.preventDefault();
		var offset = 66;
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top - offset
		}, 500, 'linear');
	});

	/*-------------------------------------------------*/
	/* =  add active state in menu for active section
	/*-------------------------------------------------*/

	$('section').each(function () {
		$(this).waypoint(function (direction) {
			if (direction === 'down') {
				var containerID = $(this).attr('id');
				/* update navigation */
				$('.navigate-section > li > a').removeClass('active');
				$('.navigate-section > li > a[href*=#' + containerID + ']').addClass('active');
			}
		}, {
			offset: '90px'
		});

		$(this).waypoint(function (direction) {
			if (direction === 'up') {
				var containerID = $(this).attr('id');
				/* update navigation */
				$('.navigate-section > li > a').removeClass('active');
				$('.navigate-section > li > a[href*=#' + containerID + ']').addClass('active');
			}
		}, {
			offset: function () {
				return -$(this).height() - 90;
			}
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

	(function () {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 130;
		document.querySelector('header, a.go-top');

		function init() {
			window.addEventListener('scroll', function () {
				if (!didScroll) {
					didScroll = true;
					setTimeout(scrollPage, 100);
				}
			}, false);
		}

		function scrollPage() {
			var sy = scrollY();
			if (sy >= changeHeaderOn) {
				$('header').addClass('active');
				$('a.go-top').addClass('active');
			} else {
				$('header').removeClass('active');
				$('a.go-top').removeClass('active');
			}
			didScroll = false;
		}

		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}

		init();

	})();

});

function Resize() {
	$(window).trigger('resize');
}