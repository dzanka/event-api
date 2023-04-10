import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Typography, List } from "@mui/material";

import EventsItem from "./EventsItem";

const EventsList = () => {
  const { isAuthorized } = useSelector((state) => state.auth);
  const [events, setEvents] = useState("");
  const [loadingError, setLoadingError] = useState(null);

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      };
      response = await window.gapi.client.calendar.events.list(request);
    } catch (err) {
      setLoadingError(err.message);
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      return;
    }

    setEvents(events);
  }

  useEffect(() => {
    if (isAuthorized) {
      listUpcomingEvents();
    }
  }, [isAuthorized]);

  return (
    <>
      {isAuthorized && (
        <Grid item xs={2}>
          {loadingError && <Typography>{loadingError}</Typography>}
          {events ? (
            <List>
              {events.map((event) => (
                <EventsItem
                  key={event.id}
                  start={event.start.dateTime || event.start.date}
                  summary={event.summary}
                />
              ))}
            </List>
          ) : (
            <Typography>No event found.</Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default EventsList;
