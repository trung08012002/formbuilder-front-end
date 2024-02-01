import { Toast } from '@atoms/Toast'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <Toast />
    </>
  )
}
