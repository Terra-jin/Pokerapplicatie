/// <reference path="../node_modules/@types/jquery/index.d.ts" />
/// <reference types="react" />
declare namespace Kerstens.Test {
    class Card {
        rank: KeyValuePair;
        suit: KeyValuePair;
        display: string;
        constructor(rank: KeyValuePair, suit: KeyValuePair);
    }
}
declare namespace Kerstens.Test {
    class Combo {
        cards: Card[];
        result: string;
        odds2Win: number;
        odds2Lose: number;
        odds2Tie: number;
        handStrength: number;
        id: string;
        eliminated: boolean;
        constructor();
    }
}
declare namespace Kerstens.Test {
    enum HandPhase {
        preflop = 1,
        flop = 5,
        turn = 6,
        river = 7,
    }
    class Game {
        private static _instance;
        static readonly Instance: Game;
        private constructor();
        Initialize(): void;
        private cardRanks;
        private cardSuits;
        private cardColors;
        private GenerateDeck();
        private deck;
        private GenerateInputTable();
        private selectedCards;
        private playedPhases;
        private SelectCard(card);
        private FixFontColorSelectedCards();
        private phase;
        private SetPhase();
        private GenerateResultsTable();
        private GenerateRanksCombinations(ranksCombinations);
        private GenerateStartingHands(startingHands);
        private PrepareResultsTable(ranksCombinations);
        private GenerateTablePositionsNonPocketPair(tablePositionsNonPocketPair);
        private CompleteResultsTable(playedPhase);
        private ColorCellResultsTable(Combo, reference);
        private GeneratePositionRef(positionRef);
        private GenerateResultColorCode(resultColorCode);
        private GetHandCategoryPercentages(playedPhase);
        private EliminateCombo(Combo, comboGroup, sliderId);
        private rankedPP;
        private rankedBW;
        private rankedSC;
        private rankedS1G;
        private rankedS2G;
        private rankedSA;
        private rankedAA;
        private rankedOC;
        private rankedO1G;
        private rankedT;
        private eliminatedPPs;
        private eliminatedBWs;
        private eliminatedSCs;
        private eliminatedS1Gs;
        private eliminatedS2Gs;
        private eliminatedSAs;
        private eliminatedAAs;
        private eliminatedOCs;
        private eliminatedO1Gs;
        private eliminatedTs;
        private GenerateEliminatedCombosReference(rankedString, elimRefArray);
        private ShowButton(phase);
        private shownPhase;
        private ShowEquity(id);
        private Reload();
    }
}
declare namespace Kerstens.Test {
    class KeyValuePair {
        key: string;
        value: number;
        constructor(key: string, value: number);
    }
    class KeyValuePairString {
        key: string;
        value: string;
        constructor(key: string, value: string);
    }
    class KeyValuesPairNumber {
        key: number;
        value1: number;
        value2: number;
        constructor(key: number, value1: number, value2: number);
    }
    class EliminatedComboReference {
        key: number;
        value1: number;
        value2: number;
        value3: boolean;
        constructor(key: number, value1: number, value2: number, value3: boolean);
    }
}
declare namespace Kerstens.Test {
    class PlayedPhase {
        private phase;
        private cards;
        private deck;
        private cardRanks;
        private cardSuits;
        private villain;
        private hero;
        combos: Combo[];
        constructor(phase: string, cards: Card[], deck: Card[], cardRanks: string[], cardSuits: string[]);
        private CreateCombos();
        private CheckResult(comboCounter);
        private CheckOdds(comboCounter);
    }
}
declare namespace Kerstens.Test {
    class Player {
        private deck;
        private cards;
        private ranksCount;
        private suitsCount;
        private ranksCountCount;
        private handStrength;
        private combos;
        constructor(deck: Card[]);
        GetCards(cards: Card[]): void;
        GetVillainCards(cards: Card[]): void;
        GetCombo(combo: Combo): void;
        GetRunoutCard(card: Card, reference: number): void;
        SpliceRunoutCards(index: number, amount: number): void;
        CheckHandStrength(): number;
        private Reset();
        private ResetRanksCount();
        private CountRanks();
        private CountSuits();
        private CountRanksCount();
        private CheckStraightFlush();
        private CheckQuads();
        private CheckFullHouse();
        private CheckFlush();
        private CheckStraight();
        private CheckTrips();
        private CheckTwoPair();
        private CheckPair();
        private CheckHighCard();
    }
}
declare namespace Kerstens.Test {
    class InputTable extends React.Component<{
        cards: Kerstens.Test.Card[];
        onSelect: Function;
    }, any> {
        constructor();
        render(): JSX.Element;
    }
    function RenderInputTable(elem: any, cards: Kerstens.Test.Card[], onSelect: Function): void;
}
declare namespace Kerstens.Test {
    class InputTableCell extends React.Component<{
        card: Kerstens.Test.Card;
        onSelect: Function;
    }, any> {
        constructor();
        render(): JSX.Element;
        onSelect(card: Kerstens.Test.Card): void;
    }
}
declare namespace Kerstens.Test {
    class ResultComponentExterior extends React.Component<{
        cellExtIndex: number;
    }> {
        constructor();
        render(): JSX.Element;
    }
}
declare namespace Kerstens.Test {
    class ResultComponentInterior extends React.Component<{
        cellIntIndex: number;
    }> {
        constructor();
        render(): JSX.Element;
    }
}
declare namespace Kerstens.Test {
    class ResultGrid extends React.Component<{
        startingHands: string[];
    }> {
        constructor();
        render(): JSX.Element;
    }
    function RenderResultGrid(elem: any, startingHands: any): void;
}
declare namespace Kerstens.Test {
    class ResultRowExterior extends React.Component<{
        rowExtIndex: number;
    }> {
        constructor();
        render(): JSX.Element;
    }
}
declare namespace Kerstens.Test {
    class ResultRowInterior extends React.Component<{
        rowIntIndex: number;
    }> {
        constructor();
        render(): JSX.Element;
    }
}
