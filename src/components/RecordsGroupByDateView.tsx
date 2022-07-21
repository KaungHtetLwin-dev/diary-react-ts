import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Controller from "../controller";
import RecordView from "./RecordView";
import { useSwipeable } from "react-swipeable";
import Fade from "@mui/material/Fade";
import { Container } from "@mui/system";
import RecordsListView from "./RecordsListView";

type Direction = "left" | "right" | "up" | "down";

export default function RecordsGroupByDateView(props: any) {
  let groupedEntries = props.groupedEntries;
  let initDirection: Direction = "left";

  const [tabindex, setTabIndex] = React.useState(0);
  const [slideDirection, setSlideDirection] = React.useState("left");
  const [showSlide, setShowSlide] = React.useState(false);

  let sortedDates = Object.keys(groupedEntries);
  sortedDates.sort((keyA, keyB) => {
    let arrayA = keyA.split(".");
    let dayA = parseInt(arrayA[0]);
    let monthA = parseInt(arrayA[1]);
    let yearA = parseInt(arrayA[2]);
    let dateA = new Date(yearA, monthA, dayA);

    let arrayB = keyB.split(".");
    let dayB = parseInt(arrayB[0]);
    let monthB = parseInt(arrayB[1]);
    let yearB = parseInt(arrayB[2]);
    let dateB = new Date(yearB, monthB, dayB);

    return dateB.getTime() - dateA.getTime();
  });

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Left" && tabindex > 0) {
        setTabIndex(tabindex - 1);
        setSlideDirection("right");
        setTimeout(() => setShowSlide(true), 500);

        return;
      }
      if (eventData.dir == "Right" && tabindex < sortedDates.length - 1) {
        setTabIndex(tabindex + 1);
        setSlideDirection("left");
        setTimeout(() => setShowSlide(true), 500);

        return;
      }
    },
  });

  // setup ref for your usage
  const myRef = React.useRef();

  const refPassthrough = (el: any) => {
    // call useSwipeable ref prop with el
    handlers.ref(el);

    // set myRef el so you can access it yourself
    myRef.current = el;
  };

  if (Object.keys(groupedEntries).length === 0) {
    return (
      <Container>
        <Typography>No Record</Typography>
      </Container>
    );
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={2}
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            tabindex < sortedDates.length - 1 ? setTabIndex(tabindex + 1) : "";
            setSlideDirection("right");
            setTimeout(() => setShowSlide(true), 500);
          }}
        >
          <ArrowBack />
        </IconButton>

        <Select
          IconComponent={() => null}
          disableUnderline
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
          value={tabindex}
          onChange={(event) =>
            setTabIndex(parseInt(event.target.value as string))
          }
        >
          {sortedDates.map((date, index) => {
            return <MenuItem value={index}> {date}</MenuItem>;
          })}
        </Select>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            tabindex > 0 ? setTabIndex(tabindex - 1) : "";
            setSlideDirection("left");
            setTimeout(() => setShowSlide(true), 500);
          }}
        >
          <ArrowForward />
        </IconButton>
      </Stack>

      <Box
        style={{ height: "80vh", width: "100%", overflow: "auto" }}
        key={tabindex}
        {...handlers}
        ref={refPassthrough}
      >
        {groupedEntries[sortedDates[tabindex]] ? (
          <RecordsListView records={groupedEntries[sortedDates[tabindex]]} />
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
}
