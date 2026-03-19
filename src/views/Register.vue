<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const loading = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

const form = ref({
  email: '',
  password: '',
  fullName: '',
  phone: '',
})

async function handleSubmit() {
  message.value = null
  if (!supabase) {
    message.value = {
      type: 'error',
      text: 'Registration is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
    }
    return
  }
  if (!form.value.email?.trim() || !form.value.password) {
    message.value = { type: 'error', text: 'Email and password are required.' }
    return
  }
  if (form.value.password.length < 6) {
    message.value = { type: 'error', text: 'Password must be at least 6 characters.' }
    return
  }

  loading.value = true
  try {
    const { data, error } = await supabase.auth.signUp({
      email: form.value.email.trim(),
      password: form.value.password,
      options: {
        data: {
          full_name: form.value.fullName.trim() || undefined,
          phone: form.value.phone.trim() || undefined,
        },
      },
    })

    if (error) throw error

    message.value = {
      type: 'success',
      text: 'Check your email for the confirmation link to complete registration.',
    }
    form.value = { email: '', password: '', fullName: '', phone: '' }
    setTimeout(() => router.push('/'), 3000)
  } catch (err: unknown) {
    const e = err as { message?: string }
    message.value = { type: 'error', text: e.message ?? 'Registration failed. Try again.' }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-page min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold mb-2">Member Registration</h1>
      <p class="text-slate-400 mb-6">Join the movement. Create your account.</p>

      <div
        v-if="!supabase"
        class="mb-6 rounded-lg border border-amber-500/50 bg-amber-500/10 px-4 py-3 text-amber-200 text-sm"
      >
        Registration requires Supabase. Copy <code class="rounded bg-slate-700 px-1">.env.example</code> to
        <code class="rounded bg-slate-700 px-1">.env</code> and add your project URL and anon key.
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="fullName" class="block text-sm font-medium text-slate-300 mb-1">Full name</label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            class="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-slate-300 mb-1">Email <span class="text-amber-400">*</span></label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-slate-300 mb-1">Password <span class="text-amber-400">*</span></label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="At least 6 characters"
          />
        </div>
        <div>
          <label for="phone" class="block text-sm font-medium text-slate-300 mb-1">Phone</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            placeholder="+254..."
          />
        </div>

        <div v-if="message" :class="message.type === 'error' ? 'text-red-400' : 'text-emerald-400'" class="text-sm">
          {{ message.text }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-lg bg-amber-600 px-4 py-3 font-semibold text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creating account…' : 'Register' }}
        </button>
      </form>

      <p class="mt-4 text-center text-slate-500 text-sm">
        Already have an account?
        <router-link to="/" class="text-amber-400 hover:underline">Back to home</router-link>
      </p>
    </div>
  </div>
</template>
