<template>
  <div class="RessourceForm">
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Ajouter une ressource</v-card-title>
        <v-card-text>
          <v-text-field
            name="title"
            label="Titre"
            id="title"
            v-model="title"
          ></v-text-field>

          <v-text-field
            name="url"
            label="Lien URL"
            id="url"
            v-model="url"
          ></v-text-field>

          <v-textarea
            name="description"
            filled
            label="Description"
            auto-grow
            v-model="description"
          ></v-textarea>

          <v-switch
            v-model="important"
            label="Ressource importante ?"
          ></v-switch>

          <v-switch v-model="important" label="Ressource publique ?"></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="addRessourceAction">Ajouter</v-btn>
          <v-btn color="secondary" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { eventBus } from "@/plugins/eventBus";
import { Vue, Component } from "vue-property-decorator";
import { iRessource } from "../interfaces/Ressource";

@Component({})
export default class RessourceForm extends Vue {
  dialog = false;
  title = "";
  url = "";
  description = "";
  important = false;
  public = false;

  mounted() {
    eventBus.$on("openDialogRessourceEvent", () => {
      this.dialog = true;
    });
  }

  addRessourceAction(): void {
    const ressource: iRessource = {
      title: this.title,
      url: this.url,
      description: this.description,
      important: this.important,
      public: this.public
    };

    this.dialog = false;
  }
}
</script>

<style lang="scss"></style>
