import Footer from "@/components/footer"
import Header from "@/components/header"

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <section className="max-w-3xl w-full glass-card rounded-lg p-8 border border-white/10 backdrop-blur-sm bg-black/30">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-orange-200 bg-clip-text text-transparent">
            Sobre o Entrevist<span className="text-orange-600">AI</span>
          </h1>
          
          <div className="space-y-4">
            <p className="text-lg">
              O Entrevist<span className="text-orange-600">AI</span> é uma plataforma que utiliza inteligência
              artificial para simular entrevistas de emprego com diferentes tipos de entrevistadores.
            </p>
            
            <p className="text-lg">
              Nosso objetivo é ajudar você a se preparar para entrevistas reais, praticando com diversos perfis de
              entrevistadores - desde os amigáveis até os mais críticos.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Como funciona</h2>
            
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Selecione o cargo desejado para a entrevista</li>
              <li>Escolha o tipo de entrevistador com quem deseja praticar</li>
              <li>Participe da entrevista simulada respondendo às perguntas</li>
              <li>Receba um feedback detalhado sobre seu desempenho</li>
            </ol>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Tipos de entrevistadores</h2>
            
            <ul className="space-y-3">
              <li>
                <span className="font-bold text-green-400">Ana (Amigável)</span> - Entrevistadora simpática que ajuda você a se sentir confortável
              </li>
              <li>
                <span className="font-bold text-blue-400">Bruno (Moderado)</span> - Profissional equilibrado que faz perguntas realistas
              </li>
              <li>
                <span className="font-bold text-purple-400">Carla (Técnica)</span> - Especialista focada em competências técnicas
              </li>
              <li>
                <span className="font-bold text-red-500">Diego (Crítico)</span> - Entrevistador rigoroso que testa sua capacidade sob pressão
              </li>
              <li>
                <span className="font-bold text-gray-500">Elena (Amargurada)</span> - Entrevistadora peculiar com abordagem psicanalítica
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
