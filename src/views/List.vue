<template>
    <div>
        <h3>Список задач</h3>

        <div class="row">
            <div class="col s4">
                <select ref="select" v-model="filter">
                <option value="" disabled selected>Статус задач</option>
                <option value="active">Активна</option>
                <option value="outdated">Просрочена</option>
                <option value="completed">Завершена</option>
                </select>
            </div>
        </div>
        <button v-if="filter" class="btn btn small red" @click="filter = null">Сброс</button>

        <hr>

        <table v-if="tasks.length">
            <thead>
                <tr>
                <th>#</th>
                <th>Название</th>
                <th>Дата</th>
                <th>Описание</th>
                <th>Статус</th>
                <th>Открыть</th>
            </tr>
            </thead>
            <tbody>
                <!-- Get tasks from displayTasks -->
                <tr 
                v-for="(task, idx) of displayTasks"
                :key="task.id"
                >
                <td>{{idx + 1}}</td>
                <td>{{task.title}}</td>
                <td>{{new Date(task.date).toLocaleDateString()}}</td>
                <td class="td"><div class="text">{{task.description}}</div></td>
                <td>{{task.status}}</td>
                <td>
                    <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
                        Открыть
                    </router-link>
                </td>
                </tr>
                
            </tbody>
        </table>
        <p v-else>Нет задач</p>

    </div>
</template>

<script>
export default {
    // Status filter default
    data: ()=> ({
        filter: null,
    }),
    computed: {
        tasks() {
            return this.$store.getters.tasks
        },
        // Filter display check
        displayTasks() {
            return this.tasks.filter(t => {
                if (!this.filter) {
                    return true
                }
                return t.status === this.filter
            })
        }
    }, 
    mounted() {
        M.FormSelect.init(this.$refs.select)
    }
}
</script>

<style scoped>
.td {
    max-width: 400px;
}
.text{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>