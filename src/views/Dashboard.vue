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
            </div>
            <div ref="container"></div>
            <div class="pb-12"/>
            <!--            <v-container-->
            <!--                    fill-height-->
            <!--                    fluid-->
            <!--                    grid-list-xl-->
            <!--                    v-once-->
            <!--            >-->
            <!--                <v-layout wrap>-->
            <!--                    <v-flex-->
            <!--                            md12-->
            <!--                            sm12-->
            <!--                            lg4-->
            <!--                            id="officeCanvas"-->
            <!--                            class="office-room"-->
            <!--                    >-->
            <!--                    </v-flex>-->
            <!--                </v-layout>-->
            <!--            </v-container>-->
        </v-card>
    </v-app>
</template>
<script>
    import OfficeDrawer from '../office/office_svg';
    import Drawer from '../components/core/Drawer';
    import OfficeObjectDetails from "@/components/core/OfficeObjectDetails";
    import Vue from 'vue';

    export default {
        name: 'Dashboard',
        data() {
            return {
                loading: false,
                officeRendered: false,
                currentAlert: null,
                dataOffice: null,
            };
        },
        components: {
            Drawer
        },
        created() {
            this.renderOffice();
        },
        methods: {
            renderOffice: function () {
                this.loading = true;
                this.axios.get('http://www.mocky.io/v2/5e1cc215320000700022882f?mocky-delay=200ms')
                    .then(response => {
                        response.data.forEach((v) => {
                            const desk = new OfficeDrawer(v.x1location, v.y1location, v.x2location, v.y2location, v.rotation);
                            desk.render();
                            desk.addEvent(this);
                        });
                        this.$on('showObjectInfo', (evt) => {
                            setTimeout(() => {
                            }, 1);
                            window.console.warn(evt.target.dataset);
                            window.console.warn(evt.target.style);
                            const ComponentClass = Vue.extend(OfficeObjectDetails);
                            const instance = new ComponentClass({
                                propsData: {
                                    displayData: [
                                        {name: 'asdfadsf', value: 'asdfasdf'},
                                        {name: 'asdfadsf', value: 'asdfasdf'},
                                        {name: 'asdfadsf', value: 'asdfasdf'},
                                    ]
                                }
                            });
                            instance.$mount();
                            this.$refs.container.appendChild(instance.$el);

                        });
                        this.loading = false;
                    }).catch(err => {
                    window.console.error(err);
                });
            }
        },

        showObjectInfo: function (evt, evt2) {
            window.console.log('asdf');
            window.console.log(evt);
            window.console.log(evt2);
        }
    };
</script>
<!--<script>-->
<!--export default {-->
<!--    data () {-->
<!--        return {-->
<!--            tabs: 0,-->
<!--            list: {-->
<!--                0: false,-->
<!--                1: false,-->
<!--                2: false-->
<!--            }-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        complete (index) {-->
<!--            this.list[index] = !this.list[index];-->
<!--        }-->
<!--    }-->
<!--};-->
<!--</script>-->
