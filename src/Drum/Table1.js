import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default Table = () => {
  const [data, setData] = React.useState({ columns: [], rows: [] });
  const [data1, setData1] = React.useState([]);

  React.useEffect(async () => {
    const res = await axios.get(
      `https://learning1717.pythonanywhere.com/api/aapl`
    );
    setData1(res.data.data);
  }, []);

  console.log(data);
  React.useEffect(() => {
    const rows = data1.map((item, id) => ({ id, ...item }));

    let columnArr = [];
    let columns = [{ field: "id", hide: true, flex: 1 }];

    if (data1[0]) {
      columnArr = Object.keys(data1[0]);
      for (let j = 0; j < columnArr.length; j++) {
        const obj = {};
        obj["field"] = columnArr[j];
        obj["headerName"] = columnArr[j];
        obj["flex"] = 1;
        columns.push(obj);
      }
    }

    setData({
      rows,
      columns
    });
  }, [data1]);

  return (
    <div style={{ height: "35vh", width: "80vw" }}>
      <DataGrid
        {...data}
        columnBuffer={2}
        columnThreshold={2}
        //hideFooterSelectedRowCount={true}
        //hideFooter={true}
        // pageSize={data["rows"].length}
      />
    </div>
  );
};
