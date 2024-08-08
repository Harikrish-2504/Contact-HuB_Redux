import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Header = ({setsearch ,search , limit , setlimit}) => {
  const totalContacts = useSelector((state) => state.contacts.totalContacts)
 
  useEffect(()=>{
    
  },[])


  return (
    <header className='header'>
      <div className='container'>
        <div className='heading'>
          <div>
            <h1><FontAwesomeIcon icon={faAddressBook} /> CONTACT LIST</h1>
          </div>
          <div className='search_bar'>
            <div className='total_contact'>
              <select onChange={(e)=>setlimit(e.target.value)} value={limit} >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
              <span>of {totalContacts} </span>
            </div>
            <div><FontAwesomeIcon className='icon' icon={faMagnifyingGlass} /></div>
            <input onChange={(e)=> setsearch(e.target.value)} value={search}  placeholder='search...' name='search' />
          </div>
        </div>
      </div>
    </header>  )
}

export default Header