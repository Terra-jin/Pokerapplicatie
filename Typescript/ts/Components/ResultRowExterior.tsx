namespace Kerstens.Test {

    export class ResultRowExterior extends React.Component<{ rowExtIndex: number }> {

        constructor() {

            super();

        }

        render() {

            var cellsExt = [];

            for (var j = 0; j < 13; j++) {
                cellsExt.push("");
            }

            return (

                <tr>
                    {
                        cellsExt.map(
                            (cellExt, cellExtIndex) => <ResultComponentExterior cellExtIndex={cellExtIndex}/>
                        )
                    }
                </tr>

            );

        }

    }

}