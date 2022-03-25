import { RiCheckDoubleFill } from "react-icons/ri";

const Notification = ({ open, message, title }) => {
  return (
    <div className={`notification-box ${open ? "" : "hidden"}`}>
      <RiCheckDoubleFill />
      <div className="notification-message">
        <p className="title">{title}</p>
        <p className="text-mini">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
