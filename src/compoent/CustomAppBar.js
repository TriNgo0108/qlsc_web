import {React,useState} from 'react';
import useStyles from '../styles/styles';
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
import logo from "../images/qlsc.png";
import avatar from "../images/avatar.jpg";
import clsx from "clsx";
const CustomAppBar = ()=>{
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    return(
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
    );
}
export default CustomAppBar;