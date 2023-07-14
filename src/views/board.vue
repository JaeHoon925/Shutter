<template>
  <div id="board">
    <v-card>
      <v-card-title>추천 & 질문 게시판</v-card-title>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.id="{ item }">
          <v-btn icon @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn @click="read"><v-icon left>mdi-page-next</v-icon></v-btn>
        <v-btn @click="openDialog(null)"><v-icon left>mdi-pencil</v-icon></v-btn>
      </v-card-actions>
      <v-dialog max-width="500" v-model="dialog">
        <v-card>
          <v-form>
            <v-card-text>
              <v-text-field v-model="form.title" label="제목"></v-text-field>
              <v-text-field v-model="form.content" label="내용"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="update" v-if="selectedItem">수정 완료</v-btn>
              <v-btn @click="add" v-else>저장하기</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export default {
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
            id: v.id,
            title: item.title,
            content: item.content,
            email: item.email
          }
        })
      }
    },
    remove(item) {
      if(this.userEmail==item.email || this.userEmail=='admin2@naver.com') {
        const db = firebase.firestore();
      db.collection('boards').doc(item.id).delete()
      this.dialog = false
      this.read()
      } else if(this.userEmail == '') {
        alert('로그인 이후에 가능한 서비스입니다.');
      } else {
        alert('작성자가 일치하지 않습니다');
      }
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      userEmail: state => state.userEmail
    })
  }
};
</script>