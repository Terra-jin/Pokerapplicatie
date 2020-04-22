namespace Kerstens.Test {

    export class PlayedPhase {

        private villain: Player = null;
        private hero: Player = null;
        public combos: Combo[] = [];


        constructor(
            private phase: string,
            private cards: Card[],
            private deck: Card[],
            private cardRanks: string[],
            private cardSuits: string[]
        ) {

            this.hero = new Player(this.deck);
            this.villain = new Player(this.deck);

            this.hero.GetCards(this.cards);
            this.villain.GetVillainCards(this.cards);

            this.CreateCombos();

        }

        private CreateCombos() {

            var comboCounter: number = 0;

            for (var k = 0; k < this.deck.length - 1; k++) {

                for (var l = 0; l < this.deck.length - 1 - k; l++) {

                    // maak nieuwe combo
                    this.combos[comboCounter] = new Combo;

                    this.combos[comboCounter].cards[0] = this.deck[k];
                    this.combos[comboCounter].cards[1] = this.deck[k + l + 1];

                    // geef combokaarten aan villain
                    this.villain.GetCombo(this.combos[comboCounter]);

                    this.CheckResult(comboCounter);

                    // odds niet relevant voor river
                    if (this.cards.length != 7) {

                        this.CheckOdds(comboCounter);

                    }

                    comboCounter++;

                }

            }

        }

        private CheckResult(comboCounter: number) {

            var heroHandStrength: number = this.hero.CheckHandStrength();
            var villainHandStrength: number = this.villain.CheckHandStrength();

            this.combos[comboCounter].handStrength = villainHandStrength;

            if (villainHandStrength > heroHandStrength) {
                this.combos[comboCounter].result = "Hero wins";
                if (this.cards.length == 7) {
                    this.combos[comboCounter].odds2Win = 1;
                }
            } else if (villainHandStrength < heroHandStrength) {
                this.combos[comboCounter].result = "Hero loses";
                if (this.cards.length == 7) {
                    this.combos[comboCounter].odds2Lose = 1;
                }
            } else {
                this.combos[comboCounter].result = "It's a tie";
                if (this.cards.length == 7) {
                    this.combos[comboCounter].odds2Tie = 1;
                }
            }

        }

        private CheckOdds(comboCounter: number) {

            var runoutCounter: number = 0;

            var runoutsWon: number = 0;
            var runoutsLost: number = 0;
            var runoutsTied: number = 0;

            var comboIndeces: number[] = [];

            var combo: Combo = this.combos[comboCounter];

            // haal kaarten van combo uit deck
            comboIndeces[0] = this.deck.findIndex(function (card) {

                return card.display === combo.cards[0].display;

            });
            comboIndeces[1] = this.deck.findIndex(function (card) {

                return card.display === combo.cards[1].display;

            });

            this.deck.splice(comboIndeces[1], 1);
            this.deck.splice(comboIndeces[0], 1);

            // maak nieuwe runout
            if (this.cards.length == 5) {

                for (var m = 0; m < this.deck.length - 1; m++) {

                    // geef turn aan hero en villain
                    this.hero.GetRunoutCard(this.deck[m], 5);
                    this.villain.GetRunoutCard(this.deck[m], 5);

                    for (var n = 0; n < this.deck.length - 1 - m; n++) {

                        // geef river aan hero en villain
                        this.hero.GetRunoutCard(this.deck[m + n + 1], 6);
                        this.villain.GetRunoutCard(this.deck[m + n + 1], 6);

                        // check odds
                        var heroHandStrength: number = this.hero.CheckHandStrength();
                        var villainHandStrength: number = this.villain.CheckHandStrength()

                        if (villainHandStrength > heroHandStrength) {
                            runoutsWon++;
                        } else if (villainHandStrength < heroHandStrength) {
                            runoutsLost++;
                        } else {
                            runoutsTied++;
                        }

                        runoutCounter++;

                    }

                }

                // administreer odds
                this.combos[comboCounter].odds2Win = runoutsWon / runoutCounter;
                this.combos[comboCounter].odds2Lose = runoutsLost / runoutCounter;
                this.combos[comboCounter].odds2Tie = runoutsTied / runoutCounter;

                // haal turn en river weg van hero en villain
                this.hero.SpliceRunoutCards(5, 2);
                this.villain.SpliceRunoutCards(5, 2);

            } else {

                // maak nieuwe runout
                this.deck.forEach((River, RiverIndex) => {

                    // geef river aan hero en villain
                    this.hero.GetRunoutCard(River, 6);
                    this.villain.GetRunoutCard(River, 6);

                    // check odds
                    var heroHandStrength: number = this.hero.CheckHandStrength();
                    var villainHandStrength: number = this.villain.CheckHandStrength()

                    if (villainHandStrength > heroHandStrength) {
                        runoutsWon++;
                    } else if (villainHandStrength < heroHandStrength) {
                        runoutsLost++;
                    } else {
                        runoutsTied++;
                    }

                });

                // administreer odds
                this.combos[comboCounter].odds2Win = runoutsWon / this.deck.length;
                this.combos[comboCounter].odds2Lose = runoutsLost / this.deck.length;
                this.combos[comboCounter].odds2Tie = runoutsTied / this.deck.length;

                // haal river weg van hero en villain
                this.hero.SpliceRunoutCards(6, 1);
                this.villain.SpliceRunoutCards(6, 1);

            }

            // stop kaarten van combo terug in deck
            this.deck.splice(comboIndeces[0], 0, combo.cards[0])
            this.deck.splice(comboIndeces[1], 0, combo.cards[1])

        }

    }

}