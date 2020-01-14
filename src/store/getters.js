// https://vuex.vuejs.org/en/getters.html

export default {
    loginRoute: () => {
        return 'http://www.mocky.io/v2/5e1c1ddc32000065002281b7';
    },
    isLogged: (state) => {
         return state.isLogged;
    }
};
