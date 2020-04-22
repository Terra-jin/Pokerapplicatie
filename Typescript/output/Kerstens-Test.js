var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var Card = (function () {
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
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var Combo = (function () {
            function Combo() {
                this.cards = [];
                this.result = null;
                this.odds2Win = 0;
                this.odds2Lose = 0;
                this.odds2Tie = 0;
                this.handStrength = null;
                this.id = null;
                this.eliminated = false;
            }
            return Combo;
        }());
        Test.Combo = Combo;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var HandPhase;
        (function (HandPhase) {
            HandPhase[HandPhase["preflop"] = 1] = "preflop";
            HandPhase[HandPhase["flop"] = 5] = "flop";
            HandPhase[HandPhase["turn"] = 6] = "turn";
            HandPhase[HandPhase["river"] = 7] = "river";
        })(HandPhase = Test.HandPhase || (Test.HandPhase = {}));
        var Game = (function () {
            function Game() {
                this.cardRanks = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
                this.cardSuits = ['s', 'h', 'c', 'd'];
                this.cardColors = ['black', 'red', 'green', 'blue'];
                this.deck = [];
                this.selectedCards = [];
                this.playedPhases = [];
                this.phase = Kerstens.Test.HandPhase[1];
                this.rankedPP = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22'];
                this.rankedBW = ['AKs', 'AQs', 'KQs', 'AJs', 'KJs', 'AKo', 'ATs', 'QJs', 'KTs', 'QTs', 'JTs', 'AQo', 'KQo', 'AJo', 'KJo', 'QJo', 'ATo', 'KTo', 'JTo', 'QTo'];
                this.rankedSC = ['T9s', '98s', '87s', '76s', '65s', '54s'];
                this.rankedS1G = ['J9s', 'T8s', '97s', '86s', '75s', '64s', '53s', '43s'];
                this.rankedS2G = ['Q9s', 'J8s', 'T7s', '96s', '85s', '74s', '63s', '52s', '42s'];
                this.rankedSA = ['A9s', 'A8s', 'A5s', 'A7s', 'A4s', 'A3s', 'A6s', 'A2s'];
                this.rankedAA = ['A9o', 'A8o', 'A5o', 'A7o', 'A4o', 'A3o', 'A6o', 'A2o'];
                this.rankedOC = ['T9o', '98o', '87o', '76o', '65o', '54o'];
                this.rankedO1G = ['J9o', 'T8o', '97o', '86o', '75o', '64o', '53o', '43o'];
                this.rankedT = ['K9s', 'K8s', 'Q8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K2s', 'K3s', 'Q7s', 'J7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'T6s', 'Q2s', 'J6s', 'K9o', 'J5s', 'Q9o', 'J4s', 'J3s', '95s', 'J2s', 'T5s', '84s', 'T4s', 'T3s', 'T2s', '73s', '32s', '94s', '93s', 'J8o', '62s', '92s', 'K8o', 'Q8o', '83s', '82s', '72s', 'K7o', 'T7o', 'K6o', 'K5o', 'J7o', 'Q7o', 'K4o', 'K3o', '96o', 'K2o', 'Q6o', '85o', 'T6o', 'Q5o', 'Q4o', 'Q3o', '74o', 'Q2o', 'J6o', '63o', 'J5o', '95o', '52o', 'J4o', 'J3o', '42o', 'J2o', '84o', 'T5o', 'T4o', '32o', 'T3o', '73o', 'T2o', '62o', '94o', '93o', '92o', '83o', '82o', '72o'];
                this.eliminatedPPs = [];
                this.eliminatedBWs = [];
                this.eliminatedSCs = [];
                this.eliminatedS1Gs = [];
                this.eliminatedS2Gs = [];
                this.eliminatedSAs = [];
                this.eliminatedAAs = [];
                this.eliminatedOCs = [];
                this.eliminatedO1Gs = [];
                this.eliminatedTs = [];
                this.shownPhase = null;
            }
            Object.defineProperty(Game, "Instance", {
                get: function () {
                    return this._instance || (this._instance = new this());
                },
                enumerable: true,
                configurable: true
            });
            Game.prototype.Initialize = function () {
                this.GenerateDeck();
                this.GenerateInputTable();
                this.GenerateResultsTable();
                this.GenerateEliminatedCombosReference(this.rankedPP, this.eliminatedPPs);
                this.GenerateEliminatedCombosReference(this.rankedBW, this.eliminatedBWs);
                this.GenerateEliminatedCombosReference(this.rankedSC, this.eliminatedSCs);
                this.GenerateEliminatedCombosReference(this.rankedS1G, this.eliminatedS1Gs);
                this.GenerateEliminatedCombosReference(this.rankedS2G, this.eliminatedS2Gs);
                this.GenerateEliminatedCombosReference(this.rankedSA, this.eliminatedSAs);
                this.GenerateEliminatedCombosReference(this.rankedAA, this.eliminatedAAs);
                this.GenerateEliminatedCombosReference(this.rankedOC, this.eliminatedOCs);
                this.GenerateEliminatedCombosReference(this.rankedO1G, this.eliminatedO1Gs);
                this.GenerateEliminatedCombosReference(this.rankedT, this.eliminatedTs);
            };
            Game.prototype.GenerateDeck = function () {
                var _this = this;
                this.deck = [];
                this.cardRanks.forEach(function (cardRank, cardRankIndex) {
                    _this.cardSuits.forEach(function (cardSuit, cardSuitIndex) {
                        var card = new Test.Card(new Test.KeyValuePair(cardRank, cardRankIndex), new Test.KeyValuePair(cardSuit, cardSuitIndex));
                        _this.deck.push(card);
                    });
                });
            };
            Game.prototype.GenerateInputTable = function () {
                var _this = this;
                Test.RenderInputTable(document.querySelector("#placeholderInputTable"), this.deck, (function (card) {
                    _this.SelectCard(card);
                }));
            };
            Game.prototype.SelectCard = function (card) {
                if (this.selectedCards.length == 7 || document.getElementById(card.display).innerHTML == "..") {
                    return;
                }
                document.getElementById("Card-" + this.selectedCards.length.toString()).innerHTML = card.display;
                this.FixFontColorSelectedCards();
                this.selectedCards.push(card);
                this.deck.splice(this.deck.indexOf(card), 1);
                this.SetPhase();
                if (this.phase != Kerstens.Test.HandPhase[1]) {
                    this.ShowButton(this.phase);
                    this.playedPhases.push(new Test.PlayedPhase(this.phase, this.selectedCards, this.deck, this.cardRanks, this.cardSuits));
                }
            };
            Game.prototype.FixFontColorSelectedCards = function () {
                var _this = this;
                this.cardColors.forEach(function (color, suit) {
                    if (document.getElementById("Card-" + _this.selectedCards.length.toString()).innerHTML.includes(_this.cardSuits[suit]) == true) {
                        document.getElementById("Card-" + _this.selectedCards.length.toString()).style.color = color;
                    }
                });
            };
            Game.prototype.SetPhase = function () {
                if (this.selectedCards.length < 5) {
                    return;
                }
                else {
                    this.phase = Kerstens.Test.HandPhase[this.selectedCards.length];
                }
            };
            Game.prototype.GenerateResultsTable = function () {
                var ranksCombinations = [];
                this.GenerateRanksCombinations(ranksCombinations);
                var startingHands = [];
                this.GenerateStartingHands(startingHands);
                var table = jQuery("<table></table>");
                var tr = jQuery("<tr></tr>");
                tr = null;
                var counter = 0;
                for (var i = 0; i < 13; i++) {
                    if (i == 0) {
                        table.append('<tr></tr>');
                        var tr = jQuery("<tr></tr>");
                        for (var j = 0; j < 14; j++) {
                            if (j == 0) {
                                tr.append('<td class="ext"><table><tr><td class="int"><div class="ss"></div></td><td class="int"><div class="hs"></div></td><td class="int"><div class="cs"></div></td><td class="int"><div class="ds"></div></td></tr><tr><td class="int"><div class="sh"></div></td><td class="int"><div class="hh"></div></td><td class="int"><div class="ch"></div></td><td class="int"><div class="dh"></div></td></tr><tr><td class="int"><div class="sc"></div></td><td class="int"><div class="hc"></div></td><td class="int"><div class="cc"></div></td><td class="int"><div class="dc"></div></td></tr><tr><td class="int"><div class="sd"></div></td><td class="int"><div class="hd"></div></td><td class="int"><div class="cd"></div></td><td class="int"><div class="dd"></div></td></tr></table></td>');
                            }
                            if (j > 0) {
                                tr.append('<td class="ext">' + this.cardRanks[j - 1] + '</td>');
                            }
                        }
                    }
                    for (var y = 0; y < 13; y++) {
                        if (y == 0) {
                            if (tr != null) {
                                table.append(tr);
                            }
                            var tr = jQuery("<tr></tr>");
                            tr.append('<td class="ext">' + this.cardRanks[i] + '</td>');
                        }
                        tr.append('<td class="ext"><table><tr><td class="int" id="' + startingHands[counter] + '1" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '2" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '3" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '4" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td></tr><tr><td class="int" id="' + startingHands[counter] + '5" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '6" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '7" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '8" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td></tr><tr><td class="int" id="' + startingHands[counter] + '9" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '10" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '11" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '12" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td></tr><tr><td class="int" id="' + startingHands[counter] + '13" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '14" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '15" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td><td class="int" id="' + startingHands[counter] + '16" onmouseover="Kerstens.Test.Game.Instance.ShowEquity(this.id)"></td></tr></table></td>');
                        counter++;
                    }
                }
                table.append(tr);
                jQuery("#demo").after("<br>");
                jQuery("#demo").after(table);
                this.PrepareResultsTable(ranksCombinations);
            };
            Game.prototype.GenerateRanksCombinations = function (ranksCombinations) {
                var k = 0;
                for (var i = 0; i < 13; i++) {
                    for (var j = i; j < 13; j++) {
                        ranksCombinations[k] = this.cardRanks[i].toString() + this.cardRanks[j].toString();
                        k++;
                    }
                }
            };
            Game.prototype.GenerateStartingHands = function (startingHands) {
                var k = 0;
                for (var i = 0; i < 13; i++) {
                    for (var j = 0; j < 13; j++) {
                        if (i > j) {
                            startingHands[k] = this.cardRanks[j].toString() + this.cardRanks[i].toString() + "o";
                            k++;
                        }
                        if (i == j) {
                            startingHands[k] = this.cardRanks[j].toString() + this.cardRanks[i].toString();
                            k++;
                        }
                        if (i < j) {
                            startingHands[k] = this.cardRanks[i].toString() + this.cardRanks[j].toString() + "s";
                            k++;
                        }
                    }
                }
            };
            Game.prototype.PrepareResultsTable = function (ranksCombinations) {
                var tablePositionsPocketPair = ["5", "9", "10", "13", "14", "15"];
                var tablePositionsNonPocketPair = [];
                this.GenerateTablePositionsNonPocketPair(tablePositionsNonPocketPair);
                for (var i = 0; i < ranksCombinations.length; i++) {
                    if (ranksCombinations[i].charAt(0) == ranksCombinations[i].charAt(1)) {
                        for (var j = 0; j < tablePositionsPocketPair.length; j++) {
                            document.getElementById(ranksCombinations[i] + tablePositionsPocketPair[j]).style.backgroundColor = "black";
                        }
                    }
                    else {
                        for (j = 0; j < tablePositionsNonPocketPair.length; j++) {
                            document.getElementById(ranksCombinations[i] + tablePositionsNonPocketPair[j]).style.backgroundColor = "black";
                        }
                    }
                }
            };
            Game.prototype.GenerateTablePositionsNonPocketPair = function (tablePositionsNonPocketPair) {
                for (var i = 0; i < 16; i++) {
                    if (i == 0 || i == 5 || i == 10 || i == 15) {
                        tablePositionsNonPocketPair[i] = "s" + (i + 1).toString();
                    }
                    else {
                        tablePositionsNonPocketPair[i] = "o" + (i + 1).toString();
                    }
                }
            };
            Game.prototype.CompleteResultsTable = function (playedPhase) {
                var _this = this;
                var ranksCombinations = [];
                this.GenerateRanksCombinations(ranksCombinations);
                this.PrepareResultsTable(ranksCombinations);
                var totalWins = 0;
                var totalLosses = 0;
                var totalTies = 0;
                var totalEquity = 0;
                playedPhase.forEach(function (Combo, ComboIndex) {
                    if (Combo.cards[0].rank.value == Combo.cards[1].rank.value) {
                        _this.ColorCellResultsTable(Combo, "");
                    }
                    if (Combo.cards[0].rank.value != Combo.cards[1].rank.value && Combo.cards[0].suit.value == Combo.cards[1].suit.value) {
                        _this.ColorCellResultsTable(Combo, "s");
                    }
                    if (Combo.cards[0].rank.value != Combo.cards[1].rank.value && Combo.cards[0].suit.value != Combo.cards[1].suit.value) {
                        _this.ColorCellResultsTable(Combo, "o");
                    }
                    if (Combo.result == "Hero wins" && Combo.eliminated == false) {
                        totalWins++;
                        totalEquity += Combo.odds2Win + (Combo.odds2Tie * 0.5);
                    }
                    if (Combo.result == "Hero loses" && Combo.eliminated == false) {
                        totalLosses++;
                        totalEquity += Combo.odds2Win + (Combo.odds2Tie * 0.5);
                    }
                    if (Combo.result == "It's a tie" && Combo.eliminated == false) {
                        totalTies++;
                        totalEquity += Combo.odds2Win + (Combo.odds2Tie * 0.5);
                    }
                });
                document.getElementById("totalResults").innerHTML =
                    "Absolute hand strength rank: " + (100 * ((totalWins + (totalTies / 2)) / (totalWins + totalLosses + totalTies))).toFixed(2) + "%" +
                        "<br />Total equity against one opponent: " + (100 * totalEquity / (totalWins + totalLosses + totalTies)).toFixed(2) + "%";
                if (playedPhase.length == 1081) {
                    this.shownPhase = 0;
                }
                if (playedPhase.length == 1035) {
                    this.shownPhase = 1;
                }
                if (playedPhase.length == 990) {
                    this.shownPhase = 2;
                }
                this.GetHandCategoryPercentages(playedPhase);
            };
            Game.prototype.ColorCellResultsTable = function (Combo, reference) {
                var _this = this;
                Combo.eliminated = false;
                this.EliminateCombo(Combo, this.eliminatedPPs, "preFlopSliderPP");
                this.EliminateCombo(Combo, this.eliminatedBWs, "preFlopSliderBW");
                this.EliminateCombo(Combo, this.eliminatedSCs, "preFlopSliderSC");
                this.EliminateCombo(Combo, this.eliminatedS1Gs, "preFlopSliderS1G");
                this.EliminateCombo(Combo, this.eliminatedS2Gs, "preFlopSliderS2G");
                this.EliminateCombo(Combo, this.eliminatedSAs, "preFlopSliderSA");
                this.EliminateCombo(Combo, this.eliminatedAAs, "preFlopSliderAA");
                this.EliminateCombo(Combo, this.eliminatedOCs, "preFlopSliderOC");
                this.EliminateCombo(Combo, this.eliminatedO1Gs, "preFlopSliderO1G");
                this.EliminateCombo(Combo, this.eliminatedTs, "preFlopSliderT");
                var positionRef = [];
                this.GeneratePositionRef(positionRef);
                positionRef.forEach(function (PositionRef, PositionRefIndex) {
                    if (Combo.cards[0].suit.value == PositionRef.value1 && Combo.cards[1].suit.value == PositionRef.value2) {
                        var resultColorCode = [];
                        _this.GenerateResultColorCode(resultColorCode);
                        resultColorCode.forEach(function (Result, ResultIndex) {
                            if (Combo.result == Result.key) {
                                document.getElementById(Combo.cards[0].rank.key + Combo.cards[1].rank.key + reference + PositionRef.key.toString()).style.backgroundColor = Result.value;
                                Combo.id = Combo.cards[0].rank.key + Combo.cards[1].rank.key + reference + PositionRef.key.toString();
                            }
                        });
                        if (Combo.eliminated == true) {
                            document.getElementById(Combo.cards[0].rank.key + Combo.cards[1].rank.key + reference + PositionRef.key.toString()).style.backgroundColor = "black";
                        }
                    }
                });
            };
            Game.prototype.GeneratePositionRef = function (positionRef) {
                var k = 0;
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        positionRef[k] = new Test.KeyValuesPairNumber(k + 1, j, i);
                        k++;
                    }
                }
            };
            Game.prototype.GenerateResultColorCode = function (resultColorCode) {
                for (var i = 0; i < 3; i++) {
                    var result = ["Hero wins", "Hero loses", "It's a tie"];
                    var colorCode = ["green", "red", "yellow"];
                    resultColorCode[i] = new Test.KeyValuePairString(result[i], colorCode[i]);
                }
            };
            Game.prototype.GetHandCategoryPercentages = function (playedPhase) {
                var straightFlushHands = 0;
                var quadsHands = 0;
                var fullHouseHands = 0;
                var flushHands = 0;
                var straightHands = 0;
                var tripsHands = 0;
                var twoPairHands = 0;
                var pairHands = 0;
                var highCardHands = 0;
                var total = 0;
                playedPhase.forEach(function (Combo, ComboIndex) {
                    if (!Combo.eliminated) {
                        total++;
                        var rounded = Math.round(Combo.handStrength / Math.pow(10, 10));
                        switch (rounded) {
                            case 0:
                                straightFlushHands++;
                                break;
                            case 1:
                                quadsHands++;
                                break;
                            case 2:
                                fullHouseHands++;
                                break;
                            case 3:
                                flushHands++;
                                break;
                            case 4:
                                straightHands++;
                                break;
                            case 5:
                                tripsHands++;
                                break;
                            case 6:
                                twoPairHands++;
                                break;
                            case 7:
                                pairHands++;
                                break;
                            case 8:
                                highCardHands++;
                                break;
                            default:
                                alert("Ongeldige hand strength waarde: " + rounded);
                                break;
                        }
                    }
                });
                document.getElementById("straightFlushRank").innerHTML = "Straight flush hand rank: " + ((straightFlushHands / total) * 100).toFixed(6) + "%";
                document.getElementById("quadsRank").innerHTML = "Quads hand rank: " + ((quadsHands / total) * 100).toFixed(6) + "%";
                document.getElementById("fullHouseRank").innerHTML = "Full House hand rank: " + ((fullHouseHands / total) * 100).toFixed(6) + "%";
                document.getElementById("flushRank").innerHTML = "Flush hand rank: " + ((flushHands / total) * 100).toFixed(6) + "%";
                document.getElementById("straightRank").innerHTML = "Straight hand rank: " + ((straightHands / total) * 100).toFixed(6) + "%";
                document.getElementById("tripsRank").innerHTML = "Trips hand rank: " + ((tripsHands / total) * 100).toFixed(6) + "%";
                document.getElementById("twoPairRank").innerHTML = "Two Pair hand rank: " + ((twoPairHands / total) * 100).toFixed(6) + "%";
                document.getElementById("pairRank").innerHTML = "Pair hand rank: " + ((pairHands / total) * 100).toFixed(6) + "%";
                document.getElementById("highCardRank").innerHTML = "High Card hand rank: " + ((highCardHands / total) * 100).toFixed(6) + "%";
            };
            Game.prototype.EliminateCombo = function (Combo, comboGroup, sliderId) {
                comboGroup.forEach(function (elim, elimIndex) {
                    if (Combo.cards[0].rank.value == elim.value1 &&
                        Combo.cards[1].rank.value == elim.value2 &&
                        (Combo.cards[0].suit.value == Combo.cards[1].suit.value) == elim.value3 &&
                        elim.key > document.getElementById(sliderId).valueAsNumber) {
                        Combo.eliminated = true;
                    }
                });
            };
            Game.prototype.GenerateEliminatedCombosReference = function (rankedString, elimRefArray) {
                var _this = this;
                rankedString.forEach(function (rankedString, rankedStringIndex) {
                    var rank1 = null;
                    var rank2 = null;
                    var suited = false;
                    _this.cardRanks.forEach(function (rank, rankIndex) {
                        if (rankedString.charAt(0) == rank) {
                            rank1 = rankIndex;
                        }
                        if (rankedString.charAt(1) == rank) {
                            rank2 = rankIndex;
                        }
                        if (rankedString.charAt(2) == "s") {
                            suited = true;
                        }
                    });
                    var elim = new Test.EliminatedComboReference(elimRefArray.length + 1, rank1, rank2, suited);
                    elimRefArray.push(elim);
                });
            };
            Game.prototype.ShowButton = function (phase) {
                if (this.phase == "flop") {
                    document.getElementById("buttonFlop").style.visibility = "visible";
                }
                if (this.phase == "turn") {
                    document.getElementById("buttonTurn").style.visibility = "visible";
                }
                if (this.phase == "river") {
                    document.getElementById("buttonRiver").style.visibility = "visible";
                }
            };
            Game.prototype.ShowEquity = function (id) {
                if (this.shownPhase == null) {
                    return;
                }
                var combo = this.playedPhases[this.shownPhase].combos.filter(function (res) {
                    return res.id === id;
                });
                if (combo.length != 0) {
                    document.getElementById("equity").innerHTML = "Equity against " + combo[0].cards[0].rank.key + combo[0].cards[0].suit.key + combo[0].cards[1].rank.key + combo[0].cards[1].suit.key + ": " + (100 * (combo[0].odds2Win + combo[0].odds2Tie / 2)).toFixed(2).toString() + "%";
                }
            };
            Game.prototype.Reload = function () {
                location.reload();
            };
            return Game;
        }());
        Test.Game = Game;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
document.addEventListener("DOMContentLoaded", function () {
    Kerstens.Test.Game.Instance.Initialize();
});
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var KeyValuePair = (function () {
            function KeyValuePair(key, value) {
                this.key = key;
                this.value = value;
            }
            return KeyValuePair;
        }());
        Test.KeyValuePair = KeyValuePair;
        var KeyValuePairString = (function () {
            function KeyValuePairString(key, value) {
                this.key = key;
                this.value = value;
            }
            return KeyValuePairString;
        }());
        Test.KeyValuePairString = KeyValuePairString;
        var KeyValuesPairNumber = (function () {
            function KeyValuesPairNumber(key, value1, value2) {
                this.key = key;
                this.value1 = value1;
                this.value2 = value2;
            }
            return KeyValuesPairNumber;
        }());
        Test.KeyValuesPairNumber = KeyValuesPairNumber;
        var EliminatedComboReference = (function () {
            function EliminatedComboReference(key, value1, value2, value3) {
                this.key = key;
                this.value1 = value1;
                this.value2 = value2;
                this.value3 = value3;
            }
            return EliminatedComboReference;
        }());
        Test.EliminatedComboReference = EliminatedComboReference;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var PlayedPhase = (function () {
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
                        this.combos[comboCounter] = new Test.Combo;
                        this.combos[comboCounter].cards[0] = this.deck[k];
                        this.combos[comboCounter].cards[1] = this.deck[k + l + 1];
                        this.villain.GetCombo(this.combos[comboCounter]);
                        this.CheckResult(comboCounter);
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
                this.combos[comboCounter].handStrength = villainHandStrength;
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
                comboIndeces[0] = this.deck.findIndex(function (card) {
                    return card.display === combo.cards[0].display;
                });
                comboIndeces[1] = this.deck.findIndex(function (card) {
                    return card.display === combo.cards[1].display;
                });
                this.deck.splice(comboIndeces[1], 1);
                this.deck.splice(comboIndeces[0], 1);
                if (this.cards.length == 5) {
                    for (var m = 0; m < this.deck.length - 1; m++) {
                        this.hero.GetRunoutCard(this.deck[m], 5);
                        this.villain.GetRunoutCard(this.deck[m], 5);
                        for (var n = 0; n < this.deck.length - 1 - m; n++) {
                            this.hero.GetRunoutCard(this.deck[m + n + 1], 6);
                            this.villain.GetRunoutCard(this.deck[m + n + 1], 6);
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
                    this.combos[comboCounter].odds2Win = runoutsWon / runoutCounter;
                    this.combos[comboCounter].odds2Lose = runoutsLost / runoutCounter;
                    this.combos[comboCounter].odds2Tie = runoutsTied / runoutCounter;
                    this.hero.SpliceRunoutCards(5, 2);
                    this.villain.SpliceRunoutCards(5, 2);
                }
                else {
                    this.deck.forEach(function (River, RiverIndex) {
                        _this.hero.GetRunoutCard(River, 6);
                        _this.villain.GetRunoutCard(River, 6);
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
                    this.combos[comboCounter].odds2Win = runoutsWon / this.deck.length;
                    this.combos[comboCounter].odds2Lose = runoutsLost / this.deck.length;
                    this.combos[comboCounter].odds2Tie = runoutsTied / this.deck.length;
                    this.hero.SpliceRunoutCards(6, 1);
                    this.villain.SpliceRunoutCards(6, 1);
                }
                this.deck.splice(comboIndeces[0], 0, combo.cards[0]);
                this.deck.splice(comboIndeces[1], 0, combo.cards[1]);
            };
            return PlayedPhase;
        }());
        Test.PlayedPhase = PlayedPhase;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var Player = (function () {
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
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var InputTable = (function (_super) {
            __extends(InputTable, _super);
            function InputTable() {
                return _super.call(this) || this;
            }
            InputTable.prototype.render = function () {
                var _this = this;
                var rows = [];
                rows.push(this.props.cards.filter(function (card) { return card.suit.key == "s"; }));
                rows.push(this.props.cards.filter(function (card) { return card.suit.key == "h"; }));
                rows.push(this.props.cards.filter(function (card) { return card.suit.key == "c"; }));
                rows.push(this.props.cards.filter(function (card) { return card.suit.key == "d"; }));
                return (React.createElement("table", { className: "margin43" }, rows.map(function (row) { return React.createElement("tr", null, row.map(function (item) { return React.createElement(Test.InputTableCell, { card: item, onSelect: _this.props.onSelect }); })); })));
            };
            return InputTable;
        }(React.Component));
        Test.InputTable = InputTable;
        function RenderInputTable(elem, cards, onSelect) {
            ReactDOM.render(React.createElement(InputTable, { cards: cards, onSelect: onSelect }), elem);
        }
        Test.RenderInputTable = RenderInputTable;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var InputTableCell = (function (_super) {
            __extends(InputTableCell, _super);
            function InputTableCell() {
                var _this = _super.call(this) || this;
                _this.onSelect = _this.onSelect.bind(_this);
                _this.state = {
                    Selected: false
                };
                return _this;
            }
            InputTableCell.prototype.render = function () {
                var _this = this;
                return (React.createElement("td", { className: this.props.card.suit.key, id: this.props.card.rank.key + this.props.card.suit.key, onClick: function () { _this.onSelect(_this.props.card); } }, this.state.Selected ? ".." : (this.props.card.rank.key + this.props.card.suit.key)));
            };
            InputTableCell.prototype.onSelect = function (card) {
                if (document.getElementById("Card-6").innerHTML == "..") {
                    this.setState({ Selected: true });
                }
                this.props.onSelect(card);
            };
            return InputTableCell;
        }(React.Component));
        Test.InputTableCell = InputTableCell;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var ResultComponentExterior = (function (_super) {
            __extends(ResultComponentExterior, _super);
            function ResultComponentExterior() {
                return _super.call(this) || this;
            }
            ResultComponentExterior.prototype.render = function () {
                var rowsInt = [];
                for (var k = 0; k < 4; k++) {
                    rowsInt.push("");
                }
                return (React.createElement("td", null, rowsInt.map(function (rowInt, rowIntIndex) { return React.createElement(Test.ResultRowInterior, { rowIntIndex: rowIntIndex }); })));
            };
            return ResultComponentExterior;
        }(React.Component));
        Test.ResultComponentExterior = ResultComponentExterior;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var ResultComponentInterior = (function (_super) {
            __extends(ResultComponentInterior, _super);
            function ResultComponentInterior() {
                return _super.call(this) || this;
            }
            ResultComponentInterior.prototype.render = function () {
                return (React.createElement("td", { className: "int" }));
            };
            return ResultComponentInterior;
        }(React.Component));
        Test.ResultComponentInterior = ResultComponentInterior;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var ResultGrid = (function (_super) {
            __extends(ResultGrid, _super);
            function ResultGrid() {
                return _super.call(this) || this;
            }
            ResultGrid.prototype.render = function () {
                var sliceRef = [];
                for (var i = 0; i < 13; i++) {
                    sliceRef[i][0] = (i * 13) + 0;
                    sliceRef[i][1] = (i * 13) + 12;
                }
                this.props.startingHands.slice();
                return (React.createElement("table", null, sliceRef.map(function (rowExt, rowExtIndex) { return React.createElement(Test.ResultRowExterior, { rowExtIndex: rowExtIndex }); })));
            };
            return ResultGrid;
        }(React.Component));
        Test.ResultGrid = ResultGrid;
        function RenderResultGrid(elem, startingHands) {
            ReactDOM.render(React.createElement(ResultGrid, { startingHands: startingHands }), elem);
        }
        Test.RenderResultGrid = RenderResultGrid;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var ResultRowExterior = (function (_super) {
            __extends(ResultRowExterior, _super);
            function ResultRowExterior() {
                return _super.call(this) || this;
            }
            ResultRowExterior.prototype.render = function () {
                var cellsExt = [];
                for (var j = 0; j < 13; j++) {
                    cellsExt.push("");
                }
                return (React.createElement("tr", null, cellsExt.map(function (cellExt, cellExtIndex) { return React.createElement(Test.ResultComponentExterior, { cellExtIndex: cellExtIndex }); })));
            };
            return ResultRowExterior;
        }(React.Component));
        Test.ResultRowExterior = ResultRowExterior;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
var Kerstens;
(function (Kerstens) {
    var Test;
    (function (Test) {
        var ResultRowInterior = (function (_super) {
            __extends(ResultRowInterior, _super);
            function ResultRowInterior() {
                return _super.call(this) || this;
            }
            ResultRowInterior.prototype.render = function () {
                var cellsInt = [];
                for (var j = 0; j < 4; j++) {
                    cellsInt.push("");
                }
                return (React.createElement("tr", null, cellsInt.map(function (cellInt, cellIntIndex) { return React.createElement(Test.ResultComponentInterior, { cellIntIndex: cellIntIndex }); })));
            };
            return ResultRowInterior;
        }(React.Component));
        Test.ResultRowInterior = ResultRowInterior;
    })(Test = Kerstens.Test || (Kerstens.Test = {}));
})(Kerstens || (Kerstens = {}));
