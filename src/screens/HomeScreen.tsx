import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Drawer } from "@mui/material";

import Container from "@mui/material/Container";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

import Controller from "../controller";
import DiaryRecord from "../model";
import RecordsGroupByDateView from "../components/RecordsGroupByDateView";

export default function HomeScreen() {
  const [drawerState, setdrawerState] = React.useState(false);
  const navigate = useNavigate();
  let initEntries: Array<DiaryRecord> = [];

  const [groupedEntries, setGroupedEntries] = React.useState(new Object());
  useEffect(() => {
    Controller.getController()
      .readAllAndGroupByDate()
      .then((data) => setGroupedEntries(data));
  }, []);

  return (
    <>
      <Box sx={{}}>
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setdrawerState(!drawerState)}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ backgroundColor: "#0091EA" }}>
              <Drawer
                anchor={"left"}
                open={drawerState}
                onClose={() => setdrawerState(!drawerState)}
                sx={{ width: "16rem" }}
              >
                <List
                  sx={{
                    width: "16rem",
                    backgroundColor: "#0091EA",
                    height: "100%",
                    color: "#ffffff",
                  }}
                >
                  <ListItemText sx={{ height: "20%", m: 2 }}>
                    Diary App v1
                  </ListItemText>
                  <ListItemButton
                    onClick={async () => {
                      let records = await Controller.getController().readAll();
                      let csvString = records
                        .map((record: { toCSVRow: () => any }) =>
                          record.toCSVRow()
                        )
                        .join("");
                      let tableHeader =
                        "Date,Week,Project,Project Category,Highlight,Title,Time,Will,Health,Money,Score,Comment\n";
                      let BOM = "\ufeff";
                      var blob = new Blob([BOM + tableHeader + csvString], {
                        type: "text/csv;charset=utf-8;",
                      });
                      saveAs(blob, "export.csv");

                      setdrawerState(!drawerState);
                    }}
                  >
                    <ListItemText primary="Export to CSV" />
                  </ListItemButton>
                  <ListItemButton
                    onClick={async () => {
                      await Controller.getController().deleteAll();
                      setGroupedEntries({});
                      setdrawerState(!drawerState);
                    }}
                  >
                    <ListItemText primary="Clear all data" />
                  </ListItemButton>
                </List>
              </Drawer>
            </Box>

            <Typography
              variant="h6"
              component="div"
              align="center"
              sx={{ flexGrow: 1 }}
            >
              Diary App
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" sx={{ mt: 10 }}>
          <RecordsGroupByDateView groupedEntries={groupedEntries} />
        </Container>

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
          }}
          onClick={() => navigate("/add-record")}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
}
