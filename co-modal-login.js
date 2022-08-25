function initEvents() {

    //Modal Principal
    //Evento de abrir modal

    //Desktop
    $('body').on('click', '.e-header--login-desktop', function() {
        $('.e-overlay-loader').addClass('is-loading');
        
        setTimeout(function() {
            $('.e-overlay-loader').removeClass('is-loading');
            $('[data-modal="modal"]').addClass('is-active');
        }, 2000);

        vtexid.start({
            returnUrl: "/account",
            userEmail: "",
            locale: "pt-BR",
            forceReload: !1
        })
    })
    
    //Mobile
    $('body').on('click', '.e-header-menu-mob__btn-login', function() {
        $('.e-header-menu-mob').removeClass('active')
        $('.e-overlay-loader').addClass('is-loading');
        
        setTimeout(function() {
            $('.e-overlay-loader').removeClass('is-loading');
            $('[data-modal="modal"]').addClass('is-active');
        }, 2000);

        vtexid.start({
            returnUrl: "/account",
            userEmail: "",
            locale: "pt-BR",
            forceReload: !1
        })
    })

    //Modal Principal
    //Evento de entrar com email e senha
    $('body').on('submit', '.e-co-modal-login--email-password #form-email-acess',function(e){
        e.preventDefault(); 

        const userEmail = $('#useremail').val();
        const userPassword = $('#userpassword').val();
        console.log('email e senha enviados');

        $('#loginWithUserAndPasswordBtn').trigger('click');

        $('#inputEmail').val(userEmail).trigger('change');
        $('#inputPassword').val(userPassword).trigger('change');
        $('#classicLoginBtn').trigger('click');

        //Validação de login e senha
        setTimeout(function(){
            if(!$('p[ng-show="invalidEmail"]').hasClass('ng-hide') || !$('p[ng-show="classicAuthError"]').hasClass('ng-hide')) {
                if($('.invalid-feilds').length == 0) {
                    $('#forgotpassword').after(`<span class="invalid-feilds">Usuário e/ou senha errada</span>`);
                }
            } else {
                $('#forgotpassword').after(`<div class="e-loading-container"><div class="e-loading is-loading"></div></div>`)
            }
        },800)
    })


    //Modal Principal
    //Evento de fechar modal
    $('body').on('click', '.e-co-modal-login--email-password [data-modal="close"]', function() {
        $('[data-modal="modal"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click')
    })






    

    //Cadastrar novo usuario
    //Fluxo 1 - Evento de cadastrar novo usuario
    $('body').on('click', '.e-co-modal-login--email-password .btn-register', function() {
        $('[data-modal="modal"]').removeClass('is-active');
        $('[data-modal="email-register"]').addClass('is-active');

        $('#inputEmail').val('').trigger('change')
        $('#inputPassword').val('').trigger('change')
        $('#loginWithUserAndPasswordBtn').trigger('click');

        setTimeout(() => {
            $('.vtexIdUI-classic-login-control .dead-link').trigger('click');
        }, 750);
    })

    //Cadastrar novo usuario
    //Fluxo 2 - Evento de inserir email
    $('body').on('submit', '.e-co-modal-login--email-register #form-email-register', function(e) {
        e.preventDefault();
        const userEmail = $('#useremailregister').val();

        $('#appendedInputButton').val(userEmail).trigger('change');

        setTimeout(function() {
            $('#sendAccessKeyBtn').trigger('click');
        },250)

        $('[data-modal="email-register"]').removeClass('is-active');
        $('[data-modal="new-user-password"]').addClass('is-active');
    })

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--email-register .e-co-modal-login__close', function() {
        $('[data-modal="email-register"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--email-register .btn-email-register-back', function() {
        $('[data-modal="email-register"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    //Cadastrar novo usuario
    //Fluxo 3 - Evento de inserir senha
    $('body').on('submit', '.e-co-modal-login--new-user-password #form-new-user-password', function(e) {
        e.preventDefault();
        const newUserPassword = $('#newuserpassword').val();
        const newUserPasswordConfirm = $('#newuserpasswordconfirm').val();

        $('#inputNewPassword').val(newUserPassword).trigger('change')
        $('#inputConfirmNewPassword').val(newUserPasswordConfirm).trigger('change')

        setTimeout(function() {
            $('#tryChangePswdBtn').trigger('click');
        },250)

        //Validação da senha
        if(!(newUserPassword == newUserPasswordConfirm)) {
            $('.e-co-modal-login__recommendations').after('<span class="invalid-feilds">As senhas não são iguais</span>');
            $('.btn-new-user-password').prop('disabled', true);
        } else {
            $('.btn-new-user-password').prop('disabled', false);
            $('[data-modal="new-user-password"]').removeClass('is-active');
            $('[data-modal="new-user-acess-code"]').addClass('is-active');
        }
    })


    $(document).on('ready', function(){
        $('.btn-new-user-password').prop('disabled', true);
    })

    
    $('body').on('input', '#form-new-user-password #newuserpassword, #form-new-user-password #newuserpasswordconfirm',function() {
        
        let oneuppercase = $('#password-one-uppercase');
        let onelowercase = $('#password-one-lowercase');
        let onenumber = $('#password-one-number');
        let caracters = $('#password-caracters');
        
        const regex1 = "(?=.*[a-z])";
        const regex2 = "(?=.*[A-Z])";
        const regex3 = "(?=.*[0-9])";
        const regex4 = "(?=.{8,})";

        const matchPasswordValues = (regex) => {
            const bothPasswordValues = [$('#newuserpassword').val(), $('#newuserpasswordconfirm').val()];

            // $('#newuserpassword').val().match(regex) || $('#newuserpasswordconfirm').val().match(regex);
            return bothPasswordValues.some(val => val.match(regex));
        }

        if (matchPasswordValues(regex2)) {
            oneuppercase.addClass('is-active');
        } else {
            oneuppercase.removeClass('is-active');
        }

        if (matchPasswordValues(regex1)) {
            onelowercase.addClass('is-active');
        } else {
            onelowercase.removeClass('is-active');
        }

        if (matchPasswordValues(regex3)) {
            onenumber.addClass('is-active');
        } else {
            onenumber.removeClass('is-active');
        }

        if (matchPasswordValues(regex4)) {
            caracters.addClass('is-active');
        } else {
            caracters.removeClass('is-active');
        }
        
        const isRequiredParametersValid = [oneuppercase, onelowercase, onenumber, caracters].every(val => val.hasClass('is-active'));
        
        if (isRequiredParametersValid) {
           if ($('#newuserpassword').val() != $('#newuserpasswordconfirm').val()) {
            $('.btn-new-user-password').prop('disabled', true);
            return;
           }

            $('.btn-new-user-password').prop('disabled', false);
        } else {
            $('.btn-new-user-password').prop('disabled', true);
        }
    })

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--new-user-password .e-co-modal-login__close', function() {
        $('[data-modal="new-user-password"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--new-user-password .btn-new-user-password-back', function() {
        $('[data-modal="new-user-password"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    //Cadastrar novo usuario
    //Fluxo 4 - Evento de inserir codigo de acesso
    $('body').on('submit', '.e-co-modal-login--new-user-acess-code #form-new-user-acess-code', function(e) {
        e.preventDefault();

        const newUserAccessCode = $('#newuseracesscode').val();
        $('#access-code').val(newUserAccessCode).trigger('change')
        setTimeout(function(){
            $('#changePswdBtn').trigger('click');
        },250)
    })

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--new-user-acess-code .e-co-modal-login__close', function() {
        $('[data-modal="new-user-acess-code"]').removeClass('is-active');
        $('a.vtexIdUI-back-link.pull-left.dead-link').trigger('click');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--new-user-acess-code .btn-new-user-acess-code-back', function() {
        $('[data-modal="new-user-acess-code"]').removeClass('is-active');
        $('a.vtexIdUI-back-link.pull-left.dead-link').trigger('click');
        $('.close.vtexIdUI-close').trigger('click');
    })











    //Esqueci minha senha
    //Fluxo 1 - mostrar modal
    $('body').on('click', '#forgotpassword', function(){
        $('[data-modal="modal"]').removeClass('is-active');
        $('[data-modal="passwordrecovery"]').addClass('is-active');

        $('#inputEmail').val('').trigger('change')
        $('#inputPassword').val('').trigger('change')
        $('#loginWithUserAndPasswordBtn').trigger('click');

        setTimeout(() => {
            $('.vtexIdUI-classic-login-control .dead-link').trigger('click');
        }, 750);
    })

    //Esqueci minha senha
    //Fluxo 2 - inserir email
    $('body').on('submit', '.e-co-modal-login--password-recovery #form-password-recovery', function(e) {
        e.preventDefault();
        const userEmail = $('#emailpasswordrecovery').val();

        $('#appendedInputButton').val(userEmail).trigger('change');

        setTimeout(function() {
            $('#sendAccessKeyBtn').trigger('click');
        },250)

        $('[data-modal="passwordrecovery"]').removeClass('is-active');
        $('[data-modal="new-password"]').addClass('is-active');
    })

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--password-recovery .e-co-modal-login__close', function() {
        $('[data-modal="passwordrecovery"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--password-recovery .btn-password-recovery-back', function() {
        $('[data-modal="passwordrecovery"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    //Esqueci minha senha
    //Fluxo 3 - Evento de inserir senha 
    $('body').on('submit', '.e-co-modal-login--new-password #form-newpassword', function(e) {
        e.preventDefault();
        const newPassword = $('#newpassword').val();
        const newPasswordConfirm = $('#newpasswordconfirm').val();

        $('#inputNewPassword').val(newPassword).trigger('change')
        $('#inputConfirmNewPassword').val(newPasswordConfirm).trigger('change')

        setTimeout(function() {
            $('#tryChangePswdBtn').trigger('click');
        },250)

        $('[data-modal="new-password"]').removeClass('is-active');
        $('[data-modal="new-password-insert-key"]').addClass('is-active');


    })

    $(document).on('ready', function(){
        $('.btn-new-password').prop('disabled', true);
    })

    $('body').on('input', '#form-newpassword #newpassword, #form-newpassword #newpasswordconfirm',function() {
        
        let oneuppercase = $('#newpassword-oneuppercase');
        let onelowercase = $('#newpassword-onelowercase');
        let onenumber = $('#newpassword-onenumber');
        let caracters = $('#newpassword-caracteres');
        
        const regex1 = "(?=.*[a-z])";
        const regex2 = "(?=.*[A-Z])";
        const regex3 = "(?=.*[0-9])";
        const regex4 = "(?=.{8,})";

        const matchPasswordValues = (regex) => {
            const bothPasswordValues = [$('#newpassword').val(), $('#newpasswordconfirm').val()];
            
            return bothPasswordValues.some(val => val.match(regex));
        }

        if (matchPasswordValues(regex2)) {
            oneuppercase.addClass('is-active');
        } else {
            oneuppercase.removeClass('is-active');
        }

        if (matchPasswordValues(regex1)) {
            onelowercase.addClass('is-active');
        } else {
            onelowercase.removeClass('is-active');
        }

        if (matchPasswordValues(regex3)) {
            onenumber.addClass('is-active');
        } else {
            onenumber.removeClass('is-active');
        }

        if (matchPasswordValues(regex4)) {
            caracters.addClass('is-active');
        } else {
            caracters.removeClass('is-active');
        }
        
        const isRequiredParametersValid = [oneuppercase, onelowercase, onenumber, caracters].every(val => val.hasClass('is-active'));
        
        if (isRequiredParametersValid) {
           if ($('#newpassword').val() != $('#newpasswordconfirm').val()) {
            $('.btn-new-password').prop('disabled', true);
            return;
           }

            $('.btn-new-password').prop('disabled', false);
        } else {
            $('.btn-new-password').prop('disabled', true);
        }
    })

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--new-password .e-co-modal-login__close', function() {
        $('[data-modal="new-password"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--new-password .btn-new-password-back', function() {
        $('[data-modal="new-password"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    //Esqueci minha senha
    //Fluxo 4 - Evento de inserir codigo de acesso
    $('body').on('submit', '.e-co-modal-login--new-password-insert-key #form-new-password-insert-key', function(e) {
        e.preventDefault();

        const newPasswordInsertKey = $('#newpasswordinsertkey').val();
        $('#access-code').val(newPasswordInsertKey).trigger('change');
        $('#changePswdBtn').trigger('click');


        setTimeout(function(){
            if(!$('form[ng-disabled="isValidatingAccessKey"] .modal-body .alert').eq(0).hasClass('ng-hide')){
                if($('.invalid-feilds').length == 0) {
                    $('#form-new-password-insert-key .e-co-modal__form-input').after(`<span class="invalid-feilds">Chave de acesso inválida.</span>`);
                }
            } else if(!$('form[ng-disabled="isValidatingAccessKey"] p[ng-show="blockedUser"]').hasClass('ng-hide')){
                if($('.invalid-feilds').length == 0) {
                    $('#form-new-password-insert-key .e-co-modal__form-input').after(`<span class="invalid-feilds">Usuário bloqueado.</span>`);
                }
            } else if(!$('form[ng-disabled="isValidatingAccessKey"] p[ng-show="unexpectedError"]').hasClass('ng-hide')){
                if($('.invalid-feilds').length == 0) {
                    $('#form-new-password-insert-key .e-co-modal__form-input').after(`<span class="invalid-feilds">Erro inesperado.</span>`);
                }
            } else {
                $('#form-new-password-insert-key .e-co-modal__form-input').after(`<div class="e-loading-container"><div class="e-loading is-loading"></div></div>`)
            }
        },1000)
    })

    

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--new-password-insert-key .e-co-modal-login__close', function() {
        $('[data-modal="new-password-insert-key"]').removeClass('is-active');
        $('a.vtexIdUI-back-link.pull-left.dead-link').trigger('click');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--new-password-insert-key .btn-new-user-acess-code-back', function() {
        $('[data-modal="new-password-insert-key"]').removeClass('is-active');
        $('a.vtexIdUI-back-link.pull-left.dead-link').trigger('click');
        $('.close.vtexIdUI-close').trigger('click');
    })











    //Receber chave de acesso rápido por email
    //Fluxo 1 - Evento de mostrar modal
    $('body').on('click', '.e-co-modal-login--email-password .email-acess', function() {
        $('[data-modal="modal"]').removeClass('is-active');
        $('[data-modal="emailAcess"]').addClass('is-active');
    })

    //Receber chave de acesso rápido por email
    //Fluxo 2 - Evento de inserir email para receber chave de acesso 
    $('body').on('submit', '.e-co-modal-login--email-acess .e-co-modal-login__form', function(e) {
        e.preventDefault();

        const userEmail = $('#useremailacess').val();
        $('#loginWithAccessKeyBtn').trigger('click');

        $('#appendedInputButton').val(userEmail).trigger('change');
        
        setTimeout(function(){
            $('#sendAccessKeyBtn').trigger('click');
        },500)

        $('[data-modal="emailAcess"]').removeClass('is-active');
        $('[data-modal="emailAcessCode"]').addClass('is-active');
    })


    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--email-acess .e-co-modal-login__close', function() {
        $('[data-modal="emailAcess"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--email-acess .btn-email-acess-back', function() {
        $('[data-modal="emailAcess"]').removeClass('is-active');
        $('.close.vtexIdUI-close').trigger('click');
    })

    //Receber chave de acesso rápido por email
    //Fluxo 3 - Evento de inserir a chave de acesso
    $('body').on('submit', '#form-emailacesscode', function(e) {
        e.preventDefault();

        const acessCode = $('#useremailacesscode').val();

        $('#access-code').val(acessCode).trigger('change');

        $('#form-emailacesscode #useremailacesscode').after(`<div class="e-loading-container"><div class="e-loading is-loading"></div></div>`)

        setTimeout(function(){
            $('#confirmLoginAccessKeyBtn').trigger('click');
        },500)
    })

    //Eventos de fechar modal
    $('body').on('click', '.e-co-modal-login--email-acess-code .e-co-modal-login__close', function() {
        $('[data-modal="emailAcessCode"]').removeClass('is-active');
        $('a.vtexIdUI-back-link.pull-left.dead-link').trigger('click');
        $('.close.vtexIdUI-close').trigger('click');
    })

    $('body').on('click', '.e-co-modal-login--email-acess-code .btn-email-acess-code-back', function() {
        $('[data-modal="emailAcessCode"]').removeClass('is-active');
        $('a.vtexIdUI-back-link.pull-left.dead-link').trigger('click');
        $('.close.vtexIdUI-close').trigger('click');
    })


    //Evento de abrir o login com Goggle
    $('body').on('click', '.button--google', function() {
        $('#vtexIdUI-google-plus')[0].click();
    })

    //Evento de abrir o login com Facebook
    $('body').on('click', '.button--facebook', function() {
        $('#vtexIdUI-facebook')[0].click();
    })
}

$(document).ready(function() {
    initEvents();
})


// const objExemplo = {
//     init: function () {
//       this.events();
//     },
//     events: function () {
//       this.methods.setEvent1()
//       this.methods.setEvent2()
//     },
//     methods: {
//       setEvent1: function () {
//         // $('body').on('click')....
//       },
//       setEvent2: function () {
//         // $('body').on('click')....
//       }
//     }
// }