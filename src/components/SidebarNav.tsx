import React, { useState } from 'react';
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
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Database,
  Compass,
  ArrowUp,
  Save,
  Workflow,
} from 'lucide-react';
import { PilotCity, PilotCityId, ScenarioType, UserRole, Language, SavedProposalProfile, ThemeMode } from '../types';
import { PILOT_CITIES } from '../data/pilotCities';
import { ThemeToggle } from './ThemeToggle';

interface SidebarNavProps {
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
  savedProfiles?: SavedProposalProfile[];
  onOpenSaveProposal?: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
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
  onOpenHelp,
  savedProfiles = [],
  onOpenSaveProposal,
  theme = 'dark',
  onToggleTheme
}) => {
  // Collapsible dropdown states
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(true);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState<boolean>(false);
  const [isScenarioDropdownOpen, setIsScenarioDropdownOpen] = useState<boolean>(true);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const scenarioMeta: Record<ScenarioType, { title: string; badge: string; color: string; activeStyle: string }> = {
    base: { 
      title: '1. Base (Actual)', 
      badge: 'GHSL / OSM', 
      color: 'text-slate-300',
      activeStyle: 'bg-slate-800 text-slate-100 border-slate-600 shadow-sm' 
    },
    municipal: { 
      title: '2. Plan Municipal', 
      badge: 'POT / PEMU', 
      color: 'text-blue-400',
      activeStyle: 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-sm shadow-blue-950/40' 
    },
    comunitario: { 
      title: '3. Propuesta Comunitaria', 
      badge: 'Asambleas', 
      color: 'text-amber-400',
      activeStyle: 'bg-amber-600/20 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-950/40' 
    },
    hibrido: { 
      title: '4. Híbrido (Co-Diseño)', 
      badge: 'AHP Óptimo', 
      color: 'text-emerald-400',
      activeStyle: 'bg-emerald-600/25 text-emerald-300 border-emerald-500/60 shadow-sm shadow-emerald-950/40' 
    },
    custom_1: {
      title: '💾 Perfil Propuesta 1',
      badge: 'Guardado',
      color: 'text-indigo-400',
      activeStyle: 'bg-indigo-600/25 text-indigo-200 border-indigo-500/60 shadow-sm shadow-indigo-950/40'
    },
    custom_2: {
      title: '💾 Perfil Propuesta 2',
      badge: 'Guardado',
      color: 'text-indigo-400',
      activeStyle: 'bg-indigo-600/25 text-indigo-200 border-indigo-500/60 shadow-sm shadow-indigo-950/40'
    },
    custom_3: {
      title: '💾 Perfil Propuesta 3',
      badge: 'Guardado',
      color: 'text-indigo-400',
      activeStyle: 'bg-indigo-600/25 text-indigo-200 border-indigo-500/60 shadow-sm shadow-indigo-950/40'
    }
  };

  // Scenarios listed in ascending order (order: base -> municipal -> comunitario -> hibrido)
  const scenarioKeys: ScenarioType[] = ['base', 'municipal', 'comunitario', 'hibrido'];

  const navTabs = [
    { id: 'map', label: language === 'es' ? 'Mapa & Relieve 3D' : language === 'pt' ? 'Mapa e Relevo 3D' : 'Map & 3D Terrain', icon: Map, badge: 'Interactivo' },
    { id: 'housing', label: language === 'es' ? 'Simulación Vivienda' : language === 'pt' ? 'Simulação Habitação' : 'Housing Sim', icon: Building2, badge: 'GHSL' },
    { id: 'services', label: language === 'es' ? 'Servicios & 15min' : language === 'pt' ? 'Serviços & 15min' : 'Services & 15min', icon: Footprints, badge: 'Isócronas' },
    { id: 'deliberation', label: language === 'es' ? 'Votación & Foros' : language === 'pt' ? 'Votação e Fórum' : 'Voting & Forum', icon: Users, badge: 'AHP' },
    { id: 'evaluation', label: language === 'es' ? 'Evaluación Multicriterio' : language === 'pt' ? 'Avaliação Multicritério' : 'Multi-Criteria', icon: BarChart3, badge: 'KPIs' },
    { id: 'scaffolding', label: language === 'es' ? 'Data Hub & Backend' : language === 'pt' ? 'Data Hub e API' : 'Data Hub & API', icon: Database, badge: 'GeoDjango' },
    { id: 'ai-engine', label: language === 'es' ? 'Motor de Inteligencia Artificial' : language === 'pt' ? 'Motor de IA' : 'AI Engine', icon: Sparkles, badge: 'ML' },
    { id: 'langflow-studio', label: language === 'es' ? 'Langflow & Agentes AI' : language === 'pt' ? 'Langflow e Agentes IA' : 'Langflow & AI Agents', icon: Workflow, badge: 'Low-Code' }
  ];

  return (
    <>
      {/* Mobile Sticky Top Header with Toggle Button */}
      <div className="lg:hidden sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-emerald-400 transition-colors"
            aria-label="Abrir Menú"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-xs">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm text-white">Digital Twin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onToggleTheme && (
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} variant="compact" />
          )}
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
            {currentCity.neighborhood}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800 px-2 py-0.5 rounded-lg">
            {activeScenario}
          </span>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main Left Sidebar (Desktop Fixed / Mobile Slide-Over) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 border-r border-slate-800/90 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } shadow-2xl lg:shadow-none`}
      >
        {/* Sidebar Header: Brand & Global Indicators */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-md shadow-emerald-500/20 text-white font-black border border-emerald-400/30 shrink-0">
              <Layers className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-950"></span>
              </span>
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-sm tracking-tight text-white truncate flex items-center gap-1.5">
                Digital Twin
                <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                  Bento GIS
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold truncate">
                Hábitat Popular Co-Diseño
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {onToggleTheme && (
              <button
                id="sidebar-header-theme-toggle-btn"
                onClick={onToggleTheme}
                className="hidden lg:flex p-1.5 rounded-xl border border-slate-800/80 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Middle Content: Dropdowns and Modules */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 text-xs select-none">
          
          {/* 1. SECCIÓN DESPLEGABLE: MÓDULOS DE NAVEGACIÓN (OPCIONES DEBAJO DE CADA UNA) */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden shadow-inner">
            <button
              onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span className="uppercase tracking-wider text-[11px] text-slate-300">
                  {language === 'es' ? 'Módulos del Sistema' : language === 'pt' ? 'Módulos do Sistema' : 'System Modules'}
                </span>
              </div>
              {isNavMenuOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isNavMenuOpen && (
              <div className="px-2 pb-2.5 pt-1 space-y-1 border-t border-slate-800/60 animate-in fade-in duration-150">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`sidebar-nav-${tab.id}`}
                      onClick={() => {
                        onSelectTab(tab.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-medium transition-all group ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/40 font-bold'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span className="truncate">{tab.label}</span>
                      </div>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                          isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold'
                            : 'bg-slate-950/60 text-slate-400 border-slate-800 group-hover:text-slate-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. SECCIÓN DESPLEGABLE: CIUDAD PILOTO ACTIVA */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden shadow-inner">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {language === 'es' ? 'Ciudad Piloto' : language === 'pt' ? 'Cidade Piloto' : 'Pilot City'}
                  </span>
                  <span className="text-xs font-extrabold text-sky-300 truncate block">
                    {currentCity.name}
                  </span>
                </div>
              </div>
              {isCityDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            {isCityDropdownOpen && (
              <div className="px-2 pb-2 pt-1 space-y-1 border-t border-slate-800/60 animate-in fade-in duration-150">
                {PILOT_CITIES.map((c) => {
                  const isSelected = currentCity.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCity(c.id);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold text-white">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.neighborhood} • {c.areaHectares} ha</p>
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 shadow-sm shadow-sky-400"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. SECCIÓN DESPLEGABLE: ROL DE USUARIO */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden shadow-inner">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {language === 'es' ? 'Perfil Activo' : language === 'pt' ? 'Perfil Ativo' : 'Active Role'}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-300 capitalize truncate block">
                    {userRole === 'residente' ? '👤 Residente' : userRole === 'facilitador' ? '🤝 Facilitador Taller' : '🏛️ Admin Municipal'}
                  </span>
                </div>
              </div>
              {isRoleDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            {isRoleDropdownOpen && (
              <div className="px-2 pb-2 pt-1 space-y-1 border-t border-slate-800/60 animate-in fade-in duration-150">
                {(['residente', 'facilitador', 'administrador'] as UserRole[]).map((r) => {
                  const isSelected = userRole === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        onChangeRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                      }`}
                    >
                      <span>
                        {r === 'residente' ? '👤 Residente' : r === 'facilitador' ? '🤝 Facilitador Taller' : '🏛️ Admin Municipal'}
                      </span>
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. SECCIÓN DESPLEGABLE: ESCENARIOS DE SIMULACIÓN (ORIENTACIÓN SUBIENDO HACIA ARRIBA) */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/80 overflow-hidden shadow-inner">
            <button
              onClick={() => setIsScenarioDropdownOpen(!isScenarioDropdownOpen)}
              className="w-full px-3.5 py-2.5 flex items-center justify-between text-left font-bold text-slate-200 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      {language === 'es' ? 'Escenarios de Co-Diseño' : language === 'pt' ? 'Cenários' : 'Scenarios'}
                    </span>
                    <span className="text-[9px] text-amber-400 flex items-center gap-0.5 font-mono">
                      <ArrowUp className="w-2.5 h-2.5" /> 1-4
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-amber-300 truncate block capitalize">
                    {scenarioMeta[activeScenario].title}
                  </span>
                </div>
              </div>
              {isScenarioDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </button>

            {isScenarioDropdownOpen && (
              <div className="px-2 pb-2.5 pt-1.5 space-y-1.5 border-t border-slate-800/60 animate-in fade-in duration-150">
                <div className="px-1 text-[9px] text-slate-400 flex items-center justify-between font-mono">
                  <span>Jerarquía de propuesta:</span>
                  <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                    <ArrowUp className="w-3 h-3" /> Ascendente
                  </span>
                </div>

                {scenarioKeys.map((sc) => {
                  const meta = scenarioMeta[sc];
                  const isSelected = activeScenario === sc;
                  return (
                    <button
                      key={sc}
                      id={`sidebar-scenario-${sc}`}
                      onClick={() => onSelectScenario(sc)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all border flex items-center justify-between ${
                        isSelected
                          ? meta.activeStyle
                          : 'bg-slate-950/50 hover:bg-slate-800/70 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="min-w-0 pr-1">
                        <span className={`block font-bold text-xs truncate ${isSelected ? 'text-white' : meta.color}`}>
                          {meta.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {meta.badge}
                        </span>
                      </div>
                      {isSelected ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400 animate-pulse"></span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0"></span>
                      )}
                    </button>
                  );
                })}

                {/* Sub-section: 3 Saved Custom Profiles */}
                <div className="pt-2 mt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="px-1 flex items-center justify-between text-[10px] text-indigo-300 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Save className="w-3 h-3 text-indigo-400" />
                      Perfiles Guardados (1-3)
                    </span>
                    {onOpenSaveProposal && (
                      <button
                        id="sidebar-quick-save-btn"
                        onClick={onOpenSaveProposal}
                        className="text-[9px] px-2 py-0.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 font-bold transition-all"
                      >
                        + Guardar
                      </button>
                    )}
                  </div>

                  {(['custom_1', 'custom_2', 'custom_3'] as ScenarioType[]).map((cSc, idx) => {
                    const slotNum = (idx + 1) as 1 | 2 | 3;
                    const profile = savedProfiles.find(p => p.slotNumber === slotNum);
                    const isSelected = activeScenario === cSc;
                    const isFilled = profile?.isFilled;

                    return (
                      <button
                        key={cSc}
                        id={`sidebar-scenario-${cSc}`}
                        onClick={() => onSelectScenario(cSc)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all border flex items-center justify-between text-xs ${
                          isSelected
                            ? 'bg-indigo-600/30 text-white border-indigo-500 font-bold shadow-md shadow-indigo-950/50'
                            : isFilled
                            ? 'bg-slate-950/40 hover:bg-indigo-950/20 border-slate-800 text-indigo-200'
                            : 'bg-slate-950/20 border-slate-900 text-slate-500 hover:text-slate-400'
                        }`}
                      >
                        <div className="min-w-0 truncate pr-1">
                          <span className="font-semibold truncate block text-[11px]">
                            {isFilled ? profile.name : `Slot ${slotNum} (Vacío)`}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono block">
                            {isFilled ? `${profile.elements.length} elementos` : 'Haz clic en Guardar'}
                          </span>
                        </div>
                        {isSelected ? (
                          <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 shadow-sm shadow-indigo-400"></span>
                        ) : isFilled ? (
                          <span className="text-[9px] text-indigo-400 font-mono bg-indigo-500/10 px-1 rounded">S{slotNum}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Footer: Theme Switcher, Language & Help */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur space-y-2.5">
          {/* Theme Switcher in Sidebar Footer */}
          {onToggleTheme && (
            <ThemeToggle
              theme={theme}
              onToggleTheme={onToggleTheme}
              variant="sidebar"
            />
          )}

          <div className="flex items-center justify-between gap-2">
            {/* Language Pills */}
            <div className="flex items-center bg-slate-900/90 rounded-xl p-1 border border-slate-800 text-xs font-bold shadow-inner">
              {(['es', 'en', 'pt'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  id={`sidebar-lang-btn-${lang}`}
                  onClick={() => onChangeLanguage(lang)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all uppercase ${
                    language === lang
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Help / Methodology Button */}
            {onOpenHelp && (
              <button
                id="sidebar-help-btn"
                onClick={onOpenHelp}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 rounded-xl border border-slate-800 transition-colors text-xs font-bold shadow-inner"
                title="Metodología y Guía"
              >
                <HelpCircle className="w-4 h-4 text-emerald-400" />
                <span>Guía</span>
              </button>
            )}
          </div>

          <div className="text-center text-[10px] text-slate-400 font-mono">
            Digital Twin v2.4 • PostGIS & 3D
          </div>
        </div>
      </aside>
    </>
  );
};
