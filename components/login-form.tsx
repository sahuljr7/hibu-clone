'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: custom * 0.1,
      },
    }),
  }

  return (
    <motion.div
      className="w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Card Container */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-blue-900/20 p-8 sm:p-10 backdrop-blur-lg bg-opacity-95 dark:bg-opacity/95 border border-white/20 dark:border-slate-800/50">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
          custom={0}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <span className="font-display">hibu</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
          </h1>
          <p className="text-sm text-muted-foreground mt-3">Performance Dashboard</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-4">
            Former Signpost software clients{' '}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
              login here
            </a>
            .
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <motion.div variants={itemVariants} custom={1}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all duration-200"
              />
            </div>
          </motion.div>

          {/* Password Input */}
          <motion.div variants={itemVariants} custom={2}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400 dark:text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-foreground placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs sm:text-sm transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          {/* Keep Logged In Checkbox */}
          <motion.div
            className="flex items-center"
            variants={itemVariants}
            custom={3}
          >
            <input
              type="checkbox"
              id="keep-logged-in"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-500 focus:ring-blue-500 cursor-pointer accent-blue-500"
            />
            <label htmlFor="keep-logged-in" className="ml-2 text-sm text-foreground cursor-pointer">
              Keep me logged in
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            variants={itemVariants}
            custom={4}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-blue-500 text-white font-bold rounded-lg transition-all duration-300 transform disabled:cursor-not-allowed relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12 group-hover:skew-x-0" />
            <span className="relative">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                'LOG IN'
              )}
            </span>
          </motion.button>
        </form>

        {/* Footer Links */}
        <motion.div
          className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-4 text-xs sm:text-sm"
          variants={itemVariants}
          custom={5}
        >
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            First Time User?
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Forgot password?
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            Log in help
          </a>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <a
            href="tel:1-877-237-6120"
            className="text-slate-600 dark:text-slate-400 hover:text-foreground transition-colors"
          >
            Hotline: 1-877-237-6120
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
