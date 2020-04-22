namespace Kerstens.Test {

    export class ResultRowInterior extends React.Component<{ rowIntIndex: number }> {

        constructor() {

            super();

        }

        render() {

            var cellsInt = [];

            for (var j = 0; j < 4; j++) {
                cellsInt.push("");
            }

            return (

                <tr>
                    {
                        cellsInt.map(
                            (cellInt, cellIntIndex) => <ResultComponentInterior cellIntIndex={cellIntIndex}/>
                        )
                    }
                </tr>

            );

        }

    }

}