var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var Card = /** @class */ (function () {
            function Card(rank, suit) {
                this.rank = rank;
                this.suit = suit;
                this.display = null;
                this.display = rank.key + suit.key;
            }
            return Card;
        }());
        Test.Card = Card;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
//# sourceMappingURL=Card.js.map