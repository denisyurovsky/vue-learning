<template>
  <div>
   <h1>Страница с постами</h1>
<!--    <MyInput v-focus v-model="searchQuery" placeholder="Поиск по названию"/>-->
    <div class="app__buttons">
      <MyButton @click="showDialog">Создать пост</MyButton>
<!--      <MySelect-->
<!--          v-model="selectedSort"-->
<!--          :options="sortOptions"-->
<!--      />-->
    </div>
<!--    <MyDialog  v-model:show="dialogVisible">-->
<!--      <PostForm @create='createPost'/>-->
<!--    </MyDialog>-->
    <PostList :posts = "sortedAndSearchedPosts" @remove="removePost" v-if="!Loading"/>
    <div v-else> Data is Loading...</div>
    <div class="observer"></div>
    <!--    <div class="page__wrapper">-->
    <!--      <button v-for="pageNumber in totalPages" @click="changePage(pageNumber)" :class="{'current-page': page === pageNumber }" :key="pageNumber" class="page">-->
    <!--        {{pageNumber}}-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/UI/MyButton";
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

export default {
  components: {MyButton, PostList, PostForm},
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage'
    }),
    ...mapState({
      posts: state => state.post.posts,
      Loading: state => state.post.Loading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      className: state => state.post.className,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({}),
    ...mapActions({
      fetchMorePosts: 'fetchMorePosts',
      fetchPosts: 'fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    //   this.fetchPosts()
    // },
    removePost(post) {
      this.posts = this.posts.filter((item) => item.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    console.log(this.Loading);

    // this.fetchPosts()

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }
    //
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.fetchMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    //
    // observer.observe(this.$refs.observer)
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
    // selectedSort(newValue) {
    //   this.posts.sort((post1,post2) => {
    //     return post1[newValue]?.localeCompare((post2[newValue]))
    //   })
    // }
  },
  computed: {
    ...mapState({

    }),
    ...mapGetters({
      sortedPosts: 'sortedPosts',
      sortedAndSearchedPosts: 'sortedAndSearchedPosts'
    })
}}
</script>

<style>

.app__buttons {
  display: flex;
  margin: 15px;
  justify-content: space-between;
}

/*.page__wrapper {*/
/*  display: flex;*/
/*  margin-top: 15px;*/
/*  justify-content: space-between;*/
/*}*/

/*.page {*/
/*  border: 1px solid black;*/
/*  padding: 10px;*/
/*}*/

.current-page {
  border: 2px solid teal
}

.observer {
  height: 30px;
  background: green;
}
</style>