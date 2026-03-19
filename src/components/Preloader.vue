<template>
  <Transition name="preloader">
    <div v-if="isLoading" class="preloader" aria-label="Loading" role="status">

      <!-- Grid texture -->
      <div class="preloader__grid" aria-hidden="true" />

      <!-- Radial glow -->
      <div class="preloader__glow" aria-hidden="true" />

      <!-- Main content -->
      <div class="preloader__body">

        <!-- Spinning emblem -->
        <div class="preloader__emblem">
          <div class="preloader__ring preloader__ring--outer" aria-hidden="true" />
          <div class="preloader__ring preloader__ring--inner" aria-hidden="true" />
          <div class="preloader__core">
            <span class="preloader__monogram">DK</span>
          </div>
        </div>

        <!-- Name & title -->
        <div class="preloader__identity">
          <p class="preloader__honorific">Honourable</p>
          <h1 class="preloader__name">David Keter</h1>

          <div class="preloader__rule" aria-hidden="true">
            <span class="preloader__rule-line" />
            <span class="preloader__rule-star">✦</span>
            <span class="preloader__rule-line" />
          </div>

          <p class="preloader__role">Member of Parliament · Emurua Dikirr Constituency</p>

          <div class="preloader__tags">
            <span class="preloader__tag preloader__tag--gold">UDA</span>
            <span class="preloader__tag-sep">·</span>
            <span class="preloader__tag preloader__tag--ghost">Narok County</span>
            <span class="preloader__tag-sep">·</span>
            <span class="preloader__tag preloader__tag--gold">2026</span>
          </div>
        </div>

        <!-- Progress -->
        <div class="preloader__progress-wrap" aria-hidden="true">
          <div class="preloader__track">
            <div class="preloader__bar" :style="{ width: progress + '%' }" />
          </div>
          <span class="preloader__pct">{{ progress }}%</span>
        </div>

        <!-- Slogan -->
        <div class="preloader__slogan">
          <span class="preloader__slogan-sw">Pamoja Tunaweza</span>
          <span class="preloader__slogan-en">Together We Can</span>
        </div>

      </div>

      <!-- Bottom watermark -->
      <p class="preloader__watermark" aria-hidden="true">
        UDA Nomination Campaign · Emurua Dikirr Constituency
      </p>

    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const progress  = ref(0)

onMounted(() => {
  const duration = 2800   // total preloader duration in ms
  const tick     = 28     // interval in ms
  const steps    = duration / tick
  let   step     = 0

  const timer = setInterval(() => {
    step++
    // ease-out curve — fast start, tapers near 100
    progress.value = Math.min(
      100,
      Math.round(100 * (1 - Math.pow(1 - step / steps, 2.6)))
    )
    if (progress.value >= 100) {
      clearInterval(timer)
      setTimeout(() => { isLoading.value = false }, 420)
    }
  }, tick)
})
</script>

<style scoped>
/* ── Variables ───────────────────────────────── */
.preloader {
  --yellow: #FDD835;
  --gold:   #F9A825;
  --bg:     #ffffff;
  --muted:  #6b6348;

  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* ── Texture ─────────────────────────────────── */
.preloader__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(253,216,53,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(253,216,53,.03) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
}

.preloader__glow {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 560px; height: 560px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(253,216,53,.08) 0%, transparent 68%);
  pointer-events: none;
  animation: glowPulse 3.2s ease-in-out infinite;
}
@keyframes glowPulse {
  0%,100% { transform: translate(-50%,-50%) scale(1);    opacity: 1; }
  50%      { transform: translate(-50%,-50%) scale(1.18); opacity: 0.5; }
}

/* ── Body ────────────────────────────────────── */
.preloader__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  animation: fadeUp 0.65s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Emblem ──────────────────────────────────── */
.preloader__emblem {
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
}

.preloader__ring--outer {
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    conic-gradient(from 0deg, var(--yellow), transparent 55%, var(--yellow)) border-box;
  border: 1.5px solid transparent;
  animation: spin 7s linear infinite;
}

.preloader__ring--inner {
  inset: 11px;
  background:
    linear-gradient(var(--bg), var(--bg)) padding-box,
    conic-gradient(from 180deg, var(--gold), transparent 50%, var(--gold)) border-box;
  border: 1px solid transparent;
  animation: spin 4.5s linear infinite reverse;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.preloader__core {
  position: relative;
  z-index: 1;
  width: 60px; height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--yellow), var(--gold));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 1px rgba(253,216,53,.25),
    0 6px 28px rgba(253,216,53,.35);
}

.preloader__monogram {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.65rem;
  color: #0a0a0a;
  letter-spacing: 0.04em;
  line-height: 1;
}

/* ── Identity ────────────────────────────────── */
.preloader__identity { text-align: center; }

.preloader__honorific {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--yellow);
  margin-bottom: 0.25rem;
  animation: fadeUp 0.65s ease 0.12s both;
}

.preloader__name {
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(2.8rem, 9vw, 4.8rem);
  color: #1a1a1a;
  line-height: 0.92;
  letter-spacing: 0.02em;
  animation: fadeUp 0.65s ease 0.22s both;
}

/* thin ruled divider */
.preloader__rule {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin: 0.7rem 0 0.55rem;
  animation: fadeUp 0.65s ease 0.32s both;
}
.preloader__rule-line {
  width: 52px; height: 1px;
  background: linear-gradient(90deg, transparent, var(--yellow), transparent);
}
.preloader__rule-star {
  color: var(--yellow);
  font-size: 0.52rem;
}

.preloader__role {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.8rem;
  animation: fadeUp 0.65s ease 0.38s both;
}

.preloader__tags {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  animation: fadeUp 0.65s ease 0.46s both;
}

.preloader__tag {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.18rem 0.55rem;
  border-radius: 3px;
}
.preloader__tag--gold {
  background: linear-gradient(135deg, var(--yellow), var(--gold));
  color: #0a0a0a;
}
.preloader__tag--ghost {
  background: rgba(253,216,53,.1);
  color: var(--yellow);
  border: 1px solid rgba(253,216,53,.22);
}
.preloader__tag-sep {
  color: rgba(0,0,0,.25);
  font-size: 0.65rem;
}

/* ── Progress ────────────────────────────────── */
.preloader__progress-wrap {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: min(320px, 78vw);
  animation: fadeUp 0.65s ease 0.54s both;
}

.preloader__track {
  flex: 1;
  height: 2px;
  background: rgba(0,0,0,.08);
  border-radius: 2px;
  overflow: hidden;
}

.preloader__bar {
  height: 100%;
  background: linear-gradient(90deg, var(--yellow), var(--gold));
  border-radius: 2px;
  transition: width 0.06s linear;
  box-shadow: 0 0 10px rgba(253,216,53,.55);
}

.preloader__pct {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--yellow);
  min-width: 2.4rem;
  text-align: right;
}

/* ── Slogan ──────────────────────────────────── */
.preloader__slogan {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.18rem;
  animation: fadeUp 0.65s ease 0.62s both;
}

.preloader__slogan-sw {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.45rem;
  color: var(--yellow);
  letter-spacing: 0.09em;
  line-height: 1;
}

.preloader__slogan-en {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 400;
  font-size: 0.64rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
}

/* ── Watermark ───────────────────────────────── */
.preloader__watermark {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(0,0,0,.18);
  white-space: nowrap;
  z-index: 1;
}

/* ── Vue Transition ──────────────────────────── */
.preloader-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.preloader-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
