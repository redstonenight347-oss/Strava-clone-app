"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, signUp } from "@/lib/auth-client"

type Tab = "signin" | "signup"

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("signin")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard"


  const update = (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (tab === "signup") {
        const { error } = await signUp.email({
          name: form.name,
          email: form.email,
          password: form.password,
        })
        if (error) { setError(error.message ?? "Sign up failed"); return }
      } else {
        const { error } = await signIn.email({
          email: form.email,
          password: form.password,
        })
        if (error) { setError(error.message ?? "Sign in failed"); return }
      }

      router.push(callbackUrl)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full my-8 flex justify-center">
      <div className="border p-6 w-full max-w-sm flex flex-col gap-6">
        <h1 className="text-4xl text-stravaorange font-semibold">
          {tab === "signin" ? "Welcome back" : "Get started"}
        </h1>

        {/* Tab toggle */}
        <div className="flex border rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setTab("signin")}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              tab === "signin"
                ? "bg-stravaorange text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              tab === "signup"
                ? "bg-stravaorange text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* OAuth placeholder — wire up when ready */}
        <div className="w-full h-12 border rounded flex items-center justify-center text-sm text-gray-400">
          OAuth coming soon
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">
            {tab === "signin" ? "or sign in with email" : "or sign up with email"}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name — only shown on sign up */}
          {tab === "signup" && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                onChange={update("name")}
                required
                className="p-3 border rounded-md text-sm"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={update("email")}
              required
              className="p-3 border rounded-md text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={tab === "signup" ? "new-password" : "current-password"}
              placeholder="password123"
              value={form.password}
              onChange={update("password")}
              required
              minLength={8}
              className="p-3 border rounded-md text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-3 bg-stravaorange text-white font-semibold rounded-md disabled:opacity-50"
          >
            {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  )
}