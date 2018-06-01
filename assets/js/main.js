function parallaxInit() {
    var $window = $(window);
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    $window.on('scroll resize', function () {
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    });

    $('[data-type="background"]').each(function () {
        var $backgroundObj = $(this);
        var bgOffset = parseInt($backgroundObj.offset().top);
        var yPos;
        var coords;
        var speed = ($backgroundObj.data('speed') || 0);
        if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/))
            speed = - (speed / 2);
        $window.on('scroll resize', function () {
            yPos = - ((scrollTop - bgOffset) / speed);
            coords = '35% ' + yPos + 'px';
            $backgroundObj.css({ backgroundPosition: coords });
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