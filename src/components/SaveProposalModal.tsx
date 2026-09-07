import React, { useState } from 'react';
import { 
  X, 
  Save, 
  CheckCircle2, 
  Building2, 
  TreePine, 
  HeartHandshake, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Trash2, 
  Layers, 
  Home, 
  PlusCircle, 
  FolderCheck,
  Check
} from 'lucide-react';
import { PilotCity, ScenarioType, UrbanElement, SavedProposalProfile } from '../types';

interface SaveProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: PilotCity;
  activeScenario: ScenarioType;
  currentElements: UrbanElement[];
  savedProfiles: SavedProposalProfile[];
  onSaveToSlot: (
    slotNumber: 1 | 2 | 3, 
    name: string, 
    description: string, 
    elements: UrbanElement[]
  ) => void;
  onLoadSlot: (slotNumber: 1 | 2 | 3) => void;
  onClearSlot: (slotNumber: 1 | 2 | 3) => void;
}

export const SaveProposalModal: React.FC<SaveProposalModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  activeScenario,
  currentElements,
  savedProfiles,
  onSaveToSlot,
  onLoadSlot,
  onClearSlot
}) => {
  const [selectedSlot, setSelectedSlot] = useState<1 | 2 | 3>(1);
  const [proposalName, setProposalName] = useState<string>('');
  const [proposalDesc, setProposalDesc] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Initialize or update name when selectedSlot changes
  React.useEffect(() => {
    const existing = savedProfiles.find(p => p.slotNumber === selectedSlot);
    if (existing && existing.isFilled) {
      setProposalName(existing.name);
      setProposalDesc(existing.description);
    } else {
      setProposalName(`Propuesta Personalizada ${selectedSlot} - ${currentCity.name.split(' ')[0]}`);
      setProposalDesc(`Modificaciones de vivienda y equipamiento en escenario ${activeScenario}.`);
    }
  }, [selectedSlot, savedProfiles, currentCity, activeScenario]);

  if (!isOpen) return null;

  const currentSlotProfile = savedProfiles.find(p => p.slotNumber === selectedSlot);

  // Calculate breakdown for current elements being saved
  const housingCount = currentElements.filter(e => e.type === 'vivienda_social' || e.type === 'vivienda_incremental').length;
  const housingUnits = currentElements
    .filter(e => e.type === 'vivienda_social' || e.type === 'vivienda_incremental')
    .reduce((acc, curr) => acc + (curr.unitsCount || 0), 0);
  const greenCount = currentElements.filter(e => e.type === 'parque_verde').length;
  const healthSchoolCount = currentElements.filter(e => e.type === 'centro_salud' || e.type === 'escuela').length;
  const transitCivicCount = currentElements.filter(e => e.type === 'parada_transporte' || e.type === 'espacio_comunitario' || e.type === 'comercio_local').length;
  const totalCostUSD = currentElements.reduce((acc, curr) => acc + (curr.costEstimateUSD || 0), 0);

  const handleSave = () => {
    const finalName = proposalName.trim() || `Propuesta Perfil ${selectedSlot}`;
    const finalDesc = proposalDesc.trim() || `Guardado el ${new Date().toLocaleString()}`;
    
    onSaveToSlot(selectedSlot, finalName, finalDesc, [...currentElements]);
    setSaveSuccessMsg(`¡Propuesta guardada con éxito en el Perfil ${selectedSlot}!`);
    setTimeout(() => {
      setSaveSuccessMsg(null);
      onClose();
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/70 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
              <Save className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Guardar Propuesta de Co-Diseño
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  Hasta 3 perfiles
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Guarda tus cambios de zonificación, equipamientos y vivienda para analizarlos o compararlos.
              </p>
            </div>
          </div>
          <button
            id="close-save-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200 text-xs">
          
          {/* Success Banner */}
          {saveSuccessMsg && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-3.5 rounded-2xl flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="font-bold">{saveSuccessMsg}</span>
            </div>
          )}

          {/* Slot Selector Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Selecciona el Perfil de Guardado (Slot 1, 2 o 3)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((slotNum) => {
                const s = slotNum as 1 | 2 | 3;
                const profile = savedProfiles.find(p => p.slotNumber === s);
                const isSelected = selectedSlot === s;
                const isFilled = profile?.isFilled;

                return (
                  <button
                    key={s}
                    id={`profile-slot-btn-${s}`}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-950/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300'
                      }`}>
                        Perfil {s}
                      </span>
                      {isFilled ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <Check className="w-3 h-3" /> Guardado
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 italic">Vacío</span>
                      )}
                    </div>
                    <div className="truncate font-semibold text-slate-200 text-xs">
                      {isFilled ? profile.name : `Slot ${s} disponible`}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {isFilled ? `${profile.elements.length} elementos • ${profile.savedAt}` : 'Sin datos guardados'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Proposal Name & Notes Inputs */}
          <div className="space-y-3 bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              2. Nombre y Descripción del Perfil
            </label>
            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Nombre de la Propuesta</label>
              <input
                id="proposal-name-input"
                type="text"
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                placeholder="Ej. Plan Hídrico y Vivienda San Miguel 2026"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 font-medium mb-1">Notas / Justificación</label>
              <textarea
                id="proposal-desc-input"
                rows={2}
                value={proposalDesc}
                onChange={(e) => setProposalDesc(e.target.value)}
                placeholder="Describe los cambios realizados, criterios comunitarios o metas de vivienda..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Current State Snapshot to be Saved */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-400" />
                Resumen de Elementos Actuales a Guardar
              </span>
              <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20">
                {currentCity.name.split('(')[0]}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400 font-medium">Viviendas Nuevas</div>
                <div className="text-base font-bold text-sky-400 font-mono mt-0.5">{housingUnits} unid.</div>
                <div className="text-[10px] text-slate-500">{housingCount} bloques</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400 font-medium">Áreas Verdes</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{greenCount}</div>
                <div className="text-[10px] text-slate-500">parques / huertos</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400 font-medium">Salud y Educación</div>
                <div className="text-base font-bold text-amber-400 font-mono mt-0.5">{healthSchoolCount}</div>
                <div className="text-[10px] text-slate-500">equipamientos</div>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl">
                <div className="text-[10px] text-slate-400 font-medium">Inversión Estimada</div>
                <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">
                  ${(totalCostUSD / 1000).toFixed(0)}k
                </div>
                <div className="text-[10px] text-slate-500">USD estimada</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span>Total de elementos mapeados en el relieve:</span>
              <span className="font-bold text-white font-mono">{currentElements.length} elementos</span>
            </div>
          </div>

          {/* Slot Existing Data Actions (if filled) */}
          {currentSlotProfile && currentSlotProfile.isFilled && (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
              <div className="flex items-center gap-2">
                <FolderCheck className="w-4 h-4 text-amber-400" />
                <span>Este perfil ya tiene datos previos. Guardar sobreescribirá el perfil {selectedSlot}.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onLoadSlot(selectedSlot);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold text-[11px] transition-colors"
                >
                  Cargar Perfil
                </button>
                <button
                  type="button"
                  onClick={() => onClearSlot(selectedSlot)}
                  className="p-1 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                  title="Vaciar este perfil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            id="cancel-save-modal-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancelar
          </button>
          
          <button
            id="confirm-save-proposal-btn"
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/50 transition-all hover:scale-105 active:scale-95 border border-indigo-400/40"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Propuesta en Perfil {selectedSlot}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
