import { LoginForm } from '@/components/login-form'
import { ThemeProvider } from '@/components/theme-provider'

export default function LoginPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4 sm:p-6">
        <LoginForm />
      </main>
    </ThemeProvider>
  )
}
