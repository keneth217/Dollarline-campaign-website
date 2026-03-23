<template>
  <div class="homepage">
    <Preloader />

    <!-- ─────────────────────────────────────────
         HERO SECTION
    ───────────────────────────────────────── -->
    <section id="hero" class="hero" ref="heroRef">

      <!-- Sides merge/fade toward center; center layer stacked on top -->
      <div class="hero__bg-images" aria-hidden="true">
        <div class="hero__bg-sides">
          <div class="hero__bg-img hero__bg-img--left" />
          <div class="hero__bg-img hero__bg-img--right" />
        </div>
        <div class="hero__bg-img hero__bg-img--center" />
      </div>

      <!-- Animated background layers -->
      <div class="hero__grid-overlay" aria-hidden="true" />
      <div class="hero__radial" aria-hidden="true" />
      <div class="hero__scan-line" aria-hidden="true" />

      <div class="hero__inner">

        <!-- LEFT COLUMN – Text -->
        <div class="hero__text" :class="{ 'hero__text--visible': heroVisible }">

          <div class="hero__badge">
            <span class="hero__badge-dot" />
            UDA Nomination Candidate · Emurua Dikirr Constituency 2026
          </div>
          <p class="hero__nomination-day">
            NOMINATION DAY — FRIDAY, 26TH MARCH 2026
          </p>

          <h1 class="hero__headline">
            <span class="hero__headline-top">PAMOJA</span>
            <span class="hero__headline-accent">TUNA<wbr/>WEZA</span>
            <span class="hero__headline-sub">Together We Can</span>
          </h1>

          <div class="hero__divider" aria-hidden="true">
            <span class="hero__divider-line" />
            <span class="hero__divider-star">✦</span>
            <span class="hero__divider-line" />
          </div>

          <p class="hero__body">
            A new dawn for <strong>Emurua Dikirr Constituency.</strong>
            Real leadership rooted in integrity, service, and the
            unyielding voice of our people.
          </p>

          <p class="hero__candidate-name">— Hon. DAVID KETER DOLLARLINE &nbsp;<span class="hero__party-tag">MP · UDA</span></p>

          <!-- CTAs -->
          <div class="hero__ctas">
            <button class="btn btn--primary" @click="showVolunteerModal = true">
              <span class="btn__icon">🤝</span>
              Join the Movement
            </button>
            <button class="btn btn--outline" @click="$emit('navigate', 'manifesto')">
              <span class="btn__icon">📋</span>
              Read Manifesto
            </button>
          </div>

          <!-- Stats row -->
          <div class="hero__stats">
            <div class="hero__stat" v-for="s in stats" :key="s.label">
              <span class="hero__stat-value">{{ s.value }}</span>
              <span class="hero__stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN – Candidate photo card -->
        <div class="hero__photo-col" :class="{ 'hero__photo-col--visible': heroVisible }">

          <div class="hero__photo-frame">
            <!-- Corner accents -->
            <span class="hero__corner hero__corner--tl" aria-hidden="true" />
            <span class="hero__corner hero__corner--tr" aria-hidden="true" />
            <span class="hero__corner hero__corner--bl" aria-hidden="true" />
            <span class="hero__corner hero__corner--br" aria-hidden="true" />

            <!-- Glow ring -->
            <div class="hero__glow-ring" aria-hidden="true" />

            <!-- Candidate photo -->
            <div class="hero__photo-placeholder">
              <img
                src="/dolar2.png"
                alt="Hon. David Keter Dollarline - UDA Nomination Candidate"
                class="hero__photo-img"
              />
              <p class="hero__photo-name">Hon. DAVID KETER DOLLARLINE</p>
              <p class="hero__photo-role">UDA Nomination Candidate</p>
            </div>

            <!-- UDA badge pill -->
            <div  aria-label="UDA Party">
           
        
            <!-- UDA logo – bottom right below aspirant image -->
            <img
              src="/uda_logo.png"
              alt="UDA Party Logo"
              class="hero__uda-logo"
            />
            </div>

            <!-- Floating info chips -->
            <div class="hero__chip hero__chip--left">
              <span>📍</span> Emurua Dikirr Constituency
            </div>
            <div class="hero__chip hero__chip--right">
              <span>⭐</span> {{ stats[0].value }}+ Supporters
            </div>
          </div>

        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll-hint" aria-hidden="true">
        <span class="hero__scroll-text">Scroll</span>
        <span class="hero__scroll-arrow">↓</span>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         5 PILLARS SECTION
    ───────────────────────────────────────── -->
    <section id="pillars" class="pillars" ref="pillarsRef">
      <div class="section-header" :class="{ 'section-header--visible': pillarsVisible }">
        <span class="section-overline">Our Promise</span>
        <h2 class="section-title">5 PILLARS OF <em>CHANGE</em></h2>
        <p class="section-body">
          Concrete, funded plans for the real challenges facing Emurua Dikirr Constituency residents.
        </p>
      </div>

      <div class="pillars__grid">
        <div
          v-for="(p, i) in pillars"
          :key="p.id"
          class="pillar-card"
          :class="{ 'pillar-card--visible': pillarsVisible }"
          :style="{ transitionDelay: `${i * 80}ms` }"
          @click="$emit('navigate', 'manifesto')"
        >
          <div class="pillar-card__icon">{{ p.icon }}</div>
          <h3 class="pillar-card__title">{{ p.title }}</h3>
          <p class="pillar-card__desc">{{ p.desc }}</p>
          <span class="pillar-card__cta">Explore →</span>
          <div class="pillar-card__accent" aria-hidden="true" />
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         ABOUT SNIPPET
    ───────────────────────────────────────── -->
    <section id="about" class="about-snap" ref="aboutRef">
      <div class="about-snap__inner" :class="{ 'about-snap__inner--visible': aboutVisible }">

        <div class="about-snap__text">
          <span class="section-overline">Who Am I</span>
          <h2 class="section-title section-title--left">A SON OF <em>EMURUA DIKIRR CONSTITUENCY</em></h2>

          <p class="about-snap__body">
            Born and raised in this constituency, I have witnessed firsthand the
            challenges our people face — youth unemployment, poor infrastructure,
            and inadequate healthcare in our villages.
          </p>
          <p class="about-snap__body">
            With a decade of community development experience, I am not a stranger to
            these problems — I live them every day. I am ready, with a clear plan, to
            create real change, including helping landowners secure their rightful
            title deeds to guarantee ownership, dignity, and economic empowerment.
          </p>
          <p class="about-snap__body">
            I am committed to advocating for the Kipsigis community, ensuring their
            voice is heard and their rights are protected. In the same spirit, I will
            stand with all those who have been displaced, fighting for fair
            compensation, justice, and restoration of dignity for every affected family.
          </p>

          <div class="about-snap__values">
            <div v-for="v in values" :key="v.title" class="value-chip">
              <span class="value-chip__icon">{{ v.icon }}</span>
              <div>
                <p class="value-chip__title">{{ v.title }}</p>
                <p class="value-chip__sub">{{ v.sub }}</p>
              </div>
            </div>
          </div>

          <button class="btn btn--outline btn--sm" @click="$emit('navigate', 'about')">
            Full Biography →
          </button>
        </div>

        <!-- decorative quote block -->
        <div class="about-snap__quote-block">
          <blockquote class="about-snap__quote">
            "Leadership is not a title. It is a covenant with the people who trust you."
          </blockquote>
          <div class="about-snap__quote-src">— Hon. DAVID KETER DOLLARLINE</div>

          <div class="about-snap__stat-stack">
            <div v-for="st in aboutStats" :key="st.label" class="about-stat">
              <span class="about-stat__val">{{ st.val }}</span>
              <span class="about-stat__lbl">{{ st.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         TESTIMONIALS
    ───────────────────────────────────────── -->
    <section id="testimonials" class="testimonials" ref="testimonialsRef">
      <div class="section-header" :class="{ 'section-header--visible': testimonialsVisible }">
        <span class="section-overline">The People Speak</span>
        <h2 class="section-title">VOICES FROM THE <em>COMMUNITY</em></h2>
      </div>

      <div class="testimonials__grid">
        <article
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="tcard"
          :class="{ 'tcard--visible': testimonialsVisible }"
          :style="{ transitionDelay: `${i * 100}ms` }"
        >
          <span class="tcard__quote-mark" aria-hidden="true">"</span>
          <p class="tcard__body">{{ t.quote }}</p>
          <div class="tcard__author">
            <div class="tcard__avatar">{{ t.name[0] }}</div>
            <div>
              <p class="tcard__name">{{ t.name }}</p>
              <p class="tcard__location">{{ t.location }}</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         CTA BANNER
    ───────────────────────────────────────── -->
    <section id="cta" class="cta-banner" ref="ctaRef">
      <div class="cta-banner__stripe" aria-hidden="true" />
      <div class="cta-banner__inner" :class="{ 'cta-banner__inner--visible': ctaVisible }">
        <h2 class="cta-banner__headline">
          READY TO BUILD A BETTER<br class="hidden sm:block" />
          <span>EMURUA DIKIRR CONSTITUENCY?</span>
        </h2>
        <p class="cta-banner__sub">
          Every voice matters. Every vote counts. Join thousands who believe in this vision.
        </p>
        <div class="cta-banner__actions">
          <button class="btn btn--dark" @click="showVolunteerModal = true">
            🤝 Volunteer With Us
          </button>
          <button class="btn btn--dark-outline" @click="$emit('navigate', 'contact')">
            📞 Contact Campaign
          </button>
        </div>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         NEWS PREVIEW
    ───────────────────────────────────────── -->
    <section id="news" class="news-preview" ref="newsRef">
      <div class="news-preview__head">
        <div :class="{ 'section-header--visible': newsVisible }">
          <span class="section-overline">Stay Updated</span>
          <h2 class="section-title section-title--left">LATEST <em>NEWS</em></h2>
        </div>
      </div>

      <div class="news-preview__grid">
        <article
          v-for="(post, i) in newsPreview"
          :key="post.id"
          class="ncard"
          :class="{ 'ncard--visible': newsVisible }"
          :style="{ transitionDelay: `${i * 90}ms` }"
        >
          <div class="ncard__thumb" :class="{ 'ncard__thumb--img': post.image }" :style="post.image ? {} : { background: post.bg }">
            <img v-if="post.image" :src="post.image" :alt="post.title" class="ncard__img" />
            <span v-else class="ncard__emoji">{{ post.emoji }}</span>
          </div>
          <div class="ncard__body">
            <div class="ncard__meta">
              <span class="ncard__cat">{{ post.category }}</span>
              <span class="ncard__date">{{ post.date }}</span>
            </div>
            <h3 class="ncard__title">{{ post.title }}</h3>
            <p v-if="post.excerpt" class="ncard__excerpt">{{ post.excerpt }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ─────────────────────────────────────────
         DONATE / MPESA STRIP
    ───────────────────────────────────────── -->
    <section id="donate" class="mpesa-strip">
      <div class="mpesa-strip__inner">
        <div class="mpesa-strip__left">
          <span class="mpesa-strip__icon">💚</span>
          <p class="mpesa-strip__label">Support the campaign by peaceful campaigning for Hon. David Keter</p>
        </div>
      </div>
    </section>

  <VolunteerModal v-model="showVolunteerModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import VolunteerModal from '@/components/VolunteerModal.vue'
import Preloader from '@/components/Preloader.vue'
import { supabase } from '@/lib/supabase'

const showVolunteerModal = ref(false)
const volunteerCount = ref(0)
/** Loaded from `campaign_stats.supporter_base` via RPC; fallback if RPC/table missing */
const supporterBase = ref(16897)

const stats = computed(() => [
  { value: (supporterBase.value + volunteerCount.value).toLocaleString(), label: 'Supporters' },
  { value: '4', label: 'Wards Reached' },
  { value: '5', label: 'Pillars of Change' },
  { value: '1', label: 'Clear Vision' },
])

// ── Section visibility (IntersectionObserver) ─────────────────────────────
const heroRef        = ref(null)
const pillarsRef     = ref(null)
const aboutRef       = ref(null)
const testimonialsRef = ref(null)
const ctaRef         = ref(null)
const newsRef        = ref(null)

const heroVisible         = ref(false)
const pillarsVisible      = ref(false)
const aboutVisible        = ref(false)
const testimonialsVisible = ref(false)
const ctaVisible          = ref(false)
const newsVisible         = ref(false)

let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        if (e.target === heroRef.value)         heroVisible.value = true
        if (e.target === pillarsRef.value)      pillarsVisible.value = true
        if (e.target === aboutRef.value)        aboutVisible.value = true
        if (e.target === testimonialsRef.value) testimonialsVisible.value = true
        if (e.target === ctaRef.value)          ctaVisible.value = true
        if (e.target === newsRef.value)         newsVisible.value = true
      })
    },
    { threshold: 0.12 }
  )

  ;[heroRef, pillarsRef, aboutRef, testimonialsRef, ctaRef, newsRef].forEach(r => {
    if (r.value) observer.observe(r.value)
  })

  // Hero fires immediately
  setTimeout(() => { heroVisible.value = true }, 100)

  // Supporter total = supporter_base (DB) + volunteer rows; refresh on new volunteer
  if (supabase) {
    const fetchStats = async () => {
      const { data, error } = await supabase.rpc('get_public_campaign_stats')
      let payload = data
      if (!error && typeof data === 'string') {
        try {
          payload = JSON.parse(data)
        } catch {
          payload = null
        }
      }
      if (!error && payload && typeof payload === 'object') {
        const row = /** @type {{ volunteer_count?: number; supporter_base?: number }} */ (payload)
        if (row.volunteer_count != null) volunteerCount.value = Number(row.volunteer_count)
        if (row.supporter_base != null) supporterBase.value = Number(row.supporter_base)
        return
      }
      // Legacy: RPC not deployed yet
      const { data: countOnly, error: countErr } = await supabase.rpc('get_volunteer_count')
      if (!countErr && countOnly != null) volunteerCount.value = Number(countOnly)
    }
    fetchStats()
    const channel = supabase
      .channel('volunteers-count')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'volunteers' }, fetchStats)
      .subscribe()
    onUnmounted(() => { supabase.removeChannel(channel) })
  }
})

