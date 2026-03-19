<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)

const isHome = computed(() => route.path === '/')

// On home, links go to section anchors; elsewhere they go to /#section
const sectionLinks = [
  { label: 'Home', path: '/', hash: '#hero' },
  { label: 'Pillars', path: '/', hash: '#pillars' },
  { label: 'About', path: '/', hash: '#about' },
  { label: 'Testimonials', path: '/', hash: '#testimonials' },
  { label: 'Join', path: '/', hash: '#cta' },
  { label: 'News', path: '/', hash: '#news' },
]

function navTo(path: string, hash?: string) {
  open.value = false
  const url = hash ? `${path}${hash}` : path
  if (path === route.path && hash) {
    const el = document.querySelector(hash)
    el?.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.location.href = url
  }
}
</script>

<template>
  <nav class="navbar fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-14 items-center justify-between">
        <!-- Logo / Home -->
        <router-link to="/" class="flex items-center gap-2 text-gray-900 font-black hover:text-amber-600 transition-colors">
          <span class="text-amber-800">✦</span>
         HON. DAVID KETER DOLLARLINE
        </router-link>

        <!-- Desktop: section + page links -->
        <div class="hidden md:flex items-center gap-1">
          <template v-for="link in sectionLinks" :key="link.hash">
            <button
              v-if="isHome"
              type="button"
              class="nav-link px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm"
              @click="navTo(link.path, link.hash)"
            >
              {{ link.label }}
            </button>
            <a
              v-else
              :href="link.path + link.hash"
              class="nav-link px-3 py-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm"
            >
              {{ link.label }}
            </a>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button
          type="button"
          class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-show="open" class="md:hidden py-4 border-t border-slate-200">
        <div class="flex flex-col gap-1">
          <template v-for="link in sectionLinks" :key="link.hash">
            <button
              v-if="isHome"
              type="button"
              class="nav-link text-left px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100"
              @click="navTo(link.path, link.hash)"
            >
              {{ link.label }}
            </button>
            <a
              v-else
              :href="link.path + link.hash"
              class="px-4 py-2 rounded-md text-slate-600 hover:bg-slate-100"
              @click="open = false"
            >
              {{ link.label }}
            </a>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  text-decoration: none;
}
</style>
