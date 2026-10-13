import React from 'react';
import { Lock } from 'lucide-react';

interface SubmittedBid {
  tenderId: string;
  companyName: string;
  amount: number;
  timestamp: string;
}

interface HistoryProps {
  bids: SubmittedBid[];
}

export const HistoryPage: React.FC<HistoryProps> = ({ bids }) => {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Riwayat Penawaran Diajukan</h1>

      {bids.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl border border-slate-200 text-slate-500">
          Belum ada penawaran yang diajukan.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase">
              <tr>
                <th className="p-4">ID Tender</th>
                <th className="p-4">Perusahaan</th>
                <th className="p-4">Nilai Penawaran</th>
                <th className="p-4">Status Kerahasiaan</th>
                <th className="p-4">Waktu Submission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {bids.map((bid, index) => (
                <tr key={index}>
                  <td className="p-4 font-mono font-medium">{bid.tenderId}</td>
                  <td className="p-4">{bid.companyName}</td>
                  <td className="p-4 font-semibold">Rp {bid.amount.toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-medium border border-green-200">
                      <Lock className="h-3 w-3" /> Terenkripsi
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{bid.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};