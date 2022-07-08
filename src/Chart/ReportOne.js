import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Chart from "../Drum/Chart";
import Box from "@mui/material/Box";

const Reportone = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("line");
  const [stack, setStack] = useState(false);
  const [query, setQuery] = useState("");

  function editReport() {
    navigate("update");
  }

  function deleteChart() {
    const payload = {
      path: "Charts",
      name: params["name"]
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/Delete`, payload)
      .then((res) => {
        navigate("/chart");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (send === true) {
      deleteChart();
    }
    setSend(false);
  }, [send]);

  useEffect(async () => {
    const payload = {
      path: "Charts",
      name: params["name"]
    };

    axios
      .post("https://sql-dash-backend.herokuapp.com/Listdata", payload)
      .then((res) => {
        console.log(res.data);
        setDesc(res.data["desc"]);
        setType(res.data["type"]);
        setStack(res.data["stack"]);
        setQuery(res.data["query"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function sqlData() {
    const payload = {
      data: query
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/sqlrun`, payload)
      .then((res) => {
        if (Object.keys(res.data).length != 0) {
          setData(res.data.rows);
          console.log(res.data.rows);
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

  console.log(data);
  let len = [];

  if (data[2]) {
    len = Object.keys(data[2]);
  }

  let arr = [];

  if (len.length > 2) {
    arr = [
      {
        data: data.map((a) => a[len[1]]),
        type: type === "mixed" ? "column" : type,
        name: len[1]
      },
      {
        data: data.map((a) => a[len[2]]),
        type: type === "mixed" ? "line" : type,
        name: len[2]
      }
    ];
  } else {
    arr = [
      {
        data: data.map((a) => a[len[1]]),
        type: type === "mixed" ? "column" : type,
        name: len[1]
      }
    ];
  }
  console.log(arr);

  const options = {
    title: {
      text: "Chart"
    },
    chart: {
      height: 450
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: data.map((a) => a[len[2]]),
      labels: {
        //autoRotationLimit: 10,
        rotation: -3
      }
    },

    series: arr
  };

  return (
    <Box sx={{ width: "75vw" }}>
      <h4>{params["name"]}</h4>
      <div>
        {/* <Stack direction="row" spacing={2}> */}
        <IconButton
          edge="end"
          color="primary"
          aria-label="delete"
          size="small"
          onClick={editReport}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          edge="end"
          aria-label="delete"
          size="small"
          onClick={() => setSend(true)}
        >
          <DeleteIcon />
        </IconButton>
        {/* </Stack> */}
      </div>
      {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
      <Chart height={400} name={params["name"]} />
    </Box>
  );
};

export default Reportone;
