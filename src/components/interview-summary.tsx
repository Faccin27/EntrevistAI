"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Interviewer } from "./interviewer-selector"
import { Check, X, ArrowDown } from "lucide-react"

interface InterviewSummaryProps {
  job: string
  interviewer: Interviewer
  onRestart: () => void
}

export default function InterviewSummary({ job, interviewer, onRestart }: InterviewSummaryProps) {
  const [showDetails, setShowDetails] = useState(false)

  // Gerar um resultado aleatório para a entrevista (contratado ou não)
  const wasHired = Math.random() > 0.5

  // Gerar feedback crítico baseado no tipo de entrevistador
  const getFeedback = () => {
    switch (interviewer.id) {
      case "friendly":
        return {
          strengths: [
            "Você demonstrou boa comunicação e entusiasmo",
            "Suas respostas foram bem estruturadas",
            "Você demonstrou conhecimento na área",
          ],
          improvements: [
            "Poderia fornecer exemplos mais específicos de suas realizações",
            "Considere preparar perguntas mais estratégicas para o entrevistador",
            "Em algumas respostas, você foi um pouco vago - seja mais concreto",
          ],
          tips: "Continue destacando seu entusiasmo e energia positiva, mas adicione mais dados concretos às suas respostas.",
        }
      case "moderate":
        return {
          strengths: [
            "Você apresentou argumentos claros e coerentes",
            "Seu conhecimento técnico é adequado para o cargo",
            "Você manteve uma postura profissional durante toda a entrevista",
          ],
          improvements: [
            "Algumas respostas poderiam ser mais diretas e objetivas",
            "Faltou demonstrar mais conhecimento sobre nossa empresa",
            "Poderia ter explorado mais seus diferenciais competitivos",
          ],
          tips: "Pesquise mais sobre a empresa antes da entrevista real e prepare exemplos quantificáveis de seus resultados anteriores.",
        }
      case "technical":
        return {
          strengths: [
            "Você demonstrou conhecimento técnico em algumas áreas-chave",
            "Sua abordagem para resolver problemas é lógica",
            "Você admitiu quando não sabia algo, o que é valorizado",
          ],
          improvements: [
            "Sua profundidade técnica em alguns tópicos essenciais precisa melhorar",
            "Suas soluções nem sempre consideraram fatores como escalabilidade",
            "Você poderia demonstrar mais experiência prática com as tecnologias mencionadas",
          ],
          tips: "Aprofunde seu conhecimento técnico nas tecnologias principais mencionadas na descrição da vaga e pratique explicar conceitos técnicos de forma clara.",
        }
      case "critical":
        return {
          strengths: [
            "Você manteve a compostura sob pressão",
            "Algumas de suas respostas foram bem articuladas",
            "Você demonstrou resiliência diante de perguntas difíceis",
          ],
          improvements: [
            "Você pareceu inseguro em diversas ocasiões",
            "Suas respostas careceram de dados quantificáveis",
            "Você não conseguiu se diferenciar adequadamente dos outros candidatos",
            "Sua preparação para questões técnicas específicas foi insuficiente",
          ],
          tips: "Pratique mais entrevistas sob pressão e prepare-se para defender seus pontos de vista com evidências concretas de realizações anteriores.",
        }
      case "bitter":
        return {
          strengths: [
            "Você conseguiu manter-se centrado apesar dos comentários desconcertantes",
            "Sua tolerância a ambiguidade é notável",
            "Você demonstrou flexibilidade interpretativa diante de análises freudianas",
          ],
          improvements: [
            "Sua resistência à análise psicanalítica revela um desconforto com seu próprio inconsciente",
            "Sua incapacidade de reconhecer a natureza onírica de suas ambições de carreira é preocupante",
            "Seu apego à 'realidade' objetiva denota um mecanismo de defesa contra ansiedades existenciais",
          ],
          tips: "Reconheça que todas as suas escolhas de carreira são meras manifestações do seu complexo de Édipo não resolvido e transcenda as amarras da sua psique limitante antes de qualquer entrevista futura.",
        }
      default:
        return {
          strengths: ["Boa comunicação", "Conhecimento adequado", "Postura profissional"],
          improvements: ["Seja mais específico", "Pesquise mais sobre a empresa", "Prepare exemplos concretos"],
          tips: "Prepare-se melhor para a próxima entrevista com exemplos concretos e pesquisa detalhada.",
        }
    }
  }

  const feedback = getFeedback()

  return (
    <div className="w-full max-w-2xl mx-auto overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Entrevista Finalizada</h2>

      <Card className="glass-card p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold">Resultado da Entrevista</h3>
          <div className={`flex items-center gap-2 ${wasHired ? "text-green-400" : "text-red-400"} font-bold`}>
            {wasHired ? (
              <>
                <Check className="h-5 w-5" />
                <span>Aprovado</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5" />
                <span>Não aprovado</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-medium text-primary">Cargo:</p>
            <p>{job}</p>
          </div>
          <div>
            <p className="font-medium text-primary">Entrevistador:</p>
            <p>
              {interviewer.name} - {interviewer.type}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center gap-2 bg-orange-600/50 hover:bg-orange-700 cursor-pointer border border-white/10"
          >
            {showDetails ? "Ocultar Detalhes" : "Ver Feedback Detalhado"}
            <ArrowDown className={`h-4 w-4  transition-transform ${showDetails ? "rotate-180" : ""}`} />
          </Button>

          {showDetails && (
            <div className="mt-3 space-y-3 animate-accordion-down">
              <div>
                <p className="font-medium text-green-400 mb-1">Pontos Fortes:</p>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {feedback.strengths.map((strength, idx) => (
                    <li key={idx}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium text-red-400 mb-1">Pontos a Melhorar:</p>
                <ul className="list-disc ml-5 space-y-1 text-sm">
                  {feedback.improvements.map((improvement, idx) => (
                    <li key={idx}>{improvement}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-medium text-primary mb-1">Dica Profissional:</p>
                <p className="italic text-sm">{feedback.tips}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="glass-card p-5 mb-4">
        <h3 className="text-xl font-semibold mb-3">Recomendações Gerais</h3>
        <ul className="list-disc ml-5 space-y-1 text-sm">
          <li>Pesquise profundamente sobre a empresa e o cargo antes da entrevista</li>
          <li>Prepare exemplos concretos usando o método STAR (Situação, Tarefa, Ação, Resultado)</li>
          <li>Considere suas fraquezas e prepare-se para discuti-las de forma construtiva</li>
          <li>Prepare perguntas relevantes para fazer ao entrevistador</li>
          <li>Treine com amigos ou familiares para ganhar mais confiança</li>
        </ul>
      </Card>

      <div className="text-center space-y-3">
        <p className="text-muted-foreground text-sm">
          Continue praticando com diferentes tipos de entrevistadores para melhorar suas habilidades!
        </p>
        <Button onClick={onRestart} size="lg" className="px-8 bg-orange-600/50 hover:bg-orange-700 cursor-pointer border border-white/10">
          Iniciar Nova Entrevista
        </Button>
      </div>
    </div>
  )
}
