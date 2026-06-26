(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.properties-box');
	const filtersElem = document.querySelector('.properties-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.properties-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});
    


})(window.jQuery);

document.addEventListener('DOMContentLoaded', function () {

    const mainCarouselEl = document.getElementById('carruselPropiedad');
    const modalCarouselEl = document.getElementById('carouselModal');
    const modalInner = document.getElementById('carouselModalInner');

    if (mainCarouselEl) {
        bootstrap.Carousel.getOrCreateInstance(mainCarouselEl, {
            interval: 5000,
            wrap: true,
            ride: 'carousel'
        });
    }

    if (modalCarouselEl) {
        bootstrap.Carousel.getOrCreateInstance(modalCarouselEl, {
            interval: false,
            wrap: true
        });
    }

    const imagenes = document.querySelectorAll('#carruselPropiedad .img-principal');

    if (!modalInner || !imagenes.length) {
        return;
    }

    // Crear automáticamente las imágenes del modal
    imagenes.forEach((img, index) => {

        const item = document.createElement('div');

        item.className =
            index === 0
                ? 'carousel-item active'
                : 'carousel-item';

        item.innerHTML = `
            <img src="${img.src}"
                 class="d-block w-100"
                 alt="Propiedad">
        `;

        modalInner.appendChild(item);

        // Abrir el modal en la imagen seleccionada
        img.addEventListener('click', function (event) {
            event.preventDefault();

            const modalCarousel = bootstrap.Carousel.getOrCreateInstance(modalCarouselEl);
            modalCarousel.to(index);
        });

    });

});