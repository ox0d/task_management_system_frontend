<script setup>
import { ref } from 'vue'
import TaskService from '@/services/TaskService.js'

const showSuccessNotification = ref(false)

const title = ref('')
const description = ref('')
const status = ref('pending')
const due_date = ref('')

const task = ref({})
const titleError = ref('')
const descriptionError = ref('')
const statusError = ref('')
const dueDateError = ref('')

const validateForm = () => {
    let isValid = true
    if (title.value.trim() === '') {
        titleError.value = 'Title is required'
        isValid = false
    } else {
        titleError.value = ''
    }
    if (description.value.trim() === '') {
        descriptionError.value = 'Description is required'
        isValid = false
    } else {
        descriptionError.value = ''
    }
    if (status.value === '') {
        statusError.value = 'Status is required'
        isValid = false
    } else {
        statusError.value = ''
    }
    if (due_date.value === '') {
        dueDateError.value = 'Due date is required'
        isValid = false
    } else {
        dueDateError.value = ''
    }
    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) {
        return
    }
    task.value = {
        title: title.value,
        description: description.value,
        status: status.value,
        due_date: due_date.value
    }

    // TaskService.addTask(task.value)
    //     .then(() => {
    //         showSuccessNotification.value = true
    //         setTimeout(() => {
    //             showSuccessNotification.value = false
    //         }, 3000)
    //     })
    //     .catch((error) => {
    //         console.error('Error adding task:', error);
    //     })

    try {
        await TaskService.addTask(task.value)
        showSuccessNotification.value = true
        setTimeout(() => {
            showSuccessNotification.value = false
        }, 3000)
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

const hideSuccessNotification = () => {
    showSuccessNotification.value = false
}
</script>

<template>
    <div class="w-[600px] h-dvh flex flex-col justify-center">
        <div v-if="showSuccessNotification"
            class="fixed bottom-4 left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
            <div class="flex flex-row">
                <p class="text-sm">Task added successfully</p>
                <button @click="hideSuccessNotification" class="ml-2 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="w-full flex flex-col gap-4 bg-white border rounded-lg p-10">
            <h1 class="font-bold text-3xl text-center mb-3">
                Add a Task
            </h1>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="title" class="border border-gray-300 p-2 rounded-md"
                    :class="{ 'border-red-500': titleError.trim() !== '' }">
                <p class="text-red-500">{{ titleError }}</p>
                <label for="description">Description</label>
                <textarea id="description" v-model="description" class="border border-gray-300 p-2 rounded-md" rows="4"
                    :class="{ 'border-red-500': descriptionError.trim() !== '' }"></textarea>
                <p class="text-red-500">{{ descriptionError }}</p>
                <label for="status">Status</label>
                <select id="status" v-model="status" class="border border-gray-300 p-2 rounded-md"
                    :class="{ 'border-red-500': statusError.trim() !== '' }">
                    <option value="">Select a status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <p class="text-red-500">{{ statusError }}</p>
                <label for="due_date">Due Date</label>
                <input type="datetime-local" id="due_date" v-model="due_date"
                    class="border border-gray-300 p-2 rounded-md"
                    :class="{ 'border-red-500': dueDateError.trim() !== '' }">
                <p class="text-red-500">{{ dueDateError }}</p>
                <button class="bg-slate-700 text-white text-xl rounded-lg px-4 py-4 mt-3">Add Task</button>
            </form>
        </div>
        <RouterLink :to="{ name: 'task-list' }" class="text-slate-100 flex gap-2 my-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Go Back
        </RouterLink>
    </div>
</template>
