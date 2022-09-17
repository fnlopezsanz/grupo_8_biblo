import React from "react"

function Row(props) {
    const { rowData = {}, columns = [] } = props;
    return (
        <tr>
            {
                columns.map((element, i) => <td key={ i }> { element == "categoria" ? rowData[element]?.categoria : rowData[element] } </td>)
            }
            
        </tr>
    )
}

export default Row;