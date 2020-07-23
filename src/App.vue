<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn @click="openDialogAddRessourceAction" color="primary" class="mr-2"
        ><v-icon>mdi-plus</v-icon> Ajouter une ressource</v-btn
      >
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
        <RessourceDialog />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { eventBus } from "@/plugins/eventBus";
import RessourceDialog from "@/views/RessourceDialog.vue";
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    RessourceDialog
  }
})
export default class App extends Vue {
  openDialogAddRessourceAction(): void {
    eventBus.$emit("openDialogRessourceEvent", true);
  }
}
</script>

<style scoped></style>
