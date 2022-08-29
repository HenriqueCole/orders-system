const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
} = require("firebase/firestore/lite");

const firebaseConfig = {
  apiKey: "AIzaSyBSWW4R4XO6unOfzExjLGUEC-5yVQKXym4",
  authDomain: "pedidos-henrique-cole.firebaseapp.com",
  projectId: "pedidos-henrique-cole",
  storageBucket: "pedidos-henrique-cole.appspot.com",
  messagingSenderId: "717566869405",
  appId: "1:717566869405:web:e5d43d6551172119e73974",
  measurementId: "G-W48BZ9C8DQ",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function post(tableName, id, data) {
  if (id) {
    const referenceEntity = await setDoc(doc(db, tableName, id), data);
    const savedData = {
      ...data,
      id: id,
    };
    return savedData;
  } else {
    const referenceEntity = await addDoc(collection(db, tableName), data);
    const savedData = {
      ...data,
      id: referenceEntity.id,
    };
    return savedData;
  }
}

async function get(tableName) {
  const tableRef = collection(db, tableName);

  const q = query(tableRef);

  const querySnapshot = await getDocs(q);

  const list = [];

  querySnapshot.forEach((doc) => {
    const data = {
      ...doc.data(),
      id: doc.id,
    };
    list.push(data);
    console.log(doc.id, " => ", doc.data());
  });
  return list;
}

async function getById(tableName, id) {
  const docRef = doc(db, tableName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return new Error("Not found");
  }
}

async function remove(tableName, id) {
  const data = await deleteDoc(doc(db, tableName, id));
  return {
    message: `${id} deleted`,
  };
}

module.exports = {
  post,
  get,
  getById,
  remove,
};
