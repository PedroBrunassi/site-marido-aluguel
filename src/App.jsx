import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Wrench, Clock, Shield, Star, ChevronDown, MapPin, Phone,
  Menu, X, Hammer, Settings,
  Home, Zap, Award, ThumbsUp,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const WA_LINK = 'https://wa.me/5543999446630?text=Olá!%20Vim%20pelo%20site%20e%20preciso%20de%20um%20serviço.'

/* ── Gear teeth path helper ────────────────────────────── */
function gearPath(outerR, innerR, numTeeth) {
  const pts = []
  const step = (2 * Math.PI) / numTeeth
  for (let i = 0; i < numTeeth; i++) {
    const a = i * step - Math.PI / 2
    pts.push([innerR * Math.cos(a - step * 0.22), innerR * Math.sin(a - step * 0.22)])
    pts.push([outerR * Math.cos(a - step * 0.13), outerR * Math.sin(a - step * 0.13)])
    pts.push([outerR * Math.cos(a + step * 0.13), outerR * Math.sin(a + step * 0.13)])
    pts.push([innerR * Math.cos(a + step * 0.22), innerR * Math.sin(a + step * 0.22)])
  }
  return 'M ' + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L ') + ' Z'
}

/* ── Magnetic effect (GSAP elastic) ───────────────────── */
function useMagneticEffect() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const els = [...document.querySelectorAll('.btn-magnetic')]
    const onMove = (e) => {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.28
      const y = (e.clientY - r.top - r.height / 2) * 0.28
      gsap.to(el, { x, y, scale: 1.04, duration: 0.35, ease: 'power2.out', overwrite: true })
    }
    const onLeave = (e) => {
      gsap.to(e.currentTarget, { x: 0, y: 0, scale: 1, duration: 0.85, ease: 'elastic.out(1, 0.38)', overwrite: true })
    }
    els.forEach(el => {
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => {
      els.forEach(el => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Serviços', 'Como Funciona', 'FAQ']

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 px-6 py-4 transition-all duration-300 ${
        menuOpen ? 'rounded-[2rem]' : 'rounded-full'
      }`}
      style={{
        transform: 'translateX(-50%)',
        width: 'min(92vw, 920px)',
        background: menuOpen
          ? 'rgba(242,240,233,0.98)'
          : scrolled
          ? 'rgba(242,240,233,0.85)'
          : 'rgba(242,240,233,0.08)',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        border: menuOpen || scrolled ? '1px solid rgba(46,64,54,0.15)' : '1px solid rgba(255,255,255,0.12)',
        boxShadow: menuOpen || scrolled ? '0 10px 40px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-bold text-lg tracking-tight transition-colors duration-300"
          style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            color: (scrolled || menuOpen) ? '#2E4036' : '#F2F0E9',
          }}
        >
          Marido de Aluguel
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-medium transition-all duration-200 hover:-translate-y-px"
              style={{
                fontFamily: 'Outfit, sans-serif',
                color: scrolled ? 'rgba(46,64,54,0.75)' : 'rgba(242,240,233,0.78)',
              }}
            >
              {item}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden bg-[#CC5833] text-white text-sm font-semibold px-5 py-2.5 rounded-full group btn-magnetic"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            <span className="relative z-10">Falar no WhatsApp</span>
            <span className="absolute inset-0 bg-[#b84a28] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1 transition-colors duration-300"
          style={{ color: (scrolled || menuOpen) ? '#2E4036' : '#F2F0E9' }}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-5 pb-2 flex flex-col gap-4 border-t pt-5"
          style={{ borderColor: 'rgba(46,64,54,0.12)' }}
        >
          {links.map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-[#2E4036]/80 hover:text-[#2E4036] text-sm font-semibold transition-all py-1"
              style={{ fontFamily: 'Outfit, sans-serif' }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#CC5833] hover:bg-[#b84a28] text-white text-sm font-semibold px-5 py-3.5 rounded-full text-center transition-colors mt-2"
            style={{ fontFamily: 'Outfit, sans-serif' }}
            onClick={() => setMenuOpen(false)}
          >
            Falar no WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-anim',
        { y: 56, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.3, stagger: 0.13, ease: 'power4.out', delay: 0.2,
          clearProps: 'scale',
        }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative flex items-center pt-32 pb-20 overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* BG Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1676311396794-f14881e9daaa?w=1920&q=85"
          alt="Ferramentas de marido de aluguel para reparos residenciais em Londrina"
          className="w-full h-full object-cover object-center"
          fetchpriority="high"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #1A1A1A 0%, rgba(46,64,54,0.78) 50%, rgba(46,64,54,0.3) 100%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          <p
            className="hero-anim text-[#CC5833] text-xs tracking-widest uppercase mb-6 flex items-center gap-2"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-[#CC5833]" />
            Atendimento disponível hoje em Londrina - PR e região
          </p>

          <h1 className="hero-anim leading-none">
            <span
              className="block text-3xl md:text-5xl lg:text-6xl font-bold text-[#F2F0E9]"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Seu lar merece o
            </span>
            <span
              className="block text-[clamp(4rem,14vw,9.5rem)] text-[#F2F0E9] leading-none -mt-1"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600 }}
            >
              Cuidado Certo.
            </span>
          </h1>

          <p
            className="hero-anim text-[#F2F0E9] text-lg md:text-xl mt-6 max-w-xl leading-relaxed"
            style={{ fontFamily: 'Outfit, sans-serif', textShadow: '0 1px 12px rgba(0,0,0,0.6)', fontWeight: 500 }}
          >
            Reparos residenciais com rapidez, profissional verificado e preço transparente.
          </p>

          <div className="hero-anim flex flex-col sm:flex-row gap-4 mt-8">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#CC5833] text-white font-semibold px-8 py-4 rounded-full text-base group btn-magnetic"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <WhatsAppIcon size={18} />
                Falar no WhatsApp — é grátis
              </span>
              <span className="absolute inset-0 bg-[#b84a28] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            </a>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center gap-2 border text-[#F2F0E9] font-medium px-8 py-4 rounded-full text-base transition-all duration-300 hover:-translate-y-px"
              style={{
                fontFamily: 'Outfit, sans-serif',
                borderColor: 'rgba(242,240,233,0.35)',
              }}
            >
              Ver como funciona <ChevronDown size={16} />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FEATURE CARD 1 — Diagnostic Shuffler (Rapidez)
════════════════════════════════════════════════════════════ */
function ShufflerCard() {
  const [items, setItems] = useState([
    { label: 'Sem esperar dias', sub: 'Agenda aberta' },
    { label: 'Orçamento rápido', sub: 'Via WhatsApp' },
    { label: 'Confirmação na hora', sub: 'Sem burocracia' },
  ])

  useEffect(() => {
    const id = setInterval(() => {
      setItems(prev => {
        const arr = [...prev]
        arr.unshift(arr.pop())
        return arr
      })
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="h-full bg-[#F2F0E9] rounded-[2rem] p-6 flex flex-col gap-4"
      style={{ border: '1px solid rgba(46,64,54,0.1)', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="w-10 h-10 rounded-2xl bg-[#CC5833]/12 flex items-center justify-center text-[#CC5833] mb-3">
            <Zap size={20} />
          </div>
          <h3
            className="text-[#2E4036] font-bold text-xl"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Rapidez
          </h3>
          <p
            className="text-[#1A1A1A]/55 text-sm mt-1"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Agenda aberta, sem burocracia.
          </p>
        </div>
        <span
          className="text-[#CC5833] text-xs font-mono bg-[#CC5833]/10 px-3 py-1.5 rounded-full flex-shrink-0"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          ● AO VIVO
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-4 py-3 rounded-2xl"
            style={{
              background: i === 0 ? '#2E4036' : 'transparent',
              opacity: i === 0 ? 1 : i === 1 ? 0.45 : 0.2,
              transform: `translateY(${i * 3}px)`,
              transition: 'all 0.48s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            <span
              className="font-medium text-sm"
              style={{ color: i === 0 ? '#F2F0E9' : '#1A1A1A' }}
            >
              {item.label}
            </span>
            <span
              className="text-xs"
              style={{
                color: i === 0 ? 'rgba(242,240,233,0.6)' : 'rgba(26,26,26,0.4)',
                fontFamily: 'IBM Plex Mono, monospace',
              }}
            >
              {item.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   FEATURE CARD 2 — Telemetry Typewriter (Confiança)
════════════════════════════════════════════════════════════ */
function TypewriterCard() {
  const messages = [
    'Profissional verificado com antecedentes confirmados...',
    'Avaliação 5 estrelas no último atendimento...',
    'Garantia de 30 dias em todos os serviços...',
    'Cliente avaliou: "Excelente serviço, super recomendo"...',
  ]
  const [msgIdx, setMsgIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIdx, setCharIdx] = useState(0)
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 520)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (charIdx < messages[msgIdx].length) {
      const t = setTimeout(() => {
        setDisplayed(p => p + messages[msgIdx][charIdx])
        setCharIdx(p => p + 1)
      }, 30)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed('')
      setCharIdx(0)
      setMsgIdx(p => (p + 1) % messages.length)
    }, 2400)
    return () => clearTimeout(t)
  }, [charIdx, msgIdx])

  return (
    <div
      className="h-full rounded-[2rem] p-6 flex flex-col gap-4"
      style={{ background: '#2E4036', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 2px 20px rgba(0,0,0,0.12)' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#CC5833] mb-3">
            <Shield size={20} />
          </div>
          <h3
            className="text-[#F2F0E9] font-bold text-xl"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Confiança
          </h3>
          <p
            className="text-[#F2F0E9]/55 text-sm mt-1"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Profissional verificado, avaliado de perto por cada cliente.
          </p>
        </div>
        <span
          className="text-[#F2F0E9]/55 text-xs font-mono flex items-center gap-1.5 flex-shrink-0"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot inline-block" />
          Live Feed
        </span>
      </div>

      <div
        className="rounded-2xl px-4 py-4 text-sm flex items-start"
        style={{
          background: 'rgba(0,0,0,0.25)',
          fontFamily: 'IBM Plex Mono, monospace',
          color: '#86efac',
          height: '88px',       /* fixed — prevents layout reflow when text grows */
          overflow: 'hidden',
        }}
      >
        <span>{displayed}</span>
        <span
          className="inline-block w-[2px] h-4 ml-0.5 -mb-0.5 flex-shrink-0"
          style={{
            background: '#CC5833',
            opacity: cursor ? 1 : 0,
            transition: 'opacity 0.1s',
          }}
        />
      </div>

      <div className="flex items-center gap-3 mt-auto pt-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} style={{ fill: '#CC5833', color: '#CC5833' }} />
          ))}
        </div>
        <span
          className="text-[#F2F0E9]/55 text-xs"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Garantia em todos os serviços
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   FEATURE CARD 3 — Cursor Protocol Scheduler (Preço Justo)
════════════════════════════════════════════════════════════ */
function SchedulerCard() {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
  const [activeDay, setActiveDay] = useState(null)
  const [pressing, setPressing] = useState(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let alive = true
    const run = () => {
      if (!alive) return
      setActiveDay(null); setSaved(false); setPressing(null)
      setTimeout(() => { if (alive) setPressing(3) }, 700)
      setTimeout(() => { if (alive) { setPressing(null); setActiveDay(3) } }, 1050)
      setTimeout(() => { if (alive) setSaved(true) }, 1700)
      setTimeout(() => {
        if (alive) { setActiveDay(null); setSaved(false) }
        setTimeout(run, 900)
      }, 3400)
    }
    run()
    return () => { alive = false }
  }, [])

  return (
    <div
      className="h-full bg-[#F2F0E9] rounded-[2rem] p-6 flex flex-col gap-4"
      style={{ border: '1px solid rgba(46,64,54,0.1)', boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
    >
      <div>
        <div className="w-10 h-10 rounded-2xl bg-[#CC5833]/12 flex items-center justify-center text-[#CC5833] mb-3">
          <Award size={20} />
        </div>
        <h3
          className="text-[#2E4036] font-bold text-xl"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Preço Justo
        </h3>
        <p
          className="text-[#1A1A1A]/55 text-sm mt-1"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Orçamento transparente antes de começar. Sem surpresas.
        </p>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <span
              className="text-[10px]"
              style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'rgba(26,26,26,0.35)' }}
            >
              {day.slice(0, 1)}
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-medium"
              style={{
                background: activeDay === i ? '#CC5833' : 'rgba(46,64,54,0.08)',
                color: activeDay === i ? '#fff' : '#2E4036',
                transform: pressing === i ? 'scale(0.92)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
              }}
            >
              {i + 9}
            </div>
          </div>
        ))}
      </div>

      <div
        className="w-full py-3 rounded-2xl text-sm font-semibold text-center"
        style={{
          background: saved ? '#2E4036' : 'rgba(46,64,54,0.08)',
          color: saved ? '#F2F0E9' : '#2E4036',
          transform: saved ? 'scale(0.985)' : 'scale(1)',
          transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {saved ? '✓ Agendado com sucesso' : 'Agendar visita'}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   FEATURES SECTION
════════════════════════════════════════════════════════════ */
function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feat-card',
        { y: 55, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.95, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="diferenciais" className="py-28 px-6 md:px-16 bg-[#F2F0E9]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span
            className="text-[#CC5833] text-xs tracking-widest uppercase"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Por que me escolher
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2E4036] mt-3 leading-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Três pilares que me
            <br />diferenciam
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="feat-card"><ShufflerCard /></div>
          <div className="feat-card"><TypewriterCard /></div>
          <div className="feat-card"><SchedulerCard /></div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   PHILOSOPHY
════════════════════════════════════════════════════════════ */
function Philosophy() {
  const ref = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.phil-line',
        { y: 65, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, stagger: 0.22, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 65%' },
        }
      )
    }, ref)

    const parallaxAnim = gsap.fromTo(
      parallaxRef.current,
      { y: -90 },
      {
        y: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    )

    return () => {
      ctx.revert()
      parallaxAnim.kill()
    }
  }, [])

  return (
    <section
      ref={ref}
      className="relative py-36 px-6 md:px-16 overflow-hidden"
      style={{ background: '#1A1A1A' }}
    >
      {/* Parallax wrapper — extra height absorbs the 180px movement range */}
      <div
        ref={parallaxRef}
        className="absolute left-0 right-0"
        style={{ top: -100, bottom: -100, willChange: 'transform' }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-right"
        />
      </div>
      {/* Overlay fixo — não se move com o parallax */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.95) 45%, rgba(10,10,10,0.80) 70%, rgba(10,10,10,0.55) 100%)', zIndex: 1 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p
          className="phil-line leading-none"
        >
          <span
            className="block text-5xl md:text-8xl text-[#F2F0E9]"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600 }}
          >
            Eu foco em:
          </span>
          <span
            className="block text-5xl md:text-8xl text-[#CC5833] mt-1"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600 }}
          >
            Transparência Total.
          </span>
        </p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   PROTOCOL — Sticky Stacking
════════════════════════════════════════════════════════════ */
/* CSS gear styles — applied inline so they scope to the SVG elements.
   transform-box:fill-box + transform-origin:center ensures the rotation
   is around each gear's own center regardless of SVG viewport.
   CSS animations run on the compositor thread (unlike SMIL animateTransform). */
const gearCW  = { animation: 'gear-cw 9s linear infinite',   transformBox: 'fill-box', transformOrigin: 'center', willChange: 'transform' }
const gearCCW = { animation: 'gear-ccw 5.4s linear infinite', transformBox: 'fill-box', transformOrigin: 'center', willChange: 'transform' }

function GearsAnim() {
  const bigPath   = gearPath(26, 17, 10)
  const smallPath = gearPath(14, 10, 6)

  return (
    <svg viewBox="-55 -55 110 110" className="w-36 h-36" aria-hidden="true">
      <defs>
        <radialGradient id="gearGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#CC5833" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#CC5833" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="36" fill="url(#gearGlow)" />
      {/* Big gear — CSS CW rotation (compositor thread) */}
      <g style={gearCW}>
        <path d={bigPath} fill="rgba(204,88,51,0.1)" stroke="#CC5833" strokeWidth="1.5" strokeLinejoin="round" />
        <circle r="7"   fill="none" stroke="#CC5833" strokeWidth="1.5" strokeDasharray="2 3" />
        <circle r="3.5" fill="#CC5833" />
      </g>
      <circle cx="-16.9" cy="-16.9" r="1.5" fill="rgba(46,64,54,0.25)" />
      {/* Small gear — CSS CCW rotation (compositor thread) */}
      <g transform="translate(-24,-24)">
        <g style={gearCCW}>
          <path d={smallPath} fill="rgba(46,64,54,0.1)" stroke="#2E4036" strokeWidth="1.5" strokeLinejoin="round" />
          <circle r="4.5" fill="none" stroke="#2E4036" strokeWidth="1.5" strokeDasharray="2 3" />
          <circle r="2"   fill="#2E4036" />
        </g>
      </g>
    </svg>
  )
}

function ScanAnim() {
  /*
   * Zero per-dot animations.
   * A moving SVG <mask> illuminates the circles as the beam sweeps —
   * identical visual result, only 2 animateMotion (translate) in the
   * whole component instead of 120 SMIL attribute animations.
   *
   * animateMotion (translation) is GPU-composited in all modern browsers.
   * SMIL `animate` on `r` (geometry) and `opacity` runs on the main
   * thread and was the primary source of scroll jank.
   */
  return (
    <svg viewBox="0 0 140 90" className="w-36 h-24" aria-hidden="true">
      <defs>
        {/* Mask gradient: bright strip, dim everywhere else */}
        <linearGradient id="scanMaskGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.1" />
          <stop offset="28%"  stopColor="white" stopOpacity="1" />
          <stop offset="72%"  stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0.1" />
        </linearGradient>
        {/* Mask: base dim layer + moving bright strip (synced with beam) */}
        <mask id="scanMask">
          <rect width="140" height="90" fill="white" opacity="0.18" />
          <rect x="0" y="-25" width="140" height="50" fill="url(#scanMaskGrad)">
            <animateMotion dur="2.4s" repeatCount="indefinite" path="M0,8 L0,83" calcMode="linear" />
          </rect>
        </mask>
        {/* Scan beam */}
        <linearGradient id="scanBeamGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#CC5833" stopOpacity="0" />
          <stop offset="40%"  stopColor="#CC5833" stopOpacity="0.9" />
          <stop offset="60%"  stopColor="#CC5833" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CC5833" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Static dots — lighting comes from the mask above */}
      <g mask="url(#scanMask)">
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={7 + c * 14} cy={8 + r * 15} r="1.8" fill="#CC5833" />
          ))
        )}
      </g>

      {/* Beam overlay */}
      <rect x="0" y="-8" width="140" height="16" fill="url(#scanBeamGrad)" rx="2" opacity="0.7">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M0,8 L0,83" calcMode="linear" />
      </rect>
    </svg>
  )
}


const protocolSteps = [
  {
    num: '01',
    title: 'Descreva o problema',
    desc: 'Envie uma foto ou mensagem pelo WhatsApp. Eu analiso o problema e respondo rapidamente com a proposta — sem burocracia.',
    anim: 'gears',
    tag: 'Diagnóstico',
  },
  {
    num: '02',
    title: 'Eu chego na sua porta',
    desc: 'Como especialista verificado, eu chego com ferramentas e materiais no horário combinado. Apresento o orçamento detalhado antes de qualquer serviço.',
    anim: 'scan',
    tag: 'Execução',
  },
]

function Protocol() {
  return (
    <section id="como-funciona" className="bg-[#F2F0E9]">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 pt-28 pb-10">
        <span
          className="text-[#CC5833] text-xs tracking-widest uppercase"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          Como funciona
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#2E4036] mt-3 max-w-xl leading-tight"
          style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
        >
          Dois passos para resolver qualquer problema
        </h2>
      </div>

      {/*
        Pure CSS `position: sticky` stack — handled entirely by the browser
        compositor. Zero scroll listeners, zero JS per frame: cannot jank.
      */}
      <div className="sticky-stack px-6 md:px-16">
        {protocolSteps.map((step, i) => (
          <div key={i} className="sticky-card" style={{ '--i': i, zIndex: i + 1 }}>
            <div className="protocol-stack-item">
              <div className="w-full px-8 md:px-14 py-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center max-w-7xl mx-auto">
                {/* Text side */}
                <div>
                  <span
                    className="inline-block text-xs text-[#CC5833] bg-[#CC5833]/10 px-3 py-1.5 rounded-full mb-5"
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                  >
                    {step.tag}
                  </span>
                  <h3
                    className="text-4xl md:text-6xl font-bold text-[#2E4036] leading-tight"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[#1A1A1A]/58 text-lg mt-5 leading-relaxed max-w-md"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {step.desc}
                  </p>
                  {i === protocolSteps.length - 1 && (
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-8 bg-[#CC5833] text-white font-semibold px-7 py-3.5 rounded-full relative overflow-hidden group btn-magnetic"
                      style={{ fontFamily: 'Outfit, sans-serif' }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <WhatsAppIcon size={17} /> Começar agora
                      </span>
                      <span className="absolute inset-0 bg-[#b84a28] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                    </a>
                  )}
                </div>

                {/* Animation side */}
                <div className="flex justify-center">
                  <div
                    className="w-60 h-60 md:w-72 md:h-72 rounded-[3rem] bg-white flex items-center justify-center"
                    style={{
                      border: '1px solid rgba(46,64,54,0.1)',
                      boxShadow: '0 20px 60px rgba(46,64,54,0.12)',
                    }}
                  >
                    {step.anim === 'gears' && <GearsAnim />}
                    {step.anim === 'scan' && <ScanAnim />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   SERVICES GRID
════════════════════════════════════════════════════════════ */
const services = [
  { icon: <Wrench size={22} />, name: 'Hidráulica', desc: 'Torneiras e sifões, caixas acopladas, troca de chuveiros e resistência e válvula hidra.' },
  { icon: <Zap size={22} />, name: 'Elétrica', desc: 'Tomadas, interruptores, disjuntores e iluminação.' },
  { icon: <Settings size={22} />, name: 'Montagem', desc: 'Suporte de TV, racks e estantes.' },
  { icon: <Home size={22} />, name: 'Pintura', desc: 'Ambientes internos, externos, texturas e acabamentos.' },
  { icon: <Hammer size={22} />, name: 'Pequenos Reparos', desc: 'Instalações de cortinas e persianas, varões, prateleiras, quadros e nicho.' },
  { icon: <ThumbsUp size={22} />, name: 'Ar-condicionado', desc: 'Instalação, limpeza e manutenção preventiva.' },
]

function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.srv-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="serviços" className="py-28 px-6 md:px-16 bg-[#2E4036]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span
            className="text-[#CC5833] text-xs tracking-widest uppercase"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Especialidades
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F2F0E9] mt-3 leading-tight"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            O que eu resolvo
            <br />para você
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <div
              key={i}
              className="srv-card rounded-[2rem] p-7 group cursor-default transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: 'rgba(242,240,233,0.05)',
                border: '1px solid rgba(242,240,233,0.09)',
              }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(204,88,51,0.18)', color: '#CC5833' }}
              >
                {svc.icon}
              </div>
              <h3
                className="text-[#F2F0E9] font-bold text-lg mb-2"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {svc.name}
              </h3>
              <p
                className="text-[#F2F0E9]/52 text-sm leading-relaxed"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#CC5833] text-white font-semibold px-8 py-4 rounded-full relative overflow-hidden group btn-magnetic"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <WhatsAppIcon size={18} /> Solicitar orçamento grátis
            </span>
            <span className="absolute inset-0 bg-[#b84a28] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS
════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS
════════════════════════════════════════════════════════════ */
const testimonials = [
  {
    name: 'Camila Ferreira',
    location: 'Gleba Palhano, Londrina - PR',
    stars: 5,
    text: 'Marcou para às 14h e chegou pontualmente. Resolveu o vazamento em menos de uma hora e deixou tudo limpo. Nota 10!',
    img: 'photo-1438761681033-6461ffad8d80',
  },
  {
    name: 'Roberto Alves',
    location: 'Centro, Londrina - PR',
    stars: 5,
    text: 'Precisei instalar dois ares-condicionados. Fez tudo no mesmo dia, com qualidade excelente.',
    img: 'photo-1500648767791-00dcc994a43e',
  },
  {
    name: 'Ana Paula Costa',
    location: 'Jardim Shangri-lá, Londrina - PR',
    stars: 5,
    text: 'Orçamento justo, profissional educado e serviço de primeira.',
    img: 'photo-1494790108377-be9c29b29330',
  },
]

function Testimonials() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.test-card',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-28 px-6 md:px-16 bg-[#2E4036]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-[#CC5833] text-xs tracking-widest uppercase"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Depoimentos reais
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#F2F0E9] mt-3"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            O que dizem do meu trabalho
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="test-card rounded-[2rem] p-7 flex flex-col gap-4"
              style={{ background: 'rgba(242,240,233,0.06)', border: '1px solid rgba(242,240,233,0.1)' }}
            >
              <div className="flex items-center gap-1">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={14} style={{ fill: '#CC5833', color: '#CC5833' }} />
                ))}
              </div>
              <p
                className="text-[#F2F0E9]/78 text-sm leading-relaxed flex-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: 'rgba(242,240,233,0.1)' }}>
                <div>
                  <p
                    className="text-[#F2F0E9] text-sm font-semibold"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[#F2F0E9]/45 text-xs flex items-center gap-1"
                    style={{ fontFamily: 'IBM Plex Mono, monospace' }}
                  >
                    <MapPin size={10} /> {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FAQ
════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: 'Você atende em Londrina - PR e região?',
    a: 'Atendo Londrina - PR e região. Informe seu endereço pelo WhatsApp e confirmo a disponibilidade rapidamente.',
  },
  {
    q: 'Qual o prazo mínimo para atendimento?',
    a: 'Para urgências, atendo no mesmo dia. Para serviços agendados, há disponibilidade em até 24 horas. Basta entrar em contato.',
  },
  {
    q: 'O profissional é devidamente verificado e confiável?',
    a: 'Sim. Sou profissional autônomo com checagem de antecedentes completa e vasta experiência prática. Minhas qualificações são avaliadas de perto por cada cliente.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'Eu visito seu imóvel, diagnostico o problema e apresento o orçamento detalhado antes de iniciar o serviço.',
  },
  {
    q: 'Qual a garantia dos serviços realizados?',
    a: 'Todos os serviços têm garantia mínima de 30 dias.',
  },
  {
    q: 'Quais formas de pagamento são aceitas?',
    a: 'Aceitamos PIX, dinheiro, cartão de débito e crédito.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-28 px-6 md:px-16 bg-[#F2F0E9]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-[#CC5833] text-xs tracking-widest uppercase"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            Dúvidas frequentes
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#2E4036] mt-3"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Perguntas & Respostas
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(46,64,54,0.12)' }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#2E4036]/3 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="font-semibold text-sm text-[#2E4036]"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className="flex-shrink-0 transition-transform duration-300 text-[#CC5833]"
                  style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>
              <div
                className="faq-body"
                style={{ maxHeight: open === i ? '240px' : '0' }}
              >
                <p
                  className="px-6 pt-1 pb-5 text-[#1A1A1A]/62 text-sm leading-relaxed"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   CTA BANNER
════════════════════════════════════════════════════════════ */
function CTABanner() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 72%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="py-28 px-6 md:px-16 relative overflow-hidden"
      style={{ background: '#CC5833' }}
    >
      <div className="absolute inset-0 opacity-15">
        <img
          src="https://images.unsplash.com/photo-1642749776312-aa42ce20c9f5?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p
          className="cta-content text-white/70 text-xs tracking-widest uppercase mb-5"
          style={{ fontFamily: 'IBM Plex Mono, monospace' }}
        >
          Pronto para começar?
        </p>
        <h2
          className="cta-content text-white leading-tight"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          Resolva hoje.
        </h2>
        <p
          className="cta-content text-white/75 text-lg mt-5 max-w-xl mx-auto"
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Envie uma mensagem agora. Resposta rápida e sem burocracia.
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-content inline-flex items-center gap-2.5 mt-8 text-[#CC5833] font-bold px-9 py-4 rounded-full relative overflow-hidden group btn-magnetic"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '1rem',
            background: '#FFFFFF',
            boxShadow: '0 10px 34px rgba(0,0,0,0.2)',
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <WhatsAppIcon size={19} />
            Falar no WhatsApp agora
          </span>
          <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
        </a>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      className="bg-[#0D0D0D] pt-16 pb-10 px-6 md:px-16"
      style={{ borderRadius: '4rem 4rem 0 0' }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="md:col-span-2">
            <h3
              className="text-[#F2F0E9] font-bold text-2xl mb-3"
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Marido de Aluguel
            </h3>
            <p
              className="text-[#F2F0E9]/45 text-sm leading-relaxed max-w-sm mb-6"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Reparos residenciais com rapidez, confiança e preço justo em Londrina - PR e região.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#CC5833] text-white text-sm font-semibold px-6 py-3 rounded-full relative overflow-hidden group btn-magnetic"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <WhatsAppIcon size={16} /> Falar no WhatsApp
              </span>
              <span className="absolute inset-0 bg-[#b84a28] translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
            </a>
          </div>

          <div>
            <h4
              className="text-[#F2F0E9]/55 text-xs uppercase tracking-widest mb-5"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              Navegação
            </h4>
            <ul className="flex flex-col gap-3">
              {['Serviços', 'Como Funciona', 'FAQ'].map(item => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="text-[#F2F0E9]/45 text-sm hover:text-[#F2F0E9] transition-all duration-200 hover:-translate-y-px inline-block"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="text-[#F2F0E9]/55 text-xs uppercase tracking-widest mb-5"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              Contato
            </h4>
            <ul className="flex flex-col gap-3">
              <li
                className="flex items-center gap-2 text-[#F2F0E9]/45 text-sm"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <Phone size={13} className="text-[#CC5833]" />
                (43) 99944-6630
              </li>
              <li
                className="flex items-center gap-2 text-[#F2F0E9]/45 text-sm"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <MapPin size={13} className="text-[#CC5833]" />
                Londrina - PR e região
              </li>
              <li
                className="flex items-center gap-2 text-[#F2F0E9]/45 text-sm"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <Clock size={13} className="text-[#CC5833]" />
                Seg–Sex 7h–20h · Sáb 8h–18h
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p
            className="text-[#F2F0E9]/65 text-xs"
            style={{ fontFamily: 'IBM Plex Mono, monospace' }}
          >
            © {new Date().getFullYear()} Marido de Aluguel — Todos os direitos reservados
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span
              className="text-[#F2F0E9]/35 text-xs font-mono"
              style={{ fontFamily: 'IBM Plex Mono, monospace' }}
            >
              SISTEMA OPERACIONAL — PR
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════
   FLOATING WHATSAPP
════════════════════════════════════════════════════════════ */
function FloatingWA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 450)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 text-white font-semibold px-5 py-3.5 rounded-full shadow-2xl btn-magnetic whatsapp-float"
      style={{
        background: '#25D366',
        fontFamily: 'Outfit, sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <WhatsAppIcon size={19} />
      <span className="hidden sm:inline text-sm">WhatsApp</span>
    </a>
  )
}

/* ═══════════════════════════════════════════════════════════
   APP ROOT
════════════════════════════════════════════════════════════ */
export default function App() {
  useMagneticEffect()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Services />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <FloatingWA />
    </>
  )
}