onUnmounted(() => observer?.disconnect())

const pillars = [
  { id: 1, icon: '🎓', title: 'Education',                    desc: 'Bursaries for every needy student. Upgraded schools, more teachers, better learning facilities across all wards.' },
  { id: 2, icon: '🏡', title: 'Land Title Deeds for Every Family', desc: 'We will fast-track title deed issuance, reduce land disputes, and empower families through secure land ownership.' },
  { id: 3, icon: '🏥', title: 'Healthcare',                   desc: 'Stocked dispensaries, ambulance services, and free maternal care for every mother in our constituency.' },
  { id: 4, icon: '🛣️', title: 'Infrastructure',              desc: 'Murram roads, clean piped water, and solar street lights reaching every village and homestead.' },
  { id: 5, icon: '👨‍💼', title: 'Youth & Employment',           desc: 'Youth empowerment funds, vocational skills training, and employer partnerships to create real local jobs.' },
]

const values = [
  { icon: '⚖️', title: 'Integrity',      sub: 'Transparent governance' },
  { icon: '🤝', title: 'Service',        sub: 'People before politics' },
  { icon: '💡', title: 'Vision',         sub: 'Long-term planning' },
  { icon: '🗣️', title: 'Accountability', sub: 'Answerable to you' },
]

const aboutStats = [
  { val: '10+',  label: 'Years in community work' },
  { val: 'Ksh 10M+', label: 'Projects managed' },
  { val: '4',    label: 'Wards, one constituency' },
]

