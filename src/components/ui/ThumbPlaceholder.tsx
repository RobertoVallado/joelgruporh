interface ThumbPlaceholderProps {
  label: string
}

export default function ThumbPlaceholder({ label }: ThumbPlaceholderProps) {
  return (
    <div className="blog-thumb-placeholder" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21s-7-7.58-7-12a7 7 0 1 1 14 0c0 4.42-7 12-7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
