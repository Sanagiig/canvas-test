
requirejs.config({
    paths:{
        jquery:['https://code.jquery.com/jquery-3.3.1.min','jqeury']
    },
    shim:{
        'testShim':{
            export:"testShim"
        }
    }

});

requirejs(['jquery'],function($) {
    var test = function(xx){
        console.log(xx);
    }

    $.fn.test = test;

    $('#test').test();
});