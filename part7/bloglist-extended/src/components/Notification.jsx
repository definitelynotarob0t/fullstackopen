import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const notificationStyle =
    notification.startsWith("Wrong") || notification.startsWith("Invalid")
      ? "alert alert-danger"
      : "alert alert-success";

  return <div class={notificationStyle}>{notification}</div>;
};

export default Notification;
