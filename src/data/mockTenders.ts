export interface Tender {
  id: string;
  title: string;
  category: 'Logistik' | 'Alat Berat' | 'Wilayah Kerja (WK)';
  location: string;
  minBid: number;
  deadline: string;
  description: string;
}

export const MOCK_TENDERS: Tender[] = [
  {
    id: 'TNDR-001',
    title: 'Pengadaan Tugboat & Barge Offshore Natuna',
    category: 'Logistik',
    location: 'Blok Natuna D-Alpha',
    minBid: 5000000000,
    deadline: '2026-11-01',
    description: 'Penyediaan 2 unit AHTS Vessel dan 1 Flat Top Barge untuk operasional lepas pantai.'
  },
  {
    id: 'TNDR-002',
    title: 'Sewa Rig Pengeboran Darat 1500 HP',
    category: 'Alat Berat',
    location: 'Blok Rokan, Riau',
    minBid: 12000000000,
    deadline: '2026-10-25',
    description: 'Penyediaan Land Rig kapasitas minimum 1500 HP beserta kru pengoperasian.'
  },
  {
    id: 'TNDR-003',
    title: 'Eksplorasi Wilayah Kerja Oil & Gas',
    category: 'Wilayah Kerja (WK)',
    location: 'Offshore Mahakam, Kaltim',
    minBid: 50000000000,
    deadline: '2026-12-15',
    description: 'Studi seismik 3D dan penawaran partisipasi intervensi sumur tua.'
  }
];