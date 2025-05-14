import { Button } from "@/components/ui/button"
import { BrainCircuit, Github } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-10">
      <div className="container mx-auto py-3 px-4 grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">
              Entrevist<span className="text-orange-600">AI</span>
            </span>
          </Link>
        </div>
        <nav className="justify-self-center flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hover:text-orange-600">
            <Link href="/">Início</Link>
          </Button>
          <Button variant="ghost" asChild size="sm" className="hover:text-orange-600">
            <Link href="/sobre">
              <span>Sobre</span>
            </Link>
          </Button>
        </nav>
        <div className="justify-self-end">
          <Link href="https://github.com/faccin27/entrevistai" target="_blank">
            <Github className="h-6 w-6 text-primary hover:text-orange-600 transition-colors duration-300" />
          </Link>
        </div>
      </div>
    </header>
  )
}
