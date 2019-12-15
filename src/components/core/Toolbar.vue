<template>
  <v-app id="inspire">
      <v-toolbar
      flat
      persistent
      width="100%"
      >
        <v-spacer></v-spacer>
        <v-toolbar-title>Title</v-toolbar-title>
        <v-toolbar-items>
          <v-btn text>Link 1</v-btn>
          <v-btn text>Link 2</v-btn>
          <v-btn text>Link 3</v-btn>
        </v-toolbar-items>

        <template v-if="$vuetify.breakpoint.smAndUp">
          <v-btn icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
  </v-app>

<!--  <v-toolbar-->
<!--    id="core-toolbar"-->
<!--    dark-->
<!--    flat-->
<!--    prominent-->
<!--    style="background: #eee;"-->
<!--  >-->
<!--&lt;!&ndash;    <div class="v-toolbar-title">&ndash;&gt;-->
<!--&lt;!&ndash;      <v-toolbar-title&ndash;&gt;-->
<!--&lt;!&ndash;        class="tertiary&#45;&#45;text font-weight-light"&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <v-btn&ndash;&gt;-->
<!--&lt;!&ndash;          v-if="responsive"&ndash;&gt;-->
<!--&lt;!&ndash;          class="default v-btn&#45;&#45;simple"&ndash;&gt;-->
<!--&lt;!&ndash;          dark&ndash;&gt;-->
<!--&lt;!&ndash;          icon&ndash;&gt;-->
<!--&lt;!&ndash;          @click.stop="onClickBtn"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <v-icon>mdi-view-list</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;        {{ title }}&ndash;&gt;-->
<!--&lt;!&ndash;      </v-toolbar-title>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->

<!--&lt;!&ndash;    <v-spacer />&ndash;&gt;-->
<!--&lt;!&ndash;    <v-toolbar-items>&ndash;&gt;-->
<!--&lt;!&ndash;      <v-flex&ndash;&gt;-->
<!--&lt;!&ndash;        v-slot:activator="{ on }"&ndash;&gt;-->
<!--&lt;!&ndash;        align-center&ndash;&gt;-->
<!--&lt;!&ndash;        layout&ndash;&gt;-->
<!--&lt;!&ndash;        py-2&ndash;&gt;-->
<!--&lt;!&ndash;      >&ndash;&gt;-->
<!--&lt;!&ndash;        <v-text-field&ndash;&gt;-->
<!--&lt;!&ndash;          class="mr-4 purple-input"&ndash;&gt;-->
<!--&lt;!&ndash;          label="Search..."&ndash;&gt;-->
<!--&lt;!&ndash;          hide-details&ndash;&gt;-->
<!--&lt;!&ndash;          color="purple"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link&ndash;&gt;-->
<!--&lt;!&ndash;          v-ripple&ndash;&gt;-->
<!--&lt;!&ndash;          class="toolbar-items"&ndash;&gt;-->
<!--&lt;!&ndash;          to="/"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <v-icon color="tertiary">mdi-view-dashboard</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        </router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        <v-menu&ndash;&gt;-->
<!--&lt;!&ndash;          bottom&ndash;&gt;-->
<!--&lt;!&ndash;          left&ndash;&gt;-->
<!--&lt;!&ndash;          content-class="dropdown-menu"&ndash;&gt;-->
<!--&lt;!&ndash;          offset-y&ndash;&gt;-->
<!--&lt;!&ndash;          transition="slide-y-transition">&ndash;&gt;-->
<!--&lt;!&ndash;          <router-link&ndash;&gt;-->
<!--&lt;!&ndash;            v-ripple&ndash;&gt;-->
<!--&lt;!&ndash;            slot="activator"&ndash;&gt;-->
<!--&lt;!&ndash;            class="toolbar-items"&ndash;&gt;-->
<!--&lt;!&ndash;            to="/notifications"&ndash;&gt;-->
<!--&lt;!&ndash;          >&ndash;&gt;-->
<!--&lt;!&ndash;            <v-badge&ndash;&gt;-->
<!--&lt;!&ndash;              color="error"&ndash;&gt;-->
<!--&lt;!&ndash;              overlap&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <template slot="badge">&ndash;&gt;-->
<!--&lt;!&ndash;                {{ notifications.length }}&ndash;&gt;-->
<!--&lt;!&ndash;              </template>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-icon color="tertiary">mdi-bell</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-badge>&ndash;&gt;-->
<!--&lt;!&ndash;          </router-link>&ndash;&gt;-->
<!--&lt;!&ndash;          <v-card>&ndash;&gt;-->
<!--&lt;!&ndash;            <v-list dense>&ndash;&gt;-->
<!--&lt;!&ndash;              <v-list-item&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="notification in notifications"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="notification"&ndash;&gt;-->
<!--&lt;!&ndash;                @click="onClick"&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->
<!--&lt;!&ndash;                <v-list-item-title&ndash;&gt;-->
<!--&lt;!&ndash;                  v-text="notification"&ndash;&gt;-->
<!--&lt;!&ndash;                />&ndash;&gt;-->
<!--&lt;!&ndash;              </v-list-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </v-list>&ndash;&gt;-->
<!--&lt;!&ndash;          </v-card>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-menu>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link&ndash;&gt;-->
<!--&lt;!&ndash;          v-ripple&ndash;&gt;-->
<!--&lt;!&ndash;          class="toolbar-items"&ndash;&gt;-->
<!--&lt;!&ndash;          to="/user-profile"&ndash;&gt;-->
<!--&lt;!&ndash;        >&ndash;&gt;-->
<!--&lt;!&ndash;          <v-icon color="tertiary">mdi-account</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;        </router-link>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-flex>&ndash;&gt;-->
<!--&lt;!&ndash;    </v-toolbar-items>&ndash;&gt;-->
<!--  </v-toolbar>-->
</template>

<script>

import {
    mapMutations
} from 'vuex';

export default {
    data: () => ({
        notifications: [
            'Mike, John responded to your email',
            'You have 5 new tasks',
            'You\'re now a friend with Andrew',
            'Another Notification',
            'Another One'
        ],
        title: null,
        responsive: false
    }),

    watch: {
        '$route' (val) {
            this.title = val.name;
        }
    },

    mounted () {
        this.onResponsiveInverted();
        window.addEventListener('resize', this.onResponsiveInverted);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.onResponsiveInverted);
    },

    methods: {
        ...mapMutations('v-app-bar', ['setDrawer', 'toggleDrawer']),
        onClickBtn () {
            this.setDrawer(!this.$store.state.app.drawer);
        },
        onClick () {
            //
        },
        onResponsiveInverted () {
            if (window.innerWidth < 991) {
                this.responsive = true;
            } else {
                this.responsive = false;
            }
        }
    }
};
</script>

<style>
  /*#core-toolbar a {*/
  /*  text-decoration: none;*/
  /*}*/
</style>
