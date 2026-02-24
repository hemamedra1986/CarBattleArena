import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthService = {
  /**
   * Register a new user with email, password, and display name.
   */
  register: async (email, password, displayName) => {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await userCredential.user.updateProfile({ displayName });

    // Create Firestore user document
    await firestore().collection('users').doc(userCredential.user.uid).set({
      uid: userCredential.user.uid,
      displayName,
      email,
      createdAt: firestore.FieldValue.serverTimestamp(),
      totalPoints: 0,
      totalStars: 0,
      highestStage: 1,
    });

    return userCredential.user;
  },

  /**
   * Sign in an existing user.
   */
  login: async (email, password) => {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  },

  /**
   * Sign out the current user.
   */
  logout: async () => {
    await auth().signOut();
  },

  /**
   * Get the currently authenticated user (or null).
   */
  getCurrentUser: () => {
    return auth().currentUser;
  },

  /**
   * Update the display name (and optionally email) of the current user.
   */
  updateUserProfile: async ({ displayName, email } = {}) => {
    const user = auth().currentUser;
    if (!user) throw new Error('No user is signed in.');

    const profileUpdate = {};
    if (displayName) profileUpdate.displayName = displayName;
    await user.updateProfile(profileUpdate);

    if (email && email !== user.email) {
      await user.updateEmail(email);
    }

    // Sync to Firestore
    const firestoreUpdate = {};
    if (displayName) firestoreUpdate.displayName = displayName;
    if (email) firestoreUpdate.email = email;

    if (Object.keys(firestoreUpdate).length > 0) {
      await firestore().collection('users').doc(user.uid).update(firestoreUpdate);
    }

    return auth().currentUser;
  },

  /**
   * Listen for auth state changes.
   * Returns an unsubscribe function.
   */
  onAuthStateChanged: (callback) => {
    return auth().onAuthStateChanged(callback);
  },

  /**
   * Send a password reset email.
   */
  resetPassword: async (email) => {
    await auth().sendPasswordResetEmail(email);
  },
};

export default AuthService;
