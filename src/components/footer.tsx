import { BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 backdrop-blur-sm bg-black/30 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            <span className="font-bold">
              Entrevist<span className="text-orange-600 font-extrabold">AI</span>
            </span>
          </div>

          {/* Créditos */}
          <div>
            <span className="font-bold">
              Desenvolvido por{" "}
              <Link
                href="https://faccindev.pro"
                target="_blank"
                className="text-orange-600 hover:underline"
              >
                FaccinDev
              </Link>
            </span>
          </div>

          {/* Descrição */}
          <div className="text-sm text-muted-foreground max-w-md">
            <p>
               A <span className="text-orange-600 font-extrabold"> IA</span> que te ajuda na entrevista.
              <br />
              © {new Date().getFullYear()} Todos os direitos reservados. 
            </p>
            <p>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
