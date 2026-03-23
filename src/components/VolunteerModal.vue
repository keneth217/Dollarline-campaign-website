<script setup lang="ts">
import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import { maskKenyanPhone, normalizePhoneKE } from '@/lib/phone'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const form = ref({ name: '', phone: '', email: '', agree: false })
const loading = ref(false)
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)

function close() {
  emit('update:modelValue', false)
}

function handleBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement).dataset.backdrop) close()
}

async function handleSubmit() {
  message.value = null
  const { name, phone, email, agree } = form.value
  if (!name?.trim()) {
    message.value = { type: 'error', text: 'Name is required.' }
    return
  }
  if (!agree) {
    message.value = { type: 'error', text: 'Please confirm you join the movement to make David Keter your next Emurua Dikirr Constituency M.P.' }
    return
  }

  const phoneRaw = (phone ?? '').trim()
  const phoneNormalized = phoneRaw ? normalizePhoneKE(phoneRaw) : null
  if (phoneRaw && !phoneNormalized) {
    message.value = {
      type: 'error',
      text: 'Enter a valid Kenyan number (e.g. 07XX XXX XXX or +2547XX XXX XXX).',
    }
    return
  }

  if (!supabase) {
    message.value = {
      type: 'error',
      text: 'Registration is not configured. Add Supabase credentials to .env.',
    }
    return
  }

  loading.value = true
  try {
    const { error } = await supabase.from('volunteers').insert({
      name: name.trim(),
      // Full normalized digits stored here — UNIQUE applies to this value, not the mask
      phone: phoneNormalized,
      email: (email ?? '').trim() ? (email ?? '').trim().toLowerCase() : null,
    })

    if (error) {
      if (error.code === '23505') {
        message.value = {
          type: 'error',
          text: phoneNormalized
            ? `This number is already registered (${maskKenyanPhone(phoneNormalized)}).`
            : 'This phone number is already registered.',
        }
        return
      }
      throw error
    }

    const thanks =
      phoneNormalized != null
        ? `Thank you! We have your details (${maskKenyanPhone(phoneNormalized)}).`
        : 'Thank you! We have received your details.'
    message.value = { type: 'success', text: thanks }
    form.value = { name: '', phone: '', email: '', agree: false }
    setTimeout(() => close(), 1500)
  } catch (err: unknown) {
    const e = err as { message?: string }
    message.value = { type: 'error', text: e.message ?? 'Something went wrong. Please try again.' }
  } finally {
    loading.value = false
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      message.value = null
      form.value = { name: '', phone: '', email: '', agree: false }
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <div
      v-show="modelValue"
      data-backdrop
      class="volunteer-modal-backdrop"
      @click="handleBackdropClick"
    >
      <div class="volunteer-modal" role="dialog" aria-labelledby="volunteer-modal-title" @click.stop>
        <div class="volunteer-modal__head">
          <h2 id="volunteer-modal-title" class="volunteer-modal__title">Join as a Volunteer</h2>
          <button
            type="button"
            class="volunteer-modal__close"
            aria-label="Close"
            @click="close"
          >
            ×
          </button>
        </div>
        <form @submit.prevent="handleSubmit" class="volunteer-modal__form">
          <div class="volunteer-modal__field">
            <label for="vol-name">Name <span class="required">*</span></label>
            <input
              id="vol-name"
              v-model="form.name"
              type="text"
              required
              placeholder="Your full name"
            />
          </div>
          <div class="volunteer-modal__field">
            <label for="vol-phone">Phone</label>
            <input
              id="vol-phone"
              v-model="form.phone"
              type="tel"
              placeholder="e.g. 07XX XXX XXX"
            />
          </div>
          <div class="volunteer-modal__field">
            <label for="vol-email">Email</label>
            <input
              id="vol-email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com (optional)"
            />
          </div>
          <div class="volunteer-modal__field volunteer-modal__field--checkbox">
            <label class="volunteer-modal__checkbox-label">
              <input
                v-model="form.agree"
                type="checkbox"
                class="volunteer-modal__checkbox"
              />
              <span>By submitting, you join the movement to make David Keter your next Emurua Dikirr Constituency M.P.</span>
            </label>
          </div>
          <p v-if="message" :class="message.type === 'error' ? 'volunteer-modal__msg--error' : 'volunteer-modal__msg--success'" class="volunteer-modal__msg">
            {{ message.text }}
          </p>
          <div class="volunteer-modal__actions">
            <button type="button" class="volunteer-modal__btn volunteer-modal__btn--secondary" @click="close">
              Cancel
            </button>
            <button type="submit" class="volunteer-modal__btn volunteer-modal__btn--primary" :disabled="loading">
              {{ loading ? 'Submitting…' : 'Register' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.volunteer-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.volunteer-modal {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  max-width: 420px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.volunteer-modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.volunteer-modal__title {
  margin: 0;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 1.35rem;
  letter-spacing: 0.02em;
  color: #1a1a1a;
}

.volunteer-modal__close {
  background: none;
  border: none;
  font-size: 1.75rem;
  line-height: 1;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  margin: -0.25rem;
  border-radius: 6px;
}
.volunteer-modal__close:hover {
  color: #1a1a1a;
  background: #f3f4f6;
}

.volunteer-modal__form {
  padding: 1.5rem;
}

.volunteer-modal__field {
  margin-bottom: 1rem;
}

.volunteer-modal__field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.35rem;
}

.volunteer-modal__field .required {
  color: #b91c1c;
}

.volunteer-modal__field input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}
.volunteer-modal__field input:focus {
  outline: none;
  border-color: #c9a227;
  box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15);
}

.volunteer-modal__field--checkbox {
  margin-top: 0.5rem;
}

.volunteer-modal__checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.volunteer-modal__checkbox {
  margin-top: 0.2rem;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.volunteer-modal__msg {
  font-size: 0.875rem;
  margin: 0.75rem 0 0;
  padding: 0.5rem 0;
}

.volunteer-modal__msg--error {
  color: #b91c1c;
}

.volunteer-modal__msg--success {
  color: #15803d;
}

.volunteer-modal__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.volunteer-modal__btn {
  flex: 1;
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.volunteer-modal__btn--secondary {
  background: #f3f4f6;
  color: #374151;
  border: none;
}
.volunteer-modal__btn--secondary:hover {
  background: #e5e7eb;
}

.volunteer-modal__btn--primary {
  background: #c9a227;
  color: #1a1a1a;
  border: none;
}
.volunteer-modal__btn--primary:hover:not(:disabled) {
  background: #b8860b;
}
.volunteer-modal__btn--primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
