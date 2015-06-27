var HashHandlerV1 = {

    defaultPassLength: 12,
    passStringFull: null,
    passString: null,
    specialCharacterMap: {
        '0': '!', 
        '1': '@', 
        '2': '£', 
        '3': '$', 
        '4': '%', 
        '5': '^', 
        '6': '&', 
        '7': '*', 
        '8': '~', 
        '9': '?'
    },

    getDefaultPassLength: function() {
        return this.defaultPassLength;
    },

    getHash: function() {
        this.passStringFull = $('#siteIdentifier').val() + $('#passPhrase').val();
        for (var i = 0; i < 1000; i++) {
            this.passStringFull = $.sha256(this.passStringFull);
        }
        this.passString = this.passStringFull.substring(0, $('#passLength').val());

        if ($('#capitalLetter').val() != '') {
            var capitalLetter = this.getCapitalLetter();
            this.passString = capitalLetter + this.passString.substring(1, this.passString.length);
        }

        if ($('#specialCharacter').val() != '') {
            var specialCharacter = this.getSpecialCharacter();
            this.passString = this.passString.substring(0, (this.passString.length - 1)) + specialCharacter;
        }

        return this.passString;
    },

    getCapitalLetter: function() {
        var capitalLetter = null;
        for (var i = (this.passStringFull.length - 1); (capitalLetter == null && i >= 0); i--) {
            if (isNaN(this.passStringFull.charAt(i))) {
                capitalLetter = this.passStringFull.charAt(i).toUpperCase();
            }
        }
        return capitalLetter;
    },

    getSpecialCharacter: function() {
        var specialCharacter = null;
        for (var i = (this.passStringFull.length - 1); (specialCharacter == null && i >= 0); i--) {
            if (!isNaN(this.passStringFull.charAt(i))) {
                specialCharacter = this.specialCharacterMap[this.passStringFull.charAt(i)];
            }
        }
        return specialCharacter;
    }

};
