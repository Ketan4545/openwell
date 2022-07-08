import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axios from "axios";

export default function Chart({ height, name }) {
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("line");
  const [stack, setStack] = useState(false);
  const [query, setQuery] = useState("");

  // let type = "column";

  useEffect(async () => {
    const payload = {
      path: "Charts",
      name: name
    };
    console.log("name", name);
    axios
      .post("https://sql-dash-backend.herokuapp.com/Listdata", payload)
      .then((res) => {
        console.log(res);
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
        console.log(res);

        if (Object.keys(res.data).length != 0) {
          setData(res.data.rows);
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
      text: name
    },
    chart: {
      height: height
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: data.map((a) => a[len[0]]),
      labels: {
        //autoRotationLimit: 10,
        rotation: -3
      }
    },

    series: arr
  };

  return (
    <div height={height}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        // height={height}
      />
    </div>
  );
}
