import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { VueFire, VueFireFirestoreOptionsAPI } from 'vuefire'

export const firebaseApp = initializeApp({
  // project configuration
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
})

export const db = getFirestore(firebaseApp)

export default (app) => {
  const options = {
    firebaseApp,
    modules: [
      VueFireFirestoreOptionsAPI({
        // this would be the same behavior as VueFire v2
        reset: true,
        wait: false,
      }),
    ],
  };

  app.use(VueFire, options);
}
