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
                                                v-model="input.firstName"
                                                class="purple-input"/>
                                    </v-flex>
                                    <v-flex
                                            xs12
                                            md6
                                    >
                                        <v-text-field
                                                label="Last Name"
                                                v-model="input.lastName"
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
              multi-line="true"
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
            username: 'asdasd',
            email: '',
            firstName: '',
            lastName: '',
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
          this.input.username = details.username;
          this.input.email = details.email;
          this.input.firstName = details.firstName;
          this.input.lastName = details.lastName;
          this.input.country = details.country;
        },
        methods: {
          saveDetails: function () {
            this.gotResponse = true;
          }
        }
    };
</script>
