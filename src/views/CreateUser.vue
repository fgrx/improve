<template>
  <div class="CreateUser">
    <h1 data-testid="title">Création d'un utilisateur</h1>
    <v-form
      @submit.prevent="createUserAction"
      data-testid="form"
      v-model="isFormOk"
    >
      <v-text-field
        name="email"
        label="Adresse email"
        id="email"
        data-testid="emailField"
        @click="errorMsg = ''"
        v-model="email"
        :rules="emailRules"
        isRequired
      ></v-text-field>

      <v-text-field
        name="username"
        label="Nom d'utilisateur"
        id="username"
        data-testid="usernameField"
        @click="errorMsg = ''"
        v-model="username"
        :rules="usernameRules"
        isRequired
      ></v-text-field>

      <v-text-field
        name="password"
        data-testid="passwordField"
        label="Mot de passe"
        type="password"
        @click="errorMsg = ''"
        v-model="password"
        :rules="passwordRules"
      ></v-text-field>

      <v-btn
        type="submit"
        color="primary"
        data-testid="connexionBtn"
        :disabled="!isFormOk"
        >Créer l'utilisateur</v-btn
      >

      <v-alert type="error" v-if="errorMsg" data-testid="errorMsg" class="mt-4">
        {{ errorMsg }}
      </v-alert>

      <v-alert
        type="success"
        v-if="successMsg"
        data-testid="successMsg"
        class="mt-4"
      >
        {{ successMsg }}
      </v-alert>
    </v-form>
  </div>
</template>

<script lang="ts">
import findUserGQL from "@/graphql/FindUser.gql";
import createUserGQL from "@/graphql/CreateUser.gql";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CreateUser extends Vue {
  emailRules = [
    v => !!v || "L'adresse email est obligatoire",
    v => /.+@.+\..+/.test(v) || "L'adresse email doit être valide"
  ];
  passwordRules = [
    v =>
      (v && v.length >= 8) || "Le mot de passe doit faire plus de 8 charactères"
  ];
  usernameRules = [v => !!v || "Le nom d'utilisateur est obligatoire"];

  email = "";
  password = "";
  username = "";
  errorMsg = "";
  successMsg = "";
  isFormOk = false;

  async createUserAction() {
    if (await this.checkIfUserExist(this.email)) {
      this.errorMsg = "cette adresse email existe déjà";
      return false;
    }

    try {
      await this.createUserInDB({
        email: this.email,
        password: this.password,
        username: this.username
      });
    } catch (e) {
      this.errorMsg = "Une erreur s'est produite";
      return false;
    }

    this.successMsg = "Utilisateur créé avec succès ";
  }

  async createUserInDB({ email, password, username }) {
    const result = await this.$apollo.mutate({
      mutation: createUserGQL,
      variables: { email, username, password }
    });
    console.log(">>>>>", result);
    return result.data;
  }

  async checkIfUserExist(email) {
    const usersInDB = await this.$apollo.query({
      query: findUserGQL,
      variables: { email }
    });

    return usersInDB.data.users.length > 0 ? true : false;
  }
}
</script>

<style lang="scss"></style>
