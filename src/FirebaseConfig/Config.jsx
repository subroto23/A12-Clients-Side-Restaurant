import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);

export const reqPermission = () => {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      return getToken(messaging, {
        vapidKey:
          "BBVuIUu_9O5da-NmJgyBGl6Y2d0HsLswgkFAceAmy0Dg09-OVOgMADp8CYFtuG4ormvp0w3D18DH6bEhR1UmNJI",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    } else {
      console.log("Notification permission denied.");
    }
  });
};

export const onMessageListener = async () => {
  const messagingResolve = await messaging;
  if (messagingResolve) {
    onMessage(messagingResolve, (payload) => {
      console.log("Message received. ", payload);
    });
  }
};
export default auth;
