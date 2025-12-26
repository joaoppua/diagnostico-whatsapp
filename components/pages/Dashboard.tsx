import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { AnaliseTemporalSection } from '../sections/AnaliseTemporalSection';
import { SegmentacaoLeadsSection } from '../sections/SegmentacaoLeadsSection';
import { TempoRespostaSection } from '../sections/TempoRespostaSection';
import { AnaliseComunicacaoSection } from '../sections/AnaliseComunicacaoSection';
import { FunilVendasSection } from '../sections/FunilVendasSection';
import { PadroesConversaSection } from '../sections/PadroesConversaSection';
import { LeadsInativosSection } from '../sections/LeadsInativosSection';
import { MapeamentoObjecoesSection } from '../sections/MapeamentoObjecoesSection';
import { OportunidadesSection } from '../sections/OportunidadesSection';
import { PlanoAcaoSection } from '../sections/PlanoAcaoSection';

function Header() {
  return (
    <header className="fixed top-0 w-full bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://cdn.prod.website-files.com/682f51a0a02e1695feb8ab60/682f51a0a02e1695feb8ab8d_Assis_Logo.svg" 
            alt="Assis Logo" 
            className="h-8 md:h-10 w-auto" 
          />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <button className="bg-[#FF5C35] text-white px-6 py-2 rounded-xl font-semibold hover:brightness-110 transition-all shadow-lg shadow-[#FF5C35]/20 text-sm md:text-base">
            Exportar PDF →
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 bg-[#0D0D0D]">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <img 
              src="https://cdn.prod.website-files.com/682f51a0a02e1695feb8ab60/682f51a0a02e1695feb8ab8d_Assis_Logo.svg" 
              alt="Assis Logo" 
              className="h-6 md:h-8 w-auto opacity-80" 
            />
          </div>
          <p className="text-sm text-[#808080]">
            Análise gerada pela tecnologia da Assis
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Dashboard() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AnaliseTemporalSection />
        <SegmentacaoLeadsSection />
        <TempoRespostaSection />
        <AnaliseComunicacaoSection />
        <FunilVendasSection />
        <PadroesConversaSection />
        <LeadsInativosSection />
        <MapeamentoObjecoesSection />
        <OportunidadesSection />
        <PlanoAcaoSection />
      </main>
      <Footer />
    </>
  );
}