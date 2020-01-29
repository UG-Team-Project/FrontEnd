// https://vuex.vuejs.org/en/mutations.html

export default {
    login: (state, data) => {
        window.console.log(data);
        state.userDetails = data;
        state.isLogged = true;
    }
    ,
    logout: (state) => {
        state.token = null;
        state.isLogged = false;
    }
};