const testimonials = [
  {
    name: 'Mama Chebet',
    location: 'Kapsasian',
    quote: 'This candidate visits us in the village and actually listens. That is the kind of leader we need — one who knows our struggles from the inside.',
  },
  {
    name: 'Mzee Korir',
    location: 'Olkerin Ward',
    quote: 'I have watched many politicians come and go. But this one actually delivered on what he promised during his years of community work.',
  },
  {
    name: 'Jane Chemutai',
    location: 'Ololmasani',
    quote: 'Our youth need someone who fights for jobs and education. This manifesto speaks directly to us. We are behind this campaign 100%.',
  },
  {
    name: 'Baba Kiprono',
    location: 'Mogondo Ward',
    quote: 'We need a leader who will bring development to our ward and listen to our needs. This campaign gives us hope for real change.',
  },
]

const newsPreview = [
  {
    id: 1,
    image: '/elders.jpeg',
    category: 'Campaign',
    date: 'Saturday, 15th March 2026',
    title: 'Consulted with the elders before starting by-election campaign',
  },
  {
    id: 2,
    image: '/poster.jpeg',
    category: 'Event',
    date: '19, March, 2026',
    title: 'Interdenominational prayer service at Digir AGC',
  },
]
</script>

<style scoped>
/* ─────────────────────────────────────────────────
   CSS CUSTOM PROPERTIES
───────────────────────────────────────────────── */
.homepage {
  --uda-yellow:   #c9a227;
  --uda-gold:     #b8860b;
  --uda-black:    #ffffff;
  --uda-charcoal: #f5f5f5;
  --uda-gray:     #eeeeee;
  --uda-border:   rgba(0,0,0,0.08);
  --uda-text:     #1a1a1a;
  --uda-muted:    #5c5c5c;

  background: #f8f9fa;
  color: var(--uda-text);
  font-family: 'Barlow', system-ui, sans-serif;
  overflow-x: hidden;
}

