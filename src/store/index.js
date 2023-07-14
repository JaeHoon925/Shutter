import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 애플리케이션의 상태를 정의합니다.
    // 예: count: 0
    isLoggedIn: false,
    userEmail: ''
  },
  mutations: {
    // 상태를 변경하는 변이(mutations)를 정의합니다.
    // 예: increment(state) { state.count++; }
    setLoggedIn(state, inout) {
      state.isLoggedIn = inout;
    },
    setLoggedOut(state, inout) {
      state.isLoggedIn = inout;
    },
    changeEmail(state, email){
      return (state.userEmail = email);
    }
  },
  actions: {
    // login({ commit }) {
    //   // Firebase 로그인 로직
    //   firebase.auth().signInWithEmailAndPassword('email@example.com', 'password')
    //     .then(() => {
    //       // 로그인 성공
    //       commit('setLoggedIn', true);
    //     })
    //     .catch((error) => {
    //       // 로그인 실패
    //       console.error(error);
    //     });
    // },
    // logout({ commit }) {
    //   // Firebase 로그아웃 로직
    //   firebase.auth().signOut()
    //     .then(() => {
    //       // 로그아웃 성공
    //       commit('setLoggedIn', false);
    //     })
    //     .catch((error) => {
    //       // 로그아웃 실패
    //       console.error(error);
    //     });
    // },
  },
  getters: {
    // 상태를 계산하는 게터(getters)를 정의합니다.
    // 예: doubleCount(state) { return state.count * 2; }
  },
  modules: {
  }
})
