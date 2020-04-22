namespace Kerstens.Test {

    export class Card {

        public display: string = null;

        constructor(public rank: KeyValuePair, public suit: KeyValuePair) {

            this.display = rank.key + suit.key;

        }

    }

}