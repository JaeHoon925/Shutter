<template>
  <v-app>

    <v-app-bar app color="#000000">
      <v-app-bar-nav-icon @click.stop="navDrawer = !navDrawer" style="color: #fff"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link style="text-decoration: none; color: #fff;" to="/">Shutter</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link v-show="!isLoggedIn" to="login"><v-btn>로그인</v-btn></router-link>
      <router-link v-show="!isLoggedIn" to="signUp"><v-btn class="ml-2">회원가입</v-btn></router-link>
      <strong v-show="isLoggedIn" class="white--text">{{ $store.state.userEmail }}</strong>
      <v-btn v-show="isLoggedIn" v-on:click="logout" class="ml-2">로그아웃</v-btn>
    </v-app-bar>

    <v-navigation-drawer app temporary v-model="navDrawer" color="#999999" dark>
      <v-list>
        <router-link v-for="navItem in navItems" @click="" :key="navItem.title" :to="navItem.to"
          style="text-decoration: none;">
          <v-list-item>
            <v-list-item-avatar>
              <v-icon :class="navItem.icon_style">
                {{ navItem.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ navItem.content }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer color="#000">
      <div class="mx-auto white--text">copyright &copy;</div>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';





export default {
  name: 'App',

  data: () => ({
    navDrawer: false,
    navItems: [
      { icon: 'mdi-camera-flip', content: '추천 & 질문 게시판', to: 'board' },
      { icon: 'mdi-camera-iris', content: '촬영 기법', to: 'technique' },
      { icon: 'mdi-thumb-up', content: '꿀팁 모음', to: 'thumbUp' },
    ]
  }),
  methods: {
    logout() {
      // 로그아웃 처리
      firebase.auth().signOut()
        .then(() => {
          // 로그아웃 성공 시 동작할 코드
          this.$store.commit('setLoggedIn', false);
          this.$store.commit('changeEmail', '');
          alert('로그아웃되었습니다.');
        })
        .catch((error) => {
          // 로그아웃 실패 시 동작할 코드
          console.error('로그아웃 중에 오류가 발생했습니다.', error);
        });
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn
    })
  }

};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;500;700&display=swap');


.loginBtn {
  margin-right: 10px;
}

#app {
  font-family: 'Noto Serif KR', serif;
}
</style>