# ADD FIREBASE SDK

npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFjl1Q8qaq8dltZ4Mfn9Qy8ewbJqoje-c",
  authDomain: "bread-and-salt-92e88.firebaseapp.com",
  projectId: "bread-and-salt-92e88",
  storageBucket: "bread-and-salt-92e88.firebasestorage.app",
  messagingSenderId: "567635249911",
  appId: "1:567635249911:web:fee7a84d030552e06321f2",
  measurementId: "G-KWH89R8WRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

# INSTALL FIREBASE CLI

npm install -g firebase-tools

# DEPLOY 

You can deploy now or later. To deploy now, open a terminal window, then navigate to or create a root directory for your web app.

Sign in to Google
firebase login

Initiate your project
Run this command from your app's root directory:
firebase init

When you're ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app's deploy directory (the default is "public"). Then, run this command from your app's root directory:

firebase deploy
After deploying, view your app at bread-and-salt-92e88.web.app

Need help? Check out the Hosting docs