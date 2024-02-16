import "./EmailList.css";
import EmailBody from "./EmailBody";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCallback, useEffect } from "react";
import { mailActions } from "../store/mailReducer";

const EmailList = () => {
  const dispatch = useDispatch();

  const emails = useSelector((state) => state.mail.emails);
  const user = useSelector((state) => state.auth.email);

  const getInboxEmails = useCallback(async () => {
    const Username = user.split('@')[0];

    const getEmailsUrl = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/inbox/${Username}.json`;
    const response = await axios(getEmailsUrl);

    if (response.data) {
      const emailArray = [];
      for (const key in response.data) {
        emailArray.push({ id: key, ...response.data[key] });
      }
      // Sort emails based on the timestamp in descending order
      emailArray.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
      dispatch(mailActions.setEmails(emailArray));
    }
  }, [user, dispatch]);

  useEffect(() => {
    getInboxEmails();
  }, [getInboxEmails]);

  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailBody
          key={email.id}
          id={email.id}
          from={email.from}
          subject={email.subject}
          msg={email.msg}
          timeStamp={new Date(email.timeStamp).toLocaleString()}
          mailboxType="inbox"
        />
      ))}
    </div>
  );
};

export default EmailList;