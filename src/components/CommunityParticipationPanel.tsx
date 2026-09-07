import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Users, 
  Coins, 
  Sparkles, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Send, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  SlidersHorizontal,
  MapPin,
  Tag,
  Building,
  TreePine,
  Heart,
  BookOpen,
  Bus,
  Briefcase
} from 'lucide-react';
import { 
  BudgetVoteAllocation, 
  ForumThread, 
  AHPMatrix, 
  UserRole, 
  PilotCity, 
  ScenarioType,
  Language 
} from '../types';
import { INITIAL_AHP_CRITERIA, INITIAL_AHP_MATRIX } from '../data/initialScenarios';
import { solveAHPMatrix } from '../utils/gisCalculations';

interface CommunityParticipationPanelProps {
  city: PilotCity;
  userRole: UserRole;
  language: Language;
  activeScenario: ScenarioType;
  budgetVote: BudgetVoteAllocation;
  onUpdateBudgetVote: (vote: BudgetVoteAllocation) => void;
  forumThreads: ForumThread[];
  onAddForumThread: (thread: Omit<ForumThread, 'id' | 'timestamp' | 'upvotes' | 'downvotes' | 'comments'>) => void;
  onVoteThread: (threadId: string, type: 'up' | 'down') => void;
  onAddComment: (threadId: string, content: string) => void;
}

