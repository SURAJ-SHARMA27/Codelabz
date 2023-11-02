import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ActivityList from "./ActivityList";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap", // Allow content to wrap to the next line on small screens
    padding: "8px",
  },
  title: {
    flex: "1", // Expand to fill remaining space
    [theme.breakpoints.down("sm")]: {
      flex: "auto", // Auto-width on small screens
    },
  },
}));

function Activity() {
  const classes = useStyles();
  const [List, setList] = useState(1);

  const acitvitylist = [
    {
      id: 1,
      icon: LocalOfferIcon,
      text: "Featured",
    },
    {
      id: 2,
      icon: StarBorderIcon,
      text: "New",
    },
    {
      id: 3,
      icon: EmojiEventsIcon,
      text: "Top",
    },
  ];

  return (
    <React.Fragment>
      <Grid container data-testId="activityCard">
        <div className={classes.root}>
          <div className={classes.title}>
            <Typography variant="h6">Activity</Typography>
          </div>
          <div>
            <ActivityList
              value={List}
              toggle={(item) => {
                setList(item.id);
              }}
              acitvitylist={acitvitylist}
            />
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
}

export default Activity;
