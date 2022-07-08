import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Controller from "../controller";
import DiaryRecord from "../model";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";


/**
 * Component Name : RecordView
 * Data Input : ID of diary entry
 * Function : Show record data in Card component
 *            If long press, switch to edit record view screen
 *
 *
 */

export default function RecordView(props:any) {
 
  let entry = props.entry;
  
  const navigate = useNavigate();
  

  const [action, setAction] = useState("");

  const timerRef: Record<string, any> = useRef();
  const isLongPress: Record<string, any> = useRef();

  function startPressTimer() {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction("longpress");
      navigate("/edit-record/" + entry.id);
    }, 500);
  }

  function handleOnClick() {
    if (isLongPress.current) {
      console.log("Is long press - not continuing.");
      return;
    }
    setAction("click");
  }

  function handleOnMouseDown() {
    startPressTimer();
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current);
  }

  function handleOnTouchStart() {
    startPressTimer();
  }

  function handleOnTouchEnd() {
    if (action === "longpress") return;

    clearTimeout(timerRef.current);
  }

  return (
    <Card
      variant="outlined"
      sx={{ my: 2 }}
      onClick={handleOnClick}
      onMouseDown={handleOnMouseDown}
      onMouseUp={handleOnMouseUp}
      onTouchStart={handleOnTouchStart}
      onTouchEnd={handleOnTouchEnd}
    >
      <CardContent sx={{ p: 0.5 }}>

        <Typography
          sx={{ fontSize: 14, m: 1 }}
          color={entry.title ==='' ? 'text.secondary' : 'text.primary'}
          gutterBottom
        >
          {entry.title ==='' ? 'No Title' : entry.title}
        </Typography>
        <Divider />
        <Typography
          sx={{ fontSize: 14, m: 1 }}
          color={entry.comment ==='' ? 'text.secondary' : 'text.primary'}
          gutterBottom
        >
          {entry.comment === '' ? 'No Comment': entry.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}
