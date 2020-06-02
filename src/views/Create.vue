<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <!-- Page title -->
      <h3>Новая задача</h3>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <!-- Task Title -->
          <input id="title" 
          v-model="title" 
          type="text" class="validate" placeholder="Название" required>
          <!-- required-->
          <span class="helper-text" data-error="Необходимо заполнить!"></span>
          <!-- Task tags chips -->
        <div class="chips" ref="chips"></div>

          <!-- Task description -->
        <div class="input-field">

          <label for="description">Описание</label>
           <textarea v-model="description"
            id="description" 
            class="materialize-textarea"
            ></textarea>

           <!-- char couter -->
           <span class="character-counter" 
           style="float: right; font-size: 12px;"
           >{{description.length}}/2048</span>

        </div>
        <!-- Datepicker -->
        <input  type="text" ref="datepicker" class="datepicker">

        <button class="btn" type="submit">Создать</button>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create',
  // textarea v-model data
  data: () => ({
    description: '',
    title: '',
    chips: null,
    date: null,
  }),
  // tags chips init 
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder:'Теги'
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate:true
    })
  },
  methods: {
    submitHandler() {
      const task = {
      title: this.title,
      description: this.description,
      id: Date.now(),
      status: 'active',
      tags: this.chips.chipsData,
      date: this.date.date
      }
    // Create Store Tasks
    this.$store.dispatch('createTask', task)
    // console.log(task)

    // Go to List.vue tasks page after create
    this.$router.push('/list')

    }
},
destroyed() {
  if (this.date && this.date.destroyed) {
    this.date.destroyed()
  }
    if (this.chips && this.chips.destroyed) {
    this.chips.destroyed()
   }
 }

}
</script>

<style>
/* modal popup datepicker */
.modal .modal-content {
    padding: unset!important;
}
</style>