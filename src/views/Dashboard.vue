<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
        <v-flex
        md12
        sm12
        lg4>
            <h1>Some text is here</h1>
        </v-flex>
<!--      <v-flex-->
<!--        md12-->
<!--        sm12-->
<!--        lg4-->
<!--      >-->
<!--      </v-flex>-->
<!--      <v-flex-->
<!--        sm6-->
<!--        xs12-->
<!--        md6-->
<!--        lg3-->
<!--      >-->
<!--        <material-stats-card-->
<!--          color="green"-->
<!--          icon="mdi-store"-->
<!--          title="Revenue"-->
<!--          value="$34,245"-->
<!--          sub-icon="mdi-calendar"-->
<!--          sub-text="Last 24 Hours"-->
<!--        />-->
<!--      </v-flex>-->
<!--      <v-flex-->
<!--        sm6-->
<!--        xs12-->
<!--        md6-->
<!--        lg3-->
<!--      >-->
<!--        <material-stats-card-->
<!--          color="orange"-->
<!--          icon="mdi-content-copy"-->
<!--          title="Used Space"-->
<!--          value="49/50"-->
<!--          small-value="GB"-->
<!--          sub-icon="mdi-alert"-->
<!--          sub-icon-color="error"-->
<!--          sub-text="Get More Space..."-->
<!--          sub-text-color="text-primary"-->
<!--        />-->
<!--      </v-flex>-->
<!--      <v-flex-->
<!--        sm6-->
<!--        xs12-->
<!--        md6-->
<!--        lg3-->
<!--      >-->
<!--        <material-stats-card-->
<!--          color="red"-->
<!--          icon="mdi-information-outline"-->
<!--          title="Fixed Issues"-->
<!--          value="75"-->
<!--          sub-icon="mdi-tag"-->
<!--          sub-text="Tracked from Github"-->
<!--        />-->
<!--      </v-flex>-->
<!--      <v-flex-->
<!--        sm6-->
<!--        xs12-->
<!--        md6-->
<!--        lg3-->
<!--      >-->
<!--        <material-stats-card-->
<!--          color="info"-->
<!--          icon="mdi-twitter"-->
<!--          title="Followers"-->
<!--          value="+245"-->
<!--          sub-icon="mdi-update"-->
<!--          sub-text="Just Updated"-->
<!--        />-->
<!--      </v-flex>-->
<!--      <v-flex-->
<!--        md12-->
<!--        lg6-->
<!--      >-->
<!--        <material-card-->
<!--          class="card-tabs"-->
<!--          color="green">-->
<!--          <v-flex-->
<!--            slot="header"-->
<!--          >-->
<!--            <v-tabs-->
<!--              v-model="tabs"-->
<!--              color="transparent"-->
<!--              slider-color="white"-->
<!--            >-->
<!--              <span-->
<!--                class="subheading font-weight-light mr-3"-->
<!--                style="align-self: center"-->
<!--              >Tasks:</span>-->
<!--              <v-tab class="mr-3">-->
<!--                <v-icon class="mr-2">mdi-bug</v-icon>-->
<!--                Bugs-->
<!--              </v-tab>-->
<!--              <v-tab class="mr-3">-->
<!--                <v-icon class="mr-2">mdi-code-tags</v-icon>-->
<!--                Website-->
<!--              </v-tab>-->
<!--              <v-tab>-->
<!--                <v-icon class="mr-2">mdi-cloud</v-icon>-->
<!--                Server-->
<!--              </v-tab>-->
<!--            </v-tabs>-->
<!--          </v-flex>-->

