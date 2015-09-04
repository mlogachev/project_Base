var main = function (toDos, toDosObjects) {
	'use strict';



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

				var $content = $('<ul>')
				toDosObjects.forEach(function (toDoObject) {
					var $toAppend = $('<li>');
					var $tag = $('<h3>'+toDoObject.tag.toUpperCase()+'</h3>');
					var $taskList = $('<ul>');
					toDoObject.description.forEach(function (task) {
						$taskList.append($('<li>').text(task));
					})

					$content.append($toAppend).append($tag).append($taskList);

				});

				$('main .content').append($content);

			} else if ($element.parent().is(':nth-child(4)')) {
				var $task = $('<input id="input"></input>');
				var $tags = $('<input id="input"></input>');
				var $button = $('<div class="btn">ADD</div>');
				$('main .content').append($('<h5>Task</h5>')).append($task).append($('<h5>Tags</h5>')).append($tags).append($button);
				$button.on('click', function() {
					if ($task.val() && $tags.val()) {
						var text = $task.val();
						toDos.unshift(text);

						var tags = $tags.val();
						var arrayOfTags = tags.split(',');
						arrayOfTags.forEach(function (tag) {
							var tagAlready = false;
							toDosObjects.forEach(function (toDoTag) {
								if (tag === toDoTag.tag) {
									toDoTag.description.push(text);
									console.log(toDosObjects);
									tagAlready = true;

								}
							})
							if (tagAlready === false) {
								var newTag = {
									"tag" : tag ,
									"description" : [text]
								}
								toDosObjects.push(newTag);
								console.log(toDosObjects);
							}
						});

						$task.val('');
						$tags.val('');
						
					}
				});
                
                $task.on('keypress', function(event) {
                    if (event.keyCode === 13) {
                        if ($('#input').val()) {
                            var text = $('#input').val();
                            $('#input').val('');
                            toDos.unshift(text);
                        }
                    }
                });
                
			};

			return false;
		});
	});
};

var organazeByTasks = function (toDosObjects) {
	var toDos = [];

	toDosObjects.forEach( function (toDoTag) {
		toDoTag.description.forEach( function(element) {
			if (toDos.indexOf(element) === -1) {
					toDos.push(element);
			}
		})
	});

	return toDos;
}


$(document).ready(function () {

	// var toDos = [
	// 	"Shopping",
	// 	"Update some tasks",
	// 	"Prepare for lecture on Monday",
	// 	"Answer letters from LinkedIn",
	// 	"Take Grace for a walk",
	// 	"Finish writing book"
	// ];


	$.getJSON("../json/todos.json" ,function (toDosObjects) {

		var toDos = organazeByTasks(toDosObjects);




		var $content = $('<ul>');
		toDos.forEach(function (listElement) {
		$content.append($('<li>').text(listElement));
		});

		$('main .content').append($content);

		main(toDos, toDosObjects);	

	});

	

});