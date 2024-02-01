<template>
  <div>
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex align-items-center">

      <div class="container">
        <div class="row">
          <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up" data-aos-delay="200">
            <h1>Bienvenue à Le Havre des Petits Explorateurs !</h1>
            <h2>L'Univers des Bambins est bien plus qu'une garderie – c'est un lieu où les amitiés s'épanouissent et les
              jeunes esprits prospèrent.</h2>
            <div class="d-flex justify-content-center justify-content-lg-start">
              <!-- <a class="btn-get-started">Get Started</a> -->
              <router-link class="nav-link btn-get-started" to="/login">Commencer</router-link>
            </div>
          </div>
          <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
            <img src="@/assets/learning-clipart-nursery-student-8.png" class="img-fluid animated rani" alt=""
              style="width: 70%;height: 98%;padding-bottom: 2%;margin-left: 20%;">
          </div>
        </div>
      </div>
    </section><!-- End Hero -->
  </div>
</template>
<script>
export default {
  name: 'HomeView',
  components: {

  }
}
</script>

<style></style>
 