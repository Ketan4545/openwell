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
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select
} from "@mui/material";
import axios from "axios";

const ChartCreate = () => {
  const navigate = useNavigate();
  const name = "three";
  const [name1, setName1] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("line");
  const [stack, setStack] = useState(false);
  const [query, setQuery] = useState("");
  const [send, setSend] = useState(false)

  function createChart() {
    console.log(stack, name1, desc, query, type);

    if (name1 != "" && desc != "" && query != "") {
      const payload = {
        path : "Charts",
        name: name1,
        desc: desc,
        type: type,
        stack: stack,
        query: query
      };

      axios.post(`https://sql-dash-backend.herokuapp.com/Create`, payload).then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/chart/" + name1);
      }).catch((error) => {
        console.log(error);
    });
    } else {
      alert("Please fill mandatory field");
    }
  }

  

  useEffect(()=>{
    if (send === true){
    createChart()
    }
    setSend(false)
  }, [send])

  function createChart1() {
    navigate("/chart/" + name);
  }

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
      <FormControl sx={{ m: 1, minWidth: 120, mt: 5 }}>
        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="mixed">Mixed</MenuItem>
        </Select>
        <FormHelperText>Type of chart</FormHelperText>
        {type === "bar" ? (
          <FormControlLabel
            control={<Checkbox />}
            value={stack}
            label="Stacked"
            onChange={() => setStack(true)}
          />
        ) : (
          ""
        )}
      </FormControl>
      <Box sx={{ pt: 2 }}>
        <textarea
          id="textarea"
          id="textarea"
          defaultValue={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Select query..."
          rows={5}
          cols={100}
        ></textarea>
        <FormHelperText>
          Select column, bar, primary, secondary from Table_name
        </FormHelperText>
      </Box>
      <Button id="btn" variant="contained" sx={{ mt: 3 }} onClick={()=>setSend(true)}>
        Create Chart
      </Button>
    </div>
  );
};

export default ChartCreate;
