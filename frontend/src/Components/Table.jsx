import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect} from "react";
import {fetchContacts} from "../Redux/ContactSlice";
import {useDispatch, useSelector} from "react-redux";

const Table = ({formVisible, delFormVisible}) => {
  const contacts = [
    {
      salutation: "MR",
      firstName: "Hari",
      lastName: "Krishnan",
      email: "demo@gmail.com",
      place: "TVM",
      phone: "2134234324324",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(fetchContacts());
  }, []);
  const contactslist = useSelector((state) => state.contacts.contacts);
  const loading = useSelector((state) => state.contacts.loading);



  return (
    <div className="table">
      <div className="container table_container">
        <div className="button">
          <button className="create_button" onClick={formVisible}>
            <FontAwesomeIcon className="icons" icon={faPlus} />
            Create
          </button>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Place</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contactslist.map((contact, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{contact.salutation + "." + contact.firstName + " " + contact.lastName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.place}</td>
                  <td>
                    <div className="button">
                      <button className="edit" onClick={() => formVisible(contact._id)}>
                        <FontAwesomeIcon className="icons" icon={faPenToSquare} />
                        Edit
                      </button>
                      <button className="delete" onClick={() => delFormVisible(contact._id)}>
                        <FontAwesomeIcon className="icons" icon={faTrash} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
