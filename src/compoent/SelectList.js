import React from "react";
import { Select } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const SelectList = ({ value, onChange, items, id, placeHolder, classes }) => {
  let options = items.map((item) => {
    return (
      <option
        key={item.id}
        value={item.departmentName == null ? item.code : item.id}
      >
        {item.departmentName == null ? item.name : item.departmentName}
      </option>
    );
  });
  options = [<option key="aaaaa">{placeHolder}</option>, ...options];
  return (
    <Select
      classes={{ root: classes }}
      native
      value={value}
      onChange={onChange}
      inputProps={{ id: id }}
      IconComponent={ExpandMoreIcon}
    >
      {options}
    </Select>
  );
};
export default SelectList;
