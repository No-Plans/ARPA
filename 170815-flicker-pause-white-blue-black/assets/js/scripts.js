// All custom Javascript


        

$(document).ready(function() {



    function opendrawer(e){
        $('.about').toggleClass('open');
        $('.gallery-wrapper').toggleClass('closed')
    };

    $('.logo').click(opendrawer);




    function flicker(e){
        var timer, elm=0, images = $('img', '.flicker');
        var interval = 150;

        images.not(':first').hide().end().on({
             mousedown: function() {
                 clearInterval(timer);
                 $('body').css('background', 'black');
                 // $('.logo').css('color', 'white')
             },
             mouseup: function() {
                 timer = setInterval(slider, interval);
                 $('body').css('background', 'white');
                 // $('.logo').css('color', '#2C2CB4')
             }
       });

       timer = setInterval(slider, interval);
    
       function slider() {
         image = images.eq(elm);
         image.hide();
         elm = elm!=images.length-1 ? image.next('img').index() : 0;
         images.eq(elm).show();
       }
     };

    $(flicker);

    

});

