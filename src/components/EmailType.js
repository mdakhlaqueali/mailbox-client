import React from "react";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import './EmailList.css';

const EmailType = () => {
  return (
    <div className="email-type">
      <div className="email-type__options email-type__options--action ">
        <MailIcon />
        <p>Primary</p>
      </div>
      <div className="email-type__options">
        <PeopleIcon />
        <p>Social</p>
      </div>
      <div className="email-type__options">
        <LocalOfferIcon />
        <p>Promotions</p>
      </div>
    </div>
  );
};

export default EmailType;