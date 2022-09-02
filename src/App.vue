<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск по названию"/>
    <div class="app__buttons">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"/>
    </div>
    <MyDialog  v-model:show="dialogVisible">
      <PostForm @create='createPost'/>
    </MyDialog>
    <PostList :posts = "sortedAndSearchedPosts" @remove="removePost" v-if="!Loading"/>
    <div v-else> Data is Loading...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";
export default {
  components: { PostList, PostForm},
  data() {
   return {
     posts: [],
     dialogVisible: false,
     modificatorValue: '',
     Loading: false,
     selectedSort: '',
     searchQuery: '',
     sortOptions: [{value: 'title', name: 'По названию'},
       {value: 'body', name: 'По описанию'}]
   }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      this.Loading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
      } catch (e) {
        alert(e.message)
      } finally {
        this.Loading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts()
  },
  // watch: {
  //   selectedSort(newValue) {
  //     this.posts.sort((post1,post2) => {
  //       return post1[newValue]?.localeCompare((post2[newValue]))
  //     })
  //   }
  // },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1,post2) => {
        return post1[this.selectedSort]?.localeCompare((post2[this.selectedSort]))
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__buttons {
  display: flex;
  margin: 15px;
  justify-content: space-between;
}
</style>