namespace Kerstens.Test {

    export class ResultGrid extends React.Component<{ startingHands: string[] }> {

        constructor() {

            super();

        }

        render() {

            var sliceRef: number[][] = [];

            for (var i = 0; i < 13; i++) {
                sliceRef[i][0] = (i * 13) + 0;
                sliceRef[i][1] = (i * 13) + 12;
            }


            this.props.startingHands.slice()

            return (

                <table>
                    {
                        sliceRef.map(
                            (rowExt, rowExtIndex) => <ResultRowExterior rowExtIndex={rowExtIndex}/>
                        )
                    }
                </table>

            );

        }

    }

    export function RenderResultGrid(elem, startingHands) {
        ReactDOM.render(<ResultGrid startingHands={startingHands} />, elem);
    }

}