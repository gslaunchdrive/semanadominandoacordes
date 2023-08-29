$(document).ready(function () {

    $("#phone").mask("+55 (00) 0000-00009");

    $("#_form_33_submit").click(function() {
        var clean = $("#phone").val().replace(/\D/g, "");
        $("#phone").val(clean);
        dataLayer.push({
            'event': 'inscricaoRealizada'
        });
    });

    const URLToArray = url => {

        var request = {};
        var pairs = url.substring(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < pairs.length; i++) {
            if (!pairs[i])
                continue;
            var pair = pairs[i].split('=');
            //pair = pairs[i].replace(/\+/g,' ');
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]).replace(/\+/g, ' ');
        }
        return request;
    }

    function loadForm() {
        
        var params = URLToArray(window.location.href)
        if (params) {
            $("[name='field[34]']").val(params['utm_source']);
            $("[name='field[35]']").val(params['utm_campaign']);
            $("[name='field[36]']").val(params['utm_medium']);
            $("[name='field[39]']").val(params['utm_content']);
            $("[name='field[38]']").val(params['utm_term']);
        }
    }
    
    loadForm();
});