/* ─────────────────────────────────────────────────
   SHARED UTILITIES
───────────────────────────────────────────────── */
.section-overline {
  display: inline-block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--uda-yellow);
  margin-bottom: 0.5rem;
}

.section-title {
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 0.95;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 1rem;
}
.section-title em { color: var(--uda-yellow); font-style: normal; }
.section-title--left { text-align: left; }

.section-body {
  color: var(--uda-muted);
  font-size: 1rem;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.65;
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.section-header--visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─────────────────────────────────────────────────
   BUTTONS
───────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  outline: none;
  white-space: nowrap;
}

.btn--primary {
  background: linear-gradient(135deg, #e6b82e, var(--uda-gold));
  color: #1a1a1a;
  padding: 0.9rem 2rem;
  box-shadow: 0 4px 24px rgba(201,162,39,0.25);
}
.btn--primary:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(201,162,39,0.35); }

.btn--outline {
  background: transparent;
  color: var(--uda-yellow);
  border: 2px solid var(--uda-yellow);
  padding: 0.85rem 1.8rem;
}
.btn--outline:hover { background: var(--uda-yellow); color: #1a1a1a; transform: translateY(-2px); }

.btn--sm { padding: 0.55rem 1.2rem; font-size: 0.78rem; }

.btn--dark {
  background: #1a1a1a;
  color: var(--uda-yellow);
  padding: 0.9rem 1.8rem;
  border: 2px solid transparent;
}
.btn--dark:hover { border-color: #1a1a1a; background: #2a2a2a; transform: translateY(-2px); }

.btn--dark-outline {
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  padding: 0.9rem 1.8rem;
}
.btn--dark-outline:hover { background: #1a1a1a; color: var(--uda-yellow); }

.btn__icon { font-size: 1rem; }

/* ─────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────── */
.hero {
  min-height: 100svh;
  background: #ffffff;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7rem 1.25rem 5rem;
  overflow: hidden;
}

/* Sides: two halves that fade toward the middle (merged / soft seam) */
.hero__bg-images {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  min-height: 100%;
}

.hero__bg-sides {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
}

.hero__bg-img {
  min-height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero__bg-img--left,
.hero__bg-img--right {
  flex: 1;
  min-width: 0;
  height: 100%;
  opacity: 0.26;
  filter: blur(1.25px) saturate(0.82) brightness(1.04);
}

/* Fade each side toward center so they blend where they meet */
.hero__bg-img--left {
  background-image: url('/1.jpeg');
  background-position: 58% 45%;
  margin-right: -12%;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.85) 38%,
    rgba(0, 0, 0, 0.35) 72%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.85) 38%,
    rgba(0, 0, 0, 0.35) 72%,
    rgba(0, 0, 0, 0) 100%
  );
}

.hero__bg-img--right {
  background-image: url('/3.jpeg');
  background-position: 48% 35%;
  margin-left: -12%;
  mask-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.85) 38%,
    rgba(0, 0, 0, 0.35) 72%,
    rgba(0, 0, 0, 0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.85) 38%,
    rgba(0, 0, 0, 0.35) 72%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Center portrait: sits above both sides (higher z-index), full clarity */
.hero__bg-img--center {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  transform: translateX(-50%);
  width: min(62%, 760px);
  z-index: 1;
  background-image: url('/dolar2.png');
  opacity: 0.58;
  filter: contrast(1.08) saturate(1.06);
  background-position: 50% 36%;
  background-size: cover;
  box-shadow:
    -32px 0 64px -20px rgba(255, 255, 255, 0.55),
    32px 0 64px -20px rgba(255, 255, 255, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.12);
  /* Soft vertical edges so it meets the faded sides cleanly */
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
}

@media (max-width: 768px) {
  .hero__bg-sides {
    display: none;
  }
  .hero__bg-img--center {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    max-width: none;
    transform: none;
    opacity: 0.3;
    background-position: 55% 35%;
    mask-image: none;
    -webkit-mask-image: none;
    box-shadow: none;
  }
}

/* background grid */
.hero__grid-overlay {
  position: absolute; inset: 0;
  z-index: 1;
  background-image:
    linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

/* radial glow — centered to lift the middle panel */
.hero__radial {
  position: absolute; inset: 0;
  z-index: 1;
  background: radial-gradient(ellipse 52% 58% at 50% 48%, rgba(201,162,39,.1) 0%, transparent 62%);
  pointer-events: none;
}

/* animated horizontal scan */
.hero__scan-line {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 1;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, var(--uda-yellow) 50%, transparent 100%);
  opacity: 0.35;
  animation: scanDown 8s ease-in-out infinite;
  pointer-events: none;
}
@keyframes scanDown {
  0%   { top: 0%; opacity: 0.35; }
  50%  { top: 100%; opacity: 0.1; }
  100% { top: 0%; opacity: 0.35; }
}

.hero__inner {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}
@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; gap: 3rem; }
}

