// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // runtimeConfig: {
  //   apiEndpoint: process.env.API_BASE_URL
  // },
  // devtools: { enabled: true },
  modules: ['@pinia/nuxt',
    'shadcn-nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image',
    '@vesp/nuxt-fontawesome',
            ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  css: ['@/assets/css/main.css'],

})