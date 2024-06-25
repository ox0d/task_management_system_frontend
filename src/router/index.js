import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TasksView from '../views/TasksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      children: [
        {
          path: '',
          name: 'task-list',
          component: () => import('../components/tasks/TaskList.vue')
        },
        {
          path: 'new', // we will have a new button on the task-list to add new tasks
          name: 'new-task',
          component: () => import('../components/tasks/NewTask.vue')
        },
        {
          path: ':id',
          props: true,
          name: 'task-details',
          component: () => import('../components/tasks/TaskDetails.vue')
        },
        {
          path: ':id/edit',
          props: true,
          name: 'edit-task',
          component: () => import('../components/tasks/EditTask.vue')
        }
        // {
        //   path: ':id/delete',
        //   props: true,
        //   name: 'delete-task',
        //   component: () => import('../components/tasks/DeleteTask.vue')
        // }
      ]
    }
  ]
})

export default router
