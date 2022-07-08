import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Text from "./Text";
import axios from "axios";

const Space = () => {
  const params = useParams();
  const [name1, setName1] = useState("");
  const [desc, setDesc] = useState("");
  const [layout, setLayout] = useState("one");
  // const navigate = useNavigate();

  useEffect(() => {
    setLayout("");
    const payload = {
      path: params["name"],
      name: params["id"]
    };

    axios
      .post("https://sql-dash-backend.herokuapp.com/Listdata", payload)
      .then((res) => {
        setName1(res.data["name"]);
        setDesc(res.data["desc"]);
        setLayout(res.data["layout"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params["id"]]);

  let space = { path: params["name"], name: params["id"] };
  //console.log(layout);

  return (
    <div>
      {/* <h4>
        {params["name"]}, {params["id"]}
      </h4> */}
      <IconButton color="secondary" edge="end" aria-label="delete" size="small">
        <DeleteIcon />
      </IconButton>

      <Box sx={{ width: "78vw" }}>
        {layout === "one" ? (
          <Grid item xs={12}>
            <Text data={space} space="first" height={450} />
          </Grid>
        ) : layout === "two" ? (
          <>
            <Grid item xs={12}>
              <Text data={space} space="first" height={220} />
            </Grid>
            <Grid item xs={12}>
              <Text data={space} space="second" height={220} />
            </Grid>
          </>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
};

export default Space;
