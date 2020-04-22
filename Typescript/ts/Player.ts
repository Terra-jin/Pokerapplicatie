namespace Kerstens.Test {

    export class Player {

        private cards: Card[] = [];

        private ranksCount: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        private suitsCount: number[] = [0, 0, 0, 0];
        private ranksCountCount: number[] = [0, 0, 0];
        private handStrength: number = null;

        private combos: Combo[] = [];

        constructor(private deck: Card[]) {

        }

        public GetCards(cards: Card[]) {

            cards.forEach((card, cardIndex) => {

                this.cards[cardIndex] = card;

            });

        }
        public GetVillainCards(cards: Card[]) {

            cards.forEach((card, cardIndex) => {

                if (cardIndex > 1) {

                    this.cards[cardIndex] = card;

                }

            });

        }
        public GetCombo(combo: Combo) {

            this.cards[0] = combo.cards[0];
            this.cards[1] = combo.cards[1];

        }
        public GetRunoutCard(card: Card, reference: number) {

            this.cards[reference] = card;

        }
        public SpliceRunoutCards(index: number, amount: number) {

            this.cards.splice(index, amount);

        }

        public CheckHandStrength() {

            this.Reset();
            this.CountRanks();
            this.CountSuits();
            this.CountRanksCount();
            this.CheckStraightFlush();

            return this.handStrength;

        }

        private Reset() {

            this.ResetRanksCount();
            this.suitsCount = [0, 0, 0, 0];
            this.ranksCountCount = [0, 0, 0];
            this.handStrength = null;

        }
        private ResetRanksCount() {
            this.ranksCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        private CountRanks() {

            this.cards.forEach((Cards, CardsIndex) => {

                this.ranksCount.forEach((RanksCount, RanksCountIndex) => {

                    if (Cards.rank.value == RanksCountIndex) {

                        this.ranksCount[RanksCountIndex]++;

                    }

                });

            });

        }
        private CountSuits() {

            this.cards.forEach((Cards, CardsIndex) => {

                this.suitsCount.forEach((SuitsCount, SuitsCountIndex) => {

                    if (Cards.suit.value == SuitsCountIndex) {

                        this.suitsCount[SuitsCountIndex]++;

                    }

                });

            });

        }
        private CountRanksCount() {

            this.ranksCount.forEach((RanksCount, RanksCountIndex) => {

                this.ranksCountCount.forEach((RanksCountCount, RanksCountCountIndex) => {

                    if (RanksCount == 4 - RanksCountCountIndex) {

                        this.ranksCountCount[RanksCountCountIndex]++;

                    }

                });

            });

        }

        private CheckStraightFlush() {

            var straightCounter: number = 0;

            var flushSuit: number = null;

            if (Math.max(...this.suitsCount) > 4) {

                flushSuit = this.suitsCount.indexOf(Math.max(...this.suitsCount));

                this.cards.forEach((Cards, CardsIndex) => {

                    if (Cards.suit.value != flushSuit) {

                        Cards.rank.value -= 100;

                    }

                });

                this.ResetRanksCount();

                this.CountRanks();

                this.ranksCount[13] = this.ranksCount[0];

                for (var i = 0; i < 14; i++) {

                    if (this.ranksCount[i] < 1) {

                        straightCounter = 0;

                    } else {

                        straightCounter++;

                        if (straightCounter > 4) {

                            this.handStrength = (i - 4) * Math.pow(10, 8);

                            straightCounter = 0;

                            break;

                        }

                    }

                }

                // resetten

                this.cards.forEach((Cards, CardsIndex) => {

                    if (Cards.suit.value != flushSuit) {

                        Cards.rank.value += 100;

                    }

                });

                this.ResetRanksCount();

                this.CountRanks();

            }

            if (this.handStrength == null) {

                this.CheckQuads();

            }

        }
        private CheckQuads() {

            if (this.ranksCountCount[0] == 1) {

                this.handStrength = 1 * Math.pow(10, 10);

                this.handStrength += this.ranksCount.indexOf(Math.max(...this.ranksCount)) * Math.pow(10, 8);

                this.ranksCount[this.ranksCount.indexOf(Math.max(...this.ranksCount))] = 0;

                for (var i = 0; i < 14; i++) {

                    if (this.ranksCount[i] > 0) {

                        this.handStrength += i * Math.pow(10, 6);

                        return;

                    }

                }

            }

            if (this.handStrength == null) {

                this.CheckFullHouse();

            }

        }
        private CheckFullHouse() {

            if (this.ranksCountCount[0] == 0 && (this.ranksCountCount[1] == 2 || (this.ranksCountCount[1] == 1 && this.ranksCountCount[2] >= 1))) {

                this.handStrength = 2 * Math.pow(10, 10);

                this.handStrength += this.ranksCount.indexOf(3) * Math.pow(10, 8);

                if (this.ranksCount.lastIndexOf(3) != this.ranksCount.indexOf(3)) {

                    this.handStrength += this.ranksCount.lastIndexOf(3) * Math.pow(10, 6);

                } else {

                    this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 6);

                }

            }

            if (this.handStrength == null) {

                this.CheckFlush();

            }

        }
        private CheckFlush() {

            var flushSuit: number = null;

            if (Math.max(...this.suitsCount) > 4) {

                this.handStrength = 3 * Math.pow(10, 10);

                flushSuit = this.suitsCount.indexOf(Math.max(...this.suitsCount));

                this.cards.forEach((Cards, CardsIndex) => {

                    if (Cards.suit.value != flushSuit) {

                        Cards.rank.value -= 100;

                    }

                });

                this.ResetRanksCount();

                this.CountRanks();

                var ranks: number[] = [];

                this.cards.forEach((Cards, CardsIndex) => {

                    if (Cards.rank.value > -1) {

                        ranks.push(Cards.rank.value);

                    }

                });

                ranks.sort(function (a, b) { return a - b });

                for (var i: number = 0; i < 5; i++) {

                    this.handStrength += ranks[i] * Math.pow(10, (8 - (i * 2)));

                }

                // resetten

                this.cards.forEach((Cards, CardsIndex) => {

                    if (Cards.suit.value != flushSuit) {

                        Cards.rank.value += 100;

                    }

                });

                this.ResetRanksCount();

                this.CountRanks();

            }

            if (this.handStrength == null) {

                this.CheckStraight();

            }

        }
        private CheckStraight() {

            var straightCounter: number = 0;

            this.ranksCount[13] = this.ranksCount[0];

            for (var i: number = 0; i < 14; i++) {

                if (this.ranksCount[i] == 0) {

                    straightCounter = 0;

                } else {

                    straightCounter++;

                    if (straightCounter > 4) {

                        this.handStrength = 4 * Math.pow(10, 10);

                        this.handStrength += (i - 4) * Math.pow(10, 8);

                        straightCounter = 0;

                        break;

                    }

                }

            }

            this.ranksCount[13] = 0;

            if (this.handStrength == null) {

                this.CheckTrips();

            }

        }
        private CheckTrips() {

            if (this.ranksCountCount[1] == 1) {

                this.handStrength = 5 * Math.pow(10, 10);

                this.handStrength += this.ranksCount.indexOf(3) * Math.pow(10, 8);

                this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, 6);

                this.ranksCount[this.ranksCount.indexOf(1)] = -1;

                this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, 4);

            }

            if (this.handStrength == null) {

                this.CheckTwoPair();

            }

        }
        private CheckTwoPair() {

            if (this.ranksCountCount[2] > 1) {

                this.handStrength = 6 * Math.pow(10, 10);

                this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 8);

                this.ranksCount[this.ranksCount.indexOf(2)] = -1;

                this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 6);

                this.ranksCount[this.ranksCount.indexOf(2)] = -1;

                for (var q: number = 0; q < this.ranksCount.length; q++) {

                    if (this.ranksCount[q] > 0) {

                        this.handStrength += q * Math.pow(10, 4);

                        break;

                    }

                }

            }

            if (this.handStrength == null) {

                this.CheckPair();

            }

        }
        private CheckPair() {

            if (this.ranksCountCount[2] == 1) {

                this.handStrength = 7 * Math.pow(10, 10);

                this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 8);

                this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, 6);

                this.ranksCount[this.ranksCount.indexOf(1)] = -1;

                this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, 4);

                this.ranksCount[this.ranksCount.indexOf(1)] = -1;

                this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, 2);

            }

            if (this.handStrength == null) {

                this.CheckHighCard();

            }

        }
        private CheckHighCard() {

            this.handStrength = 8 * Math.pow(10, 10);

            for (var i: number = 0; i < 5; i++) {

                this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, (8 - (i * 2)));

                this.ranksCount[this.ranksCount.indexOf(1)] = -1;

            }

        }

    }

}


