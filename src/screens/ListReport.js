import { React, useEffect, useState } from "react";
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
  const onSubmit = (values) => {
    console.log(values);
  };
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
        reportStatus.length === 0 ||
        reportType.length === 0 ||
        incidentObject.length === 0
      ) {
        let response = await axios.post(
          "https://qlsc.maysoft.io/server/api/getCommon",
          { groups: "incidentObject, reportStatus, reportType" },
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
        { page: 1 },
        {
          headers: {
            authorization: auth,
          },
        }
      );
      if (response_report.status === 200) {
        reportsList = response_report.data.data.data;
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
        setReports(reportsList);
        console.log(reportsList[0]);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
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
                }}
                items={incidentObject}
                id="incidentObject"
                placeHolder="-Đối tượng-"
              />
            </FormControl>
          </div>
        </div>
        <CustomGird rows={reports} />
      </form>
    </Container>
  );
};
export default ListReport;
