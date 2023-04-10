import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import AuthButtons from "./components/AuthButtons";
import EventList from "./components/EventsList";

export default function App() {
  const { isAuthorized } = useSelector((state) => state.auth);
  const [enableButtons, tokenClient] = useAuth();

  return (
    <>
      {enableButtons && (
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <AuthButtons isAuthorized={isAuthorized} tokenClient={tokenClient} />
          <EventList />
        </Grid>
      )}
    </>
  );
}
