import { mount } from '@vue/test-utils';
import LoginView from '@/components/nav-pages/LoginView.vue';

describe('LoginView.vue', () => {
    it('renders the login form', async () => {
        const wrapper = mount(LoginView);

        // Check if the login form elements are present
        expect(wrapper.find('[id="email"]').exists()).toBe(true);
        expect(wrapper.find('[id="password"]').exists()).toBe(true);
        expect(wrapper.find('button').text()).toBe('Login');
        expect(wrapper.find('p').text()).toContain("Vous n'avez pas de compte ?");
    });

    it('submits the login form with valid credentials', async () => {
        const wrapper = mount(LoginView);

        // Provide valid credentials
        await wrapper.setData({
            user: {
                email: 'test@example.com',
                password: 'password',
            },
        });

        // Submit the form
        await wrapper.find('form').trigger('submit');
    });


});
