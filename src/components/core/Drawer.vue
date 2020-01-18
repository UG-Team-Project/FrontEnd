<template>
        <v-navigation-drawer
                app
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                width="300px"
                height="100%"
                :expand-on-hover="expandOnHover"
        >
            <v-list>
                <v-list-item
                        v-for="(link, i) in links"
                        :key="i"
                        :to="link.to"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Dashboard',
        data: () => ({
            logo: 'favicon.ico',
            expandOnHover: true,
            links: [
                {
                    to: '/dashboard',
                    icon: 'mdi-view-dashboard',
                    text: 'Dashboard'
                },
                {
                    to: '/dashboard/user-profile',
                    icon: 'mdi-account',
                    text: 'User Profile'
                },
                // {
                //     to: '/dashboard/table-list',
                //     icon: 'mdi-clipboard-outline',
                //     text: 'Table List'
                // },
                {
                    to: '/dashboard/maps',
                    icon: 'mdi-map-marker',
                    text: 'Maps'
                },
                // {
                //     to: '/dashboard/notifications',
                //     icon: 'mdi-bell',
                //     text: 'Notifications'
                // },
                {
                    to: '/logout',
                    icon: 'mdi-logout',
                    text: 'Logout'
                }
            ]
        }),
    };
</script>
