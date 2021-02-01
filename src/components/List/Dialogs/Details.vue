<template v-if="data">
  <v-dialog :value="true" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
    <v-card tile>
      <!-- top -->
      <v-toolbar flat dark color="indigo">
        <v-btn icon dark @click="$store.state.dialogs.details = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Details</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-list class="mt-5">
          <v-row>
            <v-col cols="12" md="12" sm="12">
              <v-subheader>Works</v-subheader>
              <v-timeline :reverse="reverse" dense>
                <v-timeline-item v-for="(item, i) in data.works" :key="i" class="mb-2">
                  <v-card class="elevation-2">
                    <v-row> 
                      <v-col cols="12" md="6" sm="12">
                        <v-card-title class="headline">Description: {{ item.description }} </v-card-title>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title class="py-1"
                              >Selected hours: <span class="info--text">{{ item.selectedHours }}</span></v-list-item-title
                            >
                            <v-list-item-title class="py-1"
                              >Selected project: <span class="info--text">{{ item.selectedProject }}</span></v-list-item-title
                            >
                            <v-list-item-title class="py-1"
                              >Selected taskt: <span class="info--text">{{ item.selectedTask }}</span></v-list-item-title
                            >
                            <v-list-item-title
                              ><v-checkbox v-model="item.done" class="ma-0" label="Work done" disabled color="info"></v-checkbox
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                      <v-col cols="12" md="6" sm="12">
                        <v-card-title class="headline">Details</v-card-title>
                        <v-list-item v-if="item.details">
                          <v-list-item-content>
                            <v-list-item-title class="py-1">
                              Addition description: <span class="info--text">{{ item.details.desc_long }}</span>
                            </v-list-item-title>
                            <v-list-item-title class="py-1">
                              Hours description: <span class="info--text">{{ item.details.desc_hours }}</span>
                            </v-list-item-title>
                            <v-list-item-title class="py-1">
                              Project description: <span class="info--text">{{ item.details.desc_project }}</span>
                            </v-list-item-title>
                            <v-list-item-title class="py-1">
                              Work description: <span class="info--text">{{ item.details.desc_task }}</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item v-else>
                          <v-list-item-title class="py-1">Details doesn't exist</v-list-item-title>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-list>

        <v-divider></v-divider>
        <!-- BOTTOM -->
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-list>
              <v-subheader>Plans</v-subheader>
              <v-list-item v-for="(item, i) in data.plans" :key="i" class="mb-2">
                <v-list-item-content class="pa-0">
                  <v-list-item-title v-html="item.compiled"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-list>
              <v-subheader>Blockers</v-subheader>
              <v-list-item v-for="(item, i) in data.blockers" :key="i" class="mb-2">
                <v-list-item-content class="pa-0">
                  <v-list-item-title v-html="item.compiled"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      reverse: false,
      data: this.$store.state.itemSelected,
    };
  },
};
</script>