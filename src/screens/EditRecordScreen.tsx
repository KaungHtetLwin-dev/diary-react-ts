import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { ArrowBack, Delete, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Controller from "../controller";
import DiaryRecord from "../model";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function EditRecordScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  let initRecord: Record<string, any> = {};
  initRecord.date = new Date();

  initRecord.highlight = {
    new: false,
    star: false,
    fin: false,
  };
  initRecord.title = "";
  initRecord.time = "";

  initRecord.comment = "";

  const [record, setRecord] = React.useState(initRecord);
  React.useEffect(() => {
    if (id) {
      Controller.getController()
        .read(parseInt(id))
        .then((data) => {
          if (data) {
            let readRecord: Record<string, any> = data.toObject();            
            let highlightObj: any = {
              new: false,
              star: false,
              fin: false,
            };
            readRecord.highlight
              .split(",")
              .forEach((value: string) => (highlightObj[value] = true));
            readRecord.highlight = highlightObj;

            setRecord(readRecord);
          }
        });
    }
  }, []);

  const handleHightlightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    record.highlight[event.target.name] = event.target.checked;
    let newRecord = JSON.parse(JSON.stringify(record));
    newRecord.date = new Date(newRecord.date);
    setRecord(newRecord);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRecord = async () => {
    await Controller.getController().delete(DiaryRecord.fromObject(record));
    navigate("/", { replace: true });
  };

  if (!record.id)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate("/")}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              Edit Record
            </Typography>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClickOpen}
            >
              <Delete />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to delete?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={deleteRecord}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ m: 2 }}>
        <Stack spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Date"
              inputFormat="dd/MM/yyyy"
              value={record.date}
              onChange={(date) => setRecord({ ...record, date })}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            id="title"
            label="Title"
            value={record.title}
            onChange={(event) =>
              setRecord({ ...record, title: event.target.value })
            }
          />

          <TextField
            multiline
            maxRows={10}
            id="comment"
            label="Comment"
            value={record.comment}
            onChange={(event) =>
              setRecord({ ...record, comment: event.target.value })
            }
          />

          <FormGroup>
            <Stack direction="row" spacing={2}>
              <FormLabel sx={{ pt: 1.15 }}>Highlight</FormLabel>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={record.highlight.new}
                    onChange={handleHightlightChange}
                    name="new"
                  />
                }
                label="new"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={record.highlight.star}
                    onChange={handleHightlightChange}
                    name="star"
                  />
                }
                label="star"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={record.highlight.fin}
                    onChange={handleHightlightChange}
                    name="fin"
                  />
                }
                label="fin"
              />
            </Stack>
          </FormGroup>

          <TextField
            id="time"
            label="Time"
            value={record.time}
            onChange={(event) =>
              setRecord({ ...record, time: event.target.value })
            }
          />
        </Stack>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
        onClick={() => {
          record.time = parseFloat(record.time);
          record.highlight = Object.entries(record.highlight)
            .filter(([key, value]) => value)
            .map(([key, value]) => key)
            .join();

          Controller.getController().update(DiaryRecord.fromObject(record));

          navigate("/", { replace: true });
        }}
      >
        <Save />
      </Fab>
    </>
  );
}
