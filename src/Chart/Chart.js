import * as React from "react";

import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import ReportThree from "./ReportThree";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Reportone from "./ReportOne";
import { useParams } from "react-router-dom";
import Create from "./Create";
import Update from "./Update";
import ChartCreate from "./Create";

export default function Chart() {
  const params = useParams();

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <ReportThree />
        <Box
          sx={{
            width: "100vw",
            //maxWidth: "100%"
            pt: 10
          }}
          component="span"
        >
          <Routes>
            <Route exact path="create" element={<ChartCreate />} />
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
            pt: 5
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
