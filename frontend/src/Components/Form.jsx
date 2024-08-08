import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from "react-redux";
import {createContacts, editContact} from "../Redux/ContactSlice";

import { toast } from "react-toastify";
import "./style.css";

const Form = ({formVisible, initialContent}) => {
  const dispatch = useDispatch();

  const [iscontact, setiscontact] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    place: "",
  });
  useEffect(() => {
    if (initialContent) {
      setiscontact(initialContent);
    }
  }, [initialContent]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setiscontact({
      ...iscontact,
      [name]: value,
    });
    console.log("formData", iscontact);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // edit submit if initialcontent
    if (initialContent) {
      dispatch(editContact({id: initialContent._id, updateData: iscontact}));
      formVisible();
      toast.success('Updated Succesfull')

    } else {
      dispatch(createContacts({iscontact}));
      formVisible();
      toast.success('Contact Created ')
    }
  };
  return (
    <>
      <section className=" form_container">
        <header>
          {" "}
          <h2>
            {" "}
            Contact Form <FontAwesomeIcon className="close_icon" onClick={formVisible} icon={faXmark} />
          </h2>
        </header>
        <form className="form" action="#" onSubmit={handleSubmit}>
          <div className="column">
            <div className="input-box">
              <label>Salutation</label>
              <select name="salutation" value={iscontact.salutation} onChange={handleChange}>
                <option>select</option>
                <option>Mr</option>
                <option>Mrs</option>
              </select>
            </div>
            <div className="input-box">
              <label>First Name</label>
              <input
                required=""
                value={iscontact.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                type="text"
                name="firstName"
              />
            </div>
            <div className="input-box">
              <label>Last Name</label>
              <input
                required=""
                value={iscontact.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                type="text"
                name="lastName"
              />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Phone Number</label>
              <input
                required=""
                value={iscontact.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                type="telephone"
                name="phone"
              />
            </div>
            <div className="input-box">
              <label>Email</label>
              <input
                required=""
                value={iscontact.email}
                onChange={handleChange}
                placeholder="Enter email"
                type="email"
                name="email"
              />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Place</label>
              <input
                required=""
                value={iscontact.place}
                onChange={handleChange}
                placeholder="Enter place"
                type="text"
                name="place"
              />
            </div>
          </div>
          <div className="submit_button">
            <button>Submit</button>
            <button className="cancel_btn" onClick={formVisible}>
              cancel
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
