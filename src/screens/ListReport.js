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
import { fromUnixTime,format } from "date-fns";

const ListReport = () => {
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
  const [isLoading,setLoading]=useState(true);
  const  prePage = useRef(1);
  const onSubmit = (values) => {
    console.log(values);
  };
  const onPageChange = (params) =>{
    if (params.page + 1 === params.pageCount){
      console.log("OK");
      setPage(page + 1);
      setLoading(true);
    }
  }
  const objectData = (page,incidentObject,reportStatus,reportType,department)=>{
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
      console.log(data);
        return data;
  }
  const classes = useStyles();
  useEffect(() => {
    let getData = async () => {
      let accessToken = sessionStorage.getItem("accessToken");
      let tokenType = sessionStorage.getItem("tokenType");
      let auth = `${tokenType} ${accessToken}`;
      let incidentList = [];
      let reportTypeList = [];
      let reportStatusList = [];
      let reportsList = [];
      
      if (department.length === 0) {
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
          let data = response_dept.data.data.data;
          setDepartment(data);
        }
      }
      if (
        incidentList.length === 0 ||
        reportTypeList.length === 0 ||
        reportStatusList.length === 0
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
          reportStatusList = response.data.data.reportStatus;
          reportTypeList = response.data.data.reportType;
          incidentList = response.data.data.incidentObject;
          setIncidentObject(incidentList);
          setReportStatus(reportTypeList);
          setReportType(incidentList);
        }
      }
      let response_report = await axios.post(
        "https://qlsc.maysoft.io/server/api/getAllReports",
        objectData(page,incidentObjectValue,reportStatusValue,reportTypeValue,departmentValue),
        {
          headers: {
            authorization: auth,
          },
        }
      );
      if (response_report.status === 200) {
        if (response_report.data.code === 200){
          reportsList = response_report.data.data.data;
        }
        else{
          reportsList = [];
        }
        setLoading(false)
      }
      try {
        reportsList.forEach((report,index) => {
          report.index = index +1 ;
          let statusName = reportStatusList.filter(
            (status) => status.code.toString() === report.status
          );
          report.status = statusName[0].name;
          let typeName = reportTypeList.filter(
            (type) => type.code === report.reportType
          );
          report.reportType = typeName[0].name;
          let incidentName = incidentList.filter(
            (incident) => incident.code === report.incidentObject
          );
          report.incidentObject = incidentName[0].name;
          let date = fromUnixTime(report.reportTime);
          report.reportTime = format(date,"dd/MM/yyyy HH:mm");
        });
        console.log(page)
        if (prePage.current !== page){
          console.log("Loading new reports");
          let newReportList = [...reports,...reportsList]  
          setReports(newReportList);
          prePage.current = prePage.current +1 ;
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
  }, [page,departmentValue,incidentObjectValue,reportStatusValue,reportTypeValue]);
  return (
    <Container maxWidth="lg">
      <form className={classes.column} onSubmit={onSubmit}>
        <div className={classes.row}>
          <div className={classes.searchBox}>
            <FormControl focused={false} fullWidth={true} variant="outlined">
              <OutlinedInput
                classes={{ root: classes.searchInput, input: classes.input }}
                placeholder="Tìm tên người báo cáo, số bệnh án"
                id="search"
                aria-describedby="desSearch"
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
        <CustomGird rows={reports} onPageChange={onPageChange} loading={isLoading} />
      </form>
    </Container>
  );
};
export default ListReport;
