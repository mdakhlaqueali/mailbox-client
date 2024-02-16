import React from "react";
import "./EmailDetails.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EmailDetails = () => {
  const params = useParams();
  // const emails = useSelector((state) => state.mail.emails);

  // Check the route or use a prop to determine the email type
  const isSentEmail = window.location.pathname.includes("/mails/sent");
  const emails = useSelector((state) => (isSentEmail ? state.mail.sent : state.mail.emails));

  const email = emails.find((mail) => {
    return params.mailid === mail.id;
  });

  return (
    <div className="emailbody__msg">
      <div className="emaildetails__middleheader">
        <div className="emaildetails__middleheaderleft">
          <Avatar />
          {/* <h4>{email.from}</h4> */}
          {/* Conditionally render based on the source of the email */}
          <h4>{isSentEmail?"To: ":"From: "}{isSentEmail ? email.to : email.from}</h4>
        </div>
      </div>

      <div className="emaildetails__header">
        <div className="emaildetails__headerleft">
          <h4>{email.subject}</h4>
        </div>
      </div>

      <div className="emaildetails__body">
        <div dangerouslySetInnerHTML={{ __html: email.msg }}></div>
      </div>
    </div>
  );
};

export default EmailDetails;