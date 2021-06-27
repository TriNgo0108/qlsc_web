import * as React from "react";
import { DataGrid,GridColDef } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@material-ui/lab/Pagination";
import useStyles from "../styles/styles";
import clsx from "clsx";
import { useState } from "react";

export default function CustomGird({ rows, onPageChange, loading }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const columns = [
    {
      field: "index",
      headerName: "#",
      renderCell: (params) => {
        return (
          <div className={classes.row}>
            <p>{params.value}</p>
            <IconButton aria-label="chat">
              <FontAwesomeIcon icon={faComment} size="sm" />
            </IconButton>
            <IconButton aria-label="ellipisi">
              <FontAwesomeIcon icon={faEllipsisH} size="sm" />
            </IconButton>
          </div>
        );
      },
      flex:1
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
          root: clsx(classes.noRowsOverlay, classes.block,classes.textPadding),
        }}
        rows={rows}
        columns={columns}
        pageSize={5}
        page={page-1}
        disableSelectionOnClick={true}
        disableColumnMenu={true}
        loading={loading}
        components={{
          NoRowsOverlay: () => {
            return <strong>Không có dữ liệu</strong>;
          },
          Pagination: () => {
            return (
              <div className={clsx(classes.row, classes.spaceBetween)}>
                <div>
                  Hiển thị {rows.length === 0? 0 :page * 5 - 4} - {rows.length === 0 ? 0 :  page * 5} trên tổng {rows.length} báo
                  cáo
                </div>
                <div>
                  <Pagination
                    count={Math.floor(rows.length / 5)}
                    color="primary"
                    page={page}
                    onChange={(event, page) => {
                      setPage(page);
                      if (page * 5 === rows.length) onPageChange();
                    }}
                  />
                </div>
              </div>
            );
          },
        }}
      />
    </div>
  );
}
