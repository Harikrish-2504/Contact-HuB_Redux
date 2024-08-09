import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {useEffect} from "react";

const Header = ({setsearch, search, limit, setlimit}) => {
  const totalContacts = useSelector((state) => state.contacts.totalContacts);
  const [debounce, setdebounce] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsearch(debounce);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [debounce, setsearch]);
  const handlechange = (e) => {
    setdebounce(e.target.value);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="heading">
          <div>
            <h1>
              <FontAwesomeIcon icon={faAddressBook} /> CONTACT LIST
            </h1>
          </div>
          <div className="search_bar">
            <div className="total_contact">
              <select onChange={(e) => setlimit(e.target.value)} value={limit}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <span>of {totalContacts} </span>
            </div>
            <div>
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
            </div>
            <input onChange={handlechange} value={debounce} placeholder="search..." name="search" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
