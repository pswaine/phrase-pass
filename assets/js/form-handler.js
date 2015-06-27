var FormHandler = {

    errorState: false,
    timeoutToClearForm: null,

    runChecks: function() {
        this.resetErrors();
        this.cancelTimeoutToClearForm();
        if (!this.errorState) {
            this.checkForEmptyFields();
        }
        if (!this.errorState) {
            this.checkPassPhraseLength();
        }
        return !this.errorState;
    },

    resetErrors: function() {
        $('#modal-error .modal-body li').hide();
        $('.form-group').removeClass('has-error');
        this.errorState = false;
    },

    clearForm: function() {
        $('#passPhrase').val('');
        $('#siteIdentifier').val('');
        FormHandler.hidePassword();
    },

    startTimeoutToClearForm: function(seconds) {
        this.timeoutToClearForm = setTimeout(this.clearForm, (seconds * 1000));
    },

    cancelTimeoutToClearForm: function() {
        clearTimeout(this.timeoutToClearForm);
    },

    showPassword: function(passString) {
        $('#passString span').html(passString);
        $('#passString').show();
    },

    hidePassword: function() {
        $('#passString span').html('');
        $('#passString').hide();
    },

    checkForEmptyFields: function() {
        if ($('#passPhrase').val() == '') {
            $('#errorMessages, #errorPassPhraseEmpty').show();
            $('.form-group.passPhrase').addClass('has-error');
            this.showErrorModal();
            this.errorState = true;
        }
        if ($('#siteIdentifier').val() == '') {
            $('#errorMessages, #errorSiteIdentifierEmpty').show();
            $('.form-group.siteIdentifier').addClass('has-error');
            this.showErrorModal();
            this.errorState = true;
        }
    },

    checkPassPhraseLength: function() {
        if ($('#passPhrase').val().length < 20) {
            $('#errorMessages, #errorPassPhraseLength').show();
            $('.form-group.passPhrase').addClass('has-error');
            this.showErrorModal();
            this.errorState = true;
        }
    },

    showErrorModal: function() {
        $('#modal-error').modal('show');
        $(".modal-backdrop").css('z-index', 0);
    },

    setDefaultPassLength: function(defaultPassLength) {
        $('#passLength').val(defaultPassLength);
    }
};
