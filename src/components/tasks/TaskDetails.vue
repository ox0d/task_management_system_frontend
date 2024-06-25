<script setup>
import { ref, onMounted } from 'vue'
import TaskService from '@/services/TaskService.js'

const props = defineProps(['id'])

const task = ref({})

onMounted(() => {
    TaskService.getTask(props.id).then((response) => {
        task.value = response.data
    }).catch((error) => {
        console.log(error)
    })
})
</script>

<template>
    <div class="my-2.5 flex flex-col justify-center w-[500px] h-dvh">
        <ul class="list-none w-full">
            <li class="bg-slate-100 border rounded-lg p-4 mb-4 flex">
                <div class="w-full">
                    <div class="flex w-full items-center justify-between">
                        <div class="flex items-center">
                            <h3 class="text-lg font-bold">{{ task.title }}</h3>
                        </div>
                        <span class="text-sm text-gray-500">{{ new Date(task.created_at).toLocaleString() }}</span>
                    </div>
                    <div class="flex w-full">
                        <div class="w-full">
                            <p class="mb-2">{{ task.description }}
                            </p>
                            <div class="text-sm text-gray-500">
                                <span>Status: {{ task.status }}</span>
                                <span class="ml-4">Due Date: {{ new Date(task.due_date).toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <RouterLink :to="{ name: 'task-list' }" class="text-slate-100 flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />

            </svg>
            Go Back
        </RouterLink>
    </div>
</template>