var main = function () {
	"use strict";

	var tags = $('.flickr_tags').val();
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags="+
	tags +"&extras=600&format=json&jsoncallback=?"

	$.getJSON(url, function (flickrResponse) {
		var photos = flickrResponse.items;
		var flag = true;
		var displayPhotos = function (photoIndex) {

			$(".button").on("click", function () {
				flag = false;
			});

			if (flag == false) {
				main();
				return;
			}

			var $img = $("<img>").hide();
			$img.attr("src", photos[photoIndex].media.m);
			$(".img").empty();
			$(".img").append($img);
			$img.fadeIn();
			
			var timeout = setTimeout(function () {
				photoIndex = photoIndex + 1;
				displayPhotos(photoIndex);
			}, 3000);
			if (photoIndex == (photos.length - 1)) {
				photoIndex = 0;
			}
		}
		if (flag == true) {
			displayPhotos(0);
		}
	});
}

$(document).ready(main);