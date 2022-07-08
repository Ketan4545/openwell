import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GridOnIcon from "@mui/icons-material/GridOn";
import EditIcon from "@mui/icons-material/Edit";
import { ListItemButton } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader
} from "@mui/material";
import axios from "axios";

const SpaceCreate = () => {
  const name = "three";
  const navigate = useNavigate();
  const [name1, setName1] = useState("");
  const [desc, setDesc] = useState("");
  const [layout, setLayout] = useState("one");
  const [send, setSend] = useState(false);
  const params = useParams();

  function createSpace() {
    // navigate("/" + params["name"] + "/" + name);
    console.log(name1, desc, layout);

    if (name1 != "" && desc != "") {
      const payload = {
        path: params["name"],
        name: name1,
        desc: desc,
        layout: layout,
        first: "none",
        second: "none"
      };

      axios
        .post(`https://sql-dash-backend.herokuapp.com/Create`, payload)
        .then((res) => {
          console.log(res);
          console.log(res.data);
          navigate("/" + params["name"] + "/" + name1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please fill mandatory field");
    }
  }

  useEffect(() => {
    if (send === true) {
      createSpace();
    }
    setSend(false);
  }, [send]);

  console.log(params["name"]);
  return (
    <div>
      <Stack spacing={5}>
        <TextField
          fullWidth
          label="Name"
          id="name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </Stack>
      <FormControl fullWidth sx={{ pt: 5 }}>
        <InputLabel id="demo-simple-select-label" sx={{ pt: 7 }}>
          Layout
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={layout}
          label="Layout"
          onChange={(e) => setLayout(e.target.value)}
        >
          <MenuItem value="one">Single</MenuItem>
          <MenuItem value="two">Split</MenuItem>
        </Select>
      </FormControl>
      <Button
        id="btn"
        variant="contained"
        sx={{ mt: 5 }}
        onClick={() => setSend(true)}
      >
        Create Report
      </Button>
    </div>
  );
};

export default SpaceCreate;