/* ── Hero Text ── */
.hero__text {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.hero__text--visible { opacity: 1; transform: translateX(0); }

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(201,162,39,.12);
  border: 1px solid var(--uda-border);
  color: var(--uda-yellow);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.4rem 0.9rem;
  border-radius: 99px;
  margin-bottom: 1.6rem;
}
.hero__badge-dot {
  width: 6px; height: 6px;
  background: var(--uda-yellow);
  border-radius: 50%;
  animation: blink 1.6s ease-in-out infinite;
}
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

.hero__nomination-day {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--uda-yellow);
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.hero__headline {
  line-height: 0.88;
  margin-bottom: 1rem;
}
.hero__headline-top {
  display: block;
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(3.5rem, 10vw, 7.5rem);
  color: #1a1a1a;
}
.hero__headline-accent {
  display: block;
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(3.5rem, 10vw, 7.5rem);
  color: var(--uda-yellow);
  text-shadow: 0 0 40px rgba(201,162,39,.2);
}
.hero__headline-sub {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: clamp(0.85rem, 2.2vw, 1.2rem);
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--uda-muted);
  margin-top: 0.4rem;
}

.hero__divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1.6rem 0;
}
.hero__divider-line {
  flex: 1;
  max-width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--uda-yellow), transparent);
}
.hero__divider-star { color: var(--uda-yellow); font-size: 0.65rem; }

