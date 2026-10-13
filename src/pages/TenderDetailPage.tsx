import React, { useState } from 'react';
import type { Tender } from '../data/mockTenders';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { ArrowLeft, Lock } from 'lucide-react';

interface TenderDetailProps {
  tender: Tender;
  onBack: () => void;
  onSubmitBid: (bidData: { tenderId: string; companyName: string; amount: number }) => void;
}

export const TenderDetailPage: React.FC<TenderDetailProps> = ({ tender, onBack, onSubmitBid }) => {
  const [companyName, setCompanyName] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [errors, setErrors] = useState<{ companyName?: string; bidAmount?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { companyName?: string; bidAmount?: string } = {};

    if (!companyName.trim()) {
      newErrors.companyName = 'Nama Perusahaan wajib diisi.';
    }

    const numericAmount = Number(bidAmount);
    if (!bidAmount) {
      newErrors.bidAmount = 'Nilai penawaran wajib diisi.';
    } else if (isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.bidAmount = 'Nilai penawaran harus berupa angka positif.';
    } else if (numericAmount < tender.minBid) {
      newErrors.bidAmount = `Nilai penawaran minimal Rp ${tender.minBid.toLocaleString('id-ID')}.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmitBid({
      tenderId: tender.id,
      companyName,
      amount: numericAmount,
    });
  };

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      <Button variant="secondary" onClick={onBack} className="flex items-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali ke Dashboard
      </Button>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">{tender.title}</h1>
        <p className="text-slate-600">{tender.description}</p>
        <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700">
          <p><strong>Lokasi:</strong> {tender.location}</p>
          <p><strong>Minimal Penawaran:</strong> Rp {tender.minBid.toLocaleString('id-ID')}</p>
          <p><strong>Tenggat Waktu:</strong> {tender.deadline}</p>
        </div>
      </div>

      {/* Formulir Pengajuan Penawaran */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <Lock className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-800">Formulir Penawaran Terenkripsi</h2>
        </div>

        <InputField
          id="companyName"
          label="Nama Perusahaan Peserta"
          placeholder="PT. Energi Indonesia"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          error={errors.companyName}
        />

        <InputField
          id="bidAmount"
          label="Nilai Penawaran (IDR)"
          type="number"
          placeholder={tender.minBid.toString()}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          error={errors.bidAmount}
        />

        <Button type="submit" variant="primary" className="w-full">
          Kirim Penawaran Terenkripsi
        </Button>
      </form>
    </section>
  );
};