<template>
    <v-dialog
            v-model="dialog"
            width="500"
    >
        <v-card>
            <v-card-title
                    class="headline blue color"
                    primary-title
            >
                Information
            </v-card-title>

            <v-card-text>

                <v-simple-table

                >
                    <template slot="default">
                        <tbody>
                        <tr v-for="data in displayData" v-bind:key="data">
                            <td class="font-weight-bold">{{ data.name }}</td>
                            <td>{{ data.value }}</td>
                        </tr>
                        <!--                        <tr v-for="item in desserts" :key="item.name">-->
                        <!--                            <td>{{ item.name }}</td>-->
                        <!--                            <td>{{ item.calories }}</td>-->
                        <!--                        </tr>-->

                        </tbody>
                    </template>
                </v-simple-table>


            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        text
                        @click="dialog = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name: 'ObjectDetails',
        props: [ 'displayData' ],
        data() {
            return {
                dialog: true
            }
        }
        // props: ['type']
    }
</script>