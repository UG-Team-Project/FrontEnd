<template>
    <v-app>
        <Drawer/>
        <v-card
                class="col-10 mx-auto"
        >
            <v-container
                    fill-height
                    fluid
                    grid-list-xl>
                <v-layout
                        wrap
                >
                    <v-flex
                            xs12
                            md8
                    >
                        <v-form @submit.prevent="saveDetails">
                            <v-container py-0>
                                <v-layout wrap>
                                    <v-flex
                                            xs12
                                            md4
                                    >
                                        <v-text-field
                                                class="purple-input"
                                                label="Username"
                                                v-model="input.username"
                                                disabled
                                        />
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md4
                                    >
                                        <v-text-field
                                                label="Email Address"
                                                v-model="input.email"
                                        />
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-text-field
                                                label="First Name"
                                                v-model="input.name"
                                                class="purple-input"/>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-text-field
                                                label="Last Name"
                                                v-model="input.surname"
                                                class="purple-input"/>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md12
                                    >
                                        <v-text-field
                                                label="Country"
                                                v-model="input.country"
                                                class="purple-input"/>
                                    </v-flex>
                                    <v-flex
                                            xs5
                                            md5>
                                        <v-btn
                                                type="submit"
                                                class="blue text--white text-uppercase"
                                        >
                                            Save
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>

        <v-snackbar
                v-model="gotResponse"
                :timeout="3000"
                color="success"
                multi-line
        >
            Data saved successfully
            <v-btn
                    color="green"
                    text
                    @click="gotResponse = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-app>
</template>
<script>
    import Drawer from '../components/core/Drawer';

    export default {
        data() {
            return {
                input: {
                    username: '',
                    email: '',
                    name: '',
                    surname: '',
                    country: '',
                },
                gotResponse: false
            }
        },
        components: {
            Drawer
        },
        created() {
            const details = this.$store.getters.userDetails;
            window.console.warn('----------------------');
            window.console.warn(this.$store.getters.userDetails);
            this.input.username = details.username;
            this.input.email = details.email;
            this.input.name = details.name;
            this.input.surname = details.surname;
            this.input.country = details.country;
        },
        methods: {
            saveDetails: async function () {
                const details = this.$store.getters.userDetails;
                const response = await this.axios.put(this.$store.getters.updateUser(details.id), {
                    'username': details.username,
                    'email': this.input.email,
                    'name': this.input.name,
                    'surname': this.input.surname,
                    'country': this.input.country
                });
                window.console.warn(response);
                if (response.status === 200) {
                    this.gotResponse = true;
                }
            }
        }
    };
</script>
