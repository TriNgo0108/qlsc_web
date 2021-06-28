import { React, useEffect, useState,useRef } from "react";
import {
  Container,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../styles/styles";
import SelectList from "../compoent/SelectList";
import clsx from "clsx";
import axios from "axios";
import CustomGird from "../compoent/CustomGrid";
import { fromUnixTime,format,getUnixTime } from "date-fns";

const ListReport = ({fromDate,toDate}) => {
  const [department, setDepartment] = useState([]);
  const [incidentObject, setIncidentObject] = useState([]);
  const [reportStatus, setReportStatus] = useState([]);
  const [reportType, setReportType] = useState([]);
  const [departmentValue, setDepartmentValue] = useState("");
  const [reportStatusValue, setReportStatusValue] = useState("");
  const [reportTypeValue, setReportTypeValue] = useState("");
  const [incidentObjectValue, setIncidentObjectValue] = useState("");
  const [reports, setReports] = useState([]);
  const [page,setPage] = useState(1);
  const [searchKey,setSearchKey] = useState("");
  const [isLoading,setLoading] = useState(true);
  const [sizeQuery,setSizeQuery] = useState(0);
  const searchRef = useRef("");
  const  prePage = useRef(1);
  const incidentList = useRef([]);
  const reportTypeList = useRef([]);
  const reportStatusList = useRef([]);
  const departmentList = useRef([]);
  const preFromDate = useRef(fromDate);
  const preToDate = useRef(toDate);
  const pageCount = useRef(0);
  const onSubmit = (event) => {
    event.preventDefault();
    setSearchKey(searchRef.current.value);
    setLoading(true);
  };
  const onPageChange = (page) =>{
    setPage(page);
    setLoading(true);
  }
  const objectData = (page,incidentObject,reportStatus,reportType,department,fromDate,toDate,searchKey)=>{
      let data = {page:page};
      if (incidentObject !== ""){
        data.incidentObject = incidentObject;
      }
      if (reportStatus !== ""){
        data.status = reportStatus;
      }
      if (reportType !== ""){
        data.reportType = reportType;
      }
      if (department !== ""){
        data.departmentId = department;
      }
      if (fromDate !== preFromDate.current || toDate !== preToDate.current){
        data.reportTime = `${getUnixTime(fromDate)},${getUnixTime(toDate)}`
      }
      if (searchKey !== ""){
        data.searchKey = searchKey;
      }
      
      console.log(data);
        return data;
  }
  const classes = useStyles();
  useEffect(() => {
    let getData = async () => {
      let accessToken = sessionStorage.getItem("accessToken");
      let tokenType = sessionStorage.getItem("tokenType");
      let auth = `${tokenType} ${accessToken}`;
      let reportsList = [];
      
      if (departmentList.current.length === 0) {
        let response_dept = await axios.post(
          "https://qlsc.maysoft.io/server/api/getAllDepartments",
          {},
          {
            headers: {
              authorization: auth,
            },
          }
        );
        if (response_dept.status === 200) {
          departmentList.current = response_dept.data.data.data;
          setDepartment(departmentList.current);
        }
      }
      if (
        incidentList.current.length === 0 ||
        reportTypeList.current.length === 0 ||
        reportStatusList.current.length === 0
      ) {
        let response = await axios.post(
          "https://qlsc.maysoft.io/server/api/getCommon",
          { groups: "incidentObject, reportStatus, reportType"},
          {
            headers: {
              authorization: auth,
            },
          }
        );
        if (response.status === 200) {
          reportStatusList.current = response.data.data.reportStatus;
          reportTypeList.current = response.data.data.reportType;
          incidentList.current = response.data.data.incidentObject;
          setIncidentObject(incidentList.current);
          setReportStatus(reportTypeList.current);
          setReportType(incidentList.current);
        }
      }
      let response_report = await axios.post(
        "https://qlsc.maysoft.io/server/api/getAllReports",
        objectData(page,incidentObjectValue,reportStatusValue,reportTypeValue,departmentValue,fromDate,toDate,searchKey),
        {
          headers: {
            authorization: auth,
          },
        }
      );
      if (response_report.status === 200) {
        if (response_report.data.code === 200){
          reportsList = response_report.data.data.data;
          setSizeQuery(response_report.data.data.sizeQuerySnapshot);
        }
        else{
          reportsList = [];
        }
        setLoading(false)
      }
      try {
        if (prePage.current === page || prePage.current > page){
          pageCount.current = 0;
        }
        else{
            pageCount.current = reports.length;
        }
        reportsList.forEach((report,index) => {
          report.index = index +1 + pageCount.current ;
          let statusName = reportStatusList.current.filter(
            (status) => status.code.toString() === report.status
          );
          report.status = statusName[0].name;
          let typeName = reportTypeList.current.filter(
            (type) => type.code === report.reportType
          );
          report.reportType = typeName[0].name;
          let incidentName = incidentList.current.filter(
            (incident) => incident.code === report.incidentObject
          );
          report.incidentObject = incidentName[0].name;
          let date = fromUnixTime(report.reportTime);
          report.reportTime = format(date,"dd/MM/yyyy HH:mm");
        });
        console.log(page)
        if (prePage.current > page){
          console.log("Loading new reports");
          let newReportList = [...reports,...reportsList]  
          setReports(newReportList);
          prePage.current = page;
        }
        else{
          console.log("Create new reports");
          setReports(reportsList);
        }
        
        console.log(reportsList[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [page,departmentValue,incidentObjectValue,reportStatusValue,reportTypeValue,fromDate,toDate,searchKey]);
  return (
    <Container maxWidth="lg">
      <form method="post" className={classes.column} onSubmit={onSubmit}>
        <div className={classes.row}>
          <div className={classes.searchBox}>
            <FormControl focused={false} fullWidth={true} variant="outlined">
              <OutlinedInput
                classes={{ root: classes.searchInput, input: classes.input }}
                placeholder="Tìm tên người báo cáo, số bệnh án"
                name="searchKey"
                id="search"
                aria-describedby="desSearch"
                inputRef={searchRef}
                endAdornment={
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.row}>
            <FormControl
              classes={{ root: classes.marignSelect }}
              focused={false}
              variant="outlined"
            >
              <SelectList
                classes={clsx(classes.select, classes.searchInput)}
                value={departmentValue}
                onChange={(event) => {
                  setDepartmentValue(event.target.value);
                  setLoading(true);
                }}
                items={department}
                id="department"
                placeHolder="-Phòng ban-"
              />
            </FormControl>
            <FormControl
              classes={{ root: classes.marignSelect }}
              focused={false}
              variant="outlined"
            >
              <SelectList
                classes={clsx(classes.select, classes.searchInput)}
                value={reportStatusValue}
                onChange={(event) => {
                  setReportStatusValue(event.target.value);
                  setLoading(true);
                }}
                items={reportStatus}
                id="reportStatus"
                placeHolder="-Trạng thái-"
              />
            </FormControl>
            <FormControl
              classes={{ root: classes.marignSelect }}
              focused={false}
              variant="outlined"
            >
              <SelectList
                classes={clsx(classes.select, classes.searchInput)}
                value={reportTypeValue}
                onChange={(event) => {
                  setReportTypeValue(event.target.value);
                  setLoading(true);
                }}
                items={reportType}
                id="reportType"
                placeHolder="-Loại báo cáo-"
              />
            </FormControl>
            <FormControl
              classes={{ root: classes.marignSelect }}
              focused={false}
              variant="outlined"
            >
              <SelectList
                classes={clsx(classes.select, classes.searchInput)}
                value={incidentObjectValue}
                onChange={(event) => {
                  setIncidentObjectValue(event.target.value);
                  setLoading(true);
                }}
                items={incidentObject}
                id="incidentObject"
                placeHolder="-Đối tượng-"
              />
            </FormControl>
          </div>
        </div>
        <CustomGird rows={reports} onPageChange={onPageChange} loading={isLoading} sizeQuery={sizeQuery} />
      </form>
    </Container>
  );
};
export default ListReport;
