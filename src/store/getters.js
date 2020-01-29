// https://vuex.vuejs.org/en/getters.html

export default {
    loginRoute: () => {
        // return 'http://www.mocky.io/v2/5e27e4b53200002a00d83d57';
        // return 'https://ug-team-project.herokuapp.com/api/user/1';
        return 'https://ug-team-project.herokuapp.com/login';
    },
    userDetailsRoute: () => (username) => {
        return `https://ug-team-project.herokuapp.com/api/user/get/${username}`;
    },
    officeDetailsRoute: () => (idUser) => {
        return `https://ug-team-project.herokuapp.com/api/user/${idUser}/office`;
    },
    insertWorkstation: () => {
        return 'https://ug-team-project.herokuapp.com/api/workstation'
    },
    officeRoute: (state)  => {
        const idOffice = state.officeData.id;
        return `https://ug-team-project.herokuapp.com/api/office/${idOffice}/workstations`;
        // return 'https://ug-team-project.herokuapp.com/api/workstation';
        // return 'http://www.mocky.io/v2/5e2348fd2f0000380e222719';
        // return 'http://www.mocky.io/v2/5e27e4693200002a00d83d55'; // many
        // return 'http://www.mocky.io/v2/5e2b1ba53200000d001c7089'; // 2
    },
    // eslint-disable-next-line no-unused-vars
    getRooms: (state) => {
        const idOffice = state.officeData.id;
        return `https://ug-team-project.herokuapp.com/api/office/${idOffice}/rooms`;
        // return 'http://www.mocky.io/v2/5e3024f23200002c00858847'; // many office 1
        // return 'http://www.mocky.io/v2/5e3094d83200000f00858bc1'; // many office 2
        // return 'http://www.mocky.io/v2/5e30383032000050008588ff';
    },
    // eslint-disable-next-line no-unused-vars
    getDoors: (state) => {
        const idOffice = state.officeData.id;
        // return 'http://www.mocky.io/v2/5e3061653200007500858a95'; // many office 1
        // return 'http://www.mocky.io/v2/5e3097a03200006300858bcd'; // many office 2
        return `https://ug-team-project.herokuapp.com/api/office/${idOffice}/decorations`;
    },
    changeStatusRoute: (state) => {
        const userId = state.userDetails.id;
        return `https://ug-team-project.herokuapp.com/api/user/${userId}`;
    },
    // eslint-disable-next-line no-unused-vars
    updateWorkstation: () => (id) => {
        return 'https://ug-team-project.herokuapp.com/api/workstation/' + id;
        // return 'https://www.mocky.io/v2/5185415ba171ea3a00704eed';
    },
    // eslint-disable-next-line no-unused-vars
    updateUser: (state) => {
        // return 'https://ug-team-project.herokuapp.com/api/user/'+id;
        // return 'http://www.mocky.io/v2/5e27e4b53200002a00d83d57';
        const userId = state.userDetails.id;
        return `https://ug-team-project.herokuapp.com/api/user/${userId}`;
    },
    availableUser: (state) => {
        const idOffice = state.officeData.id;
        return `https://ug-team-project.herokuapp.com/api/office/${idOffice}/availableUsers`;
        // return 'http://www.mocky.io/v2/5e2c74cc3100007a00267f05'
    },

    isLogged: (state) => {
         return state.isLogged;
    },
    userDetails: (state) => {
        return state.userDetails
    }
};
