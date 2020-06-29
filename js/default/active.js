(function ($) {
    'use strict';

    // :: All Variables

    var bigshopWindow = $(window),
        wel_slides = $('.welcome_slides'),
        welSlidesTwo = $('.welSlideTwo');

    // :: Preloader Code

    bigshopWindow.on('load', function () {
        $('#preloader').fadeOut('1000', function () {
            $(this).remove();
        });
    });

    // :: Menu Code

    if ($.fn.classyNav) {
        $('#bigshopNav').classyNav();
    }
// :: Search Form Code    
    $(".search-btn").on("click", function () {
        $(".search-form").toggleClass("active");
    });

  // :: Hero Slides Code 

    if ($.fn.owlCarousel) {
        welSlidesTwo.owlCarousel({
            items: 2,
            margin: 15,
            loop: true,
            center: true,
            nav: true,
            navText: ['<i class="icofont-rounded-left"></i>', '<i class="icofont-rounded-right"></i>'],
            dots: true,
            autoplay: true,
            smartSpeed: 1500,
            autoplayTimeout: 7000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                }
            }
        });

       
    }

    
    // :: Shop Catagory Slides Code

    if ($.fn.owlCarousel) {
        $(".shop_by_catagory_slides").owlCarousel({
            items: 7,
            margin: 30,
            loop: true,
            dots: true,
            autoplay: true,
            smartSpeed: 800,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 3
                },
                576: {
                    items: 4
                },
                768: {
                    items: 5
                },
                992: {
                    items: 6
                },
                1200: {
                    items: 7
                }
            }
        });
    }

   
    // :: ScrollUp Code

    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="icofont-rounded-up"></i>'
        });
    }

    // :: Counterup Code

    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: Countdown Code

    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $(this).find(".days").html(event.strftime("%D"));
            $(this).find(".hours").html(event.strftime("%H"));
            $(this).find(".minutes").html(event.strftime("%M"));
            $(this).find(".seconds").html(event.strftime("%S"));
        });
    });

    // :: PreventDefault "a" Click

    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
        
    });

    function scrollToSection(event) {
        event.preventDefault();
        var $section = $($(this).attr('href')); 
        $('html, body').animate({
          scrollTop: $section.offset().top-100
        }, 500);
      }
      $('[data-scroll]').on('click', scrollToSection);

})(jQuery);