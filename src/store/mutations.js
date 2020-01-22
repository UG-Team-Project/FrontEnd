// https://vuex.vuejs.org/en/mutations.html

export default {
    login: (state, data) => {
        window.console.log(data);
        state.userDetails = data;
        state.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        state.isLogged = true;
    }
    ,
    logout: (state) => {
        state.token = null;
        state.isLogged = false;
    }
};
