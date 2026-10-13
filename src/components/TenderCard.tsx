import React from 'react';
import type { Tender } from '../data/mockTenders';
import { Button } from './Button';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

interface TenderCardProps {
  tender: Tender;
  onSelect: (tender: Tender) => void;
}

export const TenderCard: React.FC<TenderCardProps> = ({ tender, onSelect }) => {
  return (
    <article className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
            {tender.category}
          </span>
          <span className="text-xs text-slate-500 font-mono">{tender.id}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{tender.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{tender.description}</p>
        
        <div className="space-y-2 text-sm text-slate-600 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" /> {tender.location}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-slate-400" /> Min. Bid: Rp {tender.minBid.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" /> Tenggat: {tender.deadline}
          </div>
        </div>
      </div>
      
      <Button variant="primary" onClick={() => onSelect(tender)} className="w-full">
        Ajukan Penawaran
      </Button>
    </article>
  );
};