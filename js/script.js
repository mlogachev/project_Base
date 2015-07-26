var main = function () {
	'use strict';

	var toDos = [
		"Shopping",
		"Update some tasks",
		"Prepare for lecture on Monday",
		"Answer letters from LinkedIn",
		"Take Grace for a walk",
		"Finish writing book"
	];

	$('.tabs a span').toArray().forEach(function(element) {
		$(element).on('click' , function() {
			var $element = $(element);

			$('.tabs a span').removeClass('active');
			$(element).addClass('active');
			$('main .content').empty();

			if ($element.parent().is(':nth-child(1)')) {
				var $content = $('<ul>');
				toDos.forEach(function (listElement) {
					$content.append($('<li>').text(listElement));
				});

				$('main .content').append($content);

			} else if ($element.parent().is(':nth-child(2)')) {
				var $content = $('<ul>');
				for (var i = toDos.length - 1; i >= 0; i--) {
					$content.append($('<li>').text(toDos[i]));
				};

				$('main .content').append($content);

			} else if ($element.parent().is(':nth-child(3)')) {
				var $content = $('<input id="input"></input>');
				var $button = $('<div class="btn">ADD</div>');
				$('main .content').append($content).append($button);
				$button.on('click', function() {
					if ($('#input').val()) {
						var text = $('#input').val();
						$('#input').val('');
						toDos.unshift(text);
					}
				});
			};

			return false;
		});
	});
};
$(document).ready(main);