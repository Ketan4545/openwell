import * as React from "react";

import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import ReportThree from "./ReportThree";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Reportone from "./ReportOne";
import { useParams } from "react-router-dom";
import Create from "../Chart/Create";
import Update from "./Update";
import ReportCreate from "./Create";

export default function Report() {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <Stack direction="row" spacing={5}>
        <ReportThree />
        <Box
          sx={{
            width: "60vw",
            //maxWidth: "100%"
            pt: 10
          }}
          component="span"
        >
          <Routes>
            <Route exact path="create" element={<ReportCreate />} />
            <Route
              exact
              path={encodeURI(params["name"]) + "/update"}
              element={<Update />}
            />
          </Routes>
        </Box>
        <Box
          sx={{
            width: "100vw",
            //maxWidth: "100%"
            pt: 2
          }}
          component="span"
        >
          <Routes>
            <Route
              exact
              path={encodeURI(params["name"])}
              element={<Reportone />}
            />
          </Routes>
        </Box>
      </Stack>
    </div>
  );
}
