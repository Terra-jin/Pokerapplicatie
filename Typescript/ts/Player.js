var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var Player = /** @class */ (function () {
            function Player(deck) {
                this.deck = deck;
                this.cards = [];
                this.ranksCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.suitsCount = [0, 0, 0, 0];
                this.ranksCountCount = [0, 0, 0];
                this.handStrength = null;
                this.combos = [];
            }
            Player.prototype.GetCards = function (cards) {
                var _this = this;
                cards.forEach(function (card, cardIndex) {
                    _this.cards[cardIndex] = card;
                });
            };
            Player.prototype.GetVillainCards = function (cards) {
                var _this = this;
                cards.forEach(function (card, cardIndex) {
                    if (cardIndex > 1) {
                        _this.cards[cardIndex] = card;
                    }
                });
            };
            Player.prototype.GetCombo = function (combo) {
                this.cards[0] = combo.cards[0];
                this.cards[1] = combo.cards[1];
            };
            Player.prototype.GetRunoutCard = function (card, reference) {
                this.cards[reference] = card;
            };
            Player.prototype.SpliceRunoutCards = function (index, amount) {
                this.cards.splice(index, amount);
            };
            Player.prototype.CheckHandStrength = function () {
                this.Reset();
                this.CountRanks();
                this.CountSuits();
                this.CountRanksCount();
                this.CheckStraightFlush();
                return this.handStrength;
            };
            Player.prototype.Reset = function () {
                this.ResetRanksCount();
                this.suitsCount = [0, 0, 0, 0];
                this.ranksCountCount = [0, 0, 0];
                this.handStrength = null;
            };
            Player.prototype.ResetRanksCount = function () {
                this.ranksCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            };
            Player.prototype.CountRanks = function () {
                var _this = this;
                this.cards.forEach(function (Cards, CardsIndex) {
                    _this.ranksCount.forEach(function (RanksCount, RanksCountIndex) {
                        if (Cards.rank.value == RanksCountIndex) {
                            _this.ranksCount[RanksCountIndex]++;
                        }
                    });
                });
            };
            Player.prototype.CountSuits = function () {
                var _this = this;
                this.cards.forEach(function (Cards, CardsIndex) {
                    _this.suitsCount.forEach(function (SuitsCount, SuitsCountIndex) {
                        if (Cards.suit.value == SuitsCountIndex) {
                            _this.suitsCount[SuitsCountIndex]++;
                        }
                    });
                });
            };
            Player.prototype.CountRanksCount = function () {
                var _this = this;
                this.ranksCount.forEach(function (RanksCount, RanksCountIndex) {
                    _this.ranksCountCount.forEach(function (RanksCountCount, RanksCountCountIndex) {
                        if (RanksCount == 4 - RanksCountCountIndex) {
                            _this.ranksCountCount[RanksCountCountIndex]++;
                        }
                    });
                });
            };
            Player.prototype.CheckStraightFlush = function () {
                var straightCounter = 0;
                var flushSuit = null;
                if (Math.max.apply(Math, this.suitsCount) > 4) {
                    flushSuit = this.suitsCount.indexOf(Math.max.apply(Math, this.suitsCount));
                    this.cards.forEach(function (Cards, CardsIndex) {
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
                        }
                        else {
                            straightCounter++;
                            if (straightCounter > 4) {
                                this.handStrength = (i - 4) * Math.pow(10, 8);
                                straightCounter = 0;
                                break;
                            }
                        }
                    }
                    // resetten
                    this.cards.forEach(function (Cards, CardsIndex) {
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
            };
            Player.prototype.CheckQuads = function () {
                if (this.ranksCountCount[0] == 1) {
                    this.handStrength = 1 * Math.pow(10, 10);
                    this.handStrength += this.ranksCount.indexOf(Math.max.apply(Math, this.ranksCount)) * Math.pow(10, 8);
                    this.ranksCount[this.ranksCount.indexOf(Math.max.apply(Math, this.ranksCount))] = 0;
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
            };
            Player.prototype.CheckFullHouse = function () {
                if (this.ranksCountCount[0] == 0 && (this.ranksCountCount[1] == 2 || (this.ranksCountCount[1] == 1 && this.ranksCountCount[2] >= 1))) {
                    this.handStrength = 2 * Math.pow(10, 10);
                    this.handStrength += this.ranksCount.indexOf(3) * Math.pow(10, 8);
                    if (this.ranksCount.lastIndexOf(3) != this.ranksCount.indexOf(3)) {
                        this.handStrength += this.ranksCount.lastIndexOf(3) * Math.pow(10, 6);
                    }
                    else {
                        this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 6);
                    }
                }
                if (this.handStrength == null) {
                    this.CheckFlush();
                }
            };
            Player.prototype.CheckFlush = function () {
                var flushSuit = null;
                if (Math.max.apply(Math, this.suitsCount) > 4) {
                    this.handStrength = 3 * Math.pow(10, 10);
                    flushSuit = this.suitsCount.indexOf(Math.max.apply(Math, this.suitsCount));
                    this.cards.forEach(function (Cards, CardsIndex) {
                        if (Cards.suit.value != flushSuit) {
                            Cards.rank.value -= 100;
                        }
                    });
                    this.ResetRanksCount();
                    this.CountRanks();
                    var ranks = [];
                    this.cards.forEach(function (Cards, CardsIndex) {
                        if (Cards.rank.value > -1) {
                            ranks.push(Cards.rank.value);
                        }
                    });
                    ranks.sort(function (a, b) { return a - b; });
                    for (var i = 0; i < 5; i++) {
                        this.handStrength += ranks[i] * Math.pow(10, (8 - (i * 2)));
                    }
                    // resetten
                    this.cards.forEach(function (Cards, CardsIndex) {
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
            };
            Player.prototype.CheckStraight = function () {
                var straightCounter = 0;
                this.ranksCount[13] = this.ranksCount[0];
                for (var i = 0; i < 14; i++) {
                    if (this.ranksCount[i] == 0) {
                        straightCounter = 0;
                    }
                    else {
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
            };
            Player.prototype.CheckTrips = function () {
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
            };
            Player.prototype.CheckTwoPair = function () {
                if (this.ranksCountCount[2] > 1) {
                    this.handStrength = 6 * Math.pow(10, 10);
                    this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 8);
                    this.ranksCount[this.ranksCount.indexOf(2)] = -1;
                    this.handStrength += this.ranksCount.indexOf(2) * Math.pow(10, 6);
                    this.ranksCount[this.ranksCount.indexOf(2)] = -1;
                    for (var q = 0; q < this.ranksCount.length; q++) {
                        if (this.ranksCount[q] > 0) {
                            this.handStrength += q * Math.pow(10, 4);
                            break;
                        }
                    }
                }
                if (this.handStrength == null) {
                    this.CheckPair();
                }
            };
            Player.prototype.CheckPair = function () {
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
            };
            Player.prototype.CheckHighCard = function () {
                this.handStrength = 8 * Math.pow(10, 10);
                for (var i = 0; i < 5; i++) {
                    this.handStrength += this.ranksCount.indexOf(1) * Math.pow(10, (8 - (i * 2)));
                    this.ranksCount[this.ranksCount.indexOf(1)] = -1;
                }
            };
            return Player;
        }());
        Test.Player = Player;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
//# sourceMappingURL=Player.js.map