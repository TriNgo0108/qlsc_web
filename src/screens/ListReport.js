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
const ListReport = () => {
  const [department, setDepartment] = useState([]);
  const [incidentObject, setIncidentObject] = useState([]);
  const [reportStatus, setReportStatus] = useState([]);
  const [reportType, setReportType] = useState([]);
  const [departmentValue, setDepartmentValue] = useState("");
  const [reportStatusValue, setReportStatusValue] = useState("");
  const [reportTypeValue, setReportTypeValue] = useState("");
  const [incidentObjectValue, setIncidentObjectValue] = useState("");
  const onSubmit = (values) => {
    console.log(values);
  };
  const classes = useStyles();
  useEffect(() => {
    let getData = async () => {
      let accessToken = sessionStorage.getItem("accessToken");
      let tokenType = sessionStorage.getItem("tokenType");
      let auth = `${tokenType} ${accessToken}`;
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
          setIncidentObject(response.data.data.incidentObject);
          setReportStatus(response.data.data.reportStatus);
          setReportType(response.data.data.reportType);
        }
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
                classes={{ root: classes.searchInput, input:classes.input }}
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
        <CustomGird/>
      </form>
    </Container>
  );
};
export default ListReport;
