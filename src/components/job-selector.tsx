"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface JobSelectorProps {
  onJobSelect: (job: string) => void
}

const popularJobs = [
  "Desenvolvedor Front-end",
  "Desenvolvedor Back-end",
  "Product Manager",
  "Designer UX/UI",
  "Data Scientist",
  "DevOps Engineer",
  "Marketing Digital",
]

export default function JobSelector({ onJobSelect }: JobSelectorProps) {
  const [jobInput, setJobInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (jobInput.trim()) {
      onJobSelect(jobInput)
    }
  }

  const handleQuickSelect = (job: string) => {
    setJobInput(job)
    onJobSelect(job)
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <Card className="glass-card p-6 shadow-lg border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">Qual vaga você está buscando?</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={jobInput}
            onChange={(e) => setJobInput(e.target.value)}
            placeholder="Ex: Desenvolvedor Front-end"
            className="w-full bg-secondary/30 border-white/10"
          />
          <Button type="submit" className="w-full">
            Continuar
          </Button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">Vagas populares:</h3>
          <div className="flex flex-wrap gap-2">
            {popularJobs.map((job) => (
              <Button
                key={job}
                variant="outline"
                onClick={() => handleQuickSelect(job)}
                className="text-sm border-white/10 hover:bg-white/5"
              >
                {job}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
