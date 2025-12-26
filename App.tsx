import React from 'react';
import { HeroSection } from './components/sections/HeroSection';
import { AnaliseTemporalSection } from './components/sections/AnaliseTemporalSection';
import { SegmentacaoLeadsSection } from './components/sections/SegmentacaoLeadsSection';
import { TempoRespostaSection } from './components/sections/TempoRespostaSection';
import { AnaliseComunicacaoSection } from './components/sections/AnaliseComunicacaoSection';
import { FunilVendasSection } from './components/sections/FunilVendasSection';
import { PadroesConversaSection } from './components/sections/PadroesConversaSection';
import { LeadsInativosSection } from './components/sections/LeadsInativosSection';
import { MapeamentoObjecoesSection } from './components/sections/MapeamentoObjecoesSection';
import { OportunidadesSection } from './components/sections/OportunidadesSection';
import { PlanoAcaoSection } from './components/sections/PlanoAcaoSection';

function Header() {
  return (
    <header className="fixed top-0 w-full bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-[#FF5C35] text-2xl font-bold">Ⓐ</span>
          <span className="text-white text-xl font-semibold tracking-tight">assis</span>
        </div>
        <button className="bg-[#FF5C35] text-white px-6 py-2 rounded-xl font-semibold hover:brightness-110 transition-all shadow-lg shadow-[#FF5C35]/20 text-sm md:text-base">
          Exportar PDF →
        </button>
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
            <span className="text-[#FF5C35] text-2xl font-bold">Ⓐ</span>
            <span className="text-white text-xl font-semibold">assis</span>
          </div>
          <p className="text-sm text-[#808080]">
            Análise gerada pela tecnologia da Assis
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#FF5C35]/30">
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
    </div>
  );
}

export default App;