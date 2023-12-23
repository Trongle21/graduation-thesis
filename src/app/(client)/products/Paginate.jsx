import React from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const Paginate = () => {
  const { onPageClick, pageCount } = useAppContext();
  return (
    <div className="pagination--product">
      <div className="pagination--product">
        <ReactPaginate
          breakAriaLabels="..."
          nextLabel={<GrFormNext />}
          onPageChange={onPageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={<GrFormPrevious />}
          renderOnZeroPageCount={null}
          pageClassName="pagination--item"
          activeClassName="active"
          pageLinkClassName="pagination--item__link"
        />
      </div>
    </div>
  );
};

export default Paginate;
