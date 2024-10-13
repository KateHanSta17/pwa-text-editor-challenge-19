import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the IndexedDB
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open a connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction with readwrite access
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the object store
  const store = tx.objectStore('jate');

  // Put the content into the store (update or add)
  const request = store.put({ id: 1, value: content });

  // Confirm the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get content from the IndexedDB
export const getDb = async () => {
  console.log('GET from the database');

  // Open a connection to the database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction with readonly access
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the object store
  const store = tx.objectStore('jate');

  // Get the content from the store
  const request = store.get(1);

  // Confirm the request and return the result
  const result = await request;
  console.log('🚀 - data retrieved from the database', result?.value);
  return result?.value;
};

// Initialize the database when the app is run
initdb();

