"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface LyricGroup {
  id: string
  lyrics: string[]
  startTime: number
  duration: number
}

const lyricGroups: LyricGroup[] = [
  {
    id: "groupA",
    lyrics: [
      "Placeholder line one of the song",
      "Another beautiful line here",
      "Third line with emotion",
      "Final line of first verse",
    ],
    startTime: 0,
    duration: 8000,
  },
  {
    id: "groupB",
    lyrics: [
      "Second verse placeholder text",
      "More meaningful words here",
      "Building up the chorus",
      "Emotional peak moment",
    ],
    startTime: 8000,
    duration: 8000,
  },
  {
    id: "groupC",
    lyrics: [
      "Bridge section placeholder",
      "Softer moment in the song",
      "Building back up again",
      "Preparing for the finale",
    ],
    startTime: 16000,
    duration: 8000,
  },
  {
    id: "groupD",
    lyrics: ["Final chorus placeholder", "Most powerful moment", "Climactic ending here", "Song fades to silence"],
    startTime: 24000,
    duration: 8000,
  },
]

export default function LyricAnimationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentGroup, setCurrentGroup] = useState<string | null>(null)
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const startAnimation = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)

      // Clear any existing timeouts
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
      timeoutRefs.current = []

      // Schedule each lyric group
      lyricGroups.forEach((group, groupIndex) => {
        const groupTimeout = setTimeout(() => {
          setCurrentGroup(group.id)
          setCurrentLyricIndex(0)

          // Animate through lyrics in this group
          group.lyrics.forEach((_, lyricIndex) => {
            const lyricTimeout = setTimeout(
              () => {
                setCurrentLyricIndex(lyricIndex)
              },
              lyricIndex * (group.duration / group.lyrics.length),
            )

            timeoutRefs.current.push(lyricTimeout)
          })

          // Clear current group after duration
          const clearTimeout = setTimeout(() => {
            if (groupIndex === lyricGroups.length - 1) {
              // Last group finished
              setCurrentGroup(null)
              setIsPlaying(false)
            }
          }, group.duration)

          timeoutRefs.current.push(groupTimeout)
        }, group.startTime)

        timeoutRefs.current.push(groupTimeout)
      })
    }
  }

  const stopAnimation = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setCurrentGroup(null)
    setCurrentLyricIndex(0)

    // Clear all timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }

  useEffect(() => {
    return () => {
      // Cleanup timeouts on unmount
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  const currentGroupData = lyricGroups.find((group) => group.id === currentGroup)

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <audio ref={audioRef} preload="metadata">
        <source src="/love.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Start/Stop Button */}
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
              className="relative flex flex-col items-center justify-center min-h-[600px]"
            >
              {/* Background Images - Layer behind lyrics */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* First background image - appears with first lyric */}
                {currentGroup === "groupA" && currentLyricIndex >= 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute z-10"
                  >
                    <Image
                      src="/1g1.png"
                      alt="First background"
                      width={720}
                      height={580}
                      className="rounded-lg"
                    />
                  </motion.div>
                )}

                {/* Second background image - appears with second lyric, layered over first */}
                {currentGroup === "groupA" && currentLyricIndex >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="absolute z-20"
                  >
                    <Image
                      src="/1g2.png"
                      alt="Second background"
                      width={720}
                      height={580}
                      className="rounded-lg"
                    />
                  </motion.div>
                )}
              </div>

              {/* Lyrics Section - Centered and in front */}
              <div className="relative z-30 flex items-end justify-center h-full pb-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${currentGroup}-${currentLyricIndex}`}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.8 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center px-8"
                  >
                    {currentGroupData.lyrics[currentLyricIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Heart Card - appears only during second group (groupB) */}
              {currentGroup === "groupB" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center z-25"
                >
                  <div className="bg-red-500 rounded-3xl p-8 shadow-2xl transform">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="text-white text-8xl"
                    >
                      ❤️
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        {isPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex justify-center space-x-4">
            {lyricGroups.map((group, index) => (
              <motion.div
                key={group.id}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  group.id === currentGroup ? "bg-black scale-125" : "bg-gray-300"
                }`}
                animate={{
                  scale: group.id === currentGroup ? 1.25 : 1,
                  backgroundColor: group.id === currentGroup ? "#000000" : "#d1d5db",
                }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Instructions */}
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center text-gray-600 max-w-2xl"
        >
          <p className="text-lg">
            Click the "Lost?" button to start the animated lyric experience. The typography will animate in sync with
            the music, transitioning seamlessly between different lyric groups.
          </p>
          <p className="text-sm mt-4 text-gray-400">Make sure to place your 'love.mp3' file in the public directory.</p>
        </motion.div>
      )}
    </div>
  )
}
