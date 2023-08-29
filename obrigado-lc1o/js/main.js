
$(document).ready(function () {

    // function inputHandler(masks, max, event) {
    //     var c = event.target;
    //     var v = c.value.replace(/\D/g, '');
    //     var m = c.value.length > max ? 1 : 0;
    //     VMasker(c).unMask();
    //     VMasker(c).maskPattern(masks[m]);
    //     c.value = VMasker.toPattern(v, masks[m]);
    // }
    
    // var telMask = ['(99) 9999-99999', '(99) 99999-9999'];
    // var tel = document.querySelector('input#phone');
    // VMasker(tel).maskPattern(telMask[0]);
    // tel.addEventListener('input', inputHandler.bind(undefined, telMask, 14), false);

    

    let groupWhats = '';

    function loadConfigs() {
        $.get( "https://glcdn.githack.com/ddmlaunch/configs/-/raw/dominandoacordes/obrigado.json",  function( data ) {
            var config = data[0];
            groupWhats = "https://devzapp.com.br/api-engennier/campanha/api/redirect/64ea7f79a29661000129421a";
            $('#whatsapp').attr("href", "https://devzapp.com.br/api-engennier/campanha/api/redirect/64ea7f79a29661000129421a");
            console.log(config.initEvent)
            initializeClock('clock', config.initEvent);
        });
    }

    function redirectWhatsApp() {
        setTimeout(function () {
            window.location.href = groupWhats;
        }, 20000);
    }

    loadConfigs();
    redirectWhatsApp();
});