.hero__body {
  font-size: 1.05rem;
  line-height: 1.7;
  color: #4a4a4a;
  max-width: 500px;
  margin-bottom: 0.6rem;
}
.hero__body strong { color: #1a1a1a; }

.hero__candidate-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: var(--uda-yellow);
  letter-spacing: 0.06em;
  margin-bottom: 2rem;
}
.hero__party-tag {
  background: rgba(253,216,53,.15);
  border: 1px solid var(--uda-border);
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.hero__ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.hero__stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.hero__stat { text-align: left; }
.hero__stat-value {
  display: block;
  font-family: 'Bebas Neue', cursive;
  font-size: 2.2rem;
  color: var(--uda-yellow);
  line-height: 1;
}
.hero__stat-label {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--uda-muted);
}

/* ── Hero Photo ── */
.hero__photo-col {
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s;
}
.hero__photo-col--visible { opacity: 1; transform: translateX(0); }

.hero__photo-frame {
  position: relative;
  width: 480px;
  height: 600px;
  border-radius: 20px;
  overflow: visible;
}
@media (max-width: 480px) {
  .hero__photo-frame { width: 340px; height: 440px; }
}

.hero__glow-ring {
  position: absolute;
  inset: -18px;
  border-radius: 28px;
  background: radial-gradient(ellipse at center, rgba(201,162,39,.12), transparent 70%);
  pointer-events: none;
}

.hero__corner {
  position: absolute;
  width: 24px; height: 24px;
  border-color: rgba(201,162,39,0.6);
  border-style: solid;
  z-index: 3;
}
.hero__corner--tl { top: 0; left: 0; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
.hero__corner--tr { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
.hero__corner--bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
.hero__corner--br { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

.hero__photo-placeholder {
  width: 100%; height: 100%;
  border-radius: 18px;
  border: 2px solid var(--uda-border);
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}
.hero__photo-img {
  width: 100%;
  flex: 1;
  min-height: 16rem;
  object-fit: cover;
  border-radius: 14px;
  display: block;
}
.hero__photo-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.35rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1a1a1a;
}
.hero__photo-role {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--uda-yellow);
  margin-top: 0.25rem;
}
.hero__photo-hint {
  font-size: 0.68rem;
  color: #444;
  margin-top: 1rem;
  font-style: italic;
}

.hero__uda-badge {
  position: absolute;
  bottom: -16px; right: -16px;
  width: 76px; height: 76px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--uda-yellow), var(--uda-gold));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 24px rgba(253,216,53,.4);
  z-index: 4;
}
.hero__uda-badge-text {
  font-family: 'Bebas Neue', cursive;
  font-size: 1.5rem;
  color: #0a0a0a;
  line-height: 1;
}
.hero__uda-badge-year {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 0.6rem;
  color: #0a0a0a;
  letter-spacing: 0.1em;
}

.hero__uda-logo {
  position: absolute;
  bottom: 14px;
  right: 14px;
  width: 68px;
  height: auto;
  object-fit: contain;
  z-index: 3;
  border-radius: 6px;
}

.hero__chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  border: 1px solid var(--uda-border);
  color: var(--uda-text);
  font-family: 'Barlow Condensed', sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  z-index: 5;
  white-space: nowrap;
}
.hero__chip--left { bottom: 30px; left: -28px; }
.hero__chip--right { top: 20px; right: -28px; }
@media (max-width: 900px) {
  .hero__chip--left { left: 0; }
  .hero__chip--right { right: 0; }
}

/* scroll hint */
.hero__scroll-hint {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 2;
  animation: scrollBob 2.4s ease-in-out infinite;
}
.hero__scroll-text {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--uda-muted);
}
.hero__scroll-arrow { color: var(--uda-yellow); font-size: 0.9rem; }
@keyframes scrollBob {
  0%,100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(6px); }
}

/* ─────────────────────────────────────────────────
   PILLARS
───────────────────────────────────────────────── */
.pillars {
  background: var(--uda-charcoal);
  padding: 6rem 1.25rem;
  position: relative;
}
.pillars::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--uda-yellow), transparent);
}

.pillars__grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1.25rem;
}

.pillar-card {
  position: relative;
  background: #ffffff;
  border: 1px solid var(--uda-border);
  border-left: 3px solid var(--uda-yellow);
  border-radius: 12px;
  padding: 1.6rem 1.4rem;
  cursor: pointer;
  overflow: hidden;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.55s ease,
    transform 0.55s ease,
    border-color 0.2s,
    box-shadow 0.2s;
}
.pillar-card--visible { opacity: 1; transform: translateY(0); }
.pillar-card:hover {
  border-color: var(--uda-yellow);
  box-shadow: 0 8px 32px rgba(201,162,39,.15);
  transform: translateY(-4px) !important;
}

.pillar-card__icon { font-size: 2.2rem; margin-bottom: 0.85rem; line-height: 1; }

.pillar-card__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1a1a1a;
  margin-bottom: 0.6rem;
}

.pillar-card__desc {
  font-size: 0.82rem;
  line-height: 1.6;
  color: var(--uda-muted);
  margin-bottom: 1rem;
}

.pillar-card__cta {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--uda-yellow);
}

.pillar-card__accent {
  position: absolute;
  bottom: -20px; right: -20px;
  width: 80px; height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,162,39,.06) 0%, transparent 70%);
  pointer-events: none;
}

/* ─────────────────────────────────────────────────
   ABOUT SNAP
───────────────────────────────────────────────── */
.about-snap {
  background: #ffffff;
  padding: 6rem 1.25rem;
}

.about-snap__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.about-snap__inner--visible { opacity: 1; transform: translateY(0); }
@media (max-width: 760px) {
  .about-snap__inner { grid-template-columns: 1fr; gap: 3rem; }
}

.about-snap__body {
  font-size: 1rem;
  line-height: 1.75;
  color: #4a4a4a;
  margin-bottom: 0.85rem;
}
.about-snap__body strong { color: #1a1a1a; }

.about-snap__values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin: 1.75rem 0 2rem;
}

.value-chip {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  background: #f5f5f5;
  border: 1px solid var(--uda-border);
  border-radius: 8px;
  padding: 0.75rem;
}
.value-chip__icon { font-size: 1.3rem; flex-shrink: 0; }
.value-chip__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #1a1a1a;
  line-height: 1.2;
}
.value-chip__sub { font-size: 0.7rem; color: var(--uda-muted); margin-top: 0.1rem; }

/* quote block */
.about-snap__quote-block {
  background: #f8f9fa;
  border: 1px solid var(--uda-border);
  border-radius: 16px;
  padding: 2.5rem 2rem;
}

.about-snap__quote {
  font-family: 'Barlow', sans-serif;
  font-style: italic;
  font-size: 1.15rem;
  line-height: 1.7;
  color: #1a1a1a;
  border-left: 3px solid var(--uda-yellow);
  padding-left: 1.2rem;
  margin-bottom: 0.75rem;
}
.about-snap__quote::before { content: '\201C'; color: var(--uda-yellow); font-size: 1.5em; line-height: 0; vertical-align: -0.4em; margin-right: 0.15em; }

.about-snap__quote-src {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--uda-yellow);
  margin-bottom: 1.75rem;
}

.about-snap__stat-stack {
  display: flex;
  gap: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--uda-border);
  flex-wrap: wrap;
}

