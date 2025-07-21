import { Trefoil } from 'ldrs/react'
import 'ldrs/react/Trefoil.css'

interface LoaderProps {
  show?: boolean;
}

export const Loader = ({ show = true }: LoaderProps) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500">
      <Trefoil
        size="100"
        stroke="8"
        strokeLength="0.15"
        bgOpacity="0.25"
        speed="1.4"
        color="white"
      />
    </div>
  )
}
