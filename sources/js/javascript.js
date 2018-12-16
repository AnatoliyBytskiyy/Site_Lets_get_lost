(function($){
	$(window).scroll(function() {
	    $('.header__hill').css('top', ($(this).scrollTop()/3+35)+'px');
	    $('.text_scroll').css('top', $(this).scrollTop()+'px');
	});

	$(function(){
		$( "#date1" ).datepicker();
		$( "#date2" ).datepicker();
	});

	$(function(){
		$( ".draggable" ).draggable({ 
			revert: "invalid",
		    containment: "document",
			cursor: "move",
			// classes: {
		 //        "ui-draggable-dragging": "state_hover"
		 //    }
		});

		$( "#droppable").droppable({
			accept: "#droppable1 .draggable, #droppable2 .draggable",
			greedy: false,
			drop: function( event, ui ) {
		    	recycleImage( ui.draggable, $(this) );
		    },
		    // activate: function( event, ui ) {
		   	// 	Item_animate( ui.draggable );
		    // },
		    // deactivate: function( event, ui ) { 
		    // 	Item_animate( ui.draggable );
		    // }
		    // classes: {
		    //     "ui-draggable-dragging": "state_hover"
		    // }
	    });

	    $( "#droppable1" ).droppable({ 
	    	accept: "#droppable .draggable, #droppable2 .draggable",
		    drop: function( event, ui ) {
		    	recycleImage( ui.draggable, $(this) );
		    },
			hoverClass:'drag_hover',
		    // activate: function( event, ui ) {
		   	// 	Item_animate( ui.draggable );
		    // },
		    // deactivate: function( event, ui ) { 
		    // 	Item_animate( ui.draggable );
		    // }
	    });

	    $( "#droppable2" ).droppable({ 
	    	accept: "#droppable .draggable, #droppable1 .draggable",
		    drop: function( event, ui ) {
		    	recycleImage( ui.draggable, $(this) );
		    },
			hoverClass:'drag_hover',
		    // activate: function( event, ui ) {
		   	// 	Item_animate( ui.draggable );
		    // },
		    // deactivate: function( event, ui ) { 
		    // 	Item_animate( ui.draggable );
		    // }
	    });

	     // function Item_animate( $item ) {
	     // 	$start_id = "#" + $item.parent().attr("id");

	     // 	$($start_id).toggleClass( "state_hover" );
	     // }

	    function recycleImage( $item, $field ) {
			var $name =  $item.find("h4").text(),	
			$start_id = "#" + $item.parent().attr("id"),
			$end_id = "#" + $field.attr('id'),
			$item_icon = " ";
			if($end_id == "#droppable")
				$item_icon = "<div class='draggable destination d-flex justify-content-between ui-widget-content'><div class='col'><div><h4>"+ $name +"</h4></div><div><p>estimated time:<span> 4 Hours</span></p></div></div><div class='col d-flex justify-content-end'><div><img src='img/bromo_hill.png'><p><span>view details</span></p></div></div></div>";
			else
				$item_icon = "<div class='draggable destination d-flex justify-content-start ui-widget-content'><img src='img/bromo_hill.png'><h4>" + $name + "</h4></div></div>";

			var $list = $($start_id, $end_id).length ?
			$($start_id, $end_id):
			$($item_icon).appendTo($end_id);
			// $($item).detach().prependTo($end_id);

			$( ".draggable").draggable({
				revert: "invalid",
			    containment: "document",
				cursor: "move"
			});

			if( $($start_id).children('.draggable').length < 2 ){
				var $list1 = $($end_id, $start_id).length ?
				$($end_id, $start_id):
				$("<div class='drag text-center'>").appendTo($start_id);
			}

			$item
				.remove()
			.end();	
			$($end_id + " .drag")
					.remove()
				.end();	
		}
	});

	$(".dropdown-menu > li > a").click(function( e ) { 
		e.preventDefault();

		var $currentFilter = $(this).data('category'),
	    $currentLabel = $(this).text();

	    $('.js-destination-filter-btn-label').text($currentLabel);

	    $('#droppable .draggable').hide("speed").filter(function () {
	        if ($currentFilter === '' || $currentFilter === $(this).data('category')) {
	            return true;
	        } else {
	            return false;
	        }
	    }).show("normal");
	});

	// initMap() - функция инициализации карты
	function initMap() {
		// Координаты центра на карте. Широта: 56.2928515, Долгота: 43.7866641
		var centerLatLng = new google.maps.LatLng(48.003503, 37.804638);
		// Обязательные опции с которыми будет проинициализированна карта
		var mapOptions = {
			center: centerLatLng, // Координаты центра мы берем из переменной centerLatLng
			zoom: 14,               // Зум по умолчанию. Возможные значения от 0 до 21
			styles: map, 
			backgroundColor: '#32B4B6',
		};
		// Создаем карту внутри элемента #map
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	}
	// Ждем полной загрузки страницы, после этого запускаем initMap()
	google.maps.event.addDomListener(window, "load", initMap);

})(jQuery);


// function (e) {
//     e.preventDefault();
//     var currentFilter = $(this).data('category');
//     var currentLabel = $(this).text();
//     $('.js-destination-filter-btn-label').text(currentLabel);
//     $('.destinations .drag-item').hide().filter(function () {
//         if (currentFilter === '' || currentFilter === $(this).data('category')) {
//             return true;
//         } else {
//             return false;
//         }
//     }).show();