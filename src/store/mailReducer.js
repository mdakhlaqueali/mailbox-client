import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "mail",
  initialState: {
    sendMessageIsOpen: false,
    emails: [],
    sent : [],
  },

  reducers: {
    openSendMessage: (state) => {
      state.sendMessageIsOpen = true;
    },
    closeSendMessage: (state) => {
      state.sendMessageIsOpen = false;
    },
    setEmails : (state, action) => {
      state.emails = action.payload
    },
    setSentBox : (state, action) => {
      state.sent = action.payload
    },
    deleteInboxMail(state, action) {
      const mailId = action.payload;
      state.emails = state.emails.filter(email => email.id !== mailId);
    },
    deleteSentMail(state, action) {
      const sentId = action.payload;
      state.sent = state.sent.filter(sent => sent.id !== sentId);
    },
    markedAsRead : (state, action) => {
      const email = state.emails.find(email => email.id === action.payload);

      if(email) {
        email.isRead = true
      }
    }
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;