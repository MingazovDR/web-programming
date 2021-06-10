var main = function (UsersObjects) {
	"use strict";
	var $butEdit = $("<button>").text(" Изменить имя пользователя"),
		$butDestroy = $("<button>").text("Удалить пользователя"),
		$butTasks = $("<button>").text("Задачи"),
		$select = $('#select');

	$butEdit.on("click", function() {
		if ($select.val() !== "") {
			var username = $select.val();
			var newUsername = prompt("Введите новое имя пользователя", $select.val());
			if (newUsername !== null && newUsername.trim() !== "") {
				$.ajax({
					'url': '/users/'+username,
					'type': 'PUT',
					'data': { 'username': newUsername }
				}).done(function(responde) {
					console.log(responde);
					$select.val(newUsername);
					alert('Имя пользователя успешно изменено');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
				});
			}
		}
	});

	$butDestroy.on("click", function() {
		if ($select.val() !== "") {
			var username = $select.val();
			if (confirm("Вы уверены, что хотете удалить пользователя " + username + "?")) {
				$.ajax({
					'url': '/users/'+username,
					'type': 'DELETE',
				}).done(function(responde) {
					console.log(responde);
					$select.val("");
					alert('Пользователь успешно удален');
				}).fail(function(jqXHR, textStatus, error) {
					console.log(error);
					alert("Произошла ошибка!\n"+jqXHR.status + " " + jqXHR.textStatus);	
				});
			}
		}
	});

	$butTasks.on("click", function() {
		var username = $select.val();
		var loginUser = {"username": username};
		window.location.replace('/users/' + username + '/');
	});

	UsersObjects.forEach(function(item) {
		console.log(item);
		$(".js-select2").append($('<option>' + item.username + '</option>'));
	})

	$(".tabs").append($butDestroy);
	$(".tabs").append($butEdit);
	$(".tabs").append($butTasks);
}

$(document).ready(function() {
	$.getJSON("users.json", function (UsersObjects) {
		main(UsersObjects);
		$('.js-select2').select2({
			placeholder: "Выберите город",
			maximumSelectionLength: 2,
			language: "ru",
			dropdownCssClass: "testt",
			selectionCssClass: "testt"
		});
	});
});