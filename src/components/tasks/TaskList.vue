<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import TaskService from '@/services/TaskService.js'

const tasks = ref([])
const showSuccessNotification = ref(false)

onMounted(() => {
    TaskService.getTasks().then((response) => {
        tasks.value = response.data
    }).catch((error) => {
        console.log(error)
    })
})

const deleteTask = (id) => {
    TaskService.deleteTask(id)
        .then(() => {
            // console.log('Task deleted successfully:', response.data);
            tasks.value = tasks.value.filter(task => task.id !== id);
            showSuccessNotification.value = true
            setTimeout(() => {
                showSuccessNotification.value = false
            }, 3000)
        })
        .catch(error => {
            console.error('Error deleting task:', error);
        });
};

const hideSuccessNotification = () => {
    showSuccessNotification.value = false
}
</script>

<template>
    <div class="my-10 flex flex-col items-center justify-center w-[500px]">
        <div v-if="showSuccessNotification"
            class="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <div class="flex flex-row">
                <p class="text-sm">Task deleted successfully</p>
                <button @click="hideSuccessNotification" class="ml-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="w-full flex flex-row justify-between items-center">
            <h1 class="text-3xl text-slate-100 font-bold mb-4">My Tasks</h1>
            <RouterLink :to="{ name: 'new-task' }">
                <button class="text-xl font-bold mb-4 px-4 py-2 bg-slate-100 rounded-lg">Add a Task</button>
            </RouterLink>
        </div>
        <ul class="list-none w-full">
            <li v-for="task in tasks" :key="task.id" class="bg-slate-100 border rounded-lg p-4 mb-4 flex">
                <div class="w-full">
                    <RouterLink class="w-full" :to="{ name: 'task-details', params: { id: task.id } }">
                        <div class="flex w-full items-center justify-between">
                            <div class="flex items-center">
                                <h3 class="text-lg font-bold">{{ task.title }}</h3>
                            </div>
                            <span class="text-sm text-gray-500">{{ new Date(task.created_at).toLocaleString() }}</span>
                        </div>
                    </RouterLink>
                    <div class="flex w-full">
                        <RouterLink class="w-full" :to="{ name: 'task-details', params: { id: task.id } }">
                            <div class="w-full">
                                <p class="mb-2">{{ task.description.slice(0, 40) + (task.description.length > 40 ? '...'
            :
            '')
                                    }}
                                </p>
                                <div class="text-sm text-gray-500">
                                    <span>Status: {{ task.status }}</span>
                                    <span class="ml-4">Due Date: {{ new Date(task.due_date).toLocaleString() }}</span>
                                </div>
                            </div>
                        </RouterLink>
                        <div class="w-1/12 flex flex-col gap-2 justify-evenly items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6 text-green-700 hover:cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            <svg @click="deleteTask(task.id)" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                class="size-6 text-red-700 hover:cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
