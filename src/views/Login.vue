<template>
    <v-app id="inspire">
        <v-content>
            <v-container
                    class="fill-height"
                    fluid
            >
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col
                            cols="12"
                            sm="8"
                            md="4"
                    >
                        <v-card class="elevation-12">
                            <v-toolbar
                                    color="primary"
                                    dark
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer/>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                        @submit.prevent="checkForm"
                                >
                                    <v-text-field
                                            v-model="input.username"
                                            label="Login"
                                            name="username"
                                            prepend-icon="mdi-account"
                                            type="text"
                                            required
                                    />
                                    <v-text-field
                                            v-model="input.password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="mdi-lock"
                                            type="password"
                                            required
                                    />
                                    <v-btn type="submit" class="blue" color="primary">Login</v-btn>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-alert
                                        v-if="areInvalidCredentials"
                                        ref="errorLogin"
                                        border="top"
                                        dark
                                        color="red lighten-1"
                                        width="100%"
                                >
                                    Invalid login or password.
                                </v-alert>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                areInvalidCredentials: '',
                input: {
                    username: '',
                    password: ''
                }
            };
        },
        methods: {
            checkForm: function () {
                // this.axios.get(this.$store.getters.loginRoute, {
                //     "username": this.input.username,
                //     "password": this.input.password
                // }).then((response => {
                this.axios.post(this.$store.getters.loginRoute, {
                    username: this.input.username,
                    password: this.input.password
                }).then((response => {
                    if (response.status !== 200) {
                        throw "Invalid Credentials";
                    }
                    const token = response.data;
                    this.$store.state.token = token;
                    this.axios.defaults.headers.common['Authorization'] = token;
                    return this.axios.get(this.$store.getters.userDetailsRoute(this.input.username))
                })).then((response) => {
                    if (response.status >= 400) {
                        throw "Invalid user details";
                    }
                    this.$store.commit('login', response.data);
                    this.$store.state.officeData = response.data.office;

                    const userData = this.$store.state.userDetails;
                    userData['status'] = 'ONLINE';
                    return this.axios.put(this.$store.getters.changeStatusRoute, userData);
                }).then((response) => {
                    if (response.status < 400) {
                        this.$router.push({name: 'dashboard-index'});
                    }
                }).catch((err) => {
                    window.console.error(err);
                    this.areInvalidCredentials = true;
                });
            }
        },
        props: {
            source: String
        }
    };
</script>
