<template>
  <div class="signUp">
    <v-layout row wrap class="text-xs-center">
      <v-flex>
        <v-card flat class="mx-auto" max-width="500">
          <v-row style="margin-top: 40%">
            <v-col>
              <v-form style="width: 100%; height: 300px">
                <div class="mx-3">
                  이메일
                  <div class="mx-1">
                    <v-text-field placeholder="ex) shutter@naver.com" required v-model="email"></v-text-field>
                  </div>
                </div>
                <div class="mx-3">
                  비밀번호
                  <div class="mx-1">
                    <v-text-field placeholder="비밀번호" type="password" required v-model="pw"></v-text-field>
                  </div>
                </div>

                <v-card-actions>
                  <v-btn color="#2c4f91" dark large block v-on:click="signUp">가입하기</v-btn>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
  
<script>
import firebase from 'firebase/compat/app';

export default {
  data() {
    return {
      email: '',
      pw: ''
    }
  },
  methods: {
    signUp() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.pw).then(
        function (user) {
          alert('회원가입 완료!')
        },
        function (err) {
          alert('에러 : ' + err.message)
        }
      );
    }
  }
}
</script>