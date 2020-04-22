var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var PlayedPhase = /** @class */ (function () {
            function PlayedPhase(phase, cards, deck, cardRanks, cardSuits) {
                this.phase = phase;
                this.cards = cards;
                this.deck = deck;
                this.cardRanks = cardRanks;
                this.cardSuits = cardSuits;
                this.villain = null;
                this.hero = null;
                this.combos = [];
                this.hero = new Test.Player(this.deck);
                this.villain = new Test.Player(this.deck);
                this.hero.GetCards(this.cards);
                this.villain.GetVillainCards(this.cards);
                this.CreateCombos();
            }
            PlayedPhase.prototype.CreateCombos = function () {
                var comboCounter = 0;
                for (var k = 0; k < this.deck.length - 1; k++) {
                    for (var l = 0; l < this.deck.length - 1 - k; l++) {
                        // maak nieuwe combo
                        this.combos[comboCounter] = new Test.Combo;
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
            };
            PlayedPhase.prototype.CheckResult = function (comboCounter) {
                var heroHandStrength = this.hero.CheckHandStrength();
                var villainHandStrength = this.villain.CheckHandStrength();
                if (villainHandStrength > heroHandStrength) {
                    this.combos[comboCounter].result = "Hero wins";
                    if (this.cards.length == 7) {
                        this.combos[comboCounter].odds2Win = 1;
                    }
                }
                else if (villainHandStrength < heroHandStrength) {
                    this.combos[comboCounter].result = "Hero loses";
                    if (this.cards.length == 7) {
                        this.combos[comboCounter].odds2Lose = 1;
                    }
                }
                else {
                    this.combos[comboCounter].result = "It's a tie";
                    if (this.cards.length == 7) {
                        this.combos[comboCounter].odds2Tie = 1;
                    }
                }
            };
            PlayedPhase.prototype.CheckOdds = function (comboCounter) {
                var _this = this;
                var runoutCounter = 0;
                var runoutsWon = 0;
                var runoutsLost = 0;
                var runoutsTied = 0;
                var comboIndeces = [];
                var combo = this.combos[comboCounter];
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
                            var heroHandStrength = this.hero.CheckHandStrength();
                            var villainHandStrength = this.villain.CheckHandStrength();
                            if (villainHandStrength > heroHandStrength) {
                                runoutsWon++;
                            }
                            else if (villainHandStrength < heroHandStrength) {
                                runoutsLost++;
                            }
                            else {
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
                }
                else {
                    // maak nieuwe runout
                    this.deck.forEach(function (River, RiverIndex) {
                        // geef river aan hero en villain
                        _this.hero.GetRunoutCard(River, 6);
                        _this.villain.GetRunoutCard(River, 6);
                        // check odds
                        var heroHandStrength = _this.hero.CheckHandStrength();
                        var villainHandStrength = _this.villain.CheckHandStrength();
                        if (villainHandStrength > heroHandStrength) {
                            runoutsWon++;
                        }
                        else if (villainHandStrength < heroHandStrength) {
                            runoutsLost++;
                        }
                        else {
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
                this.deck.splice(comboIndeces[0], 0, combo.cards[0]);
                this.deck.splice(comboIndeces[1], 0, combo.cards[1]);
            };
            return PlayedPhase;
        }());
        Test.PlayedPhase = PlayedPhase;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
//# sourceMappingURL=PlayedPhases.js.map