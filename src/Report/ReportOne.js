import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Table from "../Drum/Table";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Reportone = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [send, setSend] = useState(false);
  const [name, setName] = useState("");

  function editReport() {
    navigate("update");
  }

  function deleteChart() {
    const payload = {
      path: "Reports",
      name: params["name"]
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/Delete`, payload)
      .then((res) => {
        navigate("/report");
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

  useEffect(() => {
    setName(params["name"]);
  }, [params["name"]]);

  return (
    <Box sx={{ width: "75vw" }}>
      <Typography align="center">{name}</Typography>
      <Stack direction="row" spacing={2}>
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
      </Stack>
      <Table height={500} name={name} />
    </Box>
  );
};

export default Reportone;
