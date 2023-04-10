import React from "react";
import { Typography, ListItem, ListItemText } from "@mui/material";

const EventsItem = ({ start, summary }) => (
  <ListItem alignItems="flex-start">
    <ListItemText
      primary={start}
      secondary={
        <>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {summary}
          </Typography>
        </>
      }
    />
  </ListItem>
);

export default EventsItem;
