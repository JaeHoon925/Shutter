<template>
  <div class="login">
    <v-layout row wrap class="text-xs-center">
      <v-flex>
        <v-card flat class="mx-auto" max-width="500">
          <v-row style="margin-top: 40%">
            <v-col>
              <v-form style="width: 100%; height: 300px">
                <div class="mx-3">
                  이메일
                  <div class="mx-1">
                    <v-text-field placeholder="이메일" required v-model="email"></v-text-field>
                  </div>
                </div>
                <div class="mx-3">
                  비밀번호
                  <div class="mx-1">
                    <v-text-field placeholder="비밀번호" type="password" required v-model="pw"></v-text-field>
                    <v-spacer>
                    <v-icon>mdi-eye</v-icon>
                  </div>
                </div>

                <v-card-actions>
                  <v-btn color="#2c4f91" dark large block v-on:click="login">로그인</v-btn>
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
              return;
            }
            // 사용자 로그아웃 시 동작
            console.log('logout');
          });
        },
        function (err) {
          if (err.code === 'auth/invalid-email' || err.code === 'auth/user-not-found') {
            alert('이메일이 없거나 비밀번호가 틀렸습니다.');
          } else {
            alert('에러: ' + err.message);
          }
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