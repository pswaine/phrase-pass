(function ($) {
    $(document).ready(function($) {
        var form = null;
        var hash = null;

        function prepareInfoModal() {
            $('#nav-info').click(function(event) {
                event.preventDefault();
                $('#modal-info').modal('show');
                $(".modal-backdrop").css('z-index', 0);
            });
        }

        function getFormHandler() {
            return FormHandler;
        }

        function getHashHandler() {
            return eval('HashHandlerV' + $('#engine').val());
        }

        function prepareForm() {
            form = getFormHandler();
            $('#clear').click(function(event) {
                form.clearForm();
            });
            $('#clear').trigger('click');

            $.fn.bootstrapSwitch.defaults.size = 'small';
            $.fn.bootstrapSwitch.defaults.onText = 'YES';
            $.fn.bootstrapSwitch.defaults.offText = 'NO';
            $('#capitalLetter').bootstrapSwitch();
            $('#specialCharacter').bootstrapSwitch();
            $('#capitalLetter, #specialCharacter').on('switchChange.bootstrapSwitch', function(event, state) {
                state == true ? $(this).val('1'): $(this).val('');
            });
        }

        function prepareHash() {
            $('#engine').change(function(event) {
                hash = getHashHandler();
                form.setDefaultPassLength(hash.getDefaultPassLength());
            });
            $('#engine').trigger('change');
        }

        function prepareFormSubmission() {
            $('form').submit(function(event) {
                event.preventDefault();
                form.hidePassword();

                if (form.runChecks()) {
                    form.showPassword(hash.getHash());
                    form.startTimeoutToClearForm(3000);
                }
            });
        }

        function init() {
            prepareInfoModal();
            prepareForm();
            prepareHash();
            prepareFormSubmission();
        }

        init();
    });
})(jQuery);