import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'px-6 py-3 text-xs tracking-widest uppercase transition-all duration-200 font-semibold'

  const variants = {
    primary: 'bg-[#C65427] text-white hover:opacity-90',
    secondary: 'border border-[#C65427] text-[#C65427] hover:bg-[#C65427] hover:text-white',
    ghost: 'text-[#C65427] hover:underline',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      style={{ fontFamily: 'Nunito Sans, sans-serif' }}
      {...props}
    >
      {children}
    </button>
  )
}