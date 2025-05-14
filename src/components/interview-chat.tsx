"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle, Send, User } from "lucide-react"
import type { Interviewer } from "./interviewer-selector"
import { GoogleGenerativeAI } from "@google/generative-ai"

interface Message {
  id: string
  sender: "user" | "interviewer"
  text: string
  timestamp: Date
}

interface InterviewChatProps {
  job: string
  interviewer: Interviewer
  onFinishInterview: () => void
}

export default function InterviewChat({ job, interviewer, onFinishInterview }: InterviewChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Função para gerar um ID único para as mensagens
  const generateId = () => Date.now().toString()

  useEffect(() => {
    // Iniciar a entrevista com uma mensagem do entrevistador
    const initialMessage = {
      id: generateId(),
      sender: "interviewer" as const,
      text: `Olá, eu sou ${interviewer.name}. ${getInitialPrompt(job, interviewer.id)}`,
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [job, interviewer])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getInitialPrompt = (job: string, interviewerId: string) => {
    switch (interviewerId) {
      case "friendly":
        return `Que bom te conhecer! Estou muito feliz que você se candidatou para a vaga de ${job}. Vamos ter uma conversa tranquila para conhecer melhor suas experiências e habilidades. Como você se preparou para esta entrevista?`
      case "moderate":
        return `Obrigado por se candidatar à vaga de ${job}. Vamos conversar sobre sua experiência e habilidades para entender se há um bom encaixe. Pode me contar um pouco sobre sua trajetória profissional até aqui?`
      case "technical":
        return `Vamos avaliar suas competências técnicas para a posição de ${job}. Primeiramente, pode me contar quais são suas principais habilidades técnicas relacionadas a esta função?`
      case "critical":
        return `Estamos buscando os melhores candidatos para ${job}, e nosso processo é bastante rigoroso. Por que você acredita que devemos te contratar em vez dos outros candidatos igualmente qualificados?`
      case "bitter":
        return `Então você deseja o cargo de ${job}... Interessante esta escolha de carreira. Talvez revele um desejo reprimido de aprovação que se originou na sua primeira infância? Conte-me sobre seu relacionamento com seu primeiro emprego e o que isso diz sobre seus complexos não resolvidos.`
      default:
        return `Vamos começar nossa entrevista para a vaga de ${job}. Me conte um pouco sobre você.`
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      id: generateId(),
      sender: "user" as const,
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Construir o contexto para o Gemini
      const context = `
      Você é um simulador de entrevistas de emprego chamado EntrevistaGênio. 
      Você está atuando como ${interviewer.name}, um entrevistador com a seguinte personalidade: "${interviewer.personality}".
      
      A pessoa está se candidatando para a vaga de: ${job}.
      
      Histórico da conversa:
      ${messages.map((m) => `${m.sender === "interviewer" ? interviewer.name : "Candidato"}: ${m.text}`).join("\n")}
      
      Candidato: ${input}
      
      Responda como ${interviewer.name}, mantendo a personalidade descrita e fazendo perguntas relevantes para a vaga de ${job}. Mantenha suas respostas entre 2-4 frases, no máximo.
      `

      // Chamar a API do Gemini
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(context);
      const response = {
        text: result.response.text()
      };

      const botResponse = {
        id: generateId(),
        sender: "interviewer" as const,
        text: response.text,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    } catch (error) {
      console.error("Erro ao obter resposta:", error)

      // Fallback para resposta simulada em caso de erro
      const fallbackResponse = await simulateGeminiResponse(input, messages, interviewer, job)

      const botResponse = {
        id: generateId(),
        sender: "interviewer" as const,
        text: fallbackResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }
  }

  // Função que simula a resposta da API do Gemini (fallback)
  const simulateGeminiResponse = async (
    userMessage: string,
    previousMessages: Message[],
    interviewer: Interviewer,
    job: string,
  ): Promise<string> => {
    // Simplificação da lógica de resposta pra cada entrevistador
    const lastMessages = previousMessages.slice(-3) // Pegar as últimas 3 mensagens para contexto

    let response = ""

    // Personalidades
    switch (interviewer.id) {
      case "friendly":
        if (userMessage.toLowerCase().includes("nervoso") || userMessage.toLowerCase().includes("ansioso")) {
          response =
            "Entendo como você se sente! Entrevistas podem ser estressantes, mas relaxe - estou aqui para conhecer você, não para julgar. Respire fundo e vamos continuar. Conte-me sobre um projeto que você se sentiu orgulhoso de realizar."
        } else if (userMessage.toLowerCase().includes("experiência") || userMessage.toLowerCase().includes("projeto")) {
          response = `Que interessante sua experiência! Parece que você tem habilidades valiosas para a posição de ${job}. Como você lidou com os desafios nesse projeto? E que lições você aprendeu que poderia aplicar aqui?`
        } else {
          response = `Obrigado por compartilhar isso! Para a posição de ${job}, estamos buscando alguém com boas habilidades de comunicação e trabalho em equipe. Pode me contar sobre uma situação em que você precisou colaborar com colegas para resolver um problema complexo?`
        }
        break

      case "moderate":
        if (userMessage.length < 50) {
          response =
            "Poderia elaborar um pouco mais sua resposta? Estou interessado em detalhes específicos que demonstrem sua experiência e qualificações."
        } else if (userMessage.toLowerCase().includes("desafio") || userMessage.toLowerCase().includes("problema")) {
          response = `Interessante como você abordou esse desafio. Na nossa empresa, frequentemente enfrentamos situações parecidas. Como você avalia seus pontos fracos em relação às demandas da posição de ${job}?`
        } else {
          response = `Entendo. Agora, considerando as responsabilidades de um ${job}, qual seria sua estratégia para os primeiros 90 dias caso seja contratado?`
        }
        break

      case "technical":
        if (userMessage.toLowerCase().includes("tecnologia") || userMessage.toLowerCase().includes("ferramenta")) {
          response = `Você mencionou algumas tecnologias interessantes. Vamos aprofundar: poderia resolver este pequeno problema técnico? [Imagine um cenário de desafio técnico relacionado a ${job}]. Como você abordaria esta situação?`
        } else if (userMessage.toLowerCase().includes("problema") || userMessage.toLowerCase().includes("solução")) {
          response =
            "Sua abordagem é interessante, mas me preocupa a escalabilidade dessa solução. Como você modificaria para lidar com um volume 10 vezes maior? E quais seriam os trade-offs dessa decisão?"
        } else {
          response = `Para avaliar seu conhecimento técnico específico: quais são as principais tendências e inovações na área de ${job} que você tem acompanhado nos últimos 6 meses?`
        }
        break

      case "critical":
        if (userMessage.length < 100) {
          response =
            "Essa resposta me parece superficial e genérica. Esperava algo mais substancial de alguém que aspira a esta posição. Poderia elaborar com exemplos concretos e quantificáveis?"
        } else if (userMessage.toLowerCase().includes("sucesso") || userMessage.toLowerCase().includes("realizei")) {
          response = `Esses resultados são realmente impressionantes... se forem precisos. Como posso verificar essas afirmações? E por que, com esse histórico que você descreve, está buscando uma posição de ${job} aqui e não em empresas mais prestigiadas do setor?`
        } else {
          response = `Interessante. Agora vou te colocar em uma situação hipotética difícil: [descreve um cenário de crise relacionado a ${job}]. Você tem 30 segundos para me dizer sua abordagem. O que faria?`
        }
        break

      case "bitter":
        if (userMessage.toLowerCase().includes("equipe") || userMessage.toLowerCase().includes("colaboração")) {
          response =
            "Ah, sua necessidade de pertencer a uma 'equipe' claramente revela um trauma de rejeição na infância. Sua busca por 'colaboração' é meramente um mecanismo de defesa contra o medo primordial da solidão. Fascinante como você projetou essa insegurança em sua escolha profissional. Continue..."
        } else if (userMessage.toLowerCase().includes("objetivo") || userMessage.toLowerCase().includes("meta")) {
          response = `Seus 'objetivos' como ${job} são claramente substitutos fálicos para a aprovação parental que nunca recebeu adequadamente. Este desejo de 'conquista' é apenas uma compensação para o complexo de inferioridade estabelecido durante sua fase edipiana. Como era sua relação com a figura de autoridade dominante na sua infância?`
        } else {
          response =
            "Interessante escolha de palavras... Seu superego parece estar em constante conflito com seus desejos id primitivos de reconhecimento profissional. Percebo fortes tendências narcisistas maladaptativas em seu discurso. Talvez devêssemos explorar seus sonhos recentes antes de prosseguir com esta entrevista. Você sonha frequentemente com quedas ou perseguições?"
        }
        break

      default:
        response = "Entendo. Pode me falar mais sobre isso em relação à vaga que está se candidatando?"
    }

    return response
  }

  // Determina a cor do avatar baseado no tipo de entrevistador
  const getAvatarColor = () => {
    switch (interviewer.id) {
      case "friendly":
        return "bg-green-300"
      case "moderate":
        return "bg-blue-400"
      case "technical":
        return "bg-purple-400"
      case "critical":
        return "bg-red-500"
      case "bitter":
        return "bg-gray-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto">
      {/* Cabeçalho do chat */}
      <div className={`p-4 flex items-center border-b bg-${interviewer.color}/10`}>
        <Avatar className={`${getAvatarColor()} text-white w-10 h-10 mr-3`}>
          <span className="font-semibold">{interviewer.name.charAt(0)}</span>
        </Avatar>
        <div>
          <h3 className="font-bold">{interviewer.name}</h3>
          <p className="text-sm text-muted-foreground">{interviewer.type}</p>
        </div>
        <div className="ml-auto">
          <Button variant="outline" onClick={onFinishInterview}>
            Finalizar Entrevista
          </Button>
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 p-4 overflow-y-auto bg-secondary/30">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[80%] p-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : `bg-card border-l-4 border-${interviewer.color}`
              }`}
            >
              <div className="flex items-start">
                {message.sender === "interviewer" && (
                  <Avatar className={`${getAvatarColor()} mr-2 text-white w-8 h-8`}>
                    <MessageCircle className="h-4 w-4" />
                  </Avatar>
                )}
                <div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="bg-muted ml-2 text-muted-foreground w-8 h-8">
                    <User className="h-4 w-4" />
                  </Avatar>
                )}
              </div>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <Card className={`max-w-[80%] p-3 bg-card border-l-4 border-${interviewer.color}`}>
              <div className="flex items-center">
                <Avatar className={`${getAvatarColor()} mr-2 text-white w-8 h-8`}>
                  <MessageCircle className="h-4 w-4" />
                </Avatar>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-0"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Área de input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t bg-card">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
          />
          <Button
            type="submit"
            className={`self-end bg-${interviewer.color} hover:bg-${interviewer.color}/80`}
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}
