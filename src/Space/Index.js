import * as React from "react";
import { useEffect } from "react";
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
import {
  Link,
  BrowserRouter,
  Route,
  useNavigate,
  useParams
} from "react-router-dom";
import Chip from "@mui/material/Chip";
import axios from "axios";

import WorkspacesIcon from "@mui/icons-material/Workspaces";

export default function Index() {
  const navigate = useNavigate();
  const [arr, setArr] = React.useState([]);
  const [data, setData] = React.useState("");
  const params = useParams();
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
  }));
  var str;
  if (document.getElementById("report") != null) {
    str = document.getElementById("report").value;
  }

  function getData() {
    console.log(str);
  }
  useEffect(() => {
    const payload = {
      path: params["name"]
    };

    axios
      .post(`https://sql-dash-backend.herokuapp.com/Listfetch`, payload)
      .then((res) => {
        console.log(res.data);
        const result = res.data;
        setArr(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params["name"]]);

  function createReport() {
    navigate("create");
  }

  return (
    <div>
      <Grid>
        <Box sx={{ pb: 2, pl: 0, pt: 2 }}>
          <Chip
            icon={<AddIcon />}
            label="Create"
            color="primary"
            variant="outlined"
            onClick={createReport}
          />
        </Box>
        <Stack direction="row">
          <Box component="span">
            <List
              sx={{
                width: "100%",
                maxWidth: 300,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: "80vh",
                "& ul": { padding: 0 }
              }}
            >
              {arr.map((row) => (
                <ListItemButton
                  key={row}
                  component={Link}
                  to={`${row}`}
                  value={row}
                >
                  <ListItemAvatar size="small">
                    <WorkspacesIcon color="primary" />
                  </ListItemAvatar>
                  <ListItemText primary={row} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Stack>
      </Grid>
    </div>
  );
}
