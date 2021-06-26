import { makeStyles } from "@material-ui/core";
import bg from "../images/bg.jpg";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: "60px",
    height: "60px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  toolbarText: {
    margin: "1vw 2vh",
    fontSize: 16,
    "&:hover": {
      "& a": {
        color: "#ff9933 !important",
      },
    },
  },
  active:{
    "& a":{
      color:"#ff9933 !important"
    }
  },
  nextNav: {
    backgroundImage: `url(${bg})`,
    height: "30vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    justifyContent:'space-between'
  },
  main: {
    backgroundColor: "#f0f8fe",
    height:'55vh'
  },
  textBackground: {
    color: "white",
    marginLeft: "5vw",
    alignSelf:"center"
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  datePicker:{
    background:"white",
    alignSelf:"center",
    marginRight:"5vw",
    padding:'5px',
    borderRadius:"4px"
  },
  reportText:{
    alignSelf:'center'
  },
  dateInput:{
    width: "12vw",
  },
  noneBackground:{
    background:"none !import"
  },
  centerButon:{
    alignSelf:"center",
    marginRight:"2vw"
  },
  arrow:{
    fontSize:"20px"
  },
  reportContainer:{
    background:"white",
    padding:'20px',
    marginTop:"-5vh",
    marginLeft:"4vw",
    marginRight:"4vw",
    boxShadow:"0 2px 8px rgb(0 0 0 / 5%)",
    borderRadius:"4px"
  },
  searchBox:{
    width:"25vw"
  },
  searchInput:{
      "&:focus-within":{
        borderColor:"#80bdff !important",
        outline:"0px !important",
        boxShadow:" 0 0 0 0.2rem rgb(0 123 255 / 25%)",
        borderRadius:"4px"
      }
  },
  borderContainer:{
    borderRadius:"4px"
  },
  select:{
    "&:focus":{
      backgroundColor:"#fff"
    },
    width:"8vw",
    padding: "8px 9px"
  },
  marignSelect:{
    marginLeft:"4vw",
  },
  input:{
    padding: "8px 9px"
  },
  girdData:{
    outline:"none !important",
    "& button":{
      display:"none"
    }
  },
  hideButton:{
    
  },
  overFlow:{
    overflow:"unset !important",
    whiteSpace:"unset !important",
    lineHeight:"unset !important",
    overflowWrap:"break-word",
    display:"flex !important",
    flexDirection:"column",
    justifyContent:"space-around"
  },

}));
export default useStyles;
