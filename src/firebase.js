import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyB1Oc6Y1QYxlRh40kB7zNfoSfFsPYTLVOU',
  authDomain: 'events-calendar-fd3ce.firebaseapp.com',
  projectId: 'events-calendar-fd3ce',
  storageBucket: 'events-calendar-fd3ce.appspot.com',
  messagingSenderId: '357275370043',
  appId: '1:357275370043:web:e1e5cd023087e31d20921e',
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();
provider.addScope(
  'https://www.googleapis.com/auth/admin.directory.resource.calendar'
);
provider.addScope('https://www.googleapis.com/auth/userinfo.email');
provider.addScope('https://www.googleapis.com/auth/calendar.events');
provider.addScope('https://www.googleapis.com/auth/calendar');

const auth = getAuth();

export { auth, provider };
