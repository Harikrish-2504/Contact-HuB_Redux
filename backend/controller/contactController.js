const asyncHandler =  require("express-async-handler");
const contactService = require("../service/contactService");
const path = require("path");

//descr get all Contact
//@route Get/Contacts
//@private

/**
 * 
 */
const getAllContact = asyncHandler(async (req,res) => {
    try {
        const searchQuery = req.query.searchQuery || '';
        const currentPage = req.query.currentPage ? parseInt(req.query.currentPage): 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
        const { contacts, totalContacts, totalPages } = await contactService.getAllContact(searchQuery, currentPage, pageSize);

        res.status(200).json({contacts, totalContacts , totalPages ,currentPage});
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//descr get Contact by Id 
//@route Get/Contact
//@private

const getContact = asyncHandler(async(req,res) => {
    const contactById = await contactService.getContactById(req.params.id);
    res.status(200).json(contactById);
});

//descr create new contact
//@route Post/contact
//@access Private

const createContact = asyncHandler(async(req,res) => {
    try {
        const { firstName, lastName, email, phone,salutation,place} = req.body;
        if (!firstName || !lastName || !email || !phone || !salutation || !place) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const  newContact = await contactService.createContact(req.body);
        res.status(200).json(newContact);
    } catch (error) {
       res.status(500).json({ message: "Error while creating the contact" }); 
    }
   
}); 




//descr update the conatct
//@route Put/contact
//@access private

const  editContact = asyncHandler(async(req,res)  => {
    const editedContact = await contactService.updateContact(req.params.id, req.body);
    if(!editedContact){
        return res.status(200).json({status: "failed",data: editedContact, message: "Failed to update contact"})
    }
    res.status(200).json(editedContact)
});


//descr delete Contact
//@route delete/Contact
//@access Private


const deleteContact  = asyncHandler(async(req,res) => {
    const removeContact = await contactService.deleteContact(req.params.id);

    res.status(200).json(removeContact)
});

module.exports = {getAllContact, getContact,createContact,editContact,deleteContact}
