const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./clase20-backend-f37b2-firebase-adminsdk-blx15-0283153a87.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

async function crear(color) {
  let res;

  res = await db.collection('colores').doc().set({
    nombre: color,
  });

  return res;
}

// crear('red')
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));

// crear('green')
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));

// crear('blue')
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));

async function leerTodos() {
  const res = await db.collection('colores').get();
  let arrayRes = res.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });

  return arrayRes;
}

leerTodos()
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

async function updateDocument() {
  const refDocMati = db.collection('colores').doc('K2U2Vy21Wgeehr7OisVz');
  const res = await refDocMati.update({ nombre: "navy" });
  return res;
}
 
updateDocument()
  .then((res) => console.log(res))
  .catch((e) => console.log(e));

async function deleteDocument() {
  const res = await db
    .collection('colores')
    .doc('7QZEArSRRgJTpFt1vht0')
    .delete();
  return res;
}

deleteDocument()
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
