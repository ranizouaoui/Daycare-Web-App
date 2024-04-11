import { createStore } from 'vuex';
import storeConfig from '@/store/index.js';

describe('Vuex Store', () => {

    it('checks the initial value of getAuthStatus', () => {
        const store = createStore(storeConfig);

        // Check the initial value of getAuthStatus
        expect(store.getters.getAuthStatus).toBe(false);
    });
});
