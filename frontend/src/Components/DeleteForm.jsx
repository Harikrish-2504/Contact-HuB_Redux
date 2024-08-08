import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteContact} from "../Redux/ContactSlice";

const DeleteForm = ({delFormVisible, contactId}) => {
  const contacts = useSelector((state) => state.contacts.contacts);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contactId));
    delFormVisible();
  };
  return (
    <div>
      <div className="container">
        <div className="delete_contact">
          <h2>Delete</h2>
          <p>Are you sure you want delete contact?</p>

          <div className="delete_button">
            <button className="delete_btn" onClick={handleDelete}>
              YES
            </button>
            <button className="delete_btn close_btn" onClick={delFormVisible}>
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;
