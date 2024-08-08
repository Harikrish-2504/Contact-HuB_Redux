const contactModel = require("../models/contactListModel");


const getAllContact = async (searchQuery, currentPage, pageSize) => {
  
    const matchFor = {};

    if (searchQuery) {
        matchFor.$or = [
            { firstName: { $regex: searchQuery, $options: 'i' } },
            { lastName: { $regex: searchQuery, $options: 'i' } },
            { email: { $regex: searchQuery, $options: 'i' } },
            { phone: { $regex: searchQuery, $options: 'i' } }, 
        ];
    }

    const pipeline = [
        { $match: matchFor },
        { $sort: { createdAt: -1 } },
        {
            $facet: {
                contacts: [
                    { $project: { _id: 1, firstName: 1, image: 1, lastName: 1, email: 1, phone: 1, createdAt: 1, place: 1, salutation: 1 } },
                    { $skip: (currentPage - 1) * pageSize },
                    { $limit: pageSize },  
                ],
                totalContacts: [
                    { $count: 'count' }
                ],
            }
        },
        {
            $project: {
                contacts: 1,
                totalContacts: { $ifNull: [{ $arrayElemAt: ['$totalContacts.count', 0] }, 0] },
                totalPages: { $ceil: { $divide: [{ $arrayElemAt: ['$totalContacts.count', 0] }, pageSize] } }
            }
        }
    ];

    const result = await contactModel.aggregate(pipeline);

    return result[0];
};




const getContactById = async (id) => {
    try {
        const contact = await contactModel.findById(id)
        if(!contact){
           return { success: false, error: "Contact not found" };
        }
        return {success: true, data: contact };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const createContact = async(newContact) => {
    try {
        const createNewContact = await contactModel.create(newContact);
        return { success: true, data: createNewContact };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const updateContact = async(id , updatingContact) => {
    try {
        const updatedContact = await contactModel.findByIdAndUpdate(id, updatingContact, { new: true });
        if (!updatedContact) {
          return { success: false, error: "Contact not found or failed to update" };
        }
        return { success: true, data: updatedContact };
      } catch (error) {
        return { success: false, error: error.message };
      }
};

const deleteContact = async (id) => {
    try {
        const deletedContact = await contactModel.findByIdAndDelete(id);
        if (!deletedContact) {
          return { success: false, error: "Contact not found or already deleted" };
        }
        return { success: true, data: deletedContact };
      } catch (error) {
        return { success: false, error: error.message };
      }
};

module.exports = {getAllContact, getContactById, createContact, updateContact,deleteContact}