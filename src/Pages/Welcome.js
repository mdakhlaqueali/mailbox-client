import { Fragment } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Compose from "../components/Compose";
import "./Welcome.css";
import EmailList from "../components/EmailList";
import { useSelector } from "react-redux";
import EmailListSettings from "../components/EmailListSettings";
import EmailType from "../components/EmailType";
import { Routes, Route } from "react-router-dom";
import Sent from "../components/Sent";
import EmailDetails from "../components/EmailDetails";

const Welcome = () => {
  const mailBoxIsOpen = useSelector((state) => state.mail.sendMessageIsOpen);
  return (
    <Fragment>
      <Header />
      <div className="sidebar__body">
        <Sidebar />

        <div>
          <EmailListSettings />
          <EmailType />
          <Routes>
            <Route path="/inbox/*" element={<EmailList />} />
            <Route path="/inbox/:mailid" element={<EmailDetails />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/sent/:mailid" element={<EmailDetails />} />
          </Routes>
        </div>
      </div>
      {mailBoxIsOpen && <Compose />}
    </Fragment>
  );
};

export default Welcome;