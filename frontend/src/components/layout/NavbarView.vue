<template>
  <header :class="{ 'logged-in': checkAuth }" id="header">
    <div v-if="loading==false" class="container d-flex align-items-center">

    <h1 class="logo me-auto" :class="{ 'title-logged-in': checkAuth }"><a>L'Univers des Bambins</a></h1> 

      <nav id="navbar" class="navbar" :class="{ 'custom-navbar': checkAuth }">
        <ul>
          <li><router-link class="nav-link active" to="/" v-if="CheckAuth1 == null">Accueil</router-link></li>
          <li><router-link class="nav-link" to="/about" v-if="CheckAuth1 == null">À propos de nous</router-link></li>
          <li><router-link class="nav-link" to="/faq" v-if="CheckAuth1 == null"> FAQ</router-link></li>
          <li><router-link class="nav-link" to="/contact">Contact</router-link></li>
            <li><router-link class="nav-link" to="/user" v-if="CheckAuth1">Offres</router-link></li>
          <li><router-link class="nav-link getstarted" to="/login" v-if="CheckAuth1 == null">Commencer</router-link></li>
          <li class="nav-item">
                <a
                  class="nav-link"
                  style="cursor: pointer"
                  v-if="CheckAuth1"
                  @click="logout"
                  >Se déconnecter</a
                >
              </li>
              <li style="padding-left: 11px; padding-right: 15px;" v-if="CheckAuth1">
                <router-link
                  id="cart"
                  to="/cart"
                  class="cart"
                  :data-totalitems="count"
                >
                 <i class="bi bi-cart" style="margin-left: -31px;"></i>
                </router-link>
              </li>
              <li v-if="CheckAuth1"> <button type="button" class="btn getstarted1"  data-bs-toggle="modal" data-bs-target="#addoffre">Ajouter Offre</button></li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
          <!-- Modal 1 -->
          <div class="modal fade" id="addoffre" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
              aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">Ajouter un programme</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                          .
                          <!-- form start here -->
                          <form @submit.prevent="AddProduct">
                              <input class="form-control" type="text" placeholder="Nom de L'offre" aria-label="default input example"
                                  v-model="product.name" />
                              <input class="form-control" type="text" placeholder="Horaires" aria-label="default input example"
                                  v-model="product.brand" />
                                
                              <div class="input-group">
                                  <input class="form-control" type="number" placeholder="Tarif de L'offre"
                                      aria-label="Dollar amount (with dot and two decimal places)" v-model="product.price" />
                              </div>

                              <input class="form-control" lang="en" type="file" placeholder="sqs" accept=".jpg,.png"
                                  @change="previewImage" />
                              <progress v-if="ProgressShow" id="js-progressbar" class="uk-progress" :value="uploadValue"
                                  max="100"></progress>

                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                  placeholder="Description" v-model="product.description"></textarea>
                              <div class="alert alert-success" v-if="messageSuccess">
                                  {{ messageSuccess }}
                              </div>
                              <button type="submit" class="btn btn-success">Ajouter</button>
                          </form>
                          <!-- form end here -->
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                              Fermer
                          </button>
                      </div>
                  </div>
              </div>
          </div>
  <!-- Navbar -->
  <router-view />
</template>
<script>
import "../../utils/firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
import router from "../../router/routes";

import {
  addDoc,
  collection,
  query,
  getFirestore,

} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
// Create a root reference
const storage = getStorage();

const db = getFirestore();
const q = query(collection(db, "offres"));
export default {
  name: "NavbarView",
  data() {

    return {
      CheckAuth1:null,
      loading: true,
      product: {
        name: "",
        price: 0,
        image: "",
        description: "",
        brand: "",
        uid: localStorage.getItem("uidUser"),
      },
      messageSuccess: "",
      messageUpdateSuccess: "",
      products: [],
      uploadValue: 0,
      ProgressShow: false,
      picture: null,
      imageData: null,
      imageName: "",
    };
  },
  methods: {
      logout() {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("uidUser");
          this.$store.dispatch('updateAuthStatus', false);
           router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AddProduct() {
      addDoc(
        q,

        this.product
      ).then(() => {
        this.ProgressShow = false;
        this.messageSuccess = "Offre ajoutée avec succès";
        this.product.name = "";
        this.product.price = "";
        this.product.image = "";
        this.product.brand = "";
        this.product.description = "";
      });
    },
            previewImage(event) {
      this.ProgressShow = true;
      this.uploadValue = 0;
      this.picture = null;
      this.imageData = event.target.files[0];
      this.imageName = event.target.files[0].name;
      const storageRef = ref(storage, "images/" + this.imageName);
      const uploadTask = uploadBytesResumable(storageRef, this.imageData);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },

        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          this.uploadValue = 100;
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            this.product.image = downloadURL;
          });
        }
      );
    },

  },
  computed: {
    count() {
      return this.$store.state.count;
    },
    checkAuth() {
      return this.$store.getters.getAuthStatus;
    },
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
       this.loading = true;
      if (user) {
        this.CheckAuth1 = user;
      } else {
        this.CheckAuth1 = null;
      }
        this.loading = false;
    },
     );

  }

};

</script>
<style scoped>
.cart {
  width: 30px;
  height: 30px;
  background: rgb(111 70 136);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 5px;
}

.cart i {
  font-size: 25px;
  color: white;
}

.cart:before {
  content: attr(data-totalitems);
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  top: -12px;

  background: #ff0000;
  line-height: 24px;
  padding: 0 5px;
  height: 24px;
  min-width: 24px;
  color: white;
  text-align: center;
  border-radius: 24px;
}

.cart.shake {
  -webkit-animation: shakeCart 0.4s ease-in-out forwards;
  animation: shakeCart 0.4s ease-in-out forwards;
}
.navbar-expand-lg .navbar-nav .nav-link {
  color: white;
}
#header.logged-in {
  /* your styles for the logged-in state */
  background-color: #fff;/* your desired background color for logged-in state */;
}


.custom-navbar a,
.custom-navbar a:focus
{
   color: #230738;
}

.twelve h1 {
  color: #230738;
  font-size:24px;
   font-weight:700; 
    letter-spacing:1px;
     text-transform:uppercase;  
     text-align:center; 
     margin:auto; 
     white-space:nowrap;
      padding-bottom:0px;

}
#header .title-logged-in a {
  /* your styles for the title when logged-in */
    color: #230738;
  font-size:24px;
   font-weight:700; 
    letter-spacing:1px;
     text-transform:uppercase;  
     text-align:center; 
     margin:auto; 
     white-space:nowrap;
      padding-bottom:0px;
}
#header .title-logged-in a:before {
    background-color: #c50000;
    content: '';
    display: block;
    height: 3px;
    width: 75px;
    margin-bottom: 5px;
}
#header .title-logged-in a:after {
    background-color: #c50000;
    content: '';
    display: block;
    position:relative; 
    right:0; 
    left: 75%;
    bottom:0;
    height: 3px;
    width: 75px;
    margin-top: 5px;
    margin-bottom: 0.25em;
}
.navbar .getstarted1,
.navbar .getstarted1:focus {
  border-radius: 0;
  color: #ffffff;
  background-color: rgb(111, 70, 136);
  font-weight: 400;
}

.navbar .getstarted1:hover,
.navbar .getstarted1:focus:hover {
  color: #fff;
  background: #996be0;
}
</style>
