import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // get tasks
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
    // if task outdated change status
      if (new Date(task.date) < new Date()) {
        task.status = 'outdated'
      }
      return task
    })
  },
  mutations: {
    createTask(state, task) {
      state.tasks.push(task)
      // save new task
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask(state, {id, title, description, date}) {
      const tasks = state.tasks.concat()
      const idx = tasks.findIndex(t => t.id === id)
      const task = tasks[idx]
      // if update date, change status
      const status = new Date(date) > new Date() ? 'active' : 'outdated'
      // update task data
      tasks[idx] = {...task, date, title, description, status}
      // save changes
      state.tasks = tasks
      // save updated task
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },

    // Change state status and save
    completeTask(state, id) {
    const idx = state.tasks.findIndex(t => t.id === id)
    state.tasks[idx].status = 'completed'
    // save status task
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
          }
  },
  actions: {
    // create action
    createTask({commit}, task) {
      commit('createTask', task)
    },
    // update action
    updateTask({commit}, task) {
      commit('updateTask', task)
    },
    // Complete task
    completeTask({commit}, id) {
      commit('completeTask', id)
    }
  },
  // Get field tasks from state
  getters: {
    tasks: s => s.tasks,
    // Open task by id - in Task.vue
    taskById: s => id => s.tasks.find(t => t.id === id)
  }
})
