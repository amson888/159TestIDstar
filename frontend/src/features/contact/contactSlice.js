import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactService from "../../service/contactService";

const initialContactState = {
  currentList: [],
  loading: {
    get: false,
    post: false,
    put: false,
    delete: false
  },
  lastErrorMessage: undefined
};

export const getContacts = createAsyncThunk('contact/getContacts', async (args, {rejectWithValue}) => {
  try {
    const contacts = await contactService.get();
    console.log(contacts);
    
    return contacts;
  } catch (e) {
    console.log(e.message);
    return rejectWithValue(e.message);
  }
});

export const putContact = createAsyncThunk('contact/putContact', async ({contact}, {dispatch, rejectWithValue}) => {
  try {
    await contactService.put(contact);
    dispatch(getContacts());
  } catch (e) {
    console.log(e.message);
    return rejectWithValue(e.message);
  }
});

export const postContact = createAsyncThunk('contact/postContact', async ({contact}, {dispatch, rejectWithValue}) => {
  try {
    await contactService.post(contact);
    dispatch(getContacts());
  } catch (e) {
    console.log(e.message);
    return rejectWithValue(e.message);
  }
});

export const deleteContact = createAsyncThunk('contact/deleteContact', async ({id}, {dispatch, rejectWithValue}) => {
  try {
    await contactService.delete(id);
    dispatch(getContacts());
  } catch (e) {
    console.log(e.message);
    return rejectWithValue(e.message);
  }
});


const contactSlice = createSlice({
  name: 'contact',
  initialState: initialContactState,
  reducers: {},
  extraReducers: builder => {
    // get contacts
    builder.addCase(getContacts.pending, (state) => {
      state.loading.get = true;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(getContacts.fulfilled, (state, {payload}) => {
      state.currentList = payload;
      state.loading.get = false;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(getContacts.rejected, (state, {payload}) => {
      state.loading.get = false;
      state.lastErrorMessage = `Error getting contacts. Message: ${payload}`;
    });
    
    // put contact
    builder.addCase(putContact.pending, (state) => {
      state.loading.put = true;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(putContact.fulfilled, (state) => {
      state.loading.put = false;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(putContact.rejected, (state, {payload}) => {
      state.loading.put = false;
      state.lastErrorMessage = `Error saving contact. Message: ${payload}`;
    });
    
    // post contact
    builder.addCase(postContact.pending, (state) => {
      state.loading.post = true;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(postContact.fulfilled, (state) => {
      state.loading.post = false;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(postContact.rejected, (state, {payload}) => {
      state.loading.post = false;
      state.lastErrorMessage = `Error saving contact. Message: ${payload}`;
    });
    
    // delete contact
    builder.addCase(deleteContact.pending, (state) => {
      state.loading.delete = true;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(deleteContact.fulfilled, (state) => {
      state.loading.delete = false;
      state.lastErrorMessage = undefined;
    });
    
    builder.addCase(deleteContact.rejected, (state, {payload}) => {
      state.loading.delete = false;
      state.lastErrorMessage = `Error deleting contact. Message: ${payload}`;
    });
  }
});

export default contactSlice.reducer;
