namespace Kerstens.Test {

    export class ResultComponentExterior extends React.Component<{ cellExtIndex: number }> {

        constructor() {

            super();

        }

        render() {

            var rowsInt = [];

            for (var k = 0; k < 4; k++) {
                rowsInt.push("");
            }

            return (

                <td>
                    {
                        rowsInt.map(
                            (rowInt, rowIntIndex) => <ResultRowInterior rowIntIndex={rowIntIndex} />
                        )
                    }
                </td>

            );

        }

    }

}