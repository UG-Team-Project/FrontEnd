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
                                    flat
                            >
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer/>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                                :href="source"
                                                icon
                                                large
                                                target="_blank"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-code-tags</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Source</span>
                                </v-tooltip>
                            </v-toolbar>
                            <v-card-text>
                                <v-form
                                @submit="checkForm"
                                >
                                    <v-alert
                                            v-if="areInvalidCredentials"
                                            ref="errorLogin"
                                            border="top"
                                            dark
                                            color="red lighten-1"
                                    >
                                        Invalid login or password.
                                    </v-alert>
                                    <v-text-field
                                            v-model="input.username"
                                            label="Login"
                                            name="username"
                                            prepend-icon="person"
                                            type="text"
                                            required
                                    />

                                    <v-text-field
                                            v-model="input.password"
                                            id="password"
                                            label="Password"
                                            name="password"
                                            prepend-icon="lock"
                                            type="password"
                                    />
                                    <v-btn  type="submit" color="primary">Login</v-btn>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
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
    data () {
        return {
            areInvalidCredentials: '',
            input: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        checkForm: function (evt) {
            if (this.input.username === 'admin' && this.input.password === 'admin') {
                console.log('asdfasdf');
                this.$store.getters.isLogged = true;
                this.$router.replace({ name: 'dashboard-index' });
            } else {
                this.areInvalidCredentials = true;
            }
            evt.preventDefault();
        }
    },
    props: {
        source: String
    }
};
</script>
