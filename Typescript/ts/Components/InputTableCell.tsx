namespace Kerstens.Test {

    export class InputTableCell extends React.Component<{ card: Kerstens.Test.Card, onSelect: Function }, any> {

        constructor() {

            super();

            this.onSelect = this.onSelect.bind(this);

            this.state = {
                Selected: false 
            };

        }

        render() {

            return (

                <td className={this.props.card.suit.key} id={this.props.card.rank.key + this.props.card.suit.key} onClick={() => { this.onSelect(this.props.card) }} >{this.state.Selected ? ".." : (this.props.card.rank.key + this.props.card.suit.key)}</td>

            );

        }

        public onSelect(card: Kerstens.Test.Card) {

            if (document.getElementById("Card-6").innerHTML == "..") {

                this.setState({ Selected: true });

            }

            this.props.onSelect(card);

        }

    }

}