import React, {useCallback, useEffect} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/mailReducer';
import EmailBody from './EmailBody';
import "./EmailList.css";

const Sent =() => {

  const dispatch = useDispatch();

  const sent = useSelector((state) => state.mail.sent);
  const user = useSelector(state => state.auth.email);


  const getSentEmails = useCallback(async() => {
    const Username = user.split('@')[0];
    console.log(Username);

    const getEmailsUrl = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/sent/${Username}.json`;
    const response = await axios(getEmailsUrl);

    if (response.data) {
      const emailArray = [];
      for (const key in response.data) {
        emailArray.push({ id: key, ...response.data[key] });
      }
      // Sort emails based on the timestamp in descending order
      emailArray.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
      dispatch(mailActions.setSentBox(emailArray));
    }



  },[user,dispatch]);

  useEffect(() => {
    getSentEmails();
  }, [getSentEmails])

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