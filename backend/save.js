// import React, { useState } from "react";
// import { useDispatch , useSelector} from "react-redux";
// import { addContact } from "../../redux/contactSlice";
// import axios from "axios";

// const FormComponent = ({ close }) => {
//   const[formData, setformData ]= useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     image: null,
//   })
//   const dispatch = useDispatch();


//   const addingContact = useSelector((state) => state.contacts.adding);
//   const addContactError = useSelector((state) => state.contacts.error);

//   const handleChange = (e) => {
//     const {name,value} = e.target;
//     setformData((prevformData) => ({
//       ...prevformData,
//       [name]:value,
//     }));
//    };

//    const handleFileChange = (e) => {
//     setformData((prevformData) => ({
//       ...prevformData,
//       image: e.target.files[0],
//     }));
//    };


//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new formData();
//     data.append("firstName",formData.firstName);
//     data.append("lastName",formData.lastName);
//     data.append("email",formData.email);
//     data.append("phone",formData.phone);

//     if(formData.image){
//       data.append("image",formData.image);
//     }
   



//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   const newContact = {
//   //     id: Date.now(),
//   //     firstName,
//   //     lastName,
//   //     email,
//   //     phone
//   //   };

//     try {
//       const response = await axios.post("http://localhost:5001/contact",data);

//       dispatch(addContact(response.data)); // Dispatching the action with the data from the backend
     
//       setformData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         image: null,
//       });
//       close();
//     } 

//     catch (error) {
      
//       console.error("Error creating contact:", error);
//     }
  
//   };

//   return (
//     <>
//       <div className="formContainer">
//         <div className="mainForm">
//           <div className="top">
//             <h3>Create Contact</h3>
//             <button className="closebtn">
//               <i className="fa-solid fa-xmark" onClick={close}></i>
//             </button>
//           </div>
//           <form onSubmit={handleSubmit}>
//           <label htmlFor="image">Profile Image</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//           <label htmlFor="firstName">First Name</label>
//           <input
//             type="text"
//             id="firstName"
//             placeholder="enter the firstname"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             type="text"
//             id="lastName"
//             placeholder="enter the lastname"
//             value={formData.lastName}
//             onChange={handleChange}
//           />
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="enter the email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="text"
//             id="phone"
//             placeholder="enter the phone number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//           />
        
//         <div className="submitBtn">
//           <button className="btn" 
//           type="submit">
//             submit
//           </button>
//         </div>
//         </form>
//         </div>
//       </div>
//       <div className="overlay"></div>
//     </>
//   );
// };

// export default FormComponent;



// import React ,{useEffect, useState} from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const TableBody = () => {

//   const [allcontacts, setallcontacts] = useState([]);
//   const contacts  = useSelector((state) => state.contacts.contacts);
  
//   const fetchContacts = async () => {
//     try {
//       const response  = await axios.get("http://localhost:5001/contact")
//       setallcontacts(response.data);
//     } catch (error) {
//       console.error("Error fetching contacts",error)
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   },[]);

//   useEffect(() => {
//     fetchContacts();
//   },[contacts])

//   return (
//     <>
    
//       <table>
//         <thead>
//           <tr>
//             <th>Sl No</th>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Email</th>
//             <th>Options</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allcontacts.map((contact, index) => (
//             <tr key={contact.id}>
//              <td>{index + 1}</td> 
//              <td> {contact.image && (
//                   <img src={`http://localhost:5001/uploads/${contact.image}`} alt="Profile" width="50" />
//                 )}
//               {contact.firstName} {contact.lastName}</td>
//              <td>{contact.phone}</td>
//              <td>{contact.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default TableBody;
