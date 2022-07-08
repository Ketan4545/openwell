import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Text from "./Text";

export default function Layout() {
  let space = { name: "two" };
  return (
    <Box>
      {space.name === "one" ? (
        <Grid item xs={12}>
          <Text data={space} space={1} />
        </Grid>
      ) : (
        <>
          <Grid xs={12}>
            <Text data={space} space={1} />
          </Grid>
          <Grid xs={12}>
            <Text data={space} space={2} />
          </Grid>
        </>
      )}
    </Box>
  );
}
