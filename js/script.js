var main = function () {
	'use strict';

	$('.tabs a:nth-child(1)').on('click' , function() {
		makeTabActive(1);
		return false;
	})

	$('.tabs a:nth-child(2)').on('click' , function() {
		makeTabActive(2);
		return false;
	})

	$('.tabs a:nth-child(3)').on('click' , function() {
		makeTabActive(3);
		return false;
	})

	var makeTabActive = function(tabNumber) {
		$('.tabs span').removeClass('active');
		$('.tabs a:nth-child(' + tabNumber + ') span').addClass('active');
		$('main .content').empty();
	};
};
$(document).ready(main);