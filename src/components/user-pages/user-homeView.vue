<template>
  <div style="background-color: #f2f4f6;">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner testclass">
        <div class="carousel-item active">
          <img src="@/assets/carousel1.png" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/carousel2.jpg" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-item">
          <img src="@/assets/carousel3.jpg" class="d-block w-100" alt="..." />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <br>
    <div class="seven">
      <h1>Nos Programmes</h1>
    </div>
    <div class="container-fluid bg-trasparent p-2" style="position: relative">
      <div class="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" v-if="loading == false">
        <div class="col hp" v-for="item in products" :key="item.name">
          <div class="card1 h-100 shadow-sm">
            <a href="#">
              <img :src="item.image" class="card1-img-top" alt="product.title" style="padding: 2px;" />
            </a>
            <div class="label-top shadow-sm">
              <a class="text-white" href="#">{{ item.brand }}</a>
            </div>
            <div class="card-body">
              <h4 class="card-title">{{ item.name }}</h4>
              <div class="clearfix mb-3">
                <span class="float-end badge rounded-pill bg-success">{{ item.price }}DT</span>
              </div>
              <h5 class="card-title">
                <a target="_blank">{{
                  item.description
                }}</a>
              </h5>

              <div class="d-grid gap-2 my-4">
                <button data-bs-toggle="modal" data-bs-target="#exampleModal" @click="
                addToCart(item),
                  getData(
                    item.name,
                    item.brand,
                    item.price,
                    item.description,
                    item.image,
                    item.key
                  )
                  " class="mon-bouton">
                  S'inscrire
                </button>
              </div>
              <div class="clearfix mb-1">
                <span class="float-start"><a href="#"><i class="fas fa-question-circle"></i></a></span>

                <span class="float-end">
                  <i class="far fa-heart" style="cursor: pointer"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <!-- <span class="sr-only">Chargement...</span> -->
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" style="border: black">
        <div class="modal-header" style="background: #242121; color: white">
          <div class="r" style="display: flex; margin: auto">

            <h5 class="modal-title" id="exampleModalLabel">
              Inscription terminée avec succès
            </h5>
          </div>
        </div>
        <div class="modal-body" style="display: flex">
          <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
                <img :src="dataProduct.image" class="img-fluid rounded-start" alt="..." />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ dataProduct.name }}</h5>
                  <h6 class="card-text">{{ dataProduct.brand }}</h6>
                  <br />
                  <h6 class="card-text">Prix : {{ dataProduct.price }} DT</h6>
                  <p class="card-text">
                    Il y a {{ $store.state.count }} programmes dans votre panier.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="close" class="btn btn-dark" data-bs-dismiss="modal">
              Continuer
            </button>
            <button type="submit" class="btn btn-dark" @click="Gotocart">
              Commander
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  collection,
  query,
  getFirestore,
  orderBy,
  getDocs,
} from "firebase/firestore";
import router from "@/router/routes";
const db = getFirestore();
export default {
  name: "HomeView",
  data() {
    return {
      dataProduct: {
        name: "",
        price: 0,
        image: "",
        brand: "",
        description: "",
        key: "",
      },
      products: [],
      loading: true,
      loadingPagination: true,
      lastVisible: "",
      firstVisible: "",
      ProductsNumber: 0,
      ProductsPerPage: 4,
      currentPage: 1,
      DesableNext: false,
      DesablePrevious: true,
      name: "",
    };
  },
  created() {

    // Query the first page of docs
    const first = query(
      collection(db, "offres"),
      orderBy("price")
    );
    getDocs(first).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.products.push({
          key: doc.id,
          name: doc.data().name,
          brand: doc.data().brand,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
          quantity: 1,
          totalPrice: doc.data().price,
        });
        this.loading = false;
      });
    });
  },
  methods: {
    addToCart(item) {
      this.$store.commit("addToCart", item);
    },
    getData(name, brand, price, description, image, key) {
      this.dataProduct.name = name;
      this.dataProduct.brand = brand;
      this.dataProduct.price = price;
      this.dataProduct.description = description;
      this.dataProduct.image = image;
      this.dataProduct.key = key;
    },
    Gotocart() {
      router.push("/cart");
      document.getElementById("close").click();
    },
    GoToDetails(key) {
      this.$router.push({ name: "details", params: { id: key } });
    }
  },
};
</script>
<style scoped>
h1 {
  position: relative;
  padding: 0;
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: #080808;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}

/* Style 7
   ----------------------------- */
.seven h1 {
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  color: #330d3c;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: 27px 0;
  grid-gap: 20px;
  align-items: center;
}

.seven h1:before {
  content: " ";
  display: block;
  border-bottom: 2px solid #7c11bf;
  border-top: 2px solid #7c11bf;
  height: 5px;
  width: 50%;
  justify-self: right;
  background-color: #f8f8f8;
}

.seven h1:after {
  content: " ";
  display: block;
  border-bottom: 2px solid #7c11bf;
  border-top: 2px solid #7c11bf;
  height: 5px;
  width: 50%;
  background-color: #f8f8f8;
}

.nav-link {
  color: #000000;
}

/* @import url("https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Heebo:wght@100;200;300;400;500;600;700;800;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css"); */
.mon-bouton {
  background-color: #7c11bf;
  /* Couleur de fond */
  color: #fff;
  /* Couleur du texte */
  border: none;
  /* Supprime la bordure par défaut */
  padding: 10px 20px;
  /* Ajoute un espace intérieur */
  text-align: center;
  /* Centre le texte à l'intérieur du bouton */
  text-decoration: none;
  /* Supprime la décoration du texte */
  display: inline-block;
  font-size: 16px;
  /* Taille de la police */
  margin: 4px 2px;
  /* Marge extérieure */
  cursor: pointer;
  /* Curseur de la souris */
  border-radius: 10px;
  /* Rayon de bordure */
}

/* Style du bouton au survol */
.mon-bouton:hover {
  background-color: #6a0fa5;
  /* Changement de couleur de fond au survol */
}

:root {
  --font1: "Heebo", sans-serif;
  --font2: "Fira Sans Extra Condensed", sans-serif;
  --font3: "Roboto", sans-serif;

  --btnbg: #52585c;
  --btnfontcolor: rgb(255, 255, 255);
  --btnfontcolorhover: rgb(92, 89, 89);
  --btnbghover: #7c11bf;
  --btnactivefs: rgb(241, 195, 46);

  --label-index: #960796;
  --danger-index: #5bc257;
  /* PAGINATE */
  --link-color: #000;
  --link-color-hover: #fff;
  --bg-content-color: #ffcc00;
}

.container-fluid {
  max-width: 1400px;
}

.card1 {
  background: #fff;
  position: relative;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  transition: 0.3s transform cubic-bezier(0.155, 1.105, 0.295, 1.12),
    0.3s box-shadow,
    0.3s -webkit-transform cubic-bezier(0.155, 1.105, 0.295, 1.12);
  border: 0;
  border-radius: 1rem;
}

.card1-img,
.card1-img-top {
  border-top-left-radius: calc(1rem - 1px);
  border-top-right-radius: calc(1rem - 1px);

}

.card1 h5 {
  overflow: hidden;
  height: 55px;
  font-weight: 300;
  font-size: 1rem;
}

.card1 h5 a {
  color: black;
  text-decoration: none;
}

.card1-img-top {
  width: 100%;
  min-height: 250px;
  max-height: 250px;
  object-fit: contain;
  padding: 30px;
}

.card1 h2 {
  font-size: 1rem;
}

.card1:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.06);
}

/* Centered text */
.label-top {
  position: absolute;
  background-color: var(--label-index);
  color: #fff;
  top: 8px;
  right: 8px;
  padding: 5px 10px 5px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
}

.top-right {
  position: absolute;
  top: 24px;
  left: 24px;

  width: 90px;
  height: 90px;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 900;
  background: #8bc34a;
  line-height: 90px;
  text-align: center;
  color: white;
}

.top-right span {
  display: inline-block;
  vertical-align: middle;
  /* line-height: normal; */
  /* padding: 0 25px; */
}

.aff-link {
  /* text-decoration: overline; */
  font-weight: 500;
}

.over-bg {
  background: rgba(53, 53, 53, 0.85);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
}

.bold-btn {
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 5px 50px 5px 50px;
}

.box .btn {
  font-size: 1.5rem;
}

@media (max-width: 1025px) {
  .btn {
    padding: 5px 40px 5px 40px;
  }
}

@media (max-width: 250px) {
  .btn {
    padding: 5px 30px 5px 30px;
  }
}

/* START BUTTON */
.btn-warning {
  background: var(--btnbg);
  color: var(--btnfontcolor);
  fill: #ffffff;
  border: none;
  text-decoration: none;
  outline: 0;
  /* box-shadow: -1px 6px 19px rgba(247, 129, 10, 0.25); */
  border-radius: 100px;
}

.btn-warning:hover {
  background: var(--btnbghover);
  color: var(--btnfontcolorhover);
  /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}

.btn-check:focus+.btn-warning,
.btn-warning:focus {
  background: var(--btnbghover);
  color: var(--btnfontcolorhover);
  /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}

.btn-warning:active:focus {
  box-shadow: 0 0 0 0.25rem var(--btnactivefs);
}

.btn-warning:active {
  background: var(--btnbghover);
  color: var(--btnfontcolorhover);
  /* box-shadow: -1px 6px 13px rgba(255, 150, 43, 0.35); */
}

/* END BUTTON */

.bg-success {
  font-size: 1rem;
  background-color: var(--btnbg) !important;
  color: var(--btnfontcolor) !important;
}

.bg-danger {
  font-size: 1rem;
}

.price-hp {
  font-size: 1rem;
  font-weight: 600;
  color: darkgray;
}

.amz-hp {
  font-size: 0.7rem;
  font-weight: 600;
  color: darkgray;
}

.fa-question-circle:before {
  /* content: "\f059"; */
  color: darkgray;
}

.fa-heart:before {
  color: crimson;
}

.fa-chevron-circle-right:before {
  color: darkgray;
}

.card1 h5 {
  overflow: hidden;
  height: 55px;
  font-weight: 300;
  font-size: 1rem;
}

.testclass {
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
}
</style>