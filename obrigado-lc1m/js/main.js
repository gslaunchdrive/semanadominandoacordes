
$(document).ready(function () {

    let groupWhats = '';

    function loadConfigs() {
        $.get( "https://glcdn.githack.com/ddmlaunch/configs/-/raw/dominandoacordes/obrigado.json",  function( data ) {
            var config = data[0];
            groupWhats = "https://devzapp.com.br/api-engennier/campanha/api/redirect/64ea7f79a29661000129421a";
            $('#whatsapp').attr("href", "https://devzapp.com.br/api-engennier/campanha/api/redirect/64ea7f79a29661000129421a");
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