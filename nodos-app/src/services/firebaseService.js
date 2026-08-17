import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs 
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase";

/**
 * Servicio unificado de Firebase Firestore para nodos-app
 */

// --- PRODUCTOS ---
export const subscribeProducts = (onUpdate, initialFallback) => {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(initialFallback);
    return () => {};
  }

  const colRef = collection(db, "products");
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      // Si la colección está vacía en Firebase, enviamos el fallback e inicializamos
      seedCollectionIfEmpty("products", initialFallback);
      onUpdate(initialFallback);
    } else {
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(products);
    }
  }, (err) => {
    console.error("Error escuchando productos:", err);
    onUpdate(initialFallback);
  });
};

export const saveProductInDb = async (product) => {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = doc(db, "products", product.id);
    await setDoc(docRef, product, { merge: true });
    return true;
  } catch (err) {
    console.error("Error guardando producto:", err);
    return false;
  }
};

export const deleteProductFromDb = async (productId) => {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("Error eliminando producto:", err);
    return false;
  }
};


// --- NODOS ---
export const subscribeNodes = (onUpdate, initialFallback) => {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(initialFallback);
    return () => {};
  }

  const colRef = collection(db, "nodes");
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      seedCollectionIfEmpty("nodes", initialFallback);
      onUpdate(initialFallback);
    } else {
      const nodes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(nodes);
    }
  }, (err) => {
    console.error("Error escuchando nodos:", err);
    onUpdate(initialFallback);
  });
};

export const saveNodeInDb = async (node) => {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = doc(db, "nodes", node.id);
    await setDoc(docRef, node, { merge: true });
    return true;
  } catch (err) {
    console.error("Error guardando nodo:", err);
    return false;
  }
};


// --- PEDIDOS ---
export const subscribeOrders = (onUpdate, initialFallback) => {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(initialFallback);
    return () => {};
  }

  const colRef = collection(db, "orders");
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      seedCollectionIfEmpty("orders", initialFallback);
      onUpdate(initialFallback);
    } else {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onUpdate(orders);
    }
  }, (err) => {
    console.error("Error escuchando pedidos:", err);
    onUpdate(initialFallback);
  });
};

export const updateOrderStatusInDb = async (orderId, newStatus) => {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = doc(db, "orders", orderId);
    await updateDoc(docRef, { status: newStatus });
    return true;
  } catch (err) {
    console.error("Error actualizando pedido:", err);
    return false;
  }
};

export const createOrderInDb = async (order) => {
  if (!isFirebaseConfigured() || !db) return false;
  try {
    const docRef = doc(db, "orders", order.id);
    await setDoc(docRef, order);
    return true;
  } catch (err) {
    console.error("Error creando pedido:", err);
    return false;
  }
};


// --- HELPER DE POBLADO INICIAL (SEED) ---
const seedCollectionIfEmpty = async (collectionName, items) => {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      console.log(`🌱 Poblando colección inicial de ${collectionName} en Firebase...`);
      for (const item of items) {
        const itemDoc = doc(db, collectionName, item.id);
        await setDoc(itemDoc, item);
      }
    }
  } catch (err) {
    console.error(`Error poblando ${collectionName}:`, err);
  }
};
