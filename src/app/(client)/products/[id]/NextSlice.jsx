import React from "react";
import { GrNext } from "react-icons/gr";

function NextSlice(props) {
  const { onClick } = props;
  return (
    <div className="button--slice next--slice" onClick={onClick}>
      <GrNext />
    </div>
  );
}

export default NextSlice;
