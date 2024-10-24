/**
 * Entry point of the application.
 * 
 * @module main
 */

// styles
import '@/assets/styles/settings.scss'
import '@/assets/styles/main.scss'

// Components
import App from './App.vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { Buffer } from 'buffer'
window.global = window;
window.Buffer = Buffer;
const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
    // Fix for Buffer not defined
    if (typeof window !== 'undefined') {
        window.Buffer = Buffer;
    } else if (typeof global !== 'undefined') {
        global.Buffer = Buffer;
    }
}


const httpLink = createHttpLink({
    uri: process.env.ROUTER_GRAPH,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

// Composables
import { createApp, provide, h } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp({
  /**
   * Setup function for the Vue application.
   * Provides the Apollo client to the application.
   */
  setup() {
      provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

registerPlugins(app)

app.mount('#app')
