import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:5001/contact";

export const fetchContacts = createAsyncThunk(
  "fetchContacts",
  async ({searchQuery, currentPage, pageSize}, {rejectWithValue}) => {
    try {
      console.log("Fetching Contacts");
      const response = await axios.get(url, {
        params: {searchQuery, currentPage, pageSize},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createContacts = createAsyncThunk("Creating contacts", async ({iscontact}, {rejectWithValue}) => {
  try {
    console.log("creating contact", iscontact);

    const response = await axios.post(url, iscontact);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const editContact = createAsyncThunk("contacts/Update", async ({id, updateData}, {rejectWithValue}) => {
  try {
    console.log("Updating contact", updateData);
    const response = await axios.put(`${url}/${id}`, updateData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const deleteContact = createAsyncThunk("Deleting contact", async (id, {rejectWithValue}) => {
  try {
    const response = await axios.delete(`${url}/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);

  }
});

const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    error: "",
    loading: false,
    status: "idle",
    currentPage: 1,
    pageSize: 5,
    totalContacts: 0,
    totalPages:0,
    searchQuery: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.status = "loding..";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload.contacts;
        state.totalContacts = action.payload.totalContacts;
        state.totalPages = action.payload.totalPages;
        state.status = "Completed..";
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createContacts.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload.data);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        const index = state.contacts.findIndex((contact) => contact._id === action.payload.data._id);
        if (index !== -1) {
          state.contacts[index] = action.payload.data;
        }
      })
      .addCase(deleteContact.fulfilled, (state , action)=>{
        state.contacts = state.contacts.filter((contact) => contact._id !== action.payload.data._id)
      })
  },
});

export default contactSlice.reducer;
