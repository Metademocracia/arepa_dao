// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from "vue3-storage-secure";
import { nextTick } from 'vue'
import { APP_NAMES } from '@/plugins/dictionary';

const DEFAULT_TITLE = APP_NAMES.capitalize;

const routes = [
  // ? Default routes
  {
    path: '/',
    component: () => import('@/layouts/default-layout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/layouts/render-layout.vue'),
        meta: { head: `Home - ${DEFAULT_TITLE}` },
        children: [
          {
            path: '',
            name: 'Home',
            component: () => import('@/pages/home.vue'),
            meta: { head: `Home - ${DEFAULT_TITLE}` }
          },
          {
            path: 'members',
            name: 'Members',
            component: () => import('@/pages/members-new.vue'),
            meta: { head: `Miembros - ${DEFAULT_TITLE}` }
          },
          {
            path: 'proposals',
            name: 'Proposal',
            component: () => import('@/pages/proposals-new.vue'),
            meta: { head: `Propuestas - ${DEFAULT_TITLE}` }
          },
          {
            path: 'proposal-details',
            name: 'ProposalDetails',
            component: () => import('@/pages/proposal-details-new.vue'),
            meta: { head: `Detalle de propuesta - ${DEFAULT_TITLE}` }
          },
          {
            path: 'create-proposal',
            name: 'CreateProposal',
            component: () => import('@/pages/create-proposal-new.vue'),
            meta: { head: `Crear propuesta - ${DEFAULT_TITLE}` }
          },
          {
            path: 'members-meta',
            name: 'Members-meta',
            component: () => import('@/pages/members.vue'),
            meta: { head: `Miembros - ${DEFAULT_TITLE}` }
          },
          {
            path: 'proposals-meta',
            name: 'ProposalMeta',
            component: () => import('@/pages/proposals.vue'),
            meta: { head: `Propuestas - ${DEFAULT_TITLE}` }
          },
          {
            path: 'proposal-details-meta',
            name: 'ProposalDetailsMeta',
            component: () => import('@/pages/proposal-details.vue'),
            meta: { head: `Detalle de propuesta - ${DEFAULT_TITLE}` }
          },
          {
            path: 'create-proposal-meta',
            name: 'CreateProposalMeta',
            component: () => import('@/pages/create-proposal.vue'),
            meta: { head: `Crear propuesta - ${DEFAULT_TITLE}` }
          },
          {
            path: 'funds',
            name: 'Funds',
            component: () => import('@/pages/funds-new.vue'),
            meta: { head: `Fondos - ${DEFAULT_TITLE}` }
          },
          {
            path: 'funds-meta',
            name: 'FundsMeta',
            component: () => import('@/pages/funds.vue'),
            meta: { head: `Fondos - ${DEFAULT_TITLE}` }
          },
          {
            path: 'settings',
            name: 'Settings',
            component: () => import('@/pages/settings.vue'),
            meta: { head: `Configuración - ${DEFAULT_TITLE}` }
          },
          {
            path: 'general-settings',
            name: 'GeneralSettings',
            component: () => import('@/pages/general-settings.vue'),
            meta: { head: `Configuración general - ${DEFAULT_TITLE}` }
          },
          {
            path: 'policy-settings',
            name: 'PolicySettings',
            component: () => import('@/pages/policy-settings.vue'),
            meta: { head: `Configuración de políticas - ${DEFAULT_TITLE}` }
          },
        ]
      },
      {
        path: 'daos',
        name: 'Daos',
        component: () => import('@/pages/daos.vue'),
        meta: { head: `DAOs - ${DEFAULT_TITLE}` }
      },
      {
        path: 'pruebas',
        name: 'Pruebas',
        component: () => import('@/pages/pruebas.vue'),
        meta: { head: `Pruebas - ${DEFAULT_TITLE}` }
      },
      {
        path: 'my-daos',
        name: 'MyDaos',
        component: () => import('@/pages/my-daos.vue'),
        meta: { head: `Mis DAOs - ${DEFAULT_TITLE}` }
      },
      {
        path: 'create-dao',
        name: 'CreateDao',
        component: () => import('@/pages/create-dao.vue'),
        meta: { head: `Crear Budare - ${DEFAULT_TITLE}` }
      },
    ],
  },


  // ? No Authenticated routes
  {
    path: '/auth',
    component: () => import('@/layouts/auth-layout.vue'),
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "Error",
        component: () => import('@/pages/error.vue'),
        meta: { head: `Error - ${DEFAULT_TITLE}` }
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach((to, from, next) => {
  // go to wherever I'm going
  next()
})


router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  nextTick(() => {
    if (to.meta.head) document.title = to.meta.head.toString();
    else document.title = DEFAULT_TITLE;
  });
});

export default router
