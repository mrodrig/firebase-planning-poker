import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getPerformance, trace } from 'firebase/performance';
import { getFirestore, collection, addDoc, doc } from 'firebase/firestore';
import * as firebaseConfiguration from '@/config/firebase';

// Docs: https://www.npmjs.com/package/firebase
const app = initializeApp(firebaseConfiguration);

// Performance Monitoring
let performance = getPerformance(app);

// Firebase Authentication
const auth = getAuth(app);

// Firestore
const firestore = getFirestore(app);

// Google Authentication Provider
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('openid')
googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
// Additional custom scopes documented here: https://developers.google.com/identity/protocols/oauth2/scopes

// Performance: https://firebase.google.com/docs/perf-mon/get-started-web
// Analytics: https://firebase.google.com/docs/analytics/get-started?platform=web

export default class Firebase {

    static async getCurrentUser() {
        return getAuth().currentUser;
    }

    static async authStateReady(callback) {
        await auth.authStateReady();
        return callback();
    }

    static async onAuthStateChanged(callback) {
        auth.onAuthStateChanged(callback);
    }

    static async signInWithGoogle() {
        return setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithPopup(auth, googleAuthProvider);
            });
    }

    static async signOut() {
        return signOut(auth);
    }

    static async firestoreSave(collectionName, document) {
        const collectionRef = collection(collectionName);
        return addDoc(collectionRef, document)  
    }

    static async firestoreRead(collectionPath, id) {
        const collectionRef = doc(firestore, collectionPath, id);
        return addDoc(collectionRef, document)
    }

    static createPerformanceTrace(name, attributes = {}) {
        const performanceTrace = trace(performance, name);

        this.setCustomPerformanceAttributes(performanceTrace, attributes);

        return performanceTrace;
    }

    static setCustomPerformanceAttributes(trace, attributes) {
        Object.keys(attributes).forEach((key) => {
            let value = attributes[key];
            value = value ? value : 'None';

            try {
                trace.putAttribute(key, value);
            } catch (error) {
                console.warn(`Unable to add custom attribute "${key}" with value "${value}" to performance trace.`, error);
            }
        });
    }
}
