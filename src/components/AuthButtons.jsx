import React from "react";
import { useDispatch } from "react-redux";
import { Grid, Button } from "@mui/material";
import { SET_IS_AUTHORIZED } from "../redux/actionTypes";

const AuthButtons = ({ isAuthorized, tokenClient }) => {
  const dispatch = useDispatch();
  /**
   *  Sign in the user upon button click.
   */
  const handleAuthClick = () => {
    if (tokenClient) {
      tokenClient.callback = async (res) => {
        if (res.error !== undefined) {
          throw res;
        }
        dispatch({ type: SET_IS_AUTHORIZED, payload: true });
        // await listUpcomingEvents();
      };

      if (window.gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: "consent" });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: "" });
      }
    }
  };
  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    const token = window.gapi.client.getToken();
    if (token !== null) {
      window.google.accounts.oauth2.revoke(token.access_token);
      window.gapi.client.setToken("");
      dispatch({ type: SET_IS_AUTHORIZED, payload: false });
    }
  }

  return (
    <>
      <Grid item xs={2}>
        <Button variant="contained" onClick={handleAuthClick}>
          {isAuthorized ? "Refresh" : "Authorize"}
        </Button>
      </Grid>
      {isAuthorized && (
        <Grid item xs={2}>
          <Button variant="contained" onClick={handleSignoutClick}>
            Sign Out
          </Button>
        </Grid>
      )}
    </>
  );
};

export default AuthButtons;
