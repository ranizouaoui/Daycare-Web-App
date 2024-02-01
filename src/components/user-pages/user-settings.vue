<template>
    <div class="container mt-5">
        <h2 class="mb-4">Modifier le profil</h2>
        <form @submit.prevent="updateprofile()">
            <div class="mb-3">
                <label for="email" class="form-label">Adresse e-mail :</label>
                <input v-model="email" type="email" class="form-control" id="email" readonly />
            </div>

            <div class="mb-3">
                <label for="username" class="form-label">Nom d'utilisateur :</label>
                <input v-model="username" type="text" class="form-control" id="username" required />
            </div>
            <div class="mb-3">
                <label for="phoneNumber" class="form-label">Numéro de téléphone :</label>
                <input v-model="phoneNumber" type="tel" class="form-control" id="phoneNumber" />
            </div>

            <div class="mb-3">
                <label for="note" class="form-label">Remarque :</label>
                <textarea v-model="note" class="form-control" id="note"></textarea>
            </div>

            <button type="submit" class="btn btn-primary"
                style="background-color: #7c11bf; border-color: blueviolet;">Mettre à jour le profil</button>
        </form>
    </div>
</template>


<script>
import "@/utils/firebase";

import { getFirestore, query, collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

const db = getFirestore();
const q = query(collection(db, "users"));

export default {
    name: "ProfileView",
    data() {
        return {
            email: '',
            username: '',
            password: '',
            phoneNumber: '',
            note: '',
            uid: localStorage.getItem("uidUser"),
        };
    },
    async created() {
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().uid == this.uid) {
                    this.email = doc.data().email;
                    this.username = doc.data().name;
                    this.phoneNumber = doc.data().phone;
                    this.key = doc.id

                }
            });
        });
    },
    methods: {
        // new code
        async updateprofile() {
            const DocRef = doc(db, "users", this.key);

            updateDoc(DocRef, {

                name: this.username,
                phone: this.phoneNumber
            }).then(() => {
                alert("La modification a été effectuée avec succès")
            });
        }
    }
};
</script>
