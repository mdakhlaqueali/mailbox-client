import "./EmailList.css";
import EmailBody from "./EmailBody";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailReducer";
import useFetchEmails from "../customHooks/useFetchEmails";

const EmailList = () => {
  const dispatch = useDispatch();

  const emails = useSelector((state) => state.mail.emails);
  const user = useSelector((state) => state.auth.email);
  const Username = user.split('@')[0];
  const getEmailsUrl = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/inbox/${Username}.json`;

  useFetchEmails(getEmailsUrl, (emailArray) => dispatch(mailActions.setEmails(emailArray)), [user, dispatch]);

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