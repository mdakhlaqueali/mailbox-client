import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailReducer';
import EmailBody from './EmailBody';
import "./EmailList.css";
import useFetchEmails from '../customHooks/useFetchEmails';

const Sent =() => {

  const dispatch = useDispatch();

  const sent = useSelector((state) => state.mail.sent);
  const user = useSelector(state => state.auth.email);
  const Username = user.split('@')[0];
  const getEmailsUrl = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/sent/${Username}.json`;

  useFetchEmails(getEmailsUrl, (emailArray) => dispatch(mailActions.setSentBox(emailArray)), [user, dispatch]);

  return (
    <div className="email-list">
      {sent.map((email) => (
        <EmailBody
          key={email.id}
          id={email.id}
          to={email.to}
          subject={email.subject}
          msg={email.msg}
          timeStamp={new Date(email.timeStamp).toLocaleString()}
          mailboxType="sent"
        />
      ))}
    </div>
  );
};
export default Sent;