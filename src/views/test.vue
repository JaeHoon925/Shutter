<template>
    <div id="test">
        <input type="text" v-model="boardTitle" placeholder="제목">
        <input type="text" v-model="boardCont" placeholder="내용">
        <v-btn v-on:click="writeUserData">작성</v-btn>
        <!-- 게시글 목록 -->
        <!-- <ul>
            <li v-for="post in posts" :key="post.id">
                <h3>{{ post.title }}</h3>
                <p>{{ post.content }}</p>

                댓글 목록
                <ul>
                    <li v-for="comment in post.comments" :key="comment.id">
                        {{ comment.text }}
                    </li>
                </ul>

                댓글 입력 폼
                <form @submit.prevent="addComment(post.id)">
                    <input type="text" v-model="newComment" placeholder="댓글 입력" required>
                    <button type="submit">댓글 추가</button>
                </form>
            </li>
        </ul>

        게시글 작성 폼
        <form @submit.prevent="addPost">
            <input type="text" v-model="newPost.title" placeholder="제목" required>
            <textarea v-model="newPost.content" placeholder="내용" required></textarea>
            <button type="submit">게시글 추가</button>
        </form> -->
    </div>
</template>
  
<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getDatabase } from "firebase/database";

export default {
    data() {
        return {
            // posts: [],
            // newPost: {
            //     title: '',
            //     content: ''
            // },
            // newComment: ''
            boardTitle: '',
            boardCont: ''
        };
    },
    created() {
        this.fetchPosts();
    },
    methods: {
        // async fetchPosts() {
        //     try {
        //         const db = firebase.firestore();
        //         const querySnapshot = await db.collection('posts').get();
        //         this.posts = querySnapshot.docs.map(doc => {
        //             const data = doc.data();
        //             return {
        //                 // id: doc.id,
        //                 title: data.title,
        //                 content: data.content,
        //                 // comments: data.comments || []
        //             };
        //         });
        //     } catch (error) {
        //         console.error('게시글 조회 오류:', error);
        //     }
        // },
        // 이하 코드 생략

        writeUserData(title, content) {
            const db = getDatabase();
            set(ref(db, 'users/' + userId), {
                boardTitle: title,
                boardCont: content,
            });
        }
    }
};
</script>
  