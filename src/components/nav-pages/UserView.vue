<template>
    <div>
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-auto col-md-3 col-xl-2 px-sm-2"
                    style="background-color: rgb(111 70 136);border-top-right-radius: 80px;">
                    <Sidebar @item-clicked="handleSidebarItemClick"></Sidebar>
                </div>

                <div class="col py-3">
                    <component :is="activeItemComponent"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { markRaw } from 'vue';
import Sidebar from '../layout/SideBarView.vue';
import Component1 from '../user-pages/user-homeView.vue';
import Component2 from '../user-pages/user-offres.vue';
import Component3 from '../user-pages/user-Inscriptions.vue';
import Component4 from '../user-pages/user-chat.vue';
import Component5 from '../user-pages/user-settings.vue';
import Component6 from '../user-pages/user-calendrier.vue';

export default {
    name: 'UserView',
    components: { Sidebar, Component1, Component2, Component3, Component4, Component5, Component6 },
    data() {
        return {
            activeItemComponent: markRaw(Component1),
        };
    },
    methods: {
        handleSidebarItemClick(item) {
            // Set the selected component based on the clicked sidebar item
            switch (item) {
                case 1:
                    this.activeItemComponent = markRaw(Component1);
                    break;
                case 2:
                    this.activeItemComponent = markRaw(Component2);
                    break;
                case 3:
                    this.activeItemComponent = markRaw(Component3);
                    break;
                case 4:
                    this.activeItemComponent = markRaw(Component4);
                    break;
                case 5:
                    this.activeItemComponent = markRaw(Component6);
                    break;
                case 6:
                    this.activeItemComponent = markRaw(Component5);
                    break;
                default:
                    this.activeItemComponent = null;
            }
        },
    },
    beforeCreate() {
        this.$store.dispatch('updateAuthStatus', true);
    },
};
</script>

<style>
.nav-link {
    color: #000000;
}

.container-fluid {
    max-width: none;
}

.py-3 {
    padding-top: 0.5rem !important;
    padding-bottom: 1rem !important;
}
</style>
