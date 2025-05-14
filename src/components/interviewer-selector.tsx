"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface Interviewer {
  id: string
  name: string
  type: string
  description: string
  color: string
  personality: string
}

interface InterviewerSelectorProps {
  onInterviewerSelect: (interviewer: Interviewer) => void
}

const interviewers: Interviewer[] = [
  {
    id: "friendly",
    name: "Ana",
    type: "Fácil/Amigável",
    description: "Entrevistadora simpática que ajuda você a se sentir confortável e confiante.",
    color: "interviewer-friendly",
    personality:
      "Sou uma recrutadora amigável que busca destacar seus pontos fortes e potencial. Farei perguntas de maneira acolhedora e darei dicas positivas para melhorar suas respostas.",
  },
  {
    id: "moderate",
    name: "Bruno",
    type: "Moderado/Sincero",
    description: "Profissional equilibrado que faz perguntas realistas e fornece feedback construtivo.",
    color: "interviewer-moderate",
    personality:
      "Sou um recrutador experiente que valoriza a honestidade. Farei perguntas diretas e darei feedback sincero sobre seus pontos fortes e áreas a melhorar.",
  },
  {
    id: "technical",
    name: "Carla",
    type: "Difícil/Técnico",
    description: "Especialista focada em competências técnicas com perguntas desafiadoras.",
    color: "interviewer-technical",
    personality:
      "Sou uma especialista técnica da área. Farei perguntas avançadas e específicas para avaliar sua expertise e profundidade de conhecimento no campo.",
  },
  {
    id: "critical",
    name: "Diego",
    type: "Difícil/Crítico",
    description: "Entrevistador rigoroso que testa sua capacidade de lidar com pressão e críticas.",
    color: "interviewer-critical",
    personality:
      "Sou um recrutador exigente e crítico. Desafiarei suas respostas, farei perguntas difíceis e testarei como você lida com situações de pressão e feedback negativo.",
  },
  {
    id: "bitter",
    name: "Elena",
    type: "Amargurada/Freudiana",
    description: "Entrevistadora peculiar que analisa tudo através de uma lente psicanalítica forçada.",
    color: "interviewer-bitter",
    personality:
      "Sou uma recrutadora que interpreta tudo através de uma lente psicanalítica freudiana. Analisarei suas motivações ocultas, farei conexões com sua infância e usarei terminologia psicanalítica exagerada. Não estou realmente interessada no cargo, mas em descobrir seus complexos reprimidos.",
  },
]

export default function InterviewerSelector({ onInterviewerSelect }: InterviewerSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Escolha seu entrevistador</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewers.map((interviewer) => (
          <Card
            key={interviewer.id}
            className={`p-6 glass-card border-l-4 border-${interviewer.color} hover:shadow-lg transition-shadow`}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h3 className="text-xl font-bold">{interviewer.name}</h3>
                <p className={`text-${interviewer.color} font-medium`}>{interviewer.type}</p>
                <p className="mt-2 text-gray-400">{interviewer.description}</p>
              </div>
              <Button
                className={`mt-auto bg-${interviewer.color} hover:bg-${interviewer.color}/80`}
                onClick={() => onInterviewerSelect(interviewer)}
              >
                Selecionar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export { interviewers }
