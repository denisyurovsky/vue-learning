import axios from "axios";

export const PostModule = {
    state: function() {
        return {
            posts: [],
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
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1,post2) => {
                return post1[state.selectedSort]?.localeCompare((post2[state.selectedSort]))
            })
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post?.title?.toLowerCase().includes(state?.searchQuery?.toLowerCase()))
        }
    },
    mutations: {
      setPosts(state, posts) {
          state.posts = posts;
      },
        setLoading(state, bool) {
          state.Loading = bool;
      },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state,selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPages(state,totalPages) {
          state.totalPages = totalPages
        },
        setSearchQuery(state,searchQuery) {
          state.searchQuery = searchQuery
        },

    },
    actions : {
        async fetchPosts({state, commit}) {
            commit('setLoading',true)
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,

                    }
                })
                commit('setTotalPages',Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts',response.data)
            } catch (e) {
                alert(e.message)
            } finally {
                commit('setLoading',false)
            }
        },
        async fetchMorePosts({state, commit}) {
            try {
               commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit,

                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts',[...state.posts, ...response.data])
            } catch (e) {
                alert(e.message)
            }
        }
    },
}