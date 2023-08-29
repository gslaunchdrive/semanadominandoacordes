
$(document).ready(function () {

    const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))

    function requestEnvs() {
        $.get( "https://raw.githubusercontent.com/gslaunchdrive/configs/master/blog.json", function( data ) {
            localStorage.setItem("data", data);
            setTimeout(
                function() 
                {
                    location.reload();
                }, 2000);
        });
    }

    function superInterested() {
        var configs = JSON.parse(localStorage.getItem("data"))['configs']['interested'];

        var interested = new Date(Date.parse(configs.date));
        var timeToInterested = getTimeRemaining(interested);
        $('#superinteressado').attr("href", configs.whatsapp);

        if (timeToInterested.seconds >= 0) {
            $('#superinteressado').hide();
        }

        console.log(timeToInterested);

        console.log(configs);
    }

    function removeParamAuth() {
        var uri = window.location.toString().split('&');
        var clearURI = "";

        for (let index = 0; index < uri.length; index++) {
            const element = uri[index];

            if (element.indexOf('auth') == -1) {
                if (index < uri.length && index > 0) {
                    clearURI += '&'
                }
                clearURI += element
            }
        }
        window.location.replace(clearURI);
    }

    function reloadLocalStorage() {
        var auth = getUrlParameter('auth');

        if (auth) {
            requestEnvs();
            setTimeout(
                function() 
                {
                    removeParamAuth();
                },
            2000);
            
        }
    }

    function loadConfigs() {

        if (typeof(Storage) !== "undefined") {
            if (!localStorage.getItem("data")) {
                myModal.show();
                requestEnvs()
            }      
        } else {
            alert("Desculpe! Navegador incompatível. Tente atualizá-lo. Caso não consiga, entre em contato com o suporte.")
        }

        reloadLocalStorage();
        setupGeneralConfigs();
        cplDefault();
        viewCPL();
        loadDateCard();
        navegationURL();
        superInterested();
    }

    function viewCPL() {
        
        var cplNumber = getUrlParameter('video').slice(-1);
        cplNumber = cplNumber -1;
        var aulas = JSON.parse(localStorage.getItem("data"))['aulas'];
        var config = JSON.parse(localStorage.getItem("data"))['configs'];
        var content = aulas[cplNumber];

        $('#content-cpl #video').attr('src', 'https://www.youtube.com/embed/'+content.video).attr('title', content.title);
        $('#content-cpl #title').text(content.title);
        $('#content-cpl #description').text(content.description);

        $('#content-cpl #shared').attr('href', config.sharedLink + content.textShare);

        if (content.files.length > 0) {
            $('#content-cpl #files').show();
            $('#content-cpl #files').attr('src', content.files);
        }
    }

    function loadDateCard() {

        var aulas = JSON.parse(localStorage.getItem("data"))['aulas'];

        aulas.forEach(aula => {
            $('#aula-'+aula.id).find('.content h6').text(aula.label);
        });
    }

    function cplDefault() {
        if (!getUrlParameter('video')) {
            window.location.replace('?video=aula-1');
        }
    }    

    function menuCardToogle(aula, tempoRestante, pagAtual) {

        var keyIcon =   '<span class="icone"> \
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16"> \
                                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/> \
                            </svg> \
                        </span>';

        if (tempoRestante.seconds <= 0) {
            if (pagAtual == aula) {
                $('#'+aula).find('.box').addClass('assistindo');
                $('#'+aula).find('.content h6').text('Assistindo');
            } else {
                $('#'+aula).find('.content h6').text('Disponível');
            }
        } else {
            $('#'+aula).find('.box').addClass('bloqueado').find('a').append(keyIcon);
        }
    }

    function navegationURL() {

        var aulas = JSON.parse(localStorage.getItem("data"))['aulas'];

        aulas.forEach(aula => {
            var CPL = new Date(Date.parse(aula.date));
            var timeToCPL = getTimeRemaining(CPL);
            var video = getUrlParameter('video');

            menuCardToogle('aula-'+aula.id, timeToCPL, video);
        });
    }

    function checkLoadedCache() {

        console.log(localStorage.getItem("data"));
        

        if (localStorage.getItem("data") == null) {
            setTimeout(
                function() 
                {
                    location.reload();
                }, 2000);    
            
        }
    }

    function setupGeneralConfigs() {

        // checkLoadedCache();
        var config = JSON.parse(localStorage.getItem("data"))['configs'];

        console.log(config);

        initializeClock('clock', config.endEvent);
        $('#grupo-whatsapp').attr("href", config.whatsapp);
        $('#comunidade').attr("href", config.comunity);
    }

    loadConfigs();
});