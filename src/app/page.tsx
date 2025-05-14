"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import InterviewerSelector, { Interviewer } from "@/components/interviewer-selector";
import JobSelector from "@/components/job-selector";
import { useState } from "react";

// Estágios do processo de entrevista
enum InterviewStage {
  JOB_SELECTION = 0,
  INTERVIEWER_SELECTION = 1,
  INTERVIEW = 2,
  SUMMARY = 3,
}

export default function Home() {
  const [stage, setStage] = useState<InterviewStage>(
    InterviewStage.JOB_SELECTION
  );
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedInterviewer, setSelectedInterviewer] = useState<Interviewer | null>(null)


  const handleInterviewerSelect = (interviewer: Interviewer) => {
    setSelectedInterviewer(interviewer);
    setStage(InterviewStage.INTERVIEW);
  };

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    setStage(InterviewStage.INTERVIEWER_SELECTION);
  };

  const handleFinishInterview = () => {
    setStage(InterviewStage.SUMMARY);
  };

  const renderStageContent = () => {
    switch (stage) {
      case InterviewStage.JOB_SELECTION:
        return <JobSelector onJobSelect={handleJobSelect} />;
      case InterviewStage.INTERVIEWER_SELECTION:
        return (
          <InterviewerSelector onInterviewerSelect={handleInterviewerSelect} />
        );
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const stages = [
      { name: "Selecionar Vaga", stage: InterviewStage.JOB_SELECTION },
      {
        name: "Escolher Entrevistador",
        stage: InterviewStage.INTERVIEWER_SELECTION,
      },
      { name: "Entrevista", stage: InterviewStage.INTERVIEW },
      { name: "Resumo", stage: InterviewStage.SUMMARY },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto mb-8 px-4">
        <div className="flex justify-between">
          {stages.map((s, index) => (
            <div key={s.name} className="flex flex-col items-center relative">
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    stage >= s.stage
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < stages.length - 1 && (
                  <div
                    className={`progress-connector ${
                      stage > s.stage ? "bg-primary" : "bg-muted"
                    }`}
                  ></div>
                )}
              </div>
              <span
                className={`text-xs mt-2 text-center ${
                  stage >= s.stage
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-orange-200 bg-clip-text text-transparent">
            Entrevist<span className="text-orange-600">AI</span>
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            Treine para entrevistas de emprego com diferentes perfis de
            entrevistadores
          </p>

          {renderProgressBar()}

          <div className="my-8">{renderStageContent()}</div>

          {stage === InterviewStage.JOB_SELECTION && (
            <section
              id="about"
              className="max-w-3xl mx-auto mt-16 p-6 glass-card rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-4">
                Sobre o Entrevist<span className="text-orange-600">AI</span>
              </h2>
              <p className="mb-4">
                O Entrevist<span className="text-orange-600">AI</span> é uma
                plataforma que utiliza inteligência artificial para simular
                entrevistas de emprego com diferentes tipos de entrevistadores.
              </p>
              <p className="mb-4">
                Nosso objetivo é ajudar você a se preparar para entrevistas
                reais, praticando com diversos perfis de entrevistadores - desde
                os amigáveis até os mais críticos.
              </p>
              <p>
                Selecione o cargo desejado, escolha o tipo de entrevistador que
                deseja praticar e comece sua simulação!
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
