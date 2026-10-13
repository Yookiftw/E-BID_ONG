import React from 'react';
import type { Tender } from '../data/mockTenders';
import { MOCK_TENDERS } from '../data/mockTenders';
import { TenderCard } from '../components/TenderCard';

interface DashboardProps {
  onSelectTender: (tender: Tender) => void;
}

export const DashboardPage: React.FC<DashboardProps> = ({ onSelectTender }) => {
  return (
    <section className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 rounded-2xl">
        <h1 className="text-3xl font-extrabold mb-2">Portal E-Bidding Logistik & WK Migas</h1>
        <p className="text-blue-200 max-w-2xl">
          Ajukan penawaran tender terenkripsi secara aman dan transparan untuk sektor Minyak dan Gas Bumi.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Daftar Tender Aktif</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TENDERS.map((tender) => (
            <TenderCard key={tender.id} tender={tender} onSelect={onSelectTender} />
          ))}
        </div>
      </div>
    </section>
  );
};