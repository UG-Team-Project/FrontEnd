<template>
    <v-app>
        <Drawer/>
      <v-card
              class="mx-auto"
      >
            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe
                            id="gmap_canvas"
                            width="100%"
                            height="100%"
                            src="https://maps.google.com/maps?q=google&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameborder="0"
                            scrolling="no"
                            marginheight="0"
                            marginwidth="0"
                    />
                </div>
            </div>
      </v-card>
    </v-app>
</template>
<script>
  import Drawer from "@/components/core/Drawer";
  export default {
    components: {
      Drawer
    }
  }
</script>
<style>
    .mapouter {
        text-align: right;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .gmap_canvas {
        overflow: hidden;
        background: none !important;
        height: 100%;
        width: 100%;
    }
</style>
