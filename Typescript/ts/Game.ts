namespace Kerstens.Test {

    export enum HandPhase {

        preflop = 1,
        flop = 5,
        turn = 6,
        river = 7

    }

    export class Game {

        private static _instance: Game;
        public static get Instance() {

            return this._instance || (this._instance = new this());

        }
        private constructor() {

        }
        public Initialize() {

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

        }

        

        private cardRanks: string[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
        private cardSuits: string[] = ['s', 'h', 'c', 'd'];
        private cardColors: string[] = ['black', 'red', 'green', 'blue'];

        private GenerateDeck() {

            this.deck = [];

            this.cardRanks.forEach((cardRank, cardRankIndex) => {

                this.cardSuits.forEach((cardSuit, cardSuitIndex) => {

                    var card = new Card(new KeyValuePair(cardRank, cardRankIndex), new KeyValuePair(cardSuit, cardSuitIndex));

                    this.deck.push(card);

                });

            });

        }
        private deck: Card[] = [];

        private GenerateInputTable() {

            RenderInputTable(document.querySelector("#placeholderInputTable"), this.deck, ((card) => {

                this.SelectCard(card);

            }));

        }



        private selectedCards: Card[] = [];
        private playedPhases: PlayedPhase[] = [];
        private SelectCard(card: Kerstens.Test.Card) {

            // onderbreek de functie als de kaart al geselecteerd is of als er al 7 geselecteerd zijn
            if (this.selectedCards.length == 7 || document.getElementById(card.display).innerHTML == "..") {
                return
            }

            // maak zichtbaar welke kaarten waar zijn
            document.getElementById("Card-" + this.selectedCards.length.toString()).innerHTML = card.display;
            this.FixFontColorSelectedCards();



            // geef geselecteerde kaarten aan Game
            this.selectedCards.push(card);

            // haal geselecteerde kaarten uit deck
            this.deck.splice(this.deck.indexOf(card), 1);

            // set huidige fase
            this.SetPhase();

            if (this.phase != Kerstens.Test.HandPhase[1]) {

                this.ShowButton(this.phase);

                // instantieer playedPhase (als phase != preflop)
                this.playedPhases.push(new PlayedPhase(this.phase, this.selectedCards, this.deck, this.cardRanks, this.cardSuits));

            }

        }
        private FixFontColorSelectedCards() {

            this.cardColors.forEach((color, suit) => {

                if (document.getElementById("Card-" + this.selectedCards.length.toString()).innerHTML.includes(this.cardSuits[suit]) == true) {
                    document.getElementById("Card-" + this.selectedCards.length.toString()).style.color = color;
                }

            });

        }

        private phase: string = Kerstens.Test.HandPhase[1];
        private SetPhase() {

            if (this.selectedCards.length < 5) {

                return;

            } else {

                this.phase = Kerstens.Test.HandPhase[this.selectedCards.length];

            }

        }



        private GenerateResultsTable() {

            // ranksCombinations zijn de 91 soorten combinaties die er van 13 rangen te maken zijn, zonder differentiatie tussen suited en off-suit
            var ranksCombinations: string[] = [];
            this.GenerateRanksCombinations(ranksCombinations);

            // startingHands zijn de 169 soorten combinaties die er van 13 rangen te maken zijn, mét differentiatie tussen suited en off-suit
            var startingHands: string[] = [];
            this.GenerateStartingHands(startingHands);

            // RenderResultGrid(document.querySelector("#demo"), startingHands: string[]);

            var table = jQuery("<table></table>");
            var tr = jQuery("<tr></tr>");
            tr = null;
            var counter = 0;

            for (var i = 0; i < 13; i++) {

                if (i == 0) {

                    table.append('<tr></tr>')

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

        }
        private GenerateRanksCombinations(ranksCombinations) {
            var k: number = 0;
            for (var i = 0; i < 13; i++) {
                for (var j = i; j < 13; j++) {
                    ranksCombinations[k] = this.cardRanks[i].toString() + this.cardRanks[j].toString();
                    k++;
                }
            }
        }
        private GenerateStartingHands(startingHands) {
            var k: number = 0;
            for (var i = 0; i < 13; i++) {
                for (var j = 0; j < 13; j++) {
                    if (i > j) {
                        startingHands[k] = this.cardRanks[j].toString() + this.cardRanks[i].toString() + "o";
                        k++
                    }
                    if (i == j) {
                        startingHands[k] = this.cardRanks[j].toString() + this.cardRanks[i].toString();
                        k++
                    }
                    if (i < j) {
                        startingHands[k] = this.cardRanks[i].toString() + this.cardRanks[j].toString() + "s";
                        k++
                    }
                }
            }
        }

        private PrepareResultsTable(ranksCombinations: string[]) {

            // er zijn zes mogelijke soorten pocket pairs en die staan op onderstaande posities
            var tablePositionsPocketPair = ["5", "9", "10", "13", "14", "15"];
            // er zijn vier mogelijke suited en 12 mogelijke off-suit combinaties en die staan op onderstaande posities
            var tablePositionsNonPocketPair = [];
            this.GenerateTablePositionsNonPocketPair(tablePositionsNonPocketPair);

            // zwarte blokjes geven de mogelijke combo's aan; grijs betekent dat die combo niet bestaat. Nadat de resultaten zichtbaar zijn gemaakt zie je aan de zwarte blokjes welke combo's geblokkeerd zijn door de geselecteerde kaarten
            for (var i = 0; i < ranksCombinations.length; i++) {
                if (ranksCombinations[i].charAt(0) == ranksCombinations[i].charAt(1)) {
                    for (var j = 0; j < tablePositionsPocketPair.length; j++) {
                        document.getElementById(ranksCombinations[i] + tablePositionsPocketPair[j]).style.backgroundColor = "black";
                    }
                } else {
                    for (j = 0; j < tablePositionsNonPocketPair.length; j++) {
                        document.getElementById(ranksCombinations[i] + tablePositionsNonPocketPair[j]).style.backgroundColor = "black";
                    }

                }

            }

        }
        private GenerateTablePositionsNonPocketPair(tablePositionsNonPocketPair) {
            for (var i = 0; i < 16; i++) {
                if (i == 0 || i == 5 || i == 10 || i == 15) {
                    tablePositionsNonPocketPair[i] = "s" + (i + 1).toString();
                } else {
                    tablePositionsNonPocketPair[i] = "o" + (i + 1).toString();
                }
            }
        }

        private CompleteResultsTable(playedPhase: Combo[]) {

            var ranksCombinations = [];
            this.GenerateRanksCombinations(ranksCombinations);
            this.PrepareResultsTable(ranksCombinations);

            var totalWins: number = 0;
            var totalLosses: number = 0;
            var totalTies: number = 0;
            var totalEquity: number = 0;

            playedPhase.forEach((Combo, ComboIndex) => {

                if (Combo.cards[0].rank.value == Combo.cards[1].rank.value) {

                    this.ColorCellResultsTable(Combo, "");

                }

                if (Combo.cards[0].rank.value != Combo.cards[1].rank.value && Combo.cards[0].suit.value == Combo.cards[1].suit.value) {

                    this.ColorCellResultsTable(Combo, "s");

                }

                if (Combo.cards[0].rank.value != Combo.cards[1].rank.value && Combo.cards[0].suit.value != Combo.cards[1].suit.value) {

                    this.ColorCellResultsTable(Combo, "o");

                }

                if (Combo.result == "Hero wins" && Combo.eliminated == false) {

                    totalWins++;
                    totalEquity += Combo.odds2Win + (Combo.odds2Tie * 0.5)

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
        }
        private ColorCellResultsTable(Combo: Combo, reference: string) {

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

            var positionRef: KeyValuesPairNumber[] = [];
            this.GeneratePositionRef(positionRef);
            positionRef.forEach((PositionRef, PositionRefIndex) => {

                if (Combo.cards[0].suit.value == PositionRef.value1 && Combo.cards[1].suit.value == PositionRef.value2) {

                    var resultColorCode: KeyValuePairString[] = [];
                    this.GenerateResultColorCode(resultColorCode);

                    resultColorCode.forEach((Result, ResultIndex) => {

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

        }
        private GeneratePositionRef(positionRef) {

            /*  in de Results Table staan in 13x13 cellen met combinaties zoals AK, AQ etc. Aangezien er vier suits bestaan, zijn er 16 combinaties van suits bij
             *  elke combinatie. De 16 vakjes zijn genummerd van 1 t/m 16 en refereren aan de kleuren van de eerste en tweede kaart.
             *  Voorbeeld: bij vakje 5 is de hoogste kaart schoppen en de laagste kaart harten.
             *  
             *  Voor pocket pairs is dit anders: sowieso kunnen dezelfde rangen niet dezelfde kleur hebben. Ook maakt het niet uit welke volgorde de kaarten hebben:
             *  Schoppen Aas + Harten Aas == Harten Aas + Schoppen Aas. Ter contrast: Schoppen Aas + Harten Heer != Harten Aas + Schoppen Heer.
            */
            var k: number = 0;

            for (var i = 0; i < 4; i++) {

                for (var j = 0; j < 4; j++) {

                    positionRef[k] = new KeyValuesPairNumber(k + 1, j, i)
                    k++;

                }

            }

        }
        private GenerateResultColorCode(resultColorCode) {
            for (var i = 0; i < 3; i++) {
                var result: string[] = ["Hero wins", "Hero loses", "It's a tie"];
                var colorCode: string[] = ["green", "red", "yellow"];
                resultColorCode[i] = new KeyValuePairString(result[i], colorCode[i]);
            }
        }

        private GetHandCategoryPercentages(playedPhase: Combo[]) {

            var straightFlushHands: number = 0;
            var quadsHands: number = 0;
            var fullHouseHands: number = 0;
            var flushHands: number = 0;
            var straightHands: number = 0;
            var tripsHands: number = 0;
            var twoPairHands: number = 0;
            var pairHands: number = 0;
            var highCardHands: number = 0;

            var total: number = 0;

            playedPhase.forEach((Combo, ComboIndex) => {

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

        }

        private EliminateCombo(Combo: Combo, comboGroup: EliminatedComboReference[], sliderId: string) {

            comboGroup.forEach((elim, elimIndex) => {

                if (
                    Combo.cards[0].rank.value == elim.value1 &&
                    Combo.cards[1].rank.value == elim.value2 &&
                    (Combo.cards[0].suit.value == Combo.cards[1].suit.value) == elim.value3 &&
                    elim.key > (<HTMLInputElement>document.getElementById(sliderId)).valueAsNumber
                ) {

                    Combo.eliminated = true;

                } 

            });

        }

        private rankedPP: string[] = ['AA', 'KK', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', '33', '22'];
        private rankedBW: string[] = ['AKs', 'AQs', 'KQs', 'AJs', 'KJs', 'AKo', 'ATs', 'QJs', 'KTs', 'QTs', 'JTs', 'AQo', 'KQo', 'AJo', 'KJo', 'QJo', 'ATo', 'KTo', 'JTo', 'QTo'];
        private rankedSC: string[] = ['T9s', '98s', '87s', '76s', '65s', '54s'];
        private rankedS1G: string[] = ['J9s', 'T8s', '97s', '86s', '75s', '64s', '53s', '43s'];
        private rankedS2G: string[] = ['Q9s', 'J8s', 'T7s', '96s', '85s', '74s', '63s', '52s', '42s'];
        private rankedSA: string[] = ['A9s', 'A8s', 'A5s', 'A7s', 'A4s', 'A3s', 'A6s', 'A2s'];
        private rankedAA: string[] = ['A9o', 'A8o', 'A5o', 'A7o', 'A4o', 'A3o', 'A6o', 'A2o'];
        private rankedOC: string[] = ['T9o', '98o', '87o', '76o', '65o', '54o'];
        private rankedO1G: string[] = ['J9o', 'T8o', '97o', '86o', '75o', '64o', '53o', '43o'];
        private rankedT: string[] = ['K9s', 'K8s', 'Q8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K2s', 'K3s', 'Q7s', 'J7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'T6s', 'Q2s', 'J6s', 'K9o', 'J5s', 'Q9o', 'J4s', 'J3s', '95s', 'J2s', 'T5s', '84s', 'T4s', 'T3s', 'T2s', '73s', '32s', '94s', '93s', 'J8o', '62s', '92s', 'K8o', 'Q8o', '83s', '82s', '72s', 'K7o', 'T7o', 'K6o', 'K5o', 'J7o', 'Q7o', 'K4o', 'K3o', '96o', 'K2o', 'Q6o', '85o', 'T6o', 'Q5o', 'Q4o', 'Q3o', '74o', 'Q2o', 'J6o', '63o', 'J5o', '95o', '52o', 'J4o', 'J3o', '42o', 'J2o', '84o', 'T5o', 'T4o', '32o', 'T3o', '73o', 'T2o', '62o', '94o', '93o', '92o', '83o', '82o', '72o'];

        // zet ranked strings in elim object. 

        // wat is een List ipv een array

        private eliminatedPPs: EliminatedComboReference[] = [];
        private eliminatedBWs: EliminatedComboReference[] = [];
        private eliminatedSCs: EliminatedComboReference[] = [];
        private eliminatedS1Gs: EliminatedComboReference[] = [];
        private eliminatedS2Gs: EliminatedComboReference[] = [];
        private eliminatedSAs: EliminatedComboReference[] = [];
        private eliminatedAAs: EliminatedComboReference[] = [];
        private eliminatedOCs: EliminatedComboReference[] = [];
        private eliminatedO1Gs: EliminatedComboReference[] = [];
        private eliminatedTs: EliminatedComboReference[] = [];

        // onderstaande in alleen nodig in het elim object. dus niet in Game stoppen! ff checken

        private GenerateEliminatedCombosReference(rankedString, elimRefArray) {

            rankedString.forEach((rankedString, rankedStringIndex) => {

                var rank1: number = null;
                var rank2: number = null;
                var suited: boolean = false;

                this.cardRanks.forEach((rank, rankIndex) => {

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

                var elim: EliminatedComboReference = new EliminatedComboReference(elimRefArray.length + 1, rank1, rank2, suited);

                elimRefArray.push(elim);

            });


            //var preFlopSliderInputValue: number = (<HTMLInputElement>document.getElementById("preFlopSliderPP")).valueAsNumber;

            //if (Combo.cards[0].rank.value >= preFlopSliderInputValue) {

            //    Combo.eliminated = true;

            //} else {

            //    Combo.eliminated = false;

            //}

        }
        //private EliminateATB(Combo: Combo) {

        //}
        //private EliminateSC(Combo: Combo) {

        //    var preFlopSliderInputValue: number = (<HTMLInputElement>document.getElementById("preFlopSliderSC")).valueAsNumber;

        //    if (Combo.cards[0].rank.value > preFlopSliderInputValue + 3 && Combo.cards[0].rank.value < 10) {

        //        Combo.eliminated = true;

        //    } else {

        //        Combo.eliminated = false;

        //    }

        //}
        //private EliminateS1G(Combo: Combo) {

        //    var preFlopSliderInputValue: number = (<HTMLInputElement>document.getElementById("preFlopSliderS1G")).valueAsNumber;

        //    if (Combo.cards[0].rank.value > preFlopSliderInputValue + 2 && Combo.cards[0].rank.value < 10) {

        //        Combo.eliminated = true;

        //    } else {

        //        Combo.eliminated = false;

        //    }

        //}
        //private EliminateS2G(Combo: Combo) {

        //}
        //private EliminateS3G(Combo: Combo) {

        //}
        //private EliminateSA(Combo: Combo) {

        //}
        //private EliminateAA(Combo: Combo) {

        //}
        //private EliminateSK(Combo: Combo) {

        //}
        //private EliminateAK(Combo: Combo) {

        //}

        private ShowButton(phase) {

            if (this.phase == "flop") {

                document.getElementById("buttonFlop").style.visibility = "visible";

            }

            if (this.phase == "turn") {

                document.getElementById("buttonTurn").style.visibility = "visible";

            }

            if (this.phase == "river") {

                document.getElementById("buttonRiver").style.visibility = "visible";

            }

        }

        private shownPhase: number = null;
        private ShowEquity(id) {

            if (this.shownPhase == null) {

                return;

            }

            var combo: Combo[] = this.playedPhases[this.shownPhase].combos.filter(res => {

                return res.id === id;

            });

            if (combo.length != 0) {

                document.getElementById("equity").innerHTML = "Equity against " + combo[0].cards[0].rank.key + combo[0].cards[0].suit.key + combo[0].cards[1].rank.key + combo[0].cards[1].suit.key + ": " + (100 * (combo[0].odds2Win + combo[0].odds2Tie / 2)).toFixed(2).toString() + "%";

            }

        }

        private Reload() {

            location.reload();

        }

    }

}

document.addEventListener("DOMContentLoaded", () => {

    Kerstens.Test.Game.Instance.Initialize();

});
