import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./Table.css";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export default function Table ({ height, name }) {
  const [data, setData] = useState([]);
  const [rows, setRows] = React.useState("");
  const [desc, setDesc] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const payload = {
      path: "Reports",
      name: name
    };

    axios
      .post("https://sql-dash-backend.herokuapp.com/Listdata", payload)
      .then((res) => {
        setDesc(res.data["desc"]);
        setQuery(res.data["query"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [name]);

  function sqlData() {
    const payload = {
      data: query
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/sqlrun`, payload)
      .then((res) => {
        console.log(res);

        if (Object.keys(res.data).length != 0) {
          setData(res.data.rows);
          setRows(res.data["rowCount"]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (query != "") {
      sqlData();
    }
  }, [query]);

  var column = {};
  // get table column
  console.log(data[0]);
  if (data[0] != undefined) {
    column = { ...data[0] };
  }

  console.log("name-t", name);

  return (
    <div>
      {loading ? (
        <Grid
          container
          spacing={0}
          // direction="column"
          // alignItems="center"
          // justifyContent="center"
          // style={{ minHeight: "70vh" }}
        >
          {/* <CircularProgress /> */}
          <h4> Loading....Please wait fetching data </h4>
        </Grid>
      ) : (
        <div>
          <Typography variant="caption" sx={{ pb: 1 }}>
            Total rows showing is {rows}
          </Typography>
          <div className="tableFixHead-1" style={{ height: height }}>
            <table id="customers-1">
              <thead>
                <tr>
                  {Object.keys(column).map((row2) => (
                    <th>{row2}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row1) => (
                  <tr key={row1[0]}>
                    {Object.values(row1).map((row2) => (
                      <td>{row2}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
