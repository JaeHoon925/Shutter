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
                  <p v-show="!check.emailCk" class="checkText">
                    이메일 주소를 정확히 입력해주세요.
                  </p>
                </div>

                <div class="mx-3">
                  비밀번호
                  <div class="mx-1">
                    <v-text-field placeholder="비밀번호" type="password" required v-model="pw"></v-text-field>
                  </div>
                  <p v-show="!check.pwCk" class="checkText">
                    영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)
                  </p>
                </div>

                <div class="mx-3">
                  비밀번호 확인
                  <div class="mx-1">
                    <v-text-field placeholder="비밀번호" type="password" required v-model="pwCk"></v-text-field>
                  </div>
                  <p v-show="!check.pwCk2" class="checkText">
                    비밀번호가 일치하지 않습니다.
                  </p>
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
      pw: '',
      pwCk: '',
      check: {
        emailCk: true,
        pwCk: true,
        pwCk2: true,
      },
      checkSign: {
        emailCk: false,
        pwCk: false,
        pwCk2: false,
      }
    }
  },
  watch: {
    'email': function () {
      this.checkEmail()
    },
    'pw': function () {
      this.checkPassword()
    },
    'pwCk': function () {
      this.checkPassword2()
    },
  },
  methods: {
    signUp() {
      // 정규식 통과 시
      if (this.checkSign.emailCk && this.checkSign.pwCk && this.checkSign.pwCk2) {
        var self = this;
        firebase.auth().createUserWithEmailAndPassword(this.email, this.pw).then(
          function (user) {
            alert('회원가입 완료!')
            self.$router.replace('/login');
          },
          function (err) {
            if (err.code === 'auth / email - already -in -use') {
              alert('이미 사용 중인 이메일입니다.');
            } else {
              alert('에러: ' + err.message);
            }
          }
        );
      } else if (!this.checkSign.emailCk) {
        // 이메일
        alert("이메일 주소를 정확히 입력해주세요");
      } else if (!this.checkSign.pwCk) {
        // 비밀번호
        alert("비밀번호를 영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16자)");
      } else if (!this.checkSign.pwCk2) {
        // 비밀번호 확인
        alert("비밀번호가 일치하지 않습니다");
      }
    },
    checkEmail() {
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/
      if (validateEmail.test(this.email)) {
        this.check.emailCk = true
        this.checkSign.emailCk = true
      } else {
        this.check.emailCk = false
        this.checkSign.emailCk = false
      }
    },
    checkPassword() {
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/
      if (validatePassword.test(this.pw)) {
        this.check.pwCk = true
        this.checkSign.pwCk = true
      } else {
        this.check.pwCk = false
        this.checkSign.pwCk = false
      }
    },
    checkPassword2() {
      console.log(this.checkSign.pwCk2);
      if (this.pw == this.pwCk) {
        this.check.pwCk2 = true
        this.checkSign.pwCk2 = true
      } else {
        this.check.pwCk2 = false
        this.checkSign.pwCk2 = false
      }
    }
  }
}
</script>

<style>
.checkText {
  color: red;
  font-size: 14px;
  /* padding */
}
</style>