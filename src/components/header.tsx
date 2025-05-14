import { Button } from "@/components/ui/button"
import { BrainCircuit } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-black/30 sticky top-0 z-10">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Entrevist<span className="text-orange-600">AI</span></span>
        </Link>
        <nav>
          <Button variant="ghost" asChild>
            <Link href="/">Início</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