export const CommunityParticipationPanel: React.FC<CommunityParticipationPanelProps> = ({
  city,
  userRole,
  language,
  activeScenario,
  budgetVote,
  onUpdateBudgetVote,
  forumThreads,
  onAddForumThread,
  onVoteThread,
  onAddComment
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'budget' | 'ahp' | 'forum'>('budget');
  const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);

  // AHP State
  const [ahpMatrixValues, setAhpMatrixValues] = useState<number[][]>(INITIAL_AHP_MATRIX);
  const ahpResult: AHPMatrix = solveAHPMatrix(INITIAL_AHP_CRITERIA.map(c => c.name), ahpMatrixValues);

  // Forum New Thread State
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ForumThread['category']>('vivienda');
  const [newSentiment, setNewSentiment] = useState<ForumThread['sentiment']>('propuesta');
  const [isCreatingThread, setIsCreatingThread] = useState(false);

  // Active Comment Input
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Budget calculations
  const totalAllocated = (Object.values(budgetVote) as number[]).reduce((acc: number, v: number) => acc + v, 0);
  const remainingPoints = 100 - totalAllocated;

  const handleBudgetChange = (category: keyof BudgetVoteAllocation, value: number) => {
    const currentVal = budgetVote[category];
    const diff = value - currentVal;
    if (diff > 0 && remainingPoints < diff) {
      value = currentVal + remainingPoints;
    }
    onUpdateBudgetVote({
      ...budgetVote,
      [category]: Math.max(0, Math.min(100, value))
    });
  };

  const handleCastVote = () => {
    if (totalAllocated !== 100) return;
    setVoteSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAHPValueChange = (row: number, col: number, value: number) => {
    const updated = ahpMatrixValues.map((r, rIdx) =>
      r.map((val, cIdx) => {
        if (rIdx === row && cIdx === col) return value;
        if (rIdx === col && cIdx === row) return parseFloat((1 / value).toFixed(2));
        return val;
      })
    );
    setAhpMatrixValues(updated);
  };

  const handleCreateThreadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddForumThread({
      title: newTitle,
      content: newContent,
      author: userRole === 'residente' ? 'Vecino/a del Barrio' : userRole === 'facilitador' ? 'Facilitador Comunitario' : 'Técnico Municipal',
      role: userRole,
      coordinates: [
        city.center[0] + (Math.random() - 0.5) * 0.004,
        city.center[1] + (Math.random() - 0.5) * 0.004
      ],
      category: newCategory,
      sentiment: newSentiment,
      relatedScenario: activeScenario
    });

    setNewTitle('');
    setNewContent('');
    setIsCreatingThread(false);
  };

  const handleCommentSubmit = (threadId: string) => {
    const text = commentInputs[threadId];
    if (!text || !text.trim()) return;
    onAddComment(threadId, text.trim());
    setCommentInputs({ ...commentInputs, [threadId]: '' });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Bento Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-inner">
              <Users className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Captura de Preferencias Comunitarias y Deliberación Ciudadana
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                  Participativo
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Presupuesto participativo (100 pts), Matriz AHP de priorización y Foro de debate geolocalizado
              </p>
            </div>
          </div>

          {/* Sub-Tabs Switcher */}
          <div className="flex items-center bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              id="subtab-budget-btn"
              onClick={() => setActiveSubTab('budget')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'budget'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💰 Votación 100 Puntos
            </button>
            <button
              id="subtab-ahp-btn"
              onClick={() => setActiveSubTab('ahp')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'ahp'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚖️ Matriz AHP Saaty
            </button>
            <button
              id="subtab-forum-btn"
              onClick={() => setActiveSubTab('forum')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'forum'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              💬 Foro Territorial ({forumThreads.length})
            </button>
          </div>
        </div>
      </div>

      {/* 1. Votación de 100 Puntos Sub-Tab */}
      {activeSubTab === 'budget' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders Form */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Coins className="w-4 h-4 text-amber-400" />
                  Distribuye 100 Puntos de Presupuesto Barrial
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Cada vecino/a asigna puntos según las prioridades que considera más urgentes para {city.name}.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Puntos Restantes:</span>
                <span
                  className={`text-2xl font-mono font-extrabold ${
                    remainingPoints === 0
                      ? 'text-emerald-400'
                      : remainingPoints > 0
                      ? 'text-amber-400'
                      : 'text-red-400'
                  }`}
                >
                  {remainingPoints} pts
                </span>
              </div>
            </div>

            {/* Category Sliders */}
            <div className="space-y-3.5">
              {/* Vivienda */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-sky-400 flex items-center gap-1.5">
                    <Building className="w-4 h-4" /> Vivienda Digna y Social
                  </span>
                  <span className="font-mono text-white font-extrabold text-sm">{budgetVote.vivienda} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetVote.vivienda}
                  onChange={(e) => handleBudgetChange('vivienda', Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Áreas Verdes */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <TreePine className="w-4 h-4" /> Parques, Huertos y Áreas Verdes
                  </span>
                  <span className="font-mono text-white font-extrabold text-sm">{budgetVote.areas_verdes} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetVote.areas_verdes}
                  onChange={(e) => handleBudgetChange('areas_verdes', Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Salud y Cuidados */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-red-400 flex items-center gap-1.5">
                    <Heart className="w-4 h-4" /> Centros de Salud y Sistema de Cuidados
                  </span>
                  <span className="font-mono text-white font-extrabold text-sm">{budgetVote.salud_cuidados} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetVote.salud_cuidados}
                  onChange={(e) => handleBudgetChange('salud_cuidados', Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Educación */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-400 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Educación, Guarderías y Cultura
                  </span>
                  <span className="font-mono text-white font-extrabold text-sm">{budgetVote.educacion_cultura} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetVote.educacion_cultura}
                  onChange={(e) => handleBudgetChange('educacion_cultura', Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Movilidad */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-violet-400 flex items-center gap-1.5">
                    <Bus className="w-4 h-4" /> Movilidad Sostenible y Rampas Accesibles
                  </span>
                  <span className="font-mono text-white font-extrabold text-sm">{budgetVote.movilidad} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetVote.movilidad}
                  onChange={(e) => handleBudgetChange('movilidad', Number(e.target.value))}
                  className="w-full accent-violet-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Empleo / Comercio */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-fuchsia-400 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" /> Empleo, Talleres y Comercio Cooperativo
                  </span>
                  <span className="font-mono text-white font-extrabold text-sm">{budgetVote.empleo_comercio} pts</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budgetVote.empleo_comercio}
                  onChange={(e) => handleBudgetChange('empleo_comercio', Number(e.target.value))}
                  className="w-full accent-fuchsia-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                id="submit-budget-vote-btn"
                onClick={handleCastVote}
                disabled={remainingPoints !== 0}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${
                  remainingPoints === 0
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white cursor-pointer shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {remainingPoints === 0
                    ? 'Confirmar y Enviar Voto Comunitario'
                    : `Faltan distribuir ${remainingPoints} puntos`}
                </span>
              </button>
            </div>
          </div>

          {/* Aggregated Community Averages & Results */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Consenso Colectivo Barrial
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Distribución acumulada de 1,280 votos de vecinos y líderes comunitarios en la asamblea:
            </p>

            <div className="space-y-3.5 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-sky-300 font-bold">1. Vivienda Digna</span>
                  <span className="font-mono text-white font-extrabold">29.4%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: '29.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-300 font-bold">2. Parques & Huertos</span>
                  <span className="font-mono text-white font-extrabold">24.1%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '24.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-300 font-bold">3. Salud & Cuidados</span>
                  <span className="font-mono text-white font-extrabold">18.6%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: '18.6%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-300 font-bold">4. Educación & Cultura</span>
                  <span className="font-mono text-white font-extrabold">12.5%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '12.5%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-violet-300 font-bold">5. Movilidad Accesible</span>
                  <span className="font-mono text-white font-extrabold">9.2%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-violet-500 h-full rounded-full" style={{ width: '9.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-fuchsia-300 font-bold">6. Empleo Cooperativo</span>
                  <span className="font-mono text-white font-extrabold">6.2%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-fuchsia-500 h-full rounded-full" style={{ width: '6.2%' }} />
                </div>
              </div>
            </div>

            {voteSubmitted && (
              <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 text-xs space-y-1 animate-in fade-in shadow-inner">
                <span className="font-extrabold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Voto Registrado Exitosamente
                </span>
                <p className="text-slate-300 font-medium">
                  Tus ponderaciones han sido sincronizadas con el motor de optimización del Escenario Híbrido.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Matriz de Priorización AHP Saaty Sub-Tab */}
      {activeSubTab === 'ahp' && (
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                Matriz de Comparación por Pares AHP (Analytic Hierarchy Process)
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Ponderación matemática multicriterio de Saaty para equilibrar objetivos ambientales, sociales y económicos.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`px-3.5 py-1.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 ${
                  ahpResult.isConsistent
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}
              >
                {ahpResult.isConsistent ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>
                  Ratio de Consistencia (CR): <strong className="font-mono">{ahpResult.consistencyRatio}</strong>{' '}
                  {ahpResult.isConsistent ? '(Consistente < 0.10)' : '(Inconsistente ≥ 0.10)'}
                </span>
              </div>
            </div>
          </div>

          {/* Matrix Weights Bento Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
            {INITIAL_AHP_CRITERIA.map((crit, idx) => (
              <div key={idx} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center space-y-1 shadow-inner hover:border-slate-700 transition-all">
                <span className="text-[11px] text-slate-400 font-semibold line-clamp-2 min-h-[32px]">{crit}</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono block">
                  {Math.round((ahpResult.weights[idx] || 0) * 100)}%
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">Peso de Importancia</span>
              </div>
            ))}
          </div>

          {/* Interactive Pairwise Comparer */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Ajustar Comparaciones por Pares (Escala Saaty 1-9):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Pair 1: Equidad vs Sostenibilidad */}
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-xs flex items-center justify-between gap-3 shadow-inner">
                <span className="text-slate-300 font-medium w-1/3">Equidad Social vs Ambiental</span>
                <select
                  value={ahpMatrixValues[1][0]}
                  onChange={(e) => handleAHPValueChange(1, 0, Number(e.target.value))}
                  className="bg-slate-800 text-emerald-300 text-xs py-1.5 px-3 rounded-xl border border-slate-700 font-mono font-bold"
                >
                  <option value={0.33}>0.33 (Mayor peso a Sostenibilidad)</option>
                  <option value={1}>1.0 (Igual importancia)</option>
                  <option value={2}>2.0 (Moderadamente más importante Equidad)</option>
                  <option value={3}>3.0 (Fuertemente más importante Equidad)</option>
                  <option value={5}>5.0 (Muy fuertemente)</option>
                </select>
              </div>

              {/* Pair 2: Equidad vs Costo */}
              <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-xs flex items-center justify-between gap-3 shadow-inner">
                <span className="text-slate-300 font-medium w-1/3">Equidad Social vs Costo</span>
                <select
                  value={ahpMatrixValues[1][3]}
                  onChange={(e) => handleAHPValueChange(1, 3, Number(e.target.value))}
                  className="bg-slate-800 text-emerald-300 text-xs py-1.5 px-3 rounded-xl border border-slate-700 font-mono font-bold"
                >
                  <option value={1}>1.0 (Igual)</option>
                  <option value={3}>3.0 (Priorizar Vivienda Social)</option>
                  <option value={4}>4.0 (Vivienda prioritaria sobre Costo)</option>
                  <option value={0.5}>0.5 (Priorizar Ahorro)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Foro Territorial de Deliberación Sub-Tab */}
      {activeSubTab === 'forum' && (
        <div className="space-y-4">
          {/* Header with New Proposal Button */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              Hilos de Debate Geolocalizados en {city.neighborhood}
            </h3>
            <button
              id="new-thread-modal-btn"
              onClick={() => setIsCreatingThread(!isCreatingThread)}
              className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Proponer Inquietud o Proyecto</span>
            </button>
          </div>

          {/* New Thread Form */}
          {isCreatingThread && (
            <form
              onSubmit={handleCreateThreadSubmit}
              className="bg-slate-900/80 backdrop-blur-md border border-sky-500/40 rounded-2xl p-5 shadow-2xl space-y-4 animate-in fade-in duration-200"
            >
              <h4 className="text-xs font-extrabold text-sky-300 uppercase tracking-wider">Publicar Nueva Propuesta o Alerta en el Mapa</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Título de la propuesta o inquietud..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="bg-slate-950 text-xs text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <div className="flex gap-2">
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="bg-slate-950 text-xs text-slate-200 p-3 rounded-xl border border-slate-800 w-1/2 font-medium"
                  >
                    <option value="vivienda">🏢 Vivienda</option>
                    <option value="espacio_publico">🌳 Espacio Público</option>
                    <option value="movilidad">🚡 Movilidad</option>
                    <option value="servicios">🏥 Servicios</option>
                    <option value="medio_ambiente">🌿 Medio Ambiente</option>
                  </select>
                  <select
                    value={newSentiment}
                    onChange={(e) => setNewSentiment(e.target.value as any)}
                    className="bg-slate-950 text-xs text-slate-200 p-3 rounded-xl border border-slate-800 w-1/2 font-medium"
                  >
                    <option value="propuesta">💡 Propuesta</option>
                    <option value="preocupacion">⚠️ Preocupación</option>
                    <option value="oportunidad">🌟 Oportunidad</option>
                  </select>
                </div>
              </div>
              <textarea
                placeholder="Describe los detalles, ubicación específica del barrio y argumentos comunitarios..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                rows={3}
                className="w-full bg-slate-950 text-xs text-white p-3 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingThread(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold px-5 py-2 rounded-xl transition-all shadow-md"
                >
                  Publicar en el Foro
                </button>
              </div>
            </form>
          )}

          {/* Thread Cards List */}
          <div className="space-y-4">
            {forumThreads.map((thread) => (
              <div
                key={thread.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-lg space-y-3.5 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide ${
                        thread.sentiment === 'propuesta'
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : thread.sentiment === 'preocupacion'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {thread.sentiment}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1 font-medium">
                      <Tag className="w-3 h-3 text-slate-500" /> {thread.category}
                    </span>
                    <span className="text-[11px] text-slate-500">| {thread.timestamp}</span>
                  </div>

                  {/* Upvote & Downvote */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onVoteThread(thread.id, 'up')}
                      className="flex items-center gap-1 bg-slate-950/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 hover:text-emerald-300 transition-colors shadow-inner"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono font-extrabold">{thread.upvotes}</span>
                    </button>
                    <button
                      onClick={() => onVoteThread(thread.id, 'down')}
                      className="flex items-center gap-1 bg-slate-950/80 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 hover:text-red-300 transition-colors shadow-inner"
                    >
                      <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                      <span className="font-mono font-extrabold">{thread.downvotes}</span>
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-extrabold text-white leading-snug">{thread.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{thread.content}</p>

                {/* Author footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-medium">
                  <span>
                    Iniciado por: <strong className="text-slate-200">{thread.author}</strong> ({thread.role})
                  </span>
                  <span className="font-mono text-slate-500">
                    Coords: [{thread.coordinates[0].toFixed(4)}, {thread.coordinates[1].toFixed(4)}]
                  </span>
                </div>

                {/* Comments List */}
                {thread.comments && thread.comments.length > 0 && (
                  <div className="space-y-2 pt-2">
                    {thread.comments.map((cmt) => (
                      <div
                        key={cmt.id}
                        className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-xs space-y-1 shadow-inner"
                      >
                        <div className="flex justify-between text-[11px]">
                          <span className="font-extrabold text-emerald-300">
                            {cmt.author} <span className="text-slate-500 font-normal">({cmt.role})</span>
                          </span>
                          <span className="text-slate-500">{cmt.timestamp}</span>
                        </div>
                        <p className="text-slate-300 font-medium">{cmt.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Escribir respuesta o aporte técnico..."
                    value={commentInputs[thread.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [thread.id]: e.target.value })
                    }
                    onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit(thread.id)}
                    className="flex-1 bg-slate-950 text-xs text-white py-2.5 px-3.5 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                  />
                  <button
                    onClick={() => handleCommentSubmit(thread.id)}
                    className="bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
