import React from "react";
import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import viLocale from "date-fns/locale/vi";
import { useState } from "react";
import "../css/home.css";
import useStyles from "../styles/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AssignmentIcon from "@material-ui/icons/Assignment";
import clsx from "clsx";
import ListReport from "./ListReport";
import CustomAppBar from "../compoent/CustomAppBar";

const Home = () => {
  let date = new Date();
  console.log(date);
  let previousMonth = new Date();
  previousMonth.setMonth(date.getMonth() - 1);
  const [fromDate, setFromDateChange] = useState(previousMonth);
  const [toDate, setToDateChange] = useState(new Date());

  const classes = useStyles();
  return (
    <div className={classes.column}>
      <CustomAppBar />
      <div className={clsx(classes.nextNav, classes.row)}>
        <Typography variant="h5" className={classes.textBackground}>
          Danh sách báo cáo
        </Typography>
        <div className={classes.row}>
          <div className={clsx(classes.datePicker, classes.row)}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                InputProps={{
                  disableUnderline: true,
                  classes: { root: classes.dateInput },
                }}
                format="dd/MM/yyyy"
                value={fromDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={setFromDateChange}
              />
              <span className={classes.arrow}>&#8594;</span>
              <KeyboardDatePicker
                autoOk
                variant="inline"
                InputProps={{
                  disableUnderline: true,
                  classes: { root: classes.dateInput },
                }}
                format="dd/MM/yyyy"
                value={toDate}
                InputAdornmentProps={{ position: "start" }}
                onChange={setToDateChange}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.centerButon}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<AssignmentIcon />}
            >
              Báo cáo
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.main}>
        <div className={classes.reportContainer}>
          <ListReport fromDate={fromDate} toDate={toDate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
