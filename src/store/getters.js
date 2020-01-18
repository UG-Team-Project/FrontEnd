// https://vuex.vuejs.org/en/getters.html

export default {
    loginRoute: () => {
        return 'http://www.mocky.io/v2/5e1ebd293100008b0018941c';
    },
    officeRoute: () => {
        return 'http://www.mocky.io/v2/5e22ffad2f00009700222668';
    },
    isLogged: (state) => {
         return state.isLogged;
    },
    userDetails: (state) => {
        return state.userDetails
    }
};
