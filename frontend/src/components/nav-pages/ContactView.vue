<template>
    <div>

        <!-- ======= Section Contact ======= -->
        <section class="contact">
            <div class="container" data-aos="fade-up">

                <div class="section-title">
                    <h2>Contact</h2>
                    <p>Vous avez des questions, des préoccupations, ou simplement envie de dire bonjour ? Nous sommes là
                        pour vous ! Contactez-nous via le formulaire ci-dessous, et notre équipe sympathique vous répondra
                        dès que possible. Vos commentaires sont précieux pour nous, et nous avons hâte d'avoir de vos
                        nouvelles. Restons connectés !</p>
                </div>

                <div class="row">

                    <div class="col-lg-5 d-flex align-items-stretch">
                        <div class="info">
                            <div class="address">
                                <i class="bi bi-geo-alt"></i>
                                <h4>Adresse :</h4>
                                <p>Centre ville, Djerba</p>
                            </div>

                            <div class="email">
                                <i class="bi bi-envelope"></i>
                                <h4>Email :</h4>
                                <p>Contact@kidsgarderie.tn</p>
                            </div>

                            <div class="phone">
                                <i class="bi bi-phone"></i>
                                <h4>Téléphone :</h4>
                                <p>79 325 811 / 79 325 215</p>
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d366471.37655530847!2d10.64613231230907!3d33.768365701327966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13aabc09046e9991%3A0x6830d5301a39ca66!2sDjerba!5e0!3m2!1sen!2stn!4v1702811901318!5m2!1sen!2stn"
                                frameborder="0" style="border:0; width: 100%; height: 290px;" allowfullscreen></iframe>

                        </div>

                    </div>

                    <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                        <form action="forms/contact.php" method="post" role="form" class="php-email-form">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Votre Nom</label>
                                    <input type="text" name="name" class="form-control" id="name" required>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="name">Votre Email</label>
                                    <input type="email" class="form-control" name="email" id="email" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="name">Sujet</label>
                                <input type="text" class="form-control" name="subject" id="subject" required>
                            </div>
                            <div class="form-group">
                                <label for="name">Message</label>
                                <textarea class="form-control" name="message" rows="10" required></textarea>
                            </div>
                            <div class="my-3">
                                <div class="loading">Chargement</div>
                                <div class="error-message"></div>
                                <div class="sent-message">Votre message a été envoyé. Merci !</div>
                            </div>
                            <div class="text-center"><button type="submit">Envoyer le Message</button></div>
                        </form>
                    </div>

                </div>

            </div>
        </section><!-- Fin de la section Contact -->
    </div>
</template>

<script>
export default {
    name: 'ContactView',
    data() {
        return {

        }
    },
}
</script>