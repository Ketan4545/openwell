import React, { useState } from "react";
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
import { ListItemButton, FormHelperText } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";

const SpaceUpdate = () => {
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();
  const [name1, setName1] = useState("");
  const [desc, setDesc] = useState("");
  const [query, setQuery] = useState("");

  function updateReport() {
    navigate("/report/" + encodeURI(params["name"]));
    //navigate("", {replace : true})
    console.log(name1, desc, query);
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
        <textarea
          id="textarea"
          id="textarea"
          placeholder="Select query..."
          rows={5}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
      </Stack>
      <FormHelperText>
        Select column1, column2, column3 from Table_name
      </FormHelperText>

      <Button
        id="btn"
        variant="contained"
        sx={{ mt: 5 }}
        onClick={updateReport}
      >
        Update Report
      </Button>
    </div>
  );
};

export default SpaceUpdate;
