// https://vuex.vuejs.org/en/mutations.html

export default {
    login: (state, token) => {
        state.token = token;
        state.isLogged = true;
    }
    ,
    logout: (state) => {
        state.token = null;
        state.isLogged = false;
    }
};
