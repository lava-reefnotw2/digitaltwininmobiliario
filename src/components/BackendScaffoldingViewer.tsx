import React, { useState } from 'react';
import { 
  Code2, 
  FileCode, 
  Copy, 
  Check, 
  Download, 
  Terminal, 
  Server, 
  Database, 
  FolderTree,
  ExternalLink,
  Layers,
  Container
} from 'lucide-react';
import { BACKEND_SCAFFOLDING_FILES } from '../data/scaffoldingCode';
import { ScaffoldingCodeFile } from '../types';

export const BackendScaffoldingViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ScaffoldingCodeFile>(BACKEND_SCAFFOLDING_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([selectedFile.content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = selectedFile.name.split(' ')[0];
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Top Scaffolding Header Bento Card */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-inner">
              <Code2 className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  Andamiaje Arquitectónico Full-Stack (GeoDjango + PostGIS + QGIS + Docker)
                </h2>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30">
                  Código Fuente
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Código fuente completo, modelos espaciales, endpoints REST, algoritmo AHP y despliegue modular local
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-code-btn"
              onClick={handleCopyCode}
              className="bg-slate-800/80 hover:bg-slate-700 text-emerald-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Archivo'}</span>
            </button>
            <button
              id="download-file-btn"
              onClick={handleDownloadFile}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Archivo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Architecture Highlights Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">PostgreSQL + PostGIS</h4>
            <p className="text-[11px] text-slate-400 font-medium">Tipos geométricos SRID 4326 y consultas espaciales</p>
          </div>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">GeoDjango + DRF</h4>
            <p className="text-[11px] text-slate-400 font-medium">Serializadores GeoFeature y API REST JSON/GeoJSON</p>
          </div>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">QGIS Server 3.34</h4>
            <p className="text-[11px] text-slate-400 font-medium">Servicios WMS/WFS para capas ráster y pendientes</p>
          </div>
        </div>
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 p-4 rounded-2xl flex items-center gap-3.5 shadow-md">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Container className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-white">Docker Compose</h4>
            <p className="text-[11px] text-slate-400 font-medium">Despliegue unificado para las 3 ciudades piloto</p>
          </div>
        </div>
      </div>

      {/* File Explorer & Code Viewer Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Files List Bento */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 shadow-xl space-y-2 lg:col-span-1">
          <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest px-2 block mb-2">
            Estructura del Proyecto
          </span>

          <div className="space-y-1.5">
            {BACKEND_SCAFFOLDING_FILES.map((file, idx) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex flex-col gap-0.5 ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="truncate font-semibold">{file.name.split(' ')[0]}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 truncate pl-5 font-mono">{file.path}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800/80 px-2 space-y-2">
            <span className="text-[11px] font-bold text-slate-300 block">Comando de Inicio Rápido:</span>
            <div className="bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px] text-emerald-400 shadow-inner">
              docker compose up --build -d
            </div>
          </div>
        </div>

        {/* Right: Code Inspector Bento */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-5 shadow-xl lg:col-span-3 space-y-3 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-mono text-emerald-400 font-bold">{selectedFile.path}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-mono font-bold">
                {selectedFile.language}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 max-w-md truncate font-medium">{selectedFile.description}</p>
          </div>

          {/* Syntax Highlighting Container */}
          <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800/90 overflow-auto max-h-[560px] font-mono text-xs text-slate-200 leading-relaxed shadow-inner">
            <pre>
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
