
const state = {
    rentData: [],
    saleData: [],
    loadedRent: false,
    loadedSale: false
};

const getters = {
    rentData: state => state.rentData,
    saleData: state => state.saleData,
    getLoadedRentAPI: state => state.loadedRent,
    getLoadedSaleAPI: state => state.loadedSale,
};

const actions = {
    getRentData: ({commit}) => {
        axios.get('static/rent_data.json').then((response) => {
            console.log(response.data.rentData);
            commit('SET_STORE', response.data.rentData),
            state.loadedRent = true
        });
    },
    getSaleData: ({commit}) => {
        axios.get('static/sale_data.json').then((response) => {
            console.log(response.data.saleData);
            commit('SET_SALE_STORE', response.data.saleData),
            state.loadedSale = true
        });
    }
};

const mutations = {
    SET_STORE (state, payload) {
        state.rentData = payload;
    },
    SET_SALE_STORE (state, payload) {
        state.saleData = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}