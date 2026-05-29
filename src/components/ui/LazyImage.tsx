import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

export default function LazyImage({ src, alt, className, width, height, style }: LazyImageProps) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={className}
      effect="blur"
      width={width}
      height={height}
      style={style}
      wrapperProps={{ style: { display: 'block', width: '100%' } }}
    />
  )
}
