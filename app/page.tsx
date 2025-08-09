"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LyricTiming {
  text: string
  startTime: number
  duration: number
  typewriterSpeed: number
  color: string
  sender?: "user" | "kaguya"
  img?: string // Optional image attachment
  sound?: string // Optional sound file
}

interface LyricGroup {
  id: string
  lyrics: LyricTiming[]
  startTime: number
  totalDuration: number
}

const lyricGroups: LyricGroup[] = [
  {
    id: "groupA",
    lyrics: [
      { text: "Ohh oh...", startTime: 0, duration: 4500, typewriterSpeed: 8, color: "#4ecdc4", sender: "user" },
      { text: "사랑으로❤️", startTime: 4500, duration: 4400, typewriterSpeed: 7, color: "#ffd700", sender: "user", sound: "miyuki1.mp3",},
      { text: "사랑으로❤️", startTime: 8900, duration: 3100, typewriterSpeed: 7, color: "#000000ff", sender: "user", sound: "miyuki2.mp3" },
    ],
    startTime: 0,
    totalDuration: 11500,
  },
  {
    id: "groupB",
    lyrics: [
      {
        text: "Matcha🍵",
        startTime: 0,
        duration: 2200,
        typewriterSpeed: 14,
        color: "#ffffffff",
        sender: "user",
      },
      {
        text: "What?",
        startTime: 2200,
        duration: 2300,
        typewriterSpeed: 16,
        color: "#34C759",
        sender: "kaguya",
      },
      {
        text: "and mango😭🥭",
        startTime: 4500,
        duration: 2000,
        typewriterSpeed: 13,
        color: "#007AFF",
        sender: "user",
      },
      {
        text: "😭😭",
        startTime: 6000,
        duration: 2000,
        typewriterSpeed: 13,
        color: "#007AFF",
        sender: "kaguya",
      },
      {
        text: "그 안에 작은",
        startTime: 6500,
        duration: 2500,
        typewriterSpeed: 7,
        color: "#34C759",
        sender: "user",
        img: "chat1.png",
      },
      {
        text: "so cute😭",
        startTime: 8900,
        duration: 2000,
        typewriterSpeed: 9,
        color: "#007AFF",
        sender: "kaguya",
      },
      {
        text: "keep sending pls:>",
        startTime: 9500,
        duration: 2000,
        typewriterSpeed: 9,
        color: "#007AFF",
        sender: "kaguya",
      },
      {
        text: "파도처럼😭🍵🥭",
        startTime: 9500,
        duration: 2500,
        typewriterSpeed: 7,
        color: "#34C759",
        sender: "user",
        img: "chat3.png",
      },
      {
        text: "😡😡😡",
        startTime: 11500,
        duration: 2000,
        typewriterSpeed: 5,
        color: "#007AFF",
        sender: "kaguya",
      },
    ],
    startTime: 11500,
    totalDuration: 15000,
  },
  {
    id: "groupC",
    lyrics: [
      { text: "부서지고", startTime: 0, duration: 4000, typewriterSpeed: 8, color: "#ffffffff" },
      {text: " 밀려와선", startTime: 4000, duration: 4200, typewriterSpeed: 8, color: "#ffffff",},
      { text: "네게", startTime: 8200, duration: 3200, typewriterSpeed: 8, color: "#ffffffff" },
      { text: "녹아내리고", startTime: 12000, duration: 4000, typewriterSpeed: 8, color: "#ffffff" },
      { text: "그제서야", startTime: 16000, duration: 3000, typewriterSpeed: 8, color: "#ffffff" },
      { text: "보이는 나의", startTime: 19000, duration: 3000, typewriterSpeed: 8, color: "#ffffff" },
      { text: "영원", startTime: 22000, duration: 3200, typewriterSpeed: 8, color: "#ffffff"}
    ],
    startTime: 26000,
    totalDuration: 27000,
  },
]

// Typewriter function:v
function TypewriterText({
  text,
  speed,
  color,
  onComplete,
}: { text: string; speed: number; color: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 1000 / speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block"
          style={{ color: color }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}

// Typewriter component buat inputfield
function InputTypewriter({ text, speed, onComplete }: { text: string; speed: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 1000 / speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className="text-gray-900">
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block text-blue-500"
        >
          |
        </motion.span>
      )}
    </span>
  )
}

export default function LyricAnimationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentGroup, setCurrentGroup] = useState<string | null>(null)
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1)
  const [sentMessages, setSentMessages] = useState<LyricTiming[]>([])
  const [currentInputText, setCurrentInputText] = useState("")
  const [isTypingInInput, setIsTypingInInput] = useState(false)
  const [currentTypingMessage, setCurrentTypingMessage] = useState<LyricTiming | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const soundRefs = useRef<{ [key: string]: HTMLAudioElement }>({})
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])
  const [showButton, setShowButton] = useState(true)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const [musicProgress, setMusicProgress] = useState(241) // Start at 4:01 (241 detik)
  const [isProgressRunning, setIsProgressRunning] = useState(false)

  // Auto-scroll di UI chat
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo({
        top: chatMessagesRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }
  useEffect(() => {
    if (sentMessages.length > 0) {
      // delay sblum autoscroll
      setTimeout(scrollToBottom, 100)
    }
  }, [sentMessages])

  // Music progress timer
  useEffect(() => {
    let progressInterval: NodeJS.Timeout

    if (isProgressRunning && currentGroup === "groupC") {
      progressInterval = setInterval(() => {
        setMusicProgress((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [isProgressRunning, currentGroup])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const playSound = (soundFile: string) => {
    if (!soundRefs.current[soundFile]) {
      soundRefs.current[soundFile] = new Audio(`/${soundFile}`)
    }
    const audio = soundRefs.current[soundFile]
    audio.currentTime = 0
    audio.play().catch(console.error)
  }

  const startAnimation = () => {
    setShowButton(false)
    setSentMessages([])
    setCurrentInputText("")
    setIsTypingInInput(false)
    setCurrentTypingMessage(null)

    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)

      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
      timeoutRefs.current = []

      lyricGroups.forEach((group, groupIndex) => {
        const groupTimeout = setTimeout(() => {
          setCurrentGroup(group.id)
          setCurrentLyricIndex(-1)

          if (group.id === "groupB") {
            const groupAMessages = lyricGroups.find((g) => g.id === "groupA")?.lyrics || []
            setSentMessages(groupAMessages)
          }

          group.lyrics.forEach((lyric, lyricIndex) => {
            const lyricTimeout = setTimeout(() => {
              setCurrentLyricIndex(lyricIndex)

              if (lyric.sound) {
                playSound(lyric.sound)
              }

              if (group.id === "groupB") {
                if (lyric.sender === "user") {
                  setCurrentTypingMessage(lyric)
                  setIsTypingInInput(true)
                  setCurrentInputText("")
                } else {
                  setSentMessages((prev) => [...prev, lyric])
                }
              }
            }, lyric.startTime)

            timeoutRefs.current.push(lyricTimeout)

            const hideLyricTimeout = setTimeout(() => {
              if (group.id === "groupB" && lyric.sender === "user") {
                // Mindahin Chat user dari input ke chat
                setIsTypingInInput(false)
                setCurrentInputText("")
                setCurrentTypingMessage(null)
              }
              setCurrentLyricIndex(-1)
            }, lyric.startTime + lyric.duration)

            timeoutRefs.current.push(hideLyricTimeout)
          })

          const clearGroupTimeout = setTimeout(() => {
            if (groupIndex === lyricGroups.length - 1) {
              setCurrentGroup(null)
              setIsPlaying(false)
              setSentMessages([])
            }
          }, group.totalDuration)

          timeoutRefs.current.push(clearGroupTimeout)

          if (group.id === "groupC") {
            const startProgressTimeout = setTimeout(() => {
              setIsProgressRunning(true)
            }, 500)
            timeoutRefs.current.push(startProgressTimeout)
          }
        }, group.startTime)

        timeoutRefs.current.push(groupTimeout)
      })
    }
  }

  const stopAnimation = () => {
    setShowButton(true)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

   
    Object.values(soundRefs.current).forEach((audio) => {
      audio.pause()
      audio.currentTime = 0
    })

    setIsPlaying(false)
    setCurrentGroup(null)
    setCurrentLyricIndex(-1)
    setSentMessages([])
    setCurrentInputText("")
    setIsTypingInInput(false)
    setCurrentTypingMessage(null)

    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []

    setMusicProgress(241)
    setIsProgressRunning(false)
  }

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
      Object.values(soundRefs.current).forEach((audio) => {
        audio.pause()
      })
    }
  }, [])

  const currentGroupData = lyricGroups.find((group) => group.id === currentGroup)
  const currentLyric = currentGroupData && currentLyricIndex >= 0 ? currentGroupData.lyrics[currentLyricIndex] : null


  const handleInputTypingComplete = () => {
    if (currentTypingMessage) {
      setSentMessages((prev) => [...prev, currentTypingMessage])
      setIsTypingInInput(false)
      setCurrentInputText("")
      setCurrentTypingMessage(null)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      animate={{
        backgroundColor: currentGroup === "groupC" ? "#0f0f0f" : "#ffffff",
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <audio ref={audioRef} preload="metadata">
        <source src="/love.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Start/Stop Button */}
      {showButton && (
        <div className="mb-12">
          <motion.button
            onClick={isPlaying ? stopAnimation : startAnimation}
            className={`px-12 py-6 text-2xl font-bold rounded-full transition-all duration-300 ${
              isPlaying ? "bg-red-500 hover:bg-red-600 text-white" : "bg-black hover:bg-gray-800 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isPlaying ? "Stop" : "Lost?"}
          </motion.button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full max-w-6xl mx-auto relative">
        <AnimatePresence mode="wait">
          {currentGroupData && (
            <motion.div
              key={currentGroup}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative flex flex-col items-center justify-center min-h-[700px]"
            >
              {/* Background Images Section */}
              <div className="relative flex items-center justify-center mb-8">
                {/* First background image - di grup A */}
                {currentGroup === "groupA" && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative z-10"
                    >
                      <Image src="/1g1.png" alt="First background" width={720} height={580} className="rounded-lg" />
                    </motion.div>

                    {/* Second background image - di grup A */}
                    {currentLyricIndex >= 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 1.6 }}
                        className="absolute z-20"
                      >
                        <Image src="/1g2.png" alt="Second background" width={720} height={580} className="rounded-lg" />
                      </motion.div>
                    )}

                    {/* Third lyric images - di grup A */}
                    {currentLyricIndex >= 1 && (
                      <>
                        {/* Left image - 170x284 */}
                        <motion.div
                          initial={{ opacity: 0, x: -200, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                          className="absolute z-30"
                          style={{
                            left: "10px",
                            top: "10px",
                          }}
                        >
                          <Image
                            src="/1g3.png"
                            alt="Left small image"
                            width={170}
                            height={284}
                            className="rounded-lg"
                          />
                        </motion.div>

                        {/* Right image - 226x331 */}
                        <motion.div
                          initial={{ opacity: 0, x: 200, scale: 0.8 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ duration: 1, ease: "easeOut", delay: 4.5 }}
                          className="absolute z-30"
                          style={{
                            right: "10px",
                            top: "10px",
                          }}
                        >
                          <Image
                            src="/1g4.png"
                            alt="Right medium image"
                            width={170}
                            height={284}
                            className="rounded-lg"
                          />
                        </motion.div>
                      </>
                    )}
                  </>
                )}

                {/* Spotify-like Music Player - (groupC) */}
                {currentGroup === "groupC" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative z-25 mx-auto"
                    style={{ width: "800px", height: "600px" }}
                  >
                    {/* Blurred Background */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <Image
                        src="/background.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        style={{ filter: "blur(2px) brightness(1.0)" }}
                      />
                      <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Main Content Container */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-12">
                      {/* Top Section - Album Art and Song Info */}
                      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                        {/* Album Art */}
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="relative"
                        >
                          <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                              src="/coverart.png"
                              alt="Love - wave to earth"
                              width={320}
                              height={320}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Subtle glow effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-green-500/20 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Song Info */}
                        <motion.div
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="text-center space-y-2"
                        >
                          <h1 className="text-4xl font-bold text-white">Love</h1>
                          <p className="text-xl text-gray-300">wave to earth</p>
                        </motion.div>

                        {/* Current Lyric Display */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                          className="text-center min-h-[80px] flex items-center justify-center"
                        >
                          <AnimatePresence mode="wait">
                            {currentLyric && (
                              <motion.div
                                key={`${currentGroup}-${currentLyricIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6 }}
                                className="text-2xl md:text-3xl font-medium text-center px-8 leading-relaxed"
                                style={{ color: currentLyric.color }}
                              >
                                <TypewriterText
                                  text={currentLyric.text}
                                  speed={currentLyric.typewriterSpeed}
                                  color={currentLyric.color}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </div>

                      {/* Bottom Section - Music Player Controls */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="space-y-8"
                      >
                        {/* Progress Bar - moved down with more spacing */}
                        <div className="space-y-3 mt-8">
                          <div className="flex items-center space-x-6">
                            <span className="text-base text-gray-400 w-14 text-right font-medium">
                              {formatTime(musicProgress)}
                            </span>
                            <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-green-500 rounded-full relative"
                                style={{ width: `${(musicProgress / 300) * 100}%` }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                              </motion.div>
                            </div>
                            <span className="text-base text-gray-400 w-14 font-medium">5:07</span>
                          </div>
                        </div>

                        {/* Player Controls - enlarged */}
                        <div className="flex items-center justify-center space-x-12">
                          {/* Previous */}
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6l-8.5 6z" />
                            </svg>
                          </button>

                          {/* Play/Pause - enlarged */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-18 h-18 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                          >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                            </svg>
                          </motion.button>

                          {/* Next */}
                          <button className="text-gray-400 hover:text-white transition-colors">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                            </svg>
                          </button>
                        </div>

                        {/* Additional Controls - enlarged */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            {/* Shuffle */}
                            <button className="text-gray-400 hover:text-green-500 transition-colors">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
                              </svg>
                            </button>
                            {/* Repeat */}
                            <button className="text-green-500">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex items-center space-x-6">
                            {/* Volume */}
                            <button className="text-gray-400 hover:text-white transition-colors">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                              </svg>
                            </button>
                            <div className="w-24 h-2 bg-gray-600 rounded-full">
                              <div className="w-3/4 h-full bg-white rounded-full" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Chat Interface -(groupB) */}
                {currentGroup === "groupB" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-25 mx-auto"
                    style={{ width: "375px" }}
                  >
                    {/* Chat App Container pake iPhone-like aspect ratio */}
                    <div
                      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
                      style={{
                        width: "375px",
                        height: "812px",
                      }}
                    >
                      {/* Chat Header */}
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src="/kaguya.png"
                            alt="Kaguya profile"
                            width={45}
                            height={45}
                            className="rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-base">kaguya</h3>
                          <p className="text-sm text-green-500">online</p>
                        </div>
                        <div className="flex space-x-3">
                          {/* Call icon */}
                          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                                fill="#6b7280"
                              />
                            </svg>
                          </div>
                          {/* Video call icon */}
                          <div className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer transition-colors">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <polygon points="23 7 16 12 23 17 23 7" fill="#6b7280" />
                              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" fill="#6b7280" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div
                        ref={chatMessagesRef}
                        className="bg-gray-50 p-6 space-y-4 overflow-y-auto"
                        style={{
                          height: "620px",
                          scrollbarWidth: "none" ,
                          msOverflowStyle: "none" ,
                        }}
                        css={{
                          "&::-webkit-scrollbar": {
                            display: "none" ,
                          },
                        }}
                      >
                        <style jsx>{`
                          div::-webkit-scrollbar {
                            display: none;
                          }
                        `}</style>
                        <AnimatePresence>
                          {sentMessages.map((message, index) => (
                            <motion.div
                              key={`sent-${index}`}
                              initial={{ opacity: 0, y: 20, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`px-4 py-3 rounded-2xl ${
                                  message.sender === "user"
                                    ? "bg-blue-500 text-white rounded-br-md"
                                    : "bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100"
                                }`}
                                style={{
                                  maxWidth: "280px",
                                  wordWrap: "break-word",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {/* Message Text */}
                                <p className="text-base leading-relaxed">
                                  {message.sender === "kaguya" &&
                                  currentLyric &&
                                  currentLyric.text === message.text &&
                                  currentLyricIndex >= 0 ? (
                                    <TypewriterText
                                      text={message.text}
                                      speed={message.typewriterSpeed || 14}
                                      color="#1f2937"
                                    />
                                  ) : (
                                    message.text
                                  )}
                                </p>

                                {/* Message Image */}
                                {message.img && (
                                  <div className="mt-2">
                                    <div className="relative overflow-hidden rounded-lg">
                                      <Image
                                        src={`/${message.img}`}
                                        alt="Chat attachment"
                                        width={240}
                                        height={180}
                                        className="object-cover w-full h-auto max-w-full"
                                        style={{
                                          maxWidth: "240px",
                                          maxHeight: "180px",
                                          width: "auto",
                                          height: "auto",
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {/* Typing Indicator buat Kaguya */}
                        {currentLyric &&
                          currentLyric.sender === "kaguya" &&
                          currentLyricIndex >= 0 &&
                          !sentMessages.find((msg) => msg.text === currentLyric.text) && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex justify-start"
                            >
                              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                                <div className="flex space-x-1">
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                  />
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                  />
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                      </div>

                      {/* Chat Input */}
                      <div className="bg-white px-6 py-4 border-t border-gray-200" style={{ height: "80px" }}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 bg-gray-100 rounded-full px-5 py-3 min-h-[48px] flex items-center">
                            {isTypingInInput && currentTypingMessage ? (
                              <InputTypewriter
                                text={currentTypingMessage.text}
                                speed={currentTypingMessage.typewriterSpeed || 14}
                                onComplete={handleInputTypingComplete}
                              />
                            ) : (
                              <p className="text-base text-gray-500">Message...</p>
                            )}
                          </div>
                          <motion.div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                              isTypingInInput ? "bg-blue-500 hover:bg-blue-600 cursor-pointer" : "bg-gray-300"
                            }`}
                            animate={{
                              scale: isTypingInInput ? [1, 1.1, 1] : 1,
                              backgroundColor: isTypingInInput ? "#3b82f6" : "#d1d5db",
                            }}
                            transition={{
                              scale: {
                                duration: 0.6,
                                repeat: isTypingInInput ? Number.POSITIVE_INFINITY : 0,
                              },
                            }}
                          >
                            {isTypingInInput ? (
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="white" />
                              </svg>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-400 rounded-full border-l-transparent"></div>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Lyrics Section - Below the images */}
              {currentGroup !== "groupB" && currentGroup !== "groupC" && (
                <div className="relative z-30 flex items-center justify-center min-h-[120px]">
                  <AnimatePresence mode="wait">
                    {currentLyric && (
                      <motion.div
                        key={`${currentGroup}-${currentLyricIndex}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-center px-8 leading-tight tracking-normal"
                        style={{
                          fontFamily: "'Noto Sans KR', 'Inter', 'Helvetica Neue', sans-serif",
                          fontWeight: 900,
                          color: currentLyric.color || "#4ec5bdff",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        <TypewriterText
                          text={currentLyric.text}
                          speed={currentLyric.typewriterSpeed}
                          color={currentLyric.color || "#4ec5bdff"}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Instructions */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-gray-600 max-w-2xl"
        >
          <p
            className="text-lg font-light"
            style={{
              fontFamily: "'Noto Sans KR', 'Inter', sans-serif",
              fontWeight: 600,
            }}
          >
            Made By Patrick
          </p>
          <p className="text-sm mt-4 text-gray-400">fuck romeo and juliet,i want what these mfs have.</p>
        </motion.div>
      )}
    </motion.div>
  )
}
