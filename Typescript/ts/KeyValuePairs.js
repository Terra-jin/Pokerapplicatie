var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var KeyValuePair = /** @class */ (function () {
            function KeyValuePair(key, value) {
                this.key = key;
                this.value = value;
            }
            return KeyValuePair;
        }());
        Test.KeyValuePair = KeyValuePair;
        var KeyValuePairString = /** @class */ (function () {
            function KeyValuePairString(key, value) {
                this.key = key;
                this.value = value;
            }
            return KeyValuePairString;
        }());
        Test.KeyValuePairString = KeyValuePairString;
        var KeyValuesPairNumber = /** @class */ (function () {
            function KeyValuesPairNumber(key, value1, value2) {
                this.key = key;
                this.value1 = value1;
                this.value2 = value2;
            }
            return KeyValuesPairNumber;
        }());
        Test.KeyValuesPairNumber = KeyValuesPairNumber;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
//# sourceMappingURL=KeyValuePairs.js.map