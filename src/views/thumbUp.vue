<template>
    <div id="thumbUp">
      <v-card>
        <v-card-title>꿀팁 모음</v-card-title>
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
                <v-btn @click="update" v-if="selectedItem">save</v-btn>
                <v-btn @click="add" v-else>save</v-btn>
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
          { value: 'id', text: '수정 및 삭제' }
        ],
        items: [],
        form: {
          title: '',
          content: ''
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
        this.selectedItem = item
        this.dialog = true
        if (!item) {
          this.form.title = ''
          this.form.content = ''
        } else {
          this.form.title = item.title
          this.form.content = item.content
        }
      },
      add() {
        const db = firebase.firestore();
        db.collection('thumbUp').add(this.form)
        this.dialog = false
        this.read()
      },
      update() {
        const db = firebase.firestore();
        db.collection('thumbUp').doc(this.selectedItem.id).update(this.form)
        this.dialog = false
        this.read()
      },
      async read() {
        const db = firebase.firestore();
        const sn = await db.collection('thumbUp').get()
        if (!sn.empty) {
          this.items = sn.docs.map(v => {
            const item = v.data()
            return {
              id: v.id,
              title: item.title,
              content: item.content
            }
          })
        }
      },
      remove(item) {
        const db = firebase.firestore();
        db.collection('thumbUp').doc(item.id).delete()
        this.dialog = false
        this.read()
      }
    },
    computed: {
      ...mapState(['isLoggedIn'])
    }
  };
  </script>
  