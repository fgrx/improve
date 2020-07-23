<template>
  <v-container>
    <div class="DashBoard">
      <h1>DashBoard</h1>
      <div
        class="ressource"
        v-for="ressource in ressources"
        :key="ressource.id"
      >
        {{ ressource.title }}
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { iRessource } from "../interfaces/Ressource";
import { Vue, Component } from "vue-property-decorator";
import RessourcesQuery from "../graphql/Ressources.gql";

@Component({
  apollo: {
    ressources: {
      query: RessourcesQuery
    }
  }
})
export default class DashBoard extends Vue {
  ressources: iRessource[] = [];
}
</script>

<style lang="scss"></style>