<!--          <v-tabs-items v-model="tabs">-->
<!--            <v-tab-item-->
<!--              v-for="n in 3"-->
<!--              :key="n"-->
<!--            >-->
<!--              <v-list three-line>-->
<!--                <v-list-item @click="complete(0)">-->
<!--                  <v-list-item-action>-->
<!--                    <v-checkbox-->
<!--                      :value="list[0]"-->
<!--                      color="green"-->
<!--                    />-->
<!--                  </v-list-item-action>-->
<!--                  <v-list-item-title>-->
<!--                    Sign contract for "What are conference organized afraid of?"-->
<!--                  </v-list-item-title>-->
<!--                  <div class="d-flex">-->
<!--                    <v-tooltip-->
<!--                      top-->
<!--                      content-class="top">-->
<!--                      <v-btn-->
<!--                        slot="activator"-->
<!--                        class="v-btn&#45;&#45;simple"-->
<!--                        color="success"-->
<!--                        icon-->
<!--                      >-->
<!--                        <v-icon color="primary">mdi-pencil</v-icon>-->
<!--                      </v-btn>-->
<!--                      <span>Edit</span>-->
<!--                    </v-tooltip>-->
<!--                    <v-tooltip-->
<!--                      top-->
<!--                      content-class="top">-->
<!--                      <v-btn-->
<!--                        slot="activator"-->
<!--                        class="v-btn&#45;&#45;simple"-->
<!--                        color="danger"-->
<!--                        icon-->
<!--                      >-->
<!--                        <v-icon color="error">mdi-close</v-icon>-->
<!--                      </v-btn>-->
<!--                      <span>Close</span>-->
<!--                    </v-tooltip>-->

<!--                  </div>-->
<!--                </v-list-item>-->
<!--                <v-divider/>-->
<!--                <v-list-item @click="complete(1)">-->
<!--                  <v-list-item-action>-->
<!--                    <v-checkbox-->
<!--                      :value="list[1]"-->
<!--                      color="success"-->
<!--                    />-->
<!--                  </v-list-item-action>-->
<!--                  <v-list-item-title>-->
<!--                    Lines From Great Russian Literature? Or E-mails From My Boss?-->
<!--                  </v-list-item-title>-->
<!--                  <div class="d-flex">-->
<!--                    <v-tooltip-->
<!--                      top-->
<!--                      content-class="top">-->
<!--                      <v-btn-->
<!--                        slot="activator"-->
<!--                        class="v-btn&#45;&#45;simple"-->
<!--                        color="success"-->
<!--                        icon-->
<!--                      >-->
<!--                        <v-icon color="primary">mdi-pencil</v-icon>-->
<!--                      </v-btn>-->
<!--                      <span>Edit</span>-->
<!--                    </v-tooltip>-->

<!--                    <v-tooltip-->
<!--                      top-->
<!--                      content-class="top">-->
<!--                      <v-btn-->
<!--                        slot="activator"-->
<!--                        class="v-btn&#45;&#45;simple"-->
<!--                        color="danger"-->
<!--                        icon>-->
<!--                        <v-icon color="error">mdi-close</v-icon>-->
<!--                      </v-btn>-->
<!--                      <span>Close</span>-->
<!--                    </v-tooltip>-->
<!--                  </div>-->
<!--                </v-list-item>-->
<!--                <v-divider/>-->
<!--                <v-list-item @click="complete(2)">-->
<!--                  <v-list-item-action>-->
<!--                    <v-checkbox-->
<!--                      :value="list[2]"-->
<!--                      color="success"-->
<!--                    />-->
<!--                  </v-list-item-action>-->
<!--                  <v-list-item-title>-->
<!--                    Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit-->
<!--                  </v-list-item-title>-->
<!--                  <div class="d-flex">-->
<!--                    <v-tooltip-->
<!--                      top-->
<!--                      content-class="top">-->
<!--                      <v-btn-->
<!--                        slot="activator"-->
<!--                        class="v-btn&#45;&#45;simple"-->
<!--                        color="success"-->
<!--                        icon-->
<!--                      >-->
<!--                        <v-icon color="primary">mdi-pencil</v-icon>-->
<!--                      </v-btn>-->
<!--                      <span>Edit</span>-->
<!--                    </v-tooltip>-->
<!--                    <v-tooltip-->
<!--                      top-->
<!--                      content-class="top">-->
<!--                      <v-btn-->
<!--                        slot="activator"-->
<!--                        class="v-btn&#45;&#45;simple"-->
<!--                        color="danger"-->
<!--                        icon-->
<!--                      >-->
<!--                        <v-icon color="error">mdi-close</v-icon>-->
<!--                      </v-btn>-->
<!--                      <span>Close</span>-->
<!--                    </v-tooltip>-->

<!--                  </div>-->
<!--                </v-list-item>-->
<!--              </v-list>-->
<!--            </v-tab-item>-->
<!--          </v-tabs-items>-->
<!--        </material-card>-->
<!--      </v-flex>-->
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
            tabs: 0,
            list: {
                0: false,
                1: false,
                2: false
            }
        };
    },
    methods: {
        complete (index) {
            this.list[index] = !this.list[index];
        }
    }
};
</script>
