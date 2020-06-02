<template>
  <nav class="blue darken-3">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Задачи</router-link>
      <ul class="right hide-on-med-and-down">

          <router-link
          tag="li"
          to="/"
          exact
          active-class="active"
          >
        <a href="#">Создать</a>
          </router-link>

         <router-link
          tag="li"
          to="/list"
          active-class="active"
          >
        <a href="#">Список</a>
          </router-link>

      </ul>
    </div>
  </nav>
        
</template>

<script>
export default {
    
}
</script>

<style scoped>
  nav {
    padding: 0 2rem;
  }
</style>