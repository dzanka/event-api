import React, { useState, useEffect } from "react";
import { useExternalScript } from "./useExternalScript";

export const useAuth = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOC = process.env.REACT_APP_DISCOVERY_DOC;

  const [tokenClient, setTokenClient] = useState();
  const [enableButtons, setEnableButtons] = useState(false);

  // load gapi
  const gapiUrl = "https://apis.google.com/js/api.js";
  const gapiState = useExternalScript(gapiUrl);

  // load gis
  const gisUrl = "https://accounts.google.com/gsi/client";
  const gisState = useExternalScript(gisUrl);

  const gisLoaded = () => {
    setTokenClient(
      window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: process.env.REACT_APP_SCOPES,
        callback: "", // defined later
      })
    );
  };

  const gapiLoaded = () => {
    window.gapi.load("client", initializeGapiClient);
  };

  useEffect(() => {
    if (gapiState === "ready") {
      gapiLoaded();
    }
    if (gisState === "ready") gisLoaded();
  }, [gapiState, gisState]);

  useEffect(() => {
    if (gapiLoaded && gisLoaded) setEnableButtons(true);
  }, [gapiLoaded, gisLoaded]);

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  async function initializeGapiClient() {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  }

  return [enableButtons, tokenClient];
};
