$('button').click(function() {
    $('.navbar-toggler').toggleClass('change')
})

$(window).scroll(function() {
    let position =  $(this).scrollTop();
    if(position >= 170) {
        $('nav').addClass('custom-nav').removeClass('nav-menu');
    }else{
        $('nav').addClass('nav-menu').removeClass('custom-nav');
    }
})

$(window).scroll(function() {
    let position = $(this).scrollTop();
    if(position >= 4990){
        $('.card-1').addClass('left');
        $('.card-2').addClass('bottom');
        $('.card-3').addClass('right');
    }else{
        $('.card-1').removeClass('left');
        $('.card-2').removeClass('bottom');
        $('.card-3').removeClass('right');
    }
})
$('.nav-menu', '.custom-nav').click(function() {
    $(this).addClass('active-link').siblings().removeClass('active-link')
})