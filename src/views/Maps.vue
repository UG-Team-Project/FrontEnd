<template>
    <v-app>
        <Drawer/>
        <v-card
                class="mx-auto"
        >
            <GmapMap
                    :center="center"
                    :zoom="7"
                    map-type-id="terrain"
                    style="width: 1200px; height: 600px"
            >
                <GmapMarker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        :clickable="true"
                        :draggable="true"
                        @click="center=m.position"
                />
            </GmapMap>
        </v-card>
    </v-app>
</template>
<script>
    import Drawer from "@/components/core/Drawer";
    export default {
        name: 'google-maps',
        data() {
            return {
                center: {
                    lat:30, lng:30
                },
                markers: [
                    {
                        id: 1,
                        position: {
                            lat: 30,
                            lng: 30
                        },
                        opacity: 1,
                        draggable: true,
                        enabled: true,
                        clicked: 0,
                        rightClicked: 0,
                        dragended: 0,
                    }
                ]
            }
        },
        components: {
            Drawer
        }
    }
</script>
