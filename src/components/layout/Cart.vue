<template>
    <div>
        <section class="h-100 h-custom">
            <div class="container h-100 py-5">
                <div v-if="$store.state.cart.length > 0" class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col" class="h5">Programmes</th>

                                        <th scope="col">Nombre</th>
                                        <th scope="col">Prix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in $store.state.cart" :key="item.name">
                                        <th scope="row" class="border-bottom-0">
                                            <div class="d-flex align-items-center">
                                                <img :src="item.image" class="img-fluid rounded-3"
                                                    style="width: 83px; height: 112px" alt="Book" />
                                                <div class="flex-column ms-4">
                                                    <p class="mb-2">
                                                        {{ item.name }}
                                                    </p>
                                                    <p class="mb-0">{{ item.brand }}</p>
                                                </div>
                                            </div>
                                        </th>

                                        <td class="align-middle border-bottom-0">
                                            <div class="d-flex flex-row">
                                                <button class="btn btn-link px-2" @click="decrementQuentity(item)">
                                                    <i class="fas fa-minus"></i>
                                                </button>

                                                <input id="form1" min="1" name="quantity" :value="item.quantity"
                                                    type="number" class="form-control form-control-sm"
                                                    style="width: 53px;margin-bottom: 0px;" />

                                                <button class="btn btn-link px-2" @click="addToCart(item)">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>
                                        <td class="align-middle border-bottom-0">
                                            <p class="mb-0" style="font-weight: 500">
                                                {{ item.totalPrice }} DT
                                            </p>
                                        </td>
                                        <td class="align-middle border-bottom-0">
                                            <img class="mb-0" style="height: 25px" src="@/assets/icons8_close_50px.png"
                                                @click="removeFromCart(item)" />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card shadow-2-strong mb-5 mb-lg-0" style="border-radius: 16px">
                        <div class="card-body p-4">
                            <div class="row">
                                <div class="col-lg-4 col-xl-3">
                                    <div class="d-flex justify-content-between" style="font-weight: 500">
                                        <p class="mb-2">Total TTC</p>
                                        <p class="mb-2">{{ totalPrice - 7 }} DT</p>
                                    </div>

                                    <div class="d-flex justify-content-between" style="font-weight: 500">
                                        <p class="mb-0">Assurance</p>
                                        <p class="mb-0">10 DT</p>
                                    </div>

                                    <hr class="my-4" />
                                    <div class="d-flex justify-content-between mb-4" style="font-weight: 500">
                                        <p class="mb-2">Total (Frais assurance inclus)</p>
                                        <p class="mb-2">{{ totalPrice }}DT</p>
                                    </div>

                                    <button @click="CheckOutProducts" type="button" v-if="CheckAuth"
                                        class="btn btn-primary btn-block btn-lg" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        <div class="d-flex justify-content-between">
                                            <span>Passer au paiement</span>
                                        </div>
                                    </button>
                                    <button type="button" v-if="CheckAuth == null" class="btn btn-primary btn-block btn-lg"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                        <div class="d-flex justify-content-between">
                                            <span>Passer au paiement</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="row d-flex justify-content-center align-items-center h-100">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="h5">Offres</th>
                            </tr>
                        </thead>
                    </table>
                    <br />
                    <div>
                        <center>Le panier est vide</center>
                        <br />
                        <br />
                        <router-link to="/user">
                            <img src="@/assets/icons8_back_64px.png" style="height: 37px" />
                        </router-link>
                        <a style="width: auto"> Continuer vos achats </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border: black">
                <div class="modal-header" style="background: #242121; color: white">
                    <div class="r" style="display: flex; margin: auto">
                        <img src="@/assets/icons8_Done_64px_1.png" style="height: 31px" />
                        <h5 class="modal-title" id="exampleModalLabel">
                            La commande sera traitée
                        </h5>
                    </div>
                </div>
                <div class="modal-body" style="display: flex">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="@/assets/time-check-symbol_ready_timer_checkmark_countdown_compliance_done_reminder-512.webp"
                                class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col">
                            <p class="card-text" style="margin-top: 62px; margin-left: 46px">
                                Votre commande sera traitée !
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close" class="btn btn-dark" data-bs-dismiss="modal">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
    <!-- Modal 2 -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="border: black">
                <div class="modal-header" style="background: #242121; color: white">
                    <div class="r" style="display: flex; margin: auto">
                        <img src="@/assets/icons8_close_26px.png" style="height: 31px" />
                        <h5 class="modal-title" id="exampleModalLabel">
                            You need to authentificate first
                        </h5>
                    </div>
                </div>
                <div class="modal-body" style="display: flex">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="@/assets/R.png" class="img-fluid rounded-start" alt="..." />
                        </div>
                        <div class="col">
                            <p class="card-text" style="margin: revert; margin-left: 29px">
                                You need to authentificate first
                            </p>

                            <div class="container row">
                                <button type="button" class="btn btn-outline-dark" @click="CreateAccount">
                                    Create an account
                                </button>
                                <br />
                                <button type="button" class="btn btn-outline-dark" @click="Login">
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="close1" class="btn btn-dark" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal 2 -->
</template>
<script>
import "@/utils/firebase";
import router from "@/router/routes";
// @click="CheckOutProducts"
import {
    addDoc,
    collection,
    query,
    getFirestore,
    onSnapshot,
} from "firebase/firestore";
const db = getFirestore();
const q = query(collection(db, "Checkout"));
const authusers = query(collection(db, "users"));
import { getAuth, onAuthStateChanged } from "firebase/auth";
var today = new Date();
var now_date =
    today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate();
const auth = getAuth();
export default {
    name: "CartView",
    data() {
        return {
            uid: localStorage.getItem("uidUser"),
            CheckAuth: null,
        };
    },
    computed: {
        totalPrice() {
            let total = 0;

            for (let item of this.$store.state.cart) {
                total += item.totalPrice;
            }
            total = total + 10;
            return total.toFixed(2);
        },
    },
    methods: {
        addToCart(item) {
            this.$store.commit("addToCart", item);

            console.log(item);
        },
        removeFromCart(item) {
            this.$store.commit("removeFromCart", item);
        },
        decrementQuentity(item) {
            this.$store.commit("decrementQuentity", item);
        },
        CheckOutProducts() {
            onSnapshot(authusers, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid == this.uid) {
                        addDoc(
                            q,

                            {
                                phone:doc.data().phone,
                                name: doc.data().name,
                                address: doc.data().email,
                                date: now_date,
                                total: this.totalPrice,
                                cart: this.$store.state.cart,
                            }
                        ).then(() => {
                            this.$store.commit("resetCart");
                        });
                    }
                });
            });
        },
        CreateAccount() {
            router.push("/signin");
            document.getElementById("close1").click();
        },
        Login() {
            router.push("/login");
            document.getElementById("close1").click();
        },
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.CheckAuth = user;
            } else {
                this.CheckAuth = null;
            }
        });
    },
};
</script>