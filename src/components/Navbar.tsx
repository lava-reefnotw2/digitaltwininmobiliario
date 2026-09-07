import React from 'react';
import { 
  Map, 
  Building2, 
  Footprints, 
  Users, 
  BarChart3, 
  Code2, 
  Globe, 
  UserCheck, 
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PilotCity, PilotCityId, ScenarioType, UserRole, Language } from '../types';
import { PILOT_CITIES } from '../data/pilotCities';

interface NavbarProps {
  currentCity: PilotCity;
  onSelectCity: (cityId: PilotCityId) => void;
  activeScenario: ScenarioType;
  onSelectScenario: (scenario: ScenarioType) => void;
  userRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenHelp?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCity,
  onSelectCity,
  activeScenario,
  onSelectScenario,
  userRole,
  onChangeRole,
  language,
  onChangeLanguage,
  activeTab,
  onSelectTab,
  onOpenHelp
}) => {
  const scenarioLabels: Record<ScenarioType, { title: string; color: string }> = {
    base: { title: '1. Base (Actual)', color: 'bg-slate-700 text-slate-200' },
    municipal: { title: '2. Municipal', color: 'bg-blue-600 text-white' },
    comunitario: { title: '3. Comunitaria', color: 'bg-amber-600 text-white' },
    hibrido: { title: '4. Híbrido (Co-Diseño)', color: 'bg-teal-600 text-white font-semibold shadow-sm' },
    custom_1: { title: '💾 Perfil 1', color: 'bg-indigo-600 text-white font-semibold shadow-sm' },
    custom_2: { title: '💾 Perfil 2', color: 'bg-indigo-600 text-white font-semibold shadow-sm' },
    custom_3: { title: '💾 Perfil 3', color: 'bg-indigo-600 text-white font-semibold shadow-sm' }
  };

  const navTabs = [
    { id: 'map', label: language === 'es' ? 'Mapa & 3D' : language === 'pt' ? 'Mapa e 3D' : 'Map & 3D', icon: Map },
    { id: 'housing', label: language === 'es' ? 'Simulación Vivienda' : language === 'pt' ? 'Simulação Habitação' : 'Housing Sim', icon: Building2 },
    { id: 'services', label: language === 'es' ? 'Servicios & 15min' : language === 'pt' ? 'Serviços & 15min' : 'Services & 15min', icon: Footprints },
    { id: 'deliberation', label: language === 'es' ? 'Votos & Foro' : language === 'pt' ? 'Votação e Fórum' : 'Voting & Forum', icon: Users },
    { id: 'evaluation', label: language === 'es' ? 'Evaluación Multicriterio' : language === 'pt' ? 'Avaliação Multicritério' : 'Multi-Criteria', icon: BarChart3 },
    { id: 'scaffolding', label: language === 'es' ? 'Arquitectura & API' : language === 'pt' ? 'Arquitetura e API' : 'Backend & API', icon: Code2 }
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl">
      {/* Top Bar: Brand + Pilot Switcher + Role + Language */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20 text-white font-black text-lg border border-emerald-400/30">
            <Layers className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-950"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                Digital Twin Comunitario
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  Bento GIS Engine
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold hidden sm:block">
              Simulación espacial participativa y co-diseño de hábitat popular
            </p>
          </div>
        </div>

        {/* Center: Pilot City Selection */}
        <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            {language === 'es' ? 'Ciudad Piloto:' : language === 'pt' ? 'Cidade Piloto:' : 'Pilot City:'}
          </span>
          <select
            id="pilot-city-select"
            value={currentCity.id}
            onChange={(e) => onSelectCity(e.target.value as PilotCityId)}
            className="bg-slate-800 text-xs font-bold text-emerald-300 py-1 px-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-colors hover:bg-slate-700/80"
          >
            {PILOT_CITIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-slate-900 text-slate-100">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Role Switcher + Language + Quick Help */}
        <div className="flex items-center gap-2.5">
          {/* User Role */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-800 shadow-inner">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <select
              id="user-role-select"
              value={userRole}
              onChange={(e) => onChangeRole(e.target.value as UserRole)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="residente" className="bg-slate-900 text-slate-200">
                👤 {language === 'es' ? 'Residente' : language === 'pt' ? 'Residente' : 'Resident'}
              </option>
              <option value="facilitador" className="bg-slate-900 text-slate-200">
                🤝 {language === 'es' ? 'Facilitador Taller' : language === 'pt' ? 'Facilitador' : 'Facilitator'}
              </option>
              <option value="administrador" className="bg-slate-900 text-slate-200">
                🏛️ {language === 'es' ? 'Admin Municipal' : language === 'pt' ? 'Admin Municipal' : 'Municipal Admin'}
              </option>
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs font-bold shadow-inner">
            {(['es', 'en', 'pt'] as Language[]).map((lang) => (
              <button
                key={lang}
                id={`lang-btn-${lang}`}
                onClick={() => onChangeLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all uppercase ${
                  language === lang
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {onOpenHelp && (
            <button
              id="help-btn"
              onClick={onOpenHelp}
              title="Guía de uso y metodología"
              className="p-2 text-slate-400 hover:text-emerald-300 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Bar: Scenarios Switcher & Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Scenario Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {language === 'es' ? 'Escenario:' : language === 'pt' ? 'Cenário:' : 'Scenario:'}
          </span>
          {(['base', 'municipal', 'comunitario', 'hibrido'] as ScenarioType[]).map((sc) => (
            <button
              key={sc}
              id={`scenario-btn-${sc}`}
              onClick={() => onSelectScenario(sc)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeScenario === sc
                  ? scenarioLabels[sc].color + ' shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {scenarioLabels[sc].title}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
