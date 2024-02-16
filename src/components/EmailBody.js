import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";
import LabelImportant from "@mui/icons-material/LabelImportant";
import "./EmailBody.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { mailActions } from "../store/mailReducer";

const EmailBody = ({ from, to, subject, msg, timeStamp, id, mailboxType }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.email);
  const emails = useSelector((state) => state.mail.emails);

  const isRead = emails.find((email) => email.id === id)?.isRead || false;

  const Username = user.split('@')[0];

  const navigate = useNavigate();

  const setMails = async () => {
    try {
      const url = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/${mailboxType}/${Username}/${id}.json`;
      await axios.patch(url, { isRead: true });
    } catch (error) {
      console.log(error);
    }

    // navigate(`/mails/inbox/${id}`);
    const basePath = mailboxType === 'sent' ? '/mails/sent' : '/mails/inbox';
    navigate(`${basePath}/${id}`);
  };

  const handleIconButtonClick = async(e) => {
    e.stopPropagation();
    try {
      const url = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/${mailboxType}/${Username}/${id}.json`;
      await axios.delete(url);
      if(mailboxType==='sent'){
        dispatch(mailActions.deleteSentMail(id))
      }else{
        dispatch(mailActions.deleteInboxMail(id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="email-body" onClick={setMails}>
        <div className="email-body__left">
          {mailboxType !== 'sent' && !isRead && <div className='dot'></div>}
          <CheckBoxOutlineBlank />
          <LabelImportant />
          <h4>{mailboxType === 'sent' ? to : from}</h4>
        </div>
        <div className="email-body__middle">
          <div className="email-body-middle__msg">
            <div>
              <h4>{subject}</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: msg }}></div>
          </div>
        </div>
        <div className="email-body__right">
          <IconButton onClick={handleIconButtonClick}>
            <DeleteIcon />
          </IconButton>
          <p>{timeStamp}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailBody