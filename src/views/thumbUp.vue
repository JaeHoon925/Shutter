<template>
  <div id="thumbUp">
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
    <!-- <v-card>
      <v-card-title>꿀팁 모음</v-card-title>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.id="{ item }">
          <v-btn icon @click="openDialog(item)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon @click="remove(item)"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
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
              <v-btn @click="update" v-if="selectedItem">저장</v-btn>
              <v-btn @click="add" v-else>저장</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card> -->
  </div>
</template>
  
<script>
import { mapState } from 'vuex';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export default {
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  computed: {
    ...mapState(['isLoggedIn'])
  }
};
</script>
