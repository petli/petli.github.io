
$(function() {
    $('div.post-content').on('click', 'img', function(ev) {
        $('#image-zoom').attr('src', ev.target.src);
        $('#image-zoom-text').text(ev.target.alt);
        $('#image-zoom-overlay').show();
        $('body').addClass('disable-scroll');
    });

    $('#image-zoom-overlay').on('click', function() {
        $('#image-zoom-overlay').hide();
        $('body').removeClass('disable-scroll');
    });
});
