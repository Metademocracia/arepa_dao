// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import inject from '@rollup/plugin-inject'

// Utilities
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig((userConfig) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const env = loadEnv(userConfig.mode, process.cwd(), '')

  const baseUrl = isProduction ? !env.BASE_URL ? "/" : env.BASE_URL : !env.VITE_BASE_URL ? "/" : env.VITE_BASE_URL

  return {
    base: baseUrl,
    plugins: [
      isProduction ? null : inject({ Buffer: ['buffer', 'Buffer'] }),
      vue({
        template: { transformAssetUrls }
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
        autoImport: true,
        // styles: { configFile: 'src/assets/styles/settings.scss' }
      }),
    ],
    define: {
      'process.env': {
        BASE_URL: baseUrl,
        API_URL: env.VITE_API_URL,
        // RECAPTCHA_SITE_KEY: env.VITE_RECAPTCHA_SITE_KEY,
        // DOMAIN_WEB: env.DOMAIN_WEB,
        NETWORK: env.VITE_NETWORK,
        CONTRACT_DAO: env.VITE_CONTRACT_DAO,
        CONTRACT_FACTORY: env.VITE_CONTRACT_FACTORY,
        ROUTER_WALLET: env.VITE_ROUTER_WALLET,
        ROUTER_EXPLORER_NEAR_HASH: env.VITE_ROUTER_EXPLORER_NEAR_HASH,
        URL_APIP_PRICE: env.VITE_URL_APIP_PRICE,
        ROUTER_RPC: env.VITE_ROUTER_RPC,
        ROUTER_GRAPH: env.VITE_ROUTER_GRAPH,
        ROUTER_GRAPH_DAOS: env.VITE_ROUTER_GRAPH_DAOS,
        CONTRACT_USDT: env.VITE_CONTRACT_USDT,
        CONTRACT_ARP: env.VITE_CONTRACT_ARP,
        CONTRACT_WBTC: env.VITE_CONTRACT_WBTC,
        CONTRACT_WETH: env.VITE_CONTRACT_WETH,
        VITE_ROUTER_API_UPLOAD_IMG: env.VITE_ROUTER_API_UPLOAD_IMG,
        KEY_IPFS: env.VITE_KEY_IPFS,
      },
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
    server: {
      port: 3002,
    },
    optimizeDeps: {
      include: ['buffer']
    },
  }
})
