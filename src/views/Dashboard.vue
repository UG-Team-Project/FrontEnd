<template>
    <v-app>
        <Drawer/>
        <v-layout row>
            <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
                <v-container fill-height>
                    <v-layout row justify-center align-center>
                        <v-progress-circular indeterminate :size="100" :width="20"
                                             color="primary"/>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-layout>

        <v-card
                class="mx-auto"
        >
            <div class="pt-12"/>
            <div
                    class="office-room"
                    id="officeCanvas"
            >
                <template v-for="data in officeInfo">
                    <Desk v-bind:style="data.style" :class="data.class" v-bind:key="data"
                          v-on:click.native="showDetails(data.id)"/>
                </template>
            </div>
            <div ref="container"></div>
            <div class="pb-12"/>
            <v-bottom-sheet v-model="showDetailInformation">
                <v-sheet class="text-center" height="300px">
                    <v-btn
                            class="mt-6 blue white--text"
                            text
                            @click="showDetailInformation = !showDetailInformation"
                    >close
                    </v-btn>

                    <div class="py-3">
                        <v-simple-table height="200px" width="100px">
                            <template>
                                <tbody>
                                <tr v-for="item in detailData" :key="item">
                                    <td class="text-uppercase font-weight-bold">{{ item.key }}</td>
                                    <td>{{ item.value }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </div>
                </v-sheet>
            </v-bottom-sheet>
        </v-card>
    </v-app>
</template>
<script>
    import Drawer from '../components/core/Drawer';
    import Desk from "@/components/officeElements/Desk";

    export default {
        name: 'Dashboard',
        data() {
            return {
                loading: false,
                officeRendered: false,
                currentAlert: null,
                dataOffice: null,
                officeInfo: [],
                showDetailInformation: false,
                detailData: []
            };
        },
        components: {
            Drawer, Desk
        },
        created() {
            this.renderOffice();
        },
        methods: {
            renderOffice: async function () {
                this.loading = true;
                const response = await this.axios.get(this.$store.getters.officeRoute);
                const officeInfo = [];
                response.data.forEach(v => {
                    const pieceOfInfo = {};
                    pieceOfInfo.id = v.id;
                    pieceOfInfo.name = v.name;
                    pieceOfInfo.x = v.x1Location;
                    pieceOfInfo.y = v.y1Location;
                    pieceOfInfo.class = "svg-workspace " + v.rotation.toLowerCase();

                    const x1 = pieceOfInfo.x, y1 = pieceOfInfo.y, x2 = v.x2Location, y2 = v.y2Location;

                    if (v.rotation === 'NORTH' || v.rotation === 'SOUTH') {
                        pieceOfInfo.style = `left: ${x1}; top: ${y1}; width: ${x2 - x1}; height: ${y2 - y1}`;
                    } else if (v.rotation === 'WEST' || v.rotation === 'EAST') {
                        pieceOfInfo.style = `left: ${x1}; top: ${y1}; width: ${y2 - y1}; height: ${x2 - x1}`;
                    }
                    pieceOfInfo.detailedData = [
                        {
                            key: 'name',
                            value: v.name
                        },
                        {
                            key: 'username',
                            value: v.user.email.split('@')[0]
                        },
                        {
                            key: 'email',
                            value: v.user.email
                        },
                        {
                            key: 'first name',
                            value: v.user.name
                        },
                        {
                            key: 'surname',
                            value: v.user.surname
                        },
                        {
                            key: 'country',
                            value: v.user.country
                        },
                    ];

                    officeInfo.push(pieceOfInfo);
                })
                this.officeInfo = officeInfo;
                this.loading = false;
            },
            showDetails: function (id) {
                let foundData = null;
                for (const data of this.officeInfo) {
                    if (data.id === id) {
                        foundData = data.detailedData;
                        break;
                    }
                }
                this.detailData = foundData;
                this.showDetailInformation = true;
                // window.console.log(element);
            }
        },
    };
</script>