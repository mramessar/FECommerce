import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import 'dotenv/config'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const migrateOrders = async () => {
    const snapshot = await getDocs(collection(db, 'orders'))
    const updates = []

    snapshot.forEach((docSnap) => {
        const data = docSnap.data()
        const id = docSnap.id

        // Only process orders missing the fields
        if (
            data.subtotal === undefined ||
            data.discount === undefined ||
            data.tax === undefined ||
            data.shipping === undefined
        ) {
            const items = data.items || []
            const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

            const tier1 = subtotal >= 25 ? 5 : 0
            const tier2 = subtotal >= 50 ? 0.15 * subtotal : 0
            const shipping = subtotal >= 100 ? 0 : 5.99
            const discount = tier1 + tier2
            const tax = subtotal * 0.06625

            updates.push(
                updateDoc(doc(db, 'orders', id), {
                    subtotal,
                    discount,
                    shipping,
                    tax,
                })
            )
        }
    })

    await Promise.all(updates)
    console.log(`✅ Migration complete! Updated ${updates.length} order(s).`)
}

migrateOrders().catch((err) => console.error('❌ Migration error:', err))
