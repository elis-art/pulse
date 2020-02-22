$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 300,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron_right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 320,
                settings: {
                    dots: false,
                    arrows: true
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn("slow");
    });
    $('.button_mini').on('click', function () {
        $('.overlay, #order').fadeIn("slow");
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn("slow");
        });
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                phone: "Пожалуйста, введите номер телефона",
                email: {
                    required: "Пожалуйста, введите адрес почты",
                    email: "Неправильно введен адрес почты"
                }
            }
        })
    }
    valideForms('#order form');
    valideForms('#consultation form');
    valideForms('#consultation-form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false;
    });

    // Smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.page_up').fadeIn();
        } else {
            $('.page_up').fadeOut();
        }
    });

    $("a[href='#up']").click(function () {
        var _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });

    $('.promo__link').on('click', function (e) {
        e.preventDefault();
        let catalog_top = $('.catalog').offset().top;
        $("html, body").animate({
            scrollTop: catalog_top
        }, 600)
    });

});

