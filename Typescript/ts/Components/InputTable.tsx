namespace Kerstens.Test {

    export class InputTable extends React.Component<{ cards: Kerstens.Test.Card[], onSelect: Function}, any> {

        constructor() {

            super();

        }

        render() {

            var rows = [];


            rows.push(this.props.cards.filter(card => card.suit.key == "s"));
            rows.push(this.props.cards.filter(card => card.suit.key == "h"));
            rows.push(this.props.cards.filter(card => card.suit.key == "c"));
            rows.push(this.props.cards.filter(card => card.suit.key == "d"));

            return (

                <table className="margin43">
                    {rows.map(
                        row => <tr>
                            {row.map(
                                item => <InputTableCell card={item} onSelect={this.props.onSelect} />
                            )}
                        </tr>
                    )}
                </table>
                
            );

        }

    }

    export function RenderInputTable(elem, cards: Kerstens.Test.Card[], onSelect: Function) {
        ReactDOM.render(<InputTable cards={cards} onSelect={onSelect} />, elem);
    }

}