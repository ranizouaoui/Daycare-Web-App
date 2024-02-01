<template>
    <div class="content">
        <div class="card-grid" style="padding-top: 2%;">

            <div class="card">
                <div class="row">
                    <div class="col" style="background-color: #f4f4f4;">
                        <div class="container" style="padding-top: 22%;">
                            <img src="@/assets/kids.png" class="img-fluid rounded-start" />
                        </div>

                    </div>
                    <div class="col" style="padding: 20px;">
                        <br>
                        <h1 class="fw-bold mb-2 text-uppercase" style="text-align: center; font-size: 30px;">CRÉER UN NOUVEAU COMPTE</h1>
                        
                        <form @submit.prevent="signupUser()">
                            <div class="alert alert-danger" v-if="messageError">
                                {{ messageError }}
                            </div>
                            <div class="form-outline" style="width: 90%;">
                                    <label for="form-label" class="col-form-label">Nom d'utilisateur</label>
                                    <input type="text" class="form-control" id="username" placeholder="Exemple: Mofida"
                                        autocomplete="off" v-model="user.username">

                                </div>
                            <div class="form-outline" style="width: 90%;">
                                <label for="form-label" class="col-form-label">Adresse e-mail</label>
                                <input type="text" class="form-control" id="email" placeholder="nom@exemple.com"
                                    autocomplete="off" v-model="user.email">

                            </div>

                            <!-- Password input -->
                            <div class="form-outline" style="width: 90%;">
                                <label for="form-label" class="col-sm-4 col-form-label">Mot de passe</label>

                                <input type="password" class="form-control" id="password" name="password"
                                    placeholder="Entrer un mot de passe" autocomplete="off" v-model="user.password">

                            </div>
                             <!-- Phone input -->
                            <div class="form-outline mb-4" style="width: 90%;">
                                <label for="form-label" class="col-sm-6 col-form-label">numéro de téléphone</label>

                                <input type="tel" class="form-control" id="phone" name="phone"
                                    placeholder="Ex: +216 98 987 876" autocomplete="off" v-model="user.phone">

                            </div>
                            <p class="mb-5 pb-lg-2" style="color: #393f81;">Vous avez un compte ? <a href="/login"
                                    style="color: #393f81;">Connectez-vous ici</a></p>
                            <!-- Submit button -->
                            <button type="submit" class="button-34" value="Submit">Se connecter</button>


                        </form>
                        <br>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
<script>
import "@/utils/firebase";
import router from "@/router/routes";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const auth = getAuth();
const db = getFirestore();
const dbRef = collection(db, "users");
export default {
    name: 'SigninView',
    data() {
        return {
            user: {
                email: "",
                password: "",
                username: "",
                role: "Simple",
                phone:''
            },
            messageError: "",
        }
    },
    methods: {
          signupUser() {
            createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
                .then((dataUser) => {
                    console.log(this.user);
                    addDoc(dbRef, {
                        name: this.user.username,
                        email: this.user.email,
                        uid: dataUser.user.uid,
                        phone:this.user.phone,
                        role: "simple",
                    });
                    localStorage.setItem("uidUser", dataUser.user.uid);
                        router.push("/user");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>
<style>
html {
    font-family: Arial, Helvetica, sans-serif;
    display: inline-block;
    background-color: #f3f5fa;

}

.content {
    padding: 2%;
    background-color: #f3f5fa;
}

.card-grid {
    max-width: 950px;
    margin: 0 auto;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
    background-color: white;
    box-shadow: 2px 2px 12px 1px rgba(185, 183, 183, 0.5);
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
}

.button-34 {
    background: #7c11bf;
    border-radius: 999px;
    box-shadow: #334b73;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    font-family: Helvetica, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-left: 20px;
    opacity: 1;
    outline: 0 solid transparent;
    padding: 8px 18px;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 85%;
    word-break: break-word;
    border: 0;
}

.success_container {
    width: 500px;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 25px 0px rgba(209, 209, 209, 1);
    -moz-box-shadow: 0px 0px 25px 0px rgba(209, 209, 209, 1);
    box-shadow: 0px 0px 25px 0px rgba(209, 209, 209, 1);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.ic_schauhan {
    width: 50px;
    height: 50px;
    line-height: 50px;
    background: #090;
    text-align: center;
    margin: 0px auto;
    border-radius: 100%;

}


.success_container p {
    text-align: center;
    font-weight: 600;
    margin: 10px;
    font-size: 20px;
    padding: 0px;
    color: #0C0;
    animation: blink 1s steps(5, start) infinite;
    -webkit-animation: blink 1s steps(5, start) infinite;
}


@keyframes blink {
    0% {
        color: #0C0;
    }

    100% {
        color: green;
    }
}

.line {
    width: 100%;
    height: 6px;
    background: #090;
    position: absolute;
    left: 0;
    bottom: 0;
    animation: line 2s infinite alternate;
}

@keyframes line {
    0% {
        width: 0%;
        background: #0F0;
    }

    100% {
        width: 100%;
        background: #030;
    }
}


@media only screen and (max-width: 767px) {
    .success_container {
        width: 100%;
        padding: 120px 100px;
        box-shadow: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>