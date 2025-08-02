"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Instagram, Youtube, Music, Star, Award, Mic, Radio, Volume2, Menu, X } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function RagePortfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isPlaying, setIsPlaying] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Intersection Observer for section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative" ref={containerRef}>
      {/* Animated cursor follower - hidden on mobile */}
      <div
        className="fixed w-6 h-6 bg-red-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ease-out hidden md:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/50 border-b border-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-pulse" />
            <span className="font-orbitron font-bold text-lg sm:text-xl bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              RAGE
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["home", "about", "music", "latest", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`uppercase text-sm font-bold tracking-wider transition-colors ${activeSection === item ? "text-red-500" : "text-gray-400 hover:text-white"}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://instagram.com/himanshuyawale"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@himanshuyawale"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://rebrand.ly/REALLIFERAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Music className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/90 backdrop-blur-md border-t border-red-900/20"
            >
              <div className="px-4 py-4 space-y-4">
                {["home", "about", "music", "latest", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`block w-full text-left uppercase text-sm font-bold tracking-wider transition-colors ${activeSection === item ? "text-red-500" : "text-gray-400"}`}
                  >
                    {item}
                  </button>
                ))}
                <div className="flex items-center gap-4 pt-4 border-t border-red-900/20">
                  <a
                    href="https://instagram.com/himanshuyawale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://youtube.com/@himanshuyawale"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://rebrand.ly/REALLIFERAGE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Music className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/cat.jpg?height=1080&width=1920"
            alt="Urban street background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          {/* Main title with responsive sizing */}
          <motion.h1
            className="font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none tracking-tighter mb-4 sm:mb-6 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-300 drop-shadow-2xl">
              RAGE
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <p className=" mt-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-space font-bold tracking-[0.2em] sm:tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white mb-2 sm:mb-4">
              HIP-HOP ARTIST
            </p>
            <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wider mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto px-4">
              STRAIGHT FROM THE STREETS TO THE CHARTS
            </p>
          </motion.div>

          {/* Play button */}
          <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.8 }}
>
  <Button
    className="bg-red-600 px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl font-black"
    onClick={togglePlay}
  >
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      <span className="text-white font-orbitron tracking-[0.2em]">
        PLAY NOW
      </span>
    </div>
  </Button>
</motion.div>

         
        
        </div>

        {/* Decorative elements - hidden on mobile */}
        <div className="absolute top-10 left-10 opacity-20 hidden lg:block">
          <div className="w-20 h-20 border-2 border-red-500 rotate-45"></div>
        </div>
        <div className="absolute bottom-20 right-20 opacity-20 hidden lg:block">
          <div className="w-16 h-16 bg-red-500/20 rounded-full"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-center relative z-10">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
              <div className="w-2 h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-red-500 to-red-700 rounded-full transform rotate-12"></div>
              <h2 className="font-orbitron text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text tracking-wider transform -rotate-1">
                ARTIST BIO
              </h2>
            </div>

            {/* Image container */}
            <motion.div className="w-full" whileHover={{ scale: 1.02 }}>
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src="/cock.PNG?height=500&width=400"
                  alt="Artist portrait"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                {/* Bottom left icons */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="flex gap-2 sm:gap-3">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>

                {/* Top right tag */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6">
                  <div className="street-tag">
                    <span className="text-red-400 font-bold text-xs">REAL</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-6 sm:space-y-8">
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                I am RAGE — born in Amravati, forged in the fire of Pune Hip-Hop. My sound is not for the weak. It's
                raw, violent, and vulnerable. This isn't Desi Hip-Hop how you know it — this is the new blueprint. I
                don't just rap — I blend emotion and aggression, pain and power. Sometimes they scream. Sometimes they
                cry. But they never lie. That's RAGE. Unfiltered. Unapologetic. Unstoppable.
              </p>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                They don't know what to do with me because I'm not here to fit in — I'm here to redefine. I'm not trying
                to be next — I'm already beyond.
              </p>

              <div className="flex flex-wrap gap-4 sm:gap-6">
                {[
                  { icon: Mic, text: "Pune Hip-Hop", color: "text-red-400" },
                  { icon: Award, text: "No Label", color: "text-yellow-400" },
                  { icon: Radio, text: "New Blueprint", color: "text-green-400" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 sm:gap-3 street-tag"
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} />
                    <span className="text-white font-bold text-xs sm:text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Video Player Section */}
            <motion.div className="w-full" whileHover={{ scale: 1.02 }}>
              <div className="relative w-full aspect-video">
                <video autoPlay loop playsInline muted className="w-full h-full object-cover">
                  <source src="/pablo2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Custom Mute/Unmute Button */}
                <button
                  className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 p-2 bg-black/50 rounded-full text-white z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    const video = e.currentTarget.parentElement?.querySelector("video")
                    if (video) {
                      video.muted = !video.muted
                    }
                  }}
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </motion.div>

            {/* Performance images grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { src: "/paint.PNG?height=200&width=200", alt: "Performance image 1" },
                { src: "/band.JPG?height=200&width=200", alt: "Performance image 2" },
                { src: "/mice.jpg?height=200&width=200", alt: "Performance image 3" },
              ].map((image, i) => (
                <motion.div key={i} className="w-full" whileHover={{ scale: 1.05 }}>
                  <div className="relative aspect-square">
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Album Info Section */}
            <motion.div className="w-full" whileHover={{ scale: 1.02 }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="relative w-full sm:w-[160px] lg:w-[220px] flex-shrink-0">
                  <div
                    className="relative w-full aspect-square cursor-pointer"
                    onClick={() => window.open("https://www.youtube.com/watch?v=Prp52jH5slI", "_blank")}
                  >
                    <Image
                      src="https://img.youtube.com/vi/Prp52jH5slI/maxresdefault.jpg"
                      alt="Music video thumbnail"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-orbitron text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2">
                    WASH US IN THE BLOOD
                  </h3>
                  <p className="text-red-400 font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3">20,000+ Streams</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">EP • Released: 7th July 2025</p>
                  <p className="text-gray-400 text-xs sm:text-sm mb-2">Produced by: BABAR</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text tracking-wider mb-4 sm:mb-6 transform -rotate-1">
              DISCOGRAPHY
            </h2>
            <div className="flex justify-center items-center gap-4 sm:gap-6">
              <div className="w-16 sm:w-32 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-pulse" />
              <div className="w-16 sm:w-32 h-px bg-gradient-to-l from-transparent via-red-500 to-transparent"></div>
            </div>
            <p className="text-gray-400 text-base sm:text-lg mt-4 sm:mt-6 font-light">STRAIGHT FIRE TRACKS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[
              {
                title: "RAGE, BABAR - BLACKLISTED (Official Audio)",
                year: "2025",
                featured: true,
                youtubeUrl: "https://www.youtube.com/watch?v=Prp52jH5slI",
                thumbnail: "https://img.youtube.com/vi/Prp52jH5slI/maxresdefault.jpg",
              },
              {
                title: "RAGE, BABAR - Die Alone (WASH US IN THE BLOOD)",
                year: "2025",
                youtubeUrl: "https://www.youtube.com/watch?v=y4vUI6ZLXs0",
                thumbnail: "https://img.youtube.com/vi/y4vUI6ZLXs0/maxresdefault.jpg",
              },
              {
                title: "RAGE, BABAR - Pablo (Official Music Video)",
                year: "2025",
                youtubeUrl: "https://www.youtube.com/watch?v=ii30NVfJxJQ",
                thumbnail: "https://img.youtube.com/vi/ii30NVfJxJQ/maxresdefault.jpg",
              },
              {
                title: "RAGE, BABAR - SMOKE. (Official Audio)",
                year: "2024",
                youtubeUrl: "https://www.youtube.com/watch?v=lrx0frilKG0",
                thumbnail: "https://img.youtube.com/vi/lrx0frilKG0/maxresdefault.jpg",
              },
            ].map((track, i) => (
              <motion.div
                key={i}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col gap-2">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={track.thumbnail || "/placeholder.svg"}
                      alt={`${track.title} cover`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <a
                      href={track.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center bg-red-500 hover:bg-red-600"
                    >
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 ml-1 text-white" />
                    </a>
                    {track.featured && (
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <div className="px-2 py-1 bg-black/70 rounded">
                          <span className="text-red-400 font-bold text-xs">HOT</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-center px-2">
                    <h3 className="font-orbitron font-black text-white text-sm sm:text-base lg:text-lg line-clamp-2">
                      {track.title}
                    </h3>
                    <p className="text-red-400 text-xs sm:text-sm">{track.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Release Section */}
      <section id="latest" className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24 overflow-hidden">
        <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ y: y2 }}>
          <div className="font-orbitron text-[6rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] xl:text-[30rem] font-black text-red-500/5 leading-none tracking-wider select-none transform rotate-[-5deg]">
            WASH US
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text tracking-wider mb-4 sm:mb-6 lg:mb-8 transform -rotate-1 px-2">
              WASH US IN THE BLOOD
            </h2>
            <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6">
              <div className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-r from-transparent to-red-500"></div>
              <div className="relative">
                <Mic className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-500 animate-pulse" />
                <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-red-500/20 rounded-full animate-ping"></div>
              </div>
              <div className="w-12 sm:w-20 md:w-32 h-px bg-gradient-to-l from-transparent to-red-500"></div>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 font-light px-4">
            This debut is more than music — it's a statement. Each track is a punch to the system. Fully produced by my
            brother BABAR, WASH US IN THE BLOOD bleeds authenticity. No label. No cosign. Just truth.
          </p>

          <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <div className="font-orbitron text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] xl:text-[12rem] font-black text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-600 bg-clip-text mb-4 sm:mb-6 md:mb-8 lg:mb-12 hip-hop-text animate-glow-subtle">
              30K+
            </div>
            <p className="text-red-400 text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              RELEASED: 7TH JULY 2025
            </p>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8">
              PRODUCED BY: BABAR
            </p>

            <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 mb-6 sm:mb-8 md:mb-12 px-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-2 sm:w-8 sm:h-2 md:w-12 md:h-3 lg:w-16 lg:h-4 bg-gradient-to-r from-red-600 to-red-400 rounded-full animate-pulse transform rotate-1"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>

            {/* Platform Links Section */}
            <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 w-full max-w-4xl px-4">
                {[
                  {
                    name: "SPOTIFY",
                    icon: <Music className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                    url: "https://rebrand.ly/REALLIFERAGE",
                  },
                  {
                    name: "YOUTUBE",
                    icon: <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                    url: "https://youtube.com/@himanshuyawale",
                  },
                  {
                    name: "INSTAGRAM",
                    icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
                    url: "https://www.instagram.com/himanshuyawale",
                  },
                ].map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-black/50 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all group w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-red-400 group-hover:text-red-300 transition-colors flex-shrink-0">
                      {platform.icon}
                    </span>
                    <span className="font-orbitron font-bold text-red-400 group-hover:text-white transition-colors text-xs sm:text-sm md:text-base">
                      {platform.name}
                    </span>
                  </motion.a>
                ))}
              </div>

              <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-4">STREAM NOW ON ALL PLATFORMS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-orbitron text-3xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text tracking-wider mb-8 sm:mb-12 transform -rotate-1">
            CONTACT
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <motion.div className="street-card p-6 sm:p-8" whileHover={{ y: -5 }}>
              <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                FOR BOOKINGS & PRESS
              </h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Reach out directly. No middlemen. No games.
              </p>
              <p className="text-red-400 font-bold text-sm sm:text-base">ripmyzoeokay@gmail.com</p>
            </motion.div>

            <motion.div className="street-card p-6 sm:p-8" whileHover={{ y: -5 }}>
              <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">LOCATION</h3>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">Based in the heart of Indian Hip-Hop</p>
              <p className="text-red-400 font-bold text-sm sm:text-base">📍 Pune, India</p>
            </motion.div>
          </div>

          <p className="text-gray-400 text-base sm:text-lg px-4">
            For interviews, collaborations, or press inquiries — hit me up directly.
          </p>
        </div>
      </section>

      {/* Social Links */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text tracking-wider mb-8 sm:mb-12 md:mb-16 lg:mb-20 transform -rotate-1 px-2">
            STAY CONNECTED
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-center items-center mb-8 sm:mb-12 md:mb-16">
            {[
              {
                icon: Instagram,
                label: "INSTAGRAM",
                handle: "@himanshuyawale",
                url: "https://instagram.com/himanshuyawale",
              },
              {
                icon: Youtube,
                label: "YOUTUBE",
                handle: "youtube.com/@himanshuyawale",
                url: "https://youtube.com/@himanshuyawale",
              },
              {
                icon: Music,
                label: "SPOTIFY",
                handle: "RAGE on Spotify",
                url: "https://rebrand.ly/REALLIFERAGE",
              },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center w-full sm:w-auto max-w-[200px]"
                whileHover={{ scale: 1.05 }}
              >
                <Button className="street-button w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-all duration-500">
                  <social.icon className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                </Button>
                <p className="text-gray-400 font-space text-xs sm:text-sm tracking-wider mb-1 text-center">
                  {social.label}
                </p>
                <p className="text-red-400 font-bold text-xs sm:text-sm text-center break-all">{social.handle}</p>
              </motion.a>
            ))}
          </div>

          <motion.div className="street-card p-4 sm:p-6 md:p-8 max-w-2xl mx-auto" whileHover={{ y: -5 }}>
            <p className="text-gray-400 font-light text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
              Follow for exclusive drops, behind-the-scenes content, and real talk from the streets. This is where the
              magic happens.
            </p>
            <div className="text-gray-600 text-xs sm:text-sm">
              © 2024 RAGE. Born in Amravati. Forged in Pune. Unfiltered. Unapologetic. Unstoppable.
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
