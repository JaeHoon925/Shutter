<template>
  <div class="login">
    <v-layout row wrap class="text-xs-center">
      <v-flex>
        <v-card flat class="mx-auto" max-width="500">
          <v-row style="margin-top: 40%">
            <v-col>
              <v-form style="width: 100%; height: 300px">
                <div class="mx-3">
                  Email
                  <div class="mx-1">
                    <v-text-field placeholder="Email" required v-model="email"></v-text-field>
                  </div>
                </div>
                <div class="mx-3">
                  Password
                  <div class="mx-1">
                    <v-text-field placeholder="Password" type="password" required v-model="pw"></v-text-field>
                  </div>
                </div>

                <v-card-actions>
                  <v-btn color="#2c4f91" dark large block v-on:click="login">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style></style>

<script>
import firebase from 'firebase/compat/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      pw: ''
    }
  },
  methods: {
    login() {
      var self = this;
      const auth = getAuth();

      firebase.auth().signInWithEmailAndPassword(this.email, this.pw).then(
        function (user) {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              self.loginok();
              const currentUser = firebase.auth().currentUser;
              self.changeEmail(currentUser.email)
              self.$router.replace('/');
              // if (currentUser) {
              //   const email = currentUser.email;
              //   console.log('사용자 이메일:', email);
              // }
              // console.log('로그인 상태:', user);
              return;
            }
            // 사용자 로그아웃 시 동작
            console.log('logout');
          });
        },
        function (err) {
          alert('에러 : ' + err.message)
        }
      );

    },
    loginok() {
      this.$store.commit('setLoggedIn', true);
    },
    changeEmail(email) {
      this.$store.commit('changeEmail', email);
    }
  }
}
</script>