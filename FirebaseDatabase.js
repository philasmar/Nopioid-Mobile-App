import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCBJehn1x9TRi8o9sD947Y8JIKI5niZb1w",
  authDomain: "nopioid-c9618.firebaseapp.com",
  databaseURL: "https://nopioid-c9618.firebaseio.com",
  projectId: "nopioid-c9618",
  storageBucket: "nopioid-c9618.appspot.com",
  messagingSenderId: "993898990420",
  appId: "1:993898990420:web:90cfaea25871b3a39d56c1",
  measurementId: "G-9SL7LZ5NFE"
};

firebase.initializeApp(config);

export default firebase;
