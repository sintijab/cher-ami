export const Chip = ({ children, variant = 'outlined'}: { children: string, variant?: 'outlined' }) => {
  const variants = {
    outlined: 'rounded-md border border-slate-300 mr-1 py-0.5 px-2.5 text-center text-sm transition-all shadow-sm text-slate-600 cursor-pointer hover:bg-gray-100 focus:ring-4 focus:ring-gray-100'
  }
  return (
    <div className="flex items-center gap-2">
      <div className={variants[variant]}>
          {children}
      </div>
    </div>
  )
}