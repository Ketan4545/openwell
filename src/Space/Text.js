import react, { useState, useEffect } from "react";
import Chart from "../Drum/Chart";
import Table from "../Drum/Table";
import Box from "@mui/material/Box";
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader
} from "@mui/material";
import axios from "axios";

export default Text = ({ data, space, height }) => {
  const [layout, setLayout] = useState("");
  const [arr1, setArr1] = useState([]);
  //const [arr2, setArr2] = useState([]);
  //const [widget, setWidget] = useState([]);
  const [a, setA] = useState({});
  // Fetch Reports
  useEffect(() => {
    const payload = {
      path: "Reports"
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/Listfetch`, payload)
      .then((res) => {
        const result = res.data;
        setArr1(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch Charts
  // useEffect(() => {
  //   const payload = {
  //     path: "Charts"
  //   };

  //   axios
  //     .post(`https://sql-dash-backend.herokuapp.com/Listfetch`, payload)
  //     .then((res) => {
  //       const result = res.data;
  //       setArr2(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // Fetch layout value
  useEffect(() => {
    const payload = {
      path: data["path"],
      name: data["name"]
    };

    axios
      .post("https://sql-dash-backend.herokuapp.com/Listdata", payload)
      .then((res) => {
        setLayout(res.data[space]);
        setA(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Updating function
  function updateLayout() {
    let payload;
    if (space === "first") {
      // payload = {
      //   path: data["path"],
      //   name: data["name"],
      //   first: layout2,
      //   layout
      // };
      a["first"] = layout;
      payload = a;
    } else {
      // payload = {
      //   path: data["path"],
      //   name: data["name"],
      //   second: layout2
      // };
      a["second"] = layout;
      payload = a;
    }
    console.log("payload", payload);
    axios
      .post(`https://sql-dash-backend.herokuapp.com/Create`, payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Update value if it is changed
  useEffect(() => {
    if (layout != "") {
      updateLayout();
    }
  }, [layout]);

  return (
    <div>
      <Box component="span">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="grouped-native-select">Layout</InputLabel>
          <Select
            defaultValue=""
            id="grouped-native-select"
            label="Layout"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            {arr1.map((row) => (
              <MenuItem key={row} value={row}>
                {row}
              </MenuItem>
            ))}
            <MenuItem value={"" || "none"}>
              {" "}
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ p: 1 }}>
        {layout == "" ? (
          ""
        ) : layout == "none" ? (
          <h4> Please select report </h4>
        ) : (
          <Table height={height} name={layout} />
        )}
      </Box>
    </div>
  );
};
