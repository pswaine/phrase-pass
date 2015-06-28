var HashHandlerV2 = {

    defaultPassLength: 30,
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
    capitalLetterMap: {
        'a': 'U', 
        'b': 'V', 
        'c': 'W', 
        'd': 'X', 
        'e': 'Y', 
        'f': 'Z', 
    },

    getDefaultPassLength: function() {
        return this.defaultPassLength;
    },

    getHash: function() {
        $.sha512 = sha512;

        this.passStringFull = $('#siteIdentifier').val() + $('#passPhrase').val();
        for (var i = 0; i < 10000; i++) {
            this.passStringFull = $.sha512(this.passStringFull);
        }
        this.passString = this.passStringFull.substring(0, $('#passLength').val());

        var passStringMidPoint = Math.ceil(this.passString.length / 2);
        var passStringLeft = this.passString.substring(0, passStringMidPoint);
        var passStringRight = this.passString.substring((passStringMidPoint), this.passString.length);

        if ($('#capitalLetter').val() != '') {
            var capitalLetter = this.getCapitalLetter();
            passStringRight = passStringRight.substring(0, 3) + capitalLetter + passStringRight.substring(4, passStringRight.length);
        }

        if ($('#specialCharacter').val() != '') {
            var specialCharacter = this.getSpecialCharacter();
            passStringLeft = passStringLeft.substring(0, (passStringLeft.length - 3)) + specialCharacter + passStringLeft.substring((passStringLeft.length - 2), passStringLeft.length);
        }

        this.passString = passStringLeft + passStringRight;

        return this.passString;
    },

    getCapitalLetter: function() {
        var capitalLetter = null;
        for (var i = (this.passStringFull.length - 1); (capitalLetter == null && i >= 0); i--) {
            if (isNaN(this.passStringFull.charAt(i))) {
                capitalLetter = this.capitalLetterMap[this.passStringFull.charAt(i)];
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
