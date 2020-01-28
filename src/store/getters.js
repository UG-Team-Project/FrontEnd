// https://vuex.vuejs.org/en/getters.html

export default {
    loginRoute: () => {
        return 'http://www.mocky.io/v2/5e27e4b53200002a00d83d57';
        // return 'https://ug-team-project.herokuapp.com/api/user/1';
    },
    officeRoute: () => {
        // return 'https://ug-team-project.herokuapp.com/api/workstation';
        // return 'http://www.mocky.io/v2/5e2348fd2f0000380e222719';
        // return 'http://www.mocky.io/v2/5e27e4693200002a00d83d55'; // many
        return 'http://www.mocky.io/v2/5e2b1ba53200000d001c7089'; // 2
    },

    // eslint-disable-next-line no-unused-vars
    updateWorkstation: () => (id) => {
        // return 'https://ug-team-project.herokuapp.com/api/workstation/' + id;
        return 'https://www.mocky.io/v2/5185415ba171ea3a00704eed';
    },
    // eslint-disable-next-line no-unused-vars
    updateUser: () => (id) => {
        // return 'https://ug-team-project.herokuapp.com/api/user/'+id;
        return 'http://www.mocky.io/v2/5e27e4b53200002a00d83d57';
    },
    availableUser: () => {
        return 'http://www.mocky.io/v2/5e2c74cc3100007a00267f05'
    },

    isLogged: (state) => {
         return state.isLogged;
    },
    userDetails: (state) => {
        return state.userDetails
    }
};
