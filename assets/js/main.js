function parallaxInit() {
    var $window = $(window);
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    $('[data-type="background"]').each(function () {
        var $backgroundObj = $(this);
        var speed = ($backgroundObj.data('speed') || 0);
        var posisiY;

        $window.on('scroll resize', function () {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            posisiY = - (scrollTop / speed);
            $backgroundObj.css({ transform: 'translateY(' + posisiY + 'px)' });
        });
    });

    $window.trigger('scroll');
};

var app = {
    init: function () {
        parallaxInit();
    }
};

//  Init App
app.init();