<template>
  <div class="home">
    <div class="mainImgBox">
      <img src="../assets/images/main.jpeg" alt="">
      <div class="miniTextBox">
        <h2 class="pl-2 white--text">
          The one you have been<br> waiting for you<br><br>
          Record your<br> butiful moment
        </h2>
      </div>
      <!-- <img src="../assets/images/main2.jpeg" alt=""> -->
    </div>
    <div class="mx-auto techniqueBox">
      <h2>촬영 기법</h2>
      <div style="position: relative; padding-bottom: 60px;">
      <v-layout row wrap justify-center relative class="mt-3">
        <v-card xs12 sm6 md4 xl4 class="mr-6 ml-6 mb-6" width="33.3%" max-width="300" min-width="230">
          <v-img src="../assets/images/반영.jpeg" height="250"></v-img>
          <v-card-title>
            <div>
              <h3>반영</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="text-left">사물의 본 모습 그대로가 아닌 물이나 창문 등에 반사되거나 비쳐진 모습을 담아 낸 사진을 말합니다. 일상 속에서 쉽게 발견할 수 있지만, 새롭고 특별한 느낌을
              줄
              수 있고 초현실적인 장면들도 연출될 수 있기에 더욱 매력적인 기법입니다.</p>
          </v-card-text>
        </v-card>

        <v-card xs12 sm6 md4 xl4 class="mr-6 ml-6 mb-6" width="33.3%" max-width="300" min-width="230">
          <v-img src="../assets/images/실루엣.jpeg" height="250"></v-img>
          <v-card-title>
            <div>
              <h3>실루엣</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="text-left">
              인물 등의 피사체를 일부러 역광 상태에서 노출을 적게 주고 촬영하여 그 피사체의 형태만이 검게 나오게 한 사진을 말합니다. 실루엣 촬영은 일반적인 촬영과 방법에 차이가 있습니다. 역광으로 비치는
              피사체를 직접 찍어야 하기에 빛이 강하게 비치는 배경에 노출을 측정하고 피사체를 촬영합니다. 실루엣 촬영은 빛의 원리를 잘 알아야 구사할 수 있는 고급 사진 기법입니다.
            </p>
          </v-card-text>
        </v-card>

        <v-card xs12 sm12 md4 xl4 class="mr-6 ml-6 mb-6" width="33.3%" max-width="300" min-width="230">
          <v-img src="../assets/images/장노출3.jpeg" height="250"></v-img>
          <v-card-title>
            <div>
              <h3>장노출</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <p class="text-left">
              카메라 렌즈에 빛을 받아들이는 시간을 상대적으로 길게 하여, 즉 저속 셔터(1초를 나누는 숫자가 적음)로 촬영하는 사진을 장노출 사진이라 합니다.
            </p>
          </v-card-text>
        </v-card>
        <v-btn absolute bottom><router-link to="technique" style="text-decoration: none; color: #000">더 알아보기</router-link></v-btn>
      </v-layout>
    </div>

      <v-card>
      <v-card-title>추천 & 질문 게시판</v-card-title>
      <v-data-table :headers="headers" :items="items">
      </v-data-table>
      <v-dialog max-width="500" v-model="dialog">
        
      </v-dialog>
    </v-card>
    </div>
    <div class="boardBox">

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default {
  name: 'HomeView',
  data() {
    return {
      headers: [
        { value: 'title', text: '제목' },
        { value: 'content', text: '내용' },
        { value: 'email', text: '작성자' },
        { value: 'id', text: '' }
      ],
      items: [],
      form: {
        title: '',
        content: '',
        email: '',
      },
      dialog: false,
      selectedItem: null
    }
  },
  created() {
    this.read()
  },
  methods: {
    openDialog(item) {
      if(!this.isLoggedIn) {
        alert('로그인이 필요한 서비스입니다.');
        return
      }
      this.selectedItem = item
      this.dialog = true
      if (!item) {
        this.form.title = ''
        this.form.content = ''
        this.form.email = this.userEmail
      } else {
        this.form.title = item.title
        this.form.content = item.content
        this.form.email = item.email
      }
    },
    add() {
      const db = firebase.firestore();
      db.collection('boards').add(this.form)
      this.dialog = false
      this.read()
    },
    update() {
      const db = firebase.firestore();
      db.collection('boards').doc(this.selectedItem.id).update(this.form)
      this.dialog = false
      this.read()
    },
    async read() {
      const db = firebase.firestore();
      const sn = await db.collection('boards').get()
      if (!sn.empty) {
        this.items = sn.docs.map(v => {
          const item = v.data()
          return {
            title: item.title,
            content: item.content,
            email: item.email
          }
        })
      }
    },
    remove(item) {
      const db = firebase.firestore();
      db.collection('boards').doc(item.id).delete()
      this.dialog = false
      this.read()
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      userEmail: state => state.userEmail
    })
  }
}
</script>

<style>
.home {
  width: 100%;
  height: 100%;
}

.mainImgBox {
  width: 100%;
  display: flex;
  margin-bottom: 30px;
  box-shadow: 0 10px 8px 4px #999;
}

.mainImgBox img {
  width: 65%;
}

.miniTextBox {
  width: 35%;
  background: #000000;
  font-size: 2vw;
  display: flex;
  align-items: flex-end;
  padding-bottom: 20px;
}


.techniqueBox {
  width: 100%;
  text-align: center;
}

.techniqueBox>h2 {
  font-size: 33px;
  letter-spacing: 1px;
}
</style>