<template>
    <div >
         <div v-if="loading==false" class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-light custom-sidebar">
          <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item" @click="handleItemClick(1)">
                    <a href="#" class="nav-link align-middle px-0 custom-nav-link">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Home</span>
                    </a>
                </li>
                <li @click="handleItemClick(2)" v-if="Checkadmin">
                    <a href="#" class="nav-link px-0 align-middle custom-nav-link">
                        <i class="fs-4 bi-bag-check"></i> <span class="ms-1 d-none d-sm-inline">Offres</span>
                    </a>
                </li>
                <li @click="handleItemClick(3)" v-if="Checkadmin">
                    <a class="nav-link px-0 align-middle custom-nav-link">
                        <i class="fs-4 bi-card-checklist"></i> <span class="ms-1 d-none d-sm-inline">Inscriptions</span>
                    </a>
                </li>
                
                <li @click="handleItemClick(4)">
                    <a href="#" class="nav-link px-0 align-middle custom-nav-link">
                        <i class="fs-4 bi-chat-square-text"></i> <span class="ms-1 d-none d-sm-inline">Chat</span>
                    </a>
                </li>
                <li @click="handleItemClick(5)">
                        <a href="#" class="nav-link px-0 align-middle custom-nav-link">
                            <i class="fs-4 bi-calendar-check"></i> <span class="ms-1 d-none d-sm-inline">Calendrier</span>
                        </a>
                    </li>
                <li @click="handleItemClick(6)">
                        <a href="#" class="nav-link px-0 align-middle custom-nav-link">
                            <i class="fs-4 bi-gear"></i> <span class="ms-1 d-none d-sm-inline">Settings</span>
                        </a>
                    </li>
            </ul>
            <hr class="bg-light">
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import "../../utils/firebase";

import {
    collection,
    query,
    getFirestore,
    onSnapshot,

} from "firebase/firestore";


const db = getFirestore();
const q = query(collection(db, "users"));

export default {
    data() {
        return {
            Checkadmin: false,
            loading:true,
            uid: localStorage.getItem("uidUser"),
        };
    },
    methods: {
        handleItemClick(pagename) {
            // Emit an event or perform any other logic when an item is clicked
            this.$emit('item-clicked', pagename);
        }

    },
        created() {
            onSnapshot(q, (querySnapshot) => {
                this.loading = true;
            querySnapshot.forEach((doc) => {
                if (doc.data().uid == this.uid) {
                    if (doc.data().role == "admin") {
                        this.Checkadmin = true;
                    } else {
                         this.Checkadmin = false;
                    }
                        this.loading = false;
                }
                  
            });
      
        });
    }
};
</script>
<style scoped>
/* Increase specificity for .custom-nav-link */
.custom-nav-link {
  color: #fff !important; /* Set text color to white */
  transition: color 0.3s ease; /* Add transition for a smooth color change */
}
.custom-sidebar {
  height: 100vh;
}
.custom-nav-link:hover {
  color: black !important; /* Set text color to a different color on hover */
}

.custom-nav-link:active {
  color: #fff !important; /* Set text color to a different color when clicked */
}

</style>