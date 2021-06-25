import React from "react";
import {
  AppBar,
  Toolbar,
  Link,
  Button,
  ListItemText,
  Avatar,
  MenuItem,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import StyledMenu from "../compoent/StyledMenu";
import viLocale from "date-fns/locale/vi";
import { useState } from "react";
import "../css/home.css";
import logo from "../images/qlsc.png";
import avatar from "../images/avatar.jpg";
import useStyles from "../styles/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AssignmentIcon from "@material-ui/icons/Assignment";
import clsx from "clsx";
import ListReport from "./ListReport";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  let date = new Date();
  console.log(date);
  let previousMonth = new Date();
  previousMonth.setMonth(date.getMonth() - 1);
  const [fromDate, setFromDateChange] = useState(previousMonth);
  const [toDate, setToDateChange] = useState(new Date());
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div className={classes.column}>
      <AppBar className="nav">
        <Toolbar className="toolbar">
          <div>
            <Link>
              <img className="img" src={logo} alt="logo"></img>
            </Link>
          </div>
          <div className={classes.row}>
            <Typography
              className={clsx(classes.toolbarText, classes.active)}
              variant="h6"
            >
              <Link href="/list-report">Danh sách báo cáo</Link>
            </Typography>
            <Typography className={classes.toolbarText} variant="h6">
              <Link href="/list-report">Theo dõi giải quyết sự cố</Link>
            </Typography>
            <Typography className={classes.toolbarText} variant="h6">
              <Link href="/list-report">Số liệu thống kê</Link>
            </Typography>
            <Typography className={classes.toolbarText} variant="h6">
              <Link href="/list-report">Quản lý phòng ban</Link>
            </Typography>
            <Typography className={classes.toolbarText} variant="h6">
              <Link href="/list-report">Quản lý người dùng</Link>
            </Typography>
            <Typography className={classes.toolbarText} variant="h6">
              <Link href="/list-report">Cấu hình hệ thống</Link>
            </Typography>
          </div>
          <div>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar
                classes={{ root: classes.avatar }}
                src={avatar}
                alt="avatar"
              />
            </Button>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <ListItemText
                  primary="Tôi là nhà quản lý sự cố"
                  secondary="tringo0108@gmail.com"
                />
              </MenuItem>
              <MenuItem>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                >
                  Thông tin cá nhân
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="outlined"
                  fullWidth={true}
                  color="primary"
                  className={classes.margin}
                >
                  Đăng xuất
                </Button>
              </MenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
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
          <ListReport />
        </div>
      </div>
    </div>
  );
};

export default Home;
