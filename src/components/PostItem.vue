<template>
  <div class="post">
    <div>
      <div>{{post.id}} likes: {{$store.state.likes}}</div>
      <div><strong>Название:</strong> {{post.title}}</div>
      <div><strong>Описание:</strong> {{post.body}}</div>
    </div>
    <div class="post__btns">
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
      <MyButton @click="$router.push(`/posts/${post.id}`)">Открыть</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {

}
</style>