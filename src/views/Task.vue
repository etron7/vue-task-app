<template>
    <div class="row">
        <div v-if="task" class="col s6 offset-s3">
             <h3>{{task.title}}</h3>

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
           <textarea style="min-height:150px" v-model="description"
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

        <!-- Show buttons if task not completed-->
        <div v-if="task.status !=='completed'">
        <button class="btn" type="submit" style="margin-right:1rem">Обновить</button>
        <button class="btn blue" type="button" @click="completeTask">Завершить задчу</button>
        </div>

        </div>
      </form>
        </div>
       <p v-else>Задача не найдена</p>
    </div>
</template>

<script>
export default {
    computed: {
        task() {
            return this.$store.getters.taskById(+this.$route.params.id)
        }
    },
    // Edit task method
    data: () => ({
    title: '',
    description: '',
    chips: null,
    date: null,
  }),
  // tags chips init for edit
  mounted() {
    this.title = this.task.title
    this.description = this.task.description
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder:'Теги',
      data: this.task.tags
    })
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate:true
    })
    // update textfields
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        title:this.title,
        description: this.description,
        date: this.date.date
      })
    // Go to List.vue tasks page after update
    this.$router.push('/list')
    },
    // Status task
    completeTask() {
      this.$store.dispatch('completeTask', this.task.id)
    // Go to List.vue tasks page after change status
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

<style scoped>

</style>