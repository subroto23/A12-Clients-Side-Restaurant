import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessageListener, reqPermission } from "../../FirebaseConfig/Config";
const NotificationMessage = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });
  useEffect(() => {
    reqPermission();
  }, []);
  useEffect(() => {
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    });
    //
    if (!notification === "") {
      toast.success(`${notification?.title} and ${notification?.body}`),
        {
          duration: 6000,
          position: "top-right",
        };
    }

    return () => unsubscribe.catch((err) => console.log("Failed", err));
  }, [notification]);

  return (
    <div>
      <Toaster />
    </div>
  );
};

export default NotificationMessage;
