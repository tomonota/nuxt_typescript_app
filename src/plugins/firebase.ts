import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

if (getApps.length === 0) {
  initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  })
}

export const auth = getAuth()
