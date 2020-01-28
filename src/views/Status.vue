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
                        <v-spacer class="pt-12"/>
                        <h2>Current Status:</h2>
                        <v-card-title style="width: 300px;" :class="classes">{{ currentStatus }}</v-card-title>
                    </v-flex>
                    <v-flex
                            xs12
                            md8
                    >
                        <v-spacer class="pt-12"/>
                        <h2>Set Status:</h2>
                        <v-form @submit.prevent="changeStatus">
                            <v-radio-group v-model="statusForm" column>
                                <v-radio
                                        label="OFFLINE"
                                        color="red darken-3"
                                        value="OFFLINE"
                                />
                                <v-radio
                                        label="ONLINE"
                                        color="green darken-3"
                                        value="ONLINE"
                                />
                                <v-radio
                                        label="BUSY"
                                        color="orange darken-3"
                                        value="BUSY"
                                />
                            </v-radio-group>
                            <v-btn type="submit" color="blue">Change status</v-btn>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-app>
</template>
<script>
    import Drawer from '../components/core/Drawer';

    export default {
        data() {
            return {
                staticClasses: 'v-btn v-btn--disabled ',
                classes: '',
                currentStatus: 'ONLINE',
                statusForm: ''
            }
        },
        components: {
            Drawer
        },
        created() {
            this.setStatus(null);
        },
        methods: {
            setStatus(status) {
                let currentStatus = '';
                if (status === null) {
                    const responseStatus = 'BUSY';
                    currentStatus = responseStatus;
                } else {
                    currentStatus = status;
                }

                this.statusForm = currentStatus;
                if (currentStatus === 'OFFLINE') {
                    this.classes = this.staticClasses + 'red white--text'
                } else if (currentStatus === 'ONLINE') {
                    this.classes = this.staticClasses + 'green white--text'
                } else if (currentStatus === 'BUSY') {
                    this.classes = this.staticClasses + 'orange white--text'
                }
                this.currentStatus = currentStatus;
            },
            changeStatus() {
                this.setStatus(this.statusForm);
            }
        }
    };
</script>
