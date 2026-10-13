import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardPage } from './pages/DashboardPage';
import { TenderDetailPage } from './pages/TenderDetailPage';
import { HistoryPage } from './pages/HistoryPage';
import type { Tender } from './data/mockTenders';

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'detail' | 'history'>('dashboard');
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [submittedBids, setSubmittedBids] = useState<Array<{
    tenderId: string;
    companyName: string;
    amount: number;
    timestamp: string;
  }>>([]);

  const handleSelectTender = (tender: Tender) => {
    setSelectedTender(tender);
    setActiveTab('detail');
  };

  const handleSubmitBid = (bidData: { tenderId: string; companyName: string; amount: number }) => {
    const newBid = {
      ...bidData,
      timestamp: new Date().toLocaleString('id-ID'),
    };
    setSubmittedBids([newBid, ...submittedBids]);
    setActiveTab('history');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar activeTab={activeTab} setActiveTab={(tab) => setActiveTab(tab as any)} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'dashboard' && <DashboardPage onSelectTender={handleSelectTender} />}
        {activeTab === 'detail' && selectedTender && (
          <TenderDetailPage
            tender={selectedTender}
            onBack={() => setActiveTab('dashboard')}
            onSubmitBid={handleSubmitBid}
          />
        )}
        {activeTab === 'history' && <HistoryPage bids={submittedBids} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;