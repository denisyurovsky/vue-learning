<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-focus v-model="searchQuery" placeholder="Поиск по названию"/>
    <div class="app__buttons">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"/>
    </div>
    <MyDialog  v-model:show="dialogVisible">
      <PostForm @create='createPost'/>
    </MyDialog>
    <PostList :posts = "sortedAndSearchedPosts" @remove="removePost" v-if="!Loading"/>
    <div v-else> Data is Loading...</div>
    <div v-intersection="fetchMorePosts" class="observer"></div>
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
      className: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [{value: 'title', name: 'По названию'},
        {value: 'body', name: 'По описанию'}]
    }
  },
  methods: {
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
    async fetchPosts() {
      this.Loading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          params: {
            _page: this.page,
            _limit: this.limit,

          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert(e.message)
      } finally {
        this.Loading = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,

          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert(e.message)
      }
    }
  },
  mounted() {
    this.fetchPosts()

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
    sortedPosts() {
      return [...this.posts].sort((post1,post2) => {
        return post1[this.selectedSort]?.localeCompare((post2[this.selectedSort]))
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post?.title?.toLowerCase().includes(this?.searchQuery?.toLowerCase()))
    }
  }
}
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