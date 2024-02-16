import { React, useState } from "react";
import "./Sidebar.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarOptions from "./SidebarOptions";
import MailIcon from "@mui/icons-material/Mail";
import StarIcon from "@mui/icons-material/Star";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailReducer";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const emailsArray = useSelector(state => state.mail.emails);
  const SentArray = useSelector(state => state.mail.sent);
  const navigate = useNavigate();

  const totalInbox = emailsArray.reduce((total, email) => {
    if(!email.isRead) {

      total += 1;
    }


    return total;
  }, 0); 


  const totalSent = SentArray.reduce((total, email) => {

    total += 1;

  return total;
}, 0); 

  const [activeOptions, setActiveOptions] = useState({
    inbox: true,
    starred: false,
    important: false,
    sent: false,
    drafts: false,
  });
  const dispatch = useDispatch();

  const composeMailHandler = () => {
    dispatch(mailActions.openSendMessage());
  };

  const handleSidebarOptionClick = (optionName) => {
    const newActiveOptions = {
      inbox: false,
      starred: false,
      important: false,
      sent: false,
      drafts: false,
      [optionName]: true,
    };



    setActiveOptions(newActiveOptions);

navigate(`/mails/${optionName}`);
  };

  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon />}
        className="compose__btn"
        onClick={composeMailHandler}
      >
        Compose
      </Button>

      <div onClick={() => handleSidebarOptionClick("inbox")}>
        <SidebarOptions
          Icon={MailIcon}
          title="Inbox"
          number={totalInbox}
          isActive={activeOptions.inbox}
        />
      </div>

      <div onClick={() => handleSidebarOptionClick("starred")}>
        <SidebarOptions
          Icon={StarIcon}
          title="Starred"
          number="0"
          isActive={activeOptions.starred}
        />
      </div>

      <div onClick={() => handleSidebarOptionClick("important")}>
        <SidebarOptions
          Icon={LabelImportantIcon}
          title="Important"
          number="0"
          isActive={activeOptions.important}
        />
      </div>

      <div onClick={() => handleSidebarOptionClick("sent")}>
        <SidebarOptions
          Icon={SendIcon}
          title="Sent"
          number={totalSent}
          isActive={activeOptions.sent}
        />
      </div>
      <div onClick={() => handleSidebarOptionClick("drafts")}>
        <SidebarOptions
          Icon={DraftsIcon}
          title="Drafts"
          number="0"
          isActive={activeOptions.drafts}
        />
      </div>
    </div>
  );
};

export default Sidebar;