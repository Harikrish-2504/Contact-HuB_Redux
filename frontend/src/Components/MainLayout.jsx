import React, {useEffect, useState} from "react";
import Header from "./Header";
import Table from "./Table";
import Form from "./Form";
import DeleteForm from "./DeleteForm";
import {useSelector, useDispatch} from "react-redux";
import {fetchContacts, setPagesize} from "../Redux/ContactSlice";
import Footer from "./Footer";
const MainLayout = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  //state for Form Opening and closing
  const [isFormvisible, setFormVisible] = useState(false);

  //state for delete form
  const [deleteVisible, setdeleteVisible] = useState(false);

  //setting state for edit form details
  const [editform, seteditform] = useState(null);

  //setting state for delete id
  const [deleteid, setdeleteid] = useState(null);

  //setting states for search and limit
  const [search, setsearch] = useState("");
  const [limit, setlimit] = useState(5);
  const [page, setpage] = useState(1);

  useEffect(() => {
    dispatch(setPagesize(limit));
    dispatch(fetchContacts({searchQuery: search, pageSize: limit, currentPage: page}));
  }, [search, limit]);

  //changing form controll
  const formVisible = (id) => {
    if (id) {
      const contactUpdate = contacts.find((contact) => contact._id === id);
      seteditform(contactUpdate);
    }

    setFormVisible(!isFormvisible);
  };

  //changing Delete form controll
  const delFormVisible = (id) => {
    setdeleteid(id);
    setdeleteVisible(!deleteVisible);
  };
  return (
    <div>
      <Header setsearch={setsearch} search={search} limit={limit} setlimit={setlimit} />
      <Table formVisible={formVisible} delFormVisible={delFormVisible} />
      {isFormvisible && (
        <div className="overlay" onClick={formVisible}>
          {" "}
        </div>
      )}
      {isFormvisible && <Form formVisible={formVisible} initialContent={editform} />}
      {deleteVisible && (
        <div className="overlay" onClick={delFormVisible}>
          {" "}
        </div>
      )}
      {deleteVisible && <DeleteForm delFormVisible={delFormVisible} contactId={deleteid} />}
      <Footer setpage={setpage} limit={limit} />
    </div>
  );
};

export default MainLayout;
