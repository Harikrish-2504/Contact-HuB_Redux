import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchContacts} from "../Redux/ContactSlice";


const Footer = ({setpage, limit}) => {
  const dispatch = useDispatch();
  const pageCount = useSelector((state) => state.contacts.totalPages);
  useEffect(()=>{console.log("pagecount",pageCount);
  })
  const handlePageClick = (newPage) => {
    const data = newPage.selected + 1;
    setpage(data);
    dispatch(fetchContacts({currentPage: data , pageSize:limit}));
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel="  >  "
            onPageChange={handlePageClick}
            pageRangeDisplayed={limit}
            pageCount={pageCount}
            previousLabel=" < "
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
