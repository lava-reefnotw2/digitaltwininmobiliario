import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  variant?: 'compact' | 'sidebar' | 'pill';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggleTheme,
  variant = 'compact',
  className = ''
}) => {
  const isDark = theme === 'dark';

  if (variant === 'sidebar') {
    return (
      <button
        id="sidebar-theme-toggle-btn"
        onClick={onToggleTheme}
        type="button"
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all text-xs font-bold border shadow-inner ${
          isDark
            ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700'
            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm'
        } ${className}`}
        title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
        aria-label="Alternar tema claro y oscuro"
      >
        <div className="flex items-center gap-2">
          {isDark ? (
            <div className="p-1 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Sun className="w-3.5 h-3.5 animate-spin-slow" />
            </div>
          ) : (
            <div className="p-1 rounded-lg bg-indigo-500/15 text-indigo-600 border border-indigo-500/30">
              <Moon className="w-3.5 h-3.5" />
            </div>
          )}
          <span className="font-semibold">{isDark ? 'Modo Oscuro' : 'Modo Claro'}</span>
        </div>

        {/* Sliding Switch Indicator */}
        <div
          className={`w-11 h-5 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
            isDark ? 'bg-slate-800 justify-start' : 'bg-emerald-600 justify-end'
          }`}
        >
          <div className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] leading-none">
            {isDark ? '🌙' : '☀️'}
          </div>
        </div>
      </button>
    );
  }

  // Compact Pill / Header button
  return (
    <button
      id="theme-toggle-btn"
      onClick={onToggleTheme}
      type="button"
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm group active:scale-95 cursor-pointer ${
        isDark
          ? 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border-slate-800 hover:border-slate-700 hover:text-white'
          : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300 shadow-sm'
      } ${className}`}
      title={isDark ? 'Cambiar a Modo Claro (☀️)' : 'Cambiar a Modo Oscuro (🌙)'}
      aria-label="Alternar tema claro y oscuro"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden sm:inline font-semibold">Modo Claro</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
          <span className="hidden sm:inline font-semibold">Modo Oscuro</span>
        </>
      )}
    </button>
  );
};
