var tagIndex = function (tag, tagsList) {
	var i;
	for (i=0;i<tagsList.length;i++) {
		if (tagsList[i].name.localeCompare(tag)==0) return i;
	}
	return -1;
};


var organizeByTags = function (toDosList) {
	var organizedByTags = [];
	toDosList.forEach(function (toDoItem) { // toDoItem = { "description":"...", "tags":[...] }
		toDoItem.tags.forEach(function (tagItem) { // tagItem="..."
			var ind=tagIndex(tagItem, organizedByTags);
			if (ind==-1) {
				organizedByTags.push({
					"name": tagItem,
					"toDos": [toDoItem.description]
				});
			}
			else organizedByTags[ind].toDos.push(toDoItem.description);
		});
	});
	return organizedByTags;
};

var fetchToDos = function (toDoObjects) {
	var toDosList = toDoObjects.map(function(toDo) {
		return toDo.description;
	});
	return toDosList;
}

var main = function (toDoObjects) {
	"use strict";
	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	})
	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			var $element = $(element),
			$content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul class='bullet'>");

				for (var i = toDos.length-1; i > -1; i--) {
					$content.append($("<li>").text(toDos[i]));
				}

				$("main .content").append($content);
			}

			else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul class='bullet'>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} 

			else if ($element.parent().is(":nth-child(3)")) {
				console.log("Щелчок на вкладке Теги");
				var organizedByTag = organizeByTags(toDoObjects);

				organizedByTag.forEach(function (tag) {
					var $tagName=$("<h3>").text(tag.name);
					var $content=$("<ul>");
					var $wrapper=$("<div>");

					tag.toDos.forEach(function (description) {
						var $task=$("<li>").text(description);
						$content.append($task);
					});

					$("main .content").append($wrapper);
					$wrapper.append($tagName);
					$wrapper.append($content);
				});
			} 

			else if ($element.parent().is(":nth-child(4)")) {
				$("main .content").append('<input class="description index_button" placeholder="Новое описание" /> ');
				$("main .content").append('<br> <br> <input class="tags index_button" placeholder="Новый тэг" /> <button type="button" class="input_btn">+</button>');
				$(".input_btn").on("click", function () {
					if ((($(".tags").val() !== "") && ($(".description").val() !== "")) && ((($(".tags").val()).trim().length > 0) && (($(".description").val()).trim().length > 0))){
						var newDescription = $('.description').val();
						//var newToDo = $('.tags').val();
						var tags = $('.tags').val().split(",");
						var newToDo = {"description":newDescription, "tags":tags};

						if (newToDo != '') {
							//toDoObjects.push({"description": newDescription, "tags": tags});
							$.post("todos", newToDo, function (result) {
								console.log(result);
								toDoObjects.push(newToDo);
								toDos = toDoObjects.map(function (toDo) {
									return toDo.description;
								});
							});
							alert('успешно добавлено!');
							$('.tags').val("");
							$('.description').val("");
						}
					}
				});
				$(".tags").on("keypress", function (event) {
					if (event.keyCode === 13) {
						if ((($(".tags").val() !== "") &&($(".description").val() !== "")) && ((($(".tags").val()).trim().length > 0) && (($(".description").val()).trim().length > 0))){
							var newToDo= $('.tags').val();
							
							if (newToDo!='') {
								toDos.push( newToDo);
								alert('Новое задание "'+newToDo+'" успешно добавлено!');
								$('.tags').val("");
								$('.description').val("");
							}
						}
					}
				});
			}
		});
	});
	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
	$.getJSON("todos.json", function (toDoObjects) {
		//$.post("todos", organizeByTags(toDoObjects));

		$.get("todos", null, function (result) {
			main(result);
		});
	});
});