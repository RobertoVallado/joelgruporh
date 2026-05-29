import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LazyImage from './LazyImage'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = (newDir: number) => {
    setDirection(newDir)
    setCurrent((prev) => (prev + newDir + images.length) % images.length)
  }

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  if (images.length === 0) return null

  return (
    <div className="image-gallery">
      <div className="gallery-track">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction > 0 ? 240 : -240, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -240 : 240, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="gallery-slide"
          >
            <LazyImage src={images[current]} alt={`${alt} — ${current + 1}`} />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <div className="gallery-controls">
          <button
            className="gallery-arrow"
            onClick={() => paginate(-1)}
            aria-label="Imagen anterior"
          >
            ‹
          </button>
          <div className="gallery-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot${i === current ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="gallery-arrow"
            onClick={() => paginate(1)}
            aria-label="Siguiente imagen"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
