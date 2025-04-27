import { useState, useEffect } from "react"

interface PlayButtonProps {
  size?: number
  onClick?: () => void
  className?: string
}

export default function PlayButton({ size = 64, onClick = () => {}, className = "" }: PlayButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center rounded-full transition-all 
        duration-300 hover:scale-105 active:scale-95 ${className} bg-sky-300/50
      `}
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="absolute inset-0 rounded-full bg-transparent backdrop-blur-md border-4 border-white shadow-xl"
        style={{
          boxShadow: "0 0 20px rgba(186, 230, 253, 0.5)",
        }}
      />
      
      <svg
        className="relative z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width={size/1.2}
        height={size/1.2}
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  )
}
