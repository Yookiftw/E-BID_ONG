import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-6 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>&copy; 2026 E-Bidding Migas Platform. Hak Cipta Dilindungi Undang-Undang.</p>
        <p className="text-xs text-slate-500 mt-1">Platform Transparan & Terenkripsi Sektor Minyak dan Gas Bumi.</p>
      </div>
    </footer>
  );
};