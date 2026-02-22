import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Hibu Performance Dashboard',
  description: 'Log in to your Hibu Performance Dashboard account',
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
