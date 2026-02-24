/**
 * Firebase configuration TEMPLATE.
 *
 * ⚠️  Replace all placeholder values with your real Firebase project credentials
 *     before running the app.  Never commit production credentials to version control.
 *
 * Recommended: use a library such as `react-native-config` to load these values
 * from a `.env` file that is excluded from git via .gitignore.
 */
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Guard against accidental deployment with placeholder credentials.
if (Object.values(firebaseConfig).some((v) => v.startsWith('YOUR_'))) {
  console.warn(
    '[KidsQuizApp] Firebase config contains placeholder values. ' +
    'Replace them in src/config/firebase.js with your real project credentials before running the app.',
  );
}

export default firebaseConfig;
