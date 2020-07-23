<template>
  <div class="Login">
    <h1>Connexion</h1>
    <v-form @submit.prevent="connexionAction" data-testid="connexionForm">
      <v-text-field
        name="email"
        label="Adresse email"
        id="email"
        data-testid="loginField"
        @click="errorMsg = ''"
        v-model="email"
      ></v-text-field>

      <v-text-field
        name="password"
        data-testid="passwordField"
        label="Mot de passe"
        type="password"
        @click="errorMsg = ''"
        v-model="password"
      ></v-text-field>

      <v-btn type="submit" color="primary" data-testid="connexionBtn"
        >Connexion</v-btn
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
import { Vue, Component } from "vue-property-decorator";
import loginMutationGQL from "@/graphql/Login.gql";
import { iUser } from "../interfaces/user";

@Component({})
export default class Login extends Vue {
  email = "";
  password = "";
  errorMsg = "";
  successMsg = "";

  async connexionAction() {
    let resDataUser = null;
    try {
      resDataUser = await this.connectWithGraphQL({
        email: this.email,
        password: this.password
      });
      const user: iUser = this.buildUser(resDataUser);
      this.storeUserInVuex(user);
      this.successMsg = "Authorisation effectuée avec succès.";
    } catch (e) {
      this.errorMsg = "Mauvais couple connexion / mot de passe";
    }
  }

  async connectWithGraphQL({ email, password }) {
    return await this.$apollo.mutate({
      mutation: loginMutationGQL,
      variables: { email, password }
    });
  }

  buildUser(resDataUser): iUser {
    const { jwt, user } = resDataUser.data.login;
    return {
      username: user.username,
      email: user.email,
      token: jwt
    };
  }

  storeUserInVuex(user: iUser) {
    this.$store.dispatch("updateUser", user);
  }
}
</script>

<style lang="scss"></style>
