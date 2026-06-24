import { createVaporApp } from 'vue'
import App from './App.vue'
import avatarUrl from '@/assets/images/jeff/avatar.png'
import { applyCircularFavicon } from '@/utils/favicon'
import { revealWhenFontsReady } from '@/utils/fonts-ready'
import '@/assets/scss/main.scss'

void applyCircularFavicon(avatarUrl)

createVaporApp(App).mount('#app')
revealWhenFontsReady()
