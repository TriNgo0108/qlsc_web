import * as React from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import useStyles from "../styles/styles";
import clsx from "clsx";

// const rows = [
//   {
//     id: 1,
//     index:"01",
//     status: "Phân tích",
//     reportCode: "MAYR-21-00064",
//     reportType: "Bắt buộc",
//     incidentObject: "Trang thiết bị/cở sở hạ tầng",
//     reportDate: "19/02/2021 11:51",
//     detector: "Tôi là nhà báo cáo sự cố",
//     description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//   },
//   {
//     id: 2,
//     index:"01",
//     status: "Phân tích",
//     reportCode: "MAYR-21-00064",
//     reportType: "Bắt buộc",
//     incidentObject: "Trang thiết bị/cở sở hạ tầng",
//     reportDate: "19/02/2021 11:51",
//     detector: "Tôi là nhà báo cáo sự cố",
//     description: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//   },
// ];

export default function CustomGird({rows}) {
  const classes = useStyles();
  const columns = [
    {
      field: "index",
      headerName: "#",
      renderCell: (params) => {
        <div className={classes.row}>
          <span>{params.value}</span>
          <IconButton aria-label="chat">
            <FontAwesomeIcon icon={faComment} />
          </IconButton>
          <IconButton aria-label="ellipisi">
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
        </div>;
      },
    },
    { field: "status", headerName: "Trạng thái", width: 100 },
    { field: "reportNo", headerName: "Mã BC", width: 100 },
    { field: "reportType", headerName: "Loại BC", width: 100 },
    { field: "incidentObject", headerName: "Đối tượng", width: 150 },
    { field: "reportTime", headerName: "Ngày báo cáo", width: 150 },
    { field: "detector", headerName: "Người báo cáo", width: 150 },
    { field: "detailDescription", headerName: "Mô tả", width: 150, flex: 1 },
  ];
  return (
    <div style={{ height: 400, width: "100%", marginTop: 20 }}>
      <DataGrid
        classes={{
          columnHeader: clsx(classes.girdData, classes.lastChild),
          cell: clsx(classes.girdData, classes.overFlow),
          root: classes.hideButton,
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick={true}
        disableColumnMenu={true}
      />
    </div>
  );
}
