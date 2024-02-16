import React from "react";
import "./SidebarOptions.css";

const SidebarOptions = ({ Icon, title, number, isActive }) => {
  const activeClassName = `sidebar__options ${isActive?"sidebar--active": ''}`;
  return (
    <div className={activeClassName}>

      <Icon />
      <h4>{title}</h4>
      <p>{number}</p>
    </div>
  );
};

export default SidebarOptions;