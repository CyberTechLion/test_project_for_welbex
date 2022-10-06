function TableBody(props) {

  function distanceMetrics(tableInfo){
      return tableInfo + " m";
  }

  return (
    <tbody>
      {props.data.map((info, index) => {
        return (
          <tr key={index}>
            {props.columns.map(({ key }, index) => {
              let tableInfo = info[key] ? info[key] : "---";
              if (key === "distance") {
                tableInfo = distanceMetrics(tableInfo)
              }
              return <td key={key}>{tableInfo}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableBody;
