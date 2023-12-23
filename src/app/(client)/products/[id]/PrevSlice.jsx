import React from "react";
import { GrPrevious } from "react-icons/gr";

const PrevSlice = (props) => {
  const { onClick } = props;
  return (
    <div className="button--slice prev--slice" onClick={onClick}>
      <GrPrevious />
    </div>
  );
};

export default PrevSlice;