.about-stat__val {
  display: block;
  font-family: 'Bebas Neue', cursive;
  font-size: 1.9rem;
  color: var(--uda-yellow);
  line-height: 1;
}
.about-stat__lbl {
  font-size: 0.65rem;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--uda-muted);
}

/* ─────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────── */
.testimonials {
  background: var(--uda-charcoal);
  padding: 6rem 1.25rem;
  position: relative;
}
.testimonials::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--uda-yellow), transparent);
}

.testimonials__grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.tcard {
  background: #ffffff;
  border: 1px solid var(--uda-border);
  border-radius: 14px;
  padding: 2rem 1.6rem;
  position: relative;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.2s;
}
.tcard--visible { opacity: 1; transform: translateY(0); }
.tcard:hover { border-color: rgba(201,162,39,.35); }

.tcard__quote-mark {
  display: block;
  font-family: 'Bebas Neue', cursive;
  font-size: 3.5rem;
  color: var(--uda-yellow);
  line-height: 0.9;
  margin-bottom: 0.75rem;
  opacity: 0.8;
}

.tcard__body {
  font-size: 0.92rem;
  line-height: 1.7;
  color: #4a4a4a;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.tcard__author {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--uda-border);
}

.tcard__avatar {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: rgba(201,162,39,.15);
  border: 1px solid var(--uda-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bebas Neue', cursive;
  font-size: 1.1rem;
  color: var(--uda-yellow);
  flex-shrink: 0;
}

.tcard__name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  color: #1a1a1a;
  line-height: 1.2;
}
.tcard__location { font-size: 0.7rem; color: var(--uda-muted); }

/* ─────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────── */
.cta-banner {
  background: linear-gradient(135deg, var(--uda-yellow) 0%, var(--uda-gold) 100%);
  padding: 5rem 1.25rem;
  position: relative;
  overflow: hidden;
}

.cta-banner__stripe {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(0,0,0,0.06) 10px,
    rgba(0,0,0,0.06) 14px
  );
  pointer-events: none;
}

.cta-banner__inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.cta-banner__inner--visible { opacity: 1; transform: translateY(0); }

.cta-banner__headline {
  font-family: 'Bebas Neue', cursive;
  font-size: clamp(2rem, 6vw, 3.8rem);
  color: #1a1a1a;
  line-height: 1;
  margin-bottom: 1rem;
}
.cta-banner__headline span { color: #1a1a1a; }

.cta-banner__sub {
  font-size: 1.05rem;
  color: rgba(0,0,0,0.65);
  margin-bottom: 2.25rem;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cta-banner__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ─────────────────────────────────────────────────
   NEWS PREVIEW
───────────────────────────────────────────────── */
.news-preview {
  background: #ffffff;
  padding: 6rem 1.25rem;
}

.news-preview__head {
  max-width: 1100px;
  margin: 0 auto 3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.news-preview__grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.5rem;
}

.ncard {
  background: #f8f9fa;
  border: 1px solid var(--uda-border);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.55s ease, transform 0.55s ease, border-color 0.2s, box-shadow 0.2s;
}
.ncard--visible { opacity: 1; transform: translateY(0); }
.ncard:hover {
  border-color: rgba(201,162,39,.35);
  box-shadow: 0 8px 32px rgba(201,162,39,.1);
  transform: translateY(-4px) !important;
}

.ncard__thumb {
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.ncard__thumb--img {
  padding: 0;
}
.ncard__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.ncard__emoji { font-size: 4rem; line-height: 1; }

.ncard__body { padding: 1.5rem 1.5rem 1.75rem; }

.ncard__meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.65rem;
}

.ncard__cat {
  background: linear-gradient(135deg, var(--uda-yellow), var(--uda-gold));
  color: #1a1a1a;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
}

.ncard__date { font-size: 0.68rem; color: var(--uda-muted); font-family: 'Barlow Condensed', sans-serif; }

.ncard__title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 1.2rem;
  line-height: 1.25;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}
.ncard:hover .ncard__title { color: var(--uda-yellow); }

.ncard__excerpt { font-size: 0.8rem; line-height: 1.6; color: var(--uda-muted); }

/* ─────────────────────────────────────────────────
   MPESA STRIP
───────────────────────────────────────────────── */
.mpesa-strip {
  background: #eeeeee;
  border-top: 1px solid var(--uda-border);
  padding: 1.5rem 1.25rem;
}

.mpesa-strip__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.mpesa-strip__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.mpesa-strip__icon { font-size: 2rem; }

.mpesa-strip__label {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: #1a1a1a;
  line-height: 1.3;
  margin: 0;
}
</style>