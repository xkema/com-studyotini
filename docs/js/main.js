// site: studyotini.com

/*
==== DOM READY
========================================================= */
$(document).ready(function() {

	/*
	==== VARS
	========================================================= */

	// 30 fixed header offset and some padding for readibility, content screens seperated by contet-seperator class' top and bottom margins
	var _scrollOffset	= -60;
	// timeout for mail form warnings collapse
	var _messageTimeOutID;

	/*
	==== DOM READY
	========================================================= */
	__initializeWebsiteDOM();

	/*
	==== KEY CONTROLS
	========================================================= */
	$(document).keyup(function(e) {

		//
		//__debug(e.keyCode);

		switch(e.keyCode) {

			// esc
			case 27:

				// check staff members holder and toggle it if it is visible
				if($('#staff-members-content:visible').length || $('#gallery-images-holder:visible').length) {

					// if fade animation is not in progress
					if((!$(this).filter(':animated').length) && (!$('body:animated').length)) {

						if($('#gallery-images-holder:visible').length) {

							$('#gallery-images-holder').hide();

							// hide mask
							__toggleModalMaskOverlay();

						}
						else {

							// hide mask
							__toggleModalMaskOverlay();

							// hide staff holder it
							__toggleStaffMembersInfoHolder();

						}

					}

				}

				// eof case esc
				break;

			// d
			case 68:

				// go to friends content
				//window.location.hash = '#!/iletisim';

				// show notes
				__debug($('#notlar').text())

				// eof d
				break;
		}

	});

	/*
	==== MODAL CLOSE
	========================================================= */
	$('.modal-overlay-full, .staff-holder-close-button, .gallery-holder-close-button').click(function() {

		// if fade animation is not in progress
		if((!$(this).filter(':animated').length) && (!$('body:animated').length)) {

			if($('#gallery-images-holder:visible').length) {

				$('#gallery-images-holder').hide();

				// hide mask
				__toggleModalMaskOverlay();

			}
			else {

				// hide mask
				__toggleModalMaskOverlay();

				// hide staff holder it
				__toggleStaffMembersInfoHolder();

			}

		}

	});

	/*
	==== GALLERY IMAGES HOLDER
	========================================================= */
	$('.studio-images-holder > a').click(function() {

		// link clicked
		var _link = $(this);

		// return for same link clickes
		if($('.deleteImage').attr('src') == _link.attr('href')) {

			return false;
		}

		// create new image object
		var _img = new Image();

		// show spinner
		$('#gallery-image-spinner').show();

		// hide image before dom removal
		$('.deleteImage').css({'opacity':0});

		// hide studio image change links holder
		$('#small-gallery-images-positioner').css({'visibility':'hidden'});

		// hide close button
		$('.gallery-holder-close-button').hide();

		// show holder and hide old image
		$('#gallery-images-holder').show();
		//$('#gallery-images-holder').fadeIn(300);

		// show modal mask if hidden
		if($('.modal-overlay-full:hidden').length) {
			// show modal
			__toggleModalMaskOverlay();
		}

		// load handler
		$(_img).hide().on( 'load', function() {

			// get width/height ratio
			var _ratio = _img.height / _img.width;

			// resize image if image width is larger than screen width (height check is passed with assuming height is always less than windows height)
			if(_img.width >= $(window).width()) {

				_img.width	= $(window).width() * 0.8;
				_img.height	= _img.width * _ratio;

			}

			// append new image and delete olders and set new attributes
			$('.deleteImage').remove();
			$('#gallery-images-holder').prepend($(this)).css({'marginLeft':-0.5*(_img.width + 20), 'marginTop':-0.5*_img.height, 'width':'auto', 'height':'auto'});

			// (_img.width + 20) : +20 is for image border

			// re show image
			//$(this).fadeTo(100, 1);
			$(this).show();

			// hide spinner
			$('#gallery-image-spinner').hide();

			// re show close button
			//$('.gallery-holder-close-button').show();

			// reshow studio image change links holder
			$('#small-gallery-images-positioner').css({'visibility':'visible'});
			//$('#small-gallery-images-positioner').show();

		}).addClass('deleteImage');

		// set image src
		_img.src = _link.attr('href');

		// prevent default
		return false;

	});


	/*
	==== STAFF MEMBER LINK CONTROL
	========================================================= */
	$('#staff-members-holder > a').hover(

		function() {

			$(this).css({'opacity':0.8});

		},
		function() {

			$(this).css({'opacity':1});

		}

	);

	/*
	==== SEND MAIL
	========================================================= */
	
	/*
	$("#mail-form").submit(function(e) {

		// prevent default action
		e.preventDefault();

		// clear timeout
		if(typeof _messageTimeOutID == 'number') {
			window.clearTimeout(_messageTimeOutID);
		}

		// set loading text and spinner
		$("#contact-form-info-box").html("gönderiliyor..");
		$("#ajax-spinner").css("display","block");

		// post vars
		var _url = "js/phpmailerDirect.php";
		var _visitor_name = $("#visitor_name").val();
		var _visitor_mail = $("#visitor_mail").val();
		var _visitor_post = $("#visitor_post").val();

		// send via ajax
		$.post(
			_url,
			{
				post_name:_visitor_name,
				post_mail:_visitor_mail,
				post_post:_visitor_post
			},
			function(data) {
				// remove spinner
				$("#ajax-spinner").css("display","none");
				// delete old text
				$("#contact-form-info-box").html('');
				// new text
				$("#contact-form-info-box").html(data);

				// clear text after 4 second
				_messageTimeOutID = setTimeout(function() {
					// hide box
					$('#contact-form-info-box').hide(800, function() {$(this).html('').css('display', 'block')})
				}, 4000);
			}
		);
	});
	*/

	/*
	==== HASH CHANGE HISTORY
	========================================================= */

	// add history states w/bbq
	$('a[href*="#"]').on('click', function(e) {

	    // check current hash and target hash and call manual scroll for same link clicks
	    // 'cause haschange event is not dispatching for this situation
	    if(this.hash.split('-')[1] == window.location.hash.split('/')[1]) {

	    	// skip scroll tuning for staff members
			// an extremely hard-coded check
			if(this.hash != '#content-metin' && this.hash != '#content-apo' && this.hash != '#content-gokhan' && this.hash != '#content-aycan') {

		    	// if current scroll position is 100px more or less from target, re-scroll to target
		    	// 60px incerase is for scroll offset
		    	if(Math.abs($(window).scrollTop() - _scrollOffset - $(this.hash).offset().top) >= 50) {

				    // call smooth scroll
				   	$.smoothScroll(
				   		{
				   			scrollTarget	: this.hash,
				   			speed			: 260,
				   			easing			: 'easeInOutExpo',
				   			offset			: _scrollOffset
				   		}
				   	);

		    	}

			}

	    }


		// check hash availability
		if(this.hash) {

			// capture target ('about' tail of '#content-about', use this hash format for history links)
			var _target = '#!/' + this.hash.slice(1).split('-')[1];

			// push states to history
			$.bbq.pushState(_target);

		}

		// false return prevents default hash following (no need to e.preventDefault();)
		return false;

	});

	// hash change handler w/bbq
	$(window).bind('hashchange', function(e) {

		// check hash and rewrite it to match target content #id
		if(window.location.hash) {

			// read hash and set new target (seems as reverse operation in history state pushing block. difference is url box now rewrited as [blabla.com/#!/simplepageid])
			var _target	= window.location.hash.replace(/#!\//, '#content-');

		}
		else {

			// if current page is already at home directory set it to home again
			_target = '#content-tini';

		}

		// if user clicks a staff member do not call smooth scroll open footed staff members info holder
		// an extremely hard-coded check
		if(_target == '#content-metin' || _target == '#content-apo' || _target == '#content-gokhan' || _target == '#content-aycan') {

			// check staff members holder and toggle it if it is hidden
			if($('#staff-members-content:hidden').length) {

				// switch content
				__switchStaffHolderContent(_target);

				// show it
				__toggleStaffMembersInfoHolder()

				// show mask
				__toggleModalMaskOverlay();

			}
			else {

				// just switch content
				__switchStaffHolderContent(_target);

			}

		}
		else {

			// check gallery images holder and toggle it if it is visible
			// check staff members holder and toggle it if it is visible
			if($('#gallery-images-holder:visible').length) {

				$('#gallery-images-holder').hide();

				// hide mask
				__toggleModalMaskOverlay();

			}
			else if($('#staff-members-content:visible').length) {

				// hide it
				__toggleStaffMembersInfoHolder();

				// hide mask
				__toggleModalMaskOverlay();

				//

			}

			// if current scroll position is 100px more or less from target, re-scroll to target
	    	// minus 60px is equals to scrooll offset
	    	// right side == 0 check is for startup or page refresh blocks
			if(($(window).scrollTop() != $(_target).offset().top + _scrollOffset) && (($(window).scrollTop() - $(_target).offset().top) != 0)) {

				// call smooth scroll
				$.smoothScroll(
					{
						scrollTarget	: _target,
						speed			: 1000,
						easing			: 'easeInOutExpo',
						offset			: _scrollOffset,
						beforeScroll	: function() {

							//$('.content-screen').not(_target).css({'visibility':'hidden'});
							//$('.content-screen').not(_target).css({'opacity':0.25});

							// hide map holder for performance issues
							$('#google-map-holder').css({'visibility':'hidden'});

							// if modal is hidden
							if($('.modal-overlay-full:hidden').length) {
								// show
								__toggleModalMaskOverlay(120);
							}

						},
						afterScroll		: function() {

							//$('.content-screen').not(_target).css({'visibility':'visible'});
							//$('.content-screen').not(_target).css({'opacity':1});

							// reshow map holder
							$('#google-map-holder').css({'visibility':'visible'});

							if($('.modal-overlay-full:visible').length) {
								// hide
								__toggleModalMaskOverlay(120);
							}

						}
					}
				);

			}
		}

		// prevent default action
		//return false;

	});

	// startup hash control (latency defined for calculation time _scrollOffset skipping action)
	window.setTimeout(function() {

		$(window).trigger('hashchange');

	}, 500);

}); // eof document.ready

/*
==== WINDOW READY
========================================================= */
$(window).on( 'load', function() {

	// montage images container
	/*
	$('#friends-auto-montage-container').montage(
		{
			fillLastRow	: false,
			minw		: 120,
			minh		: 150,
			alternateHeight	: true,
			alternateHeightRange	: {
				min	: 115,
				max	: 220
			},
			margin	: 1
		}
	);
	*/

	// // tooltips control via jquery easy tooltip lib
	// $('*[title]').easyTooltip(
	// 	{
	// 		xOffset		: 18,
	// 		yOffset		: 16,
	// 		clickRemove	: true
	// 	}
	// );

	// // elastislide control
	// $('#carousel').elastislide(
	// 	{
	// 		imageW		: 180,
	// 		margin		: 0,
	// 		minItems	: 2
	// 	}
	// );

	// set image overlaps' fade to 0.18 programmatically
	$('.friends-animation-overlap').css({'opacity':0.25});

	// disable hash following for montage image parent links
	$('#friends-container > a').hover(

		function() {

			// animate ovelap
			//$(this).find('.friends-animation-overlap').stop(true, true).animate({'height':20, 'opacity':0.85}, 200).text($(this).find('.friends-animation-overlap').siblings('img').attr('title'));

		},
		function() {

			// animate ovelap
			//$(this).find('.friends-animation-overlap').stop(true, true).animate({'height':'100%', 'opacity':0.25}, 200).text('');


		}).click(
			function() {
				return false;
			}
		);

	// load iframe by setting source attribute

}); // eof window.load()

/*
==== ROUTINES
========================================================= */

/**
 *
 */
function __initializeWebsiteDOM() {

	// mouse down blocker for all images' dragging
	// $('img').mousedown(function(e) { e.preventDefault();} );

	// tooltips control via jquery easy tooltip lib
	$('*[title]').easyTooltip(
		{
			xOffset		: 18,
			yOffset		: 16,
			clickRemove	: true
		}
	);

	// elastislide control
	$('#carousel').elastislide(
		{
			imageW		: 180,
			margin		: 0,
			minItems	: 2
		}
	);


	/*
	// window resize slider controls
	$(window).resize(function(e) {

		var _w = $(window).width();

		if(_w > 500) {

		}
		else if(_w <= 500) {

		}

	});
	*/

}

/**
 * Toggle staff members info holder
 * @param callback
 */
function __toggleStaffMembersInfoHolder(callback) {

	// if holder is hidden
	if($('#staff-members-content:hidden').length) {

		// show it
		$('#staff-members-content').stop(true, true).show().animate({'top':$(document).scrollTop()}, 240, 'easeOutExpo' ,function() {

			// show shadow
			$(this).addClass('staff-members-holder-shadow');

			// callback
			if(typeof callback == 'function') {
				callback.call();
			}

		});

	}
	else {

		// hide shadow and container than
		$('#staff-members-content').removeClass('staff-members-holder-shadow').stop(true, true).animate({'top':-0.8*$(this).height()}, 240, 'easeOutExpo', function() {

			// hide staff members holder
			$(this).hide();

			// callback
			if(typeof callback == 'function') {
				callback.call();
			}


			// reset location hash to hakkimizda if target is not content screens
			// an extremely hard-coded check
			// last window width check is for blocking mobile screen content close header following
			var _h = window.location.hash;
			if((_h == '#!/metin' || _h == '#!/apo' || _h == '#!/gokhan' || _h == '#!/aycan') && ($(window).width() >= 500)) {

				window.location.hash = '#!/hakkimizda';

			}

		});

	}

}

/**
 * Change staff holder content
 * @param targetStaff member's container id (with hash, ie "#content-aycan")
 */
function __switchStaffHolderContent(targetStaff) {

	// hide all instances first
	$('.staff-member-instance').hide();


	// show target staff
	$(targetStaff).fadeIn(500);

}

/**
 *
 * Toggles modal mask overlay.
 *
 * @param duration Fade duration for modal toggling, default 320
 * @param callback
 */
function __toggleModalMaskOverlay(duration, callback) {

	// set default duration
	if(typeof duration == 'undefined') {
		duration = 320;
	}

	// if modal is hidden
	if($('.modal-overlay-full:hidden').length) {

		// show modal
		$('.modal-overlay-full').stop(true, true).fadeTo(duration, 0.8, function() {

			// callback
			if(typeof callback == 'function') {
				callback.call();
			}

		});

	}
	else {
		$('.modal-overlay-full').stop(true, true).fadeOut(duration, function() {

			// callback
			if(typeof callback == 'function') {
				callback.call();
			}

		});

	}

}

/*
==== Custom Debugger
========================================================= */

/**
 *
 */
function __debug(debugObject) {

	// use "TRACER" keyword for empty debug calls
	if(typeof debugObject == 'undefined') {

		_debugText = 'HELIX TRACER';

	}
	else {

		var _debugText = '';

		if(_debugText.length > 1) {
			for(var i in debugObject) {
				_debugText += i + '----' + debugObject[i] + '\r\n';
				_debugText += '---------------------------------------------\r\n';
				_debugText += '---------------------------------------------\r\n';
			}
		}
		else {
			_debugText = debugObject;
		}

	}

	if (window.console && window.console.log) {
		window.console.log(_debugText);
	 }
	 else {
	 	alert(_debugText);
	 }
}
