import { mount } from "@vue/test-utils";
import HomeView from "@/components/nav-pages/HomeView.vue";

const MockRouterLink = {
    name: "RouterLink",
    template: '<a class="mock-router-link"><slot></slot></a>',
};

const wrapper = mount(HomeView, {
    global: {
        components: {
            RouterLink: MockRouterLink,
        },
    },
});

describe("HomeView.vue", () => {
    it("renders the home view", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("contains the welcome message", () => {
        expect(wrapper.text()).toContain("Bienvenue à Le Havre des Petits Explorateurs !");
    });

    it("contains a router-link to /login", () => {
        const routerLink = wrapper.findComponent({ name: "RouterLink" });
        expect(routerLink.exists()).toBe(true);
        expect(routerLink.text()).toBe("Commencer"); // Assuming "Commencer" is the text inside your router-link
        expect(routerLink.attributes("to")).toBe("/login");
    });
});
