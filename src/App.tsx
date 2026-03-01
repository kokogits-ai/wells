/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronDown, 
  MoreVertical, 
  Home, 
  ArrowRightLeft, 
  ArrowUpFromLine, 
  Menu,
  Eye,
  EyeOff,
  Lock,
  User,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  ShieldCheck,
  Search,
  PlusCircle,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status?: 'pending' | 'posted';
}

interface Account {
  id: string;
  type: string;
  number: string;
  balance: number;
  transactions: Transaction[];
}

type View = 'home' | 'accounts' | 'transfer' | 'deposit' | 'profile' | 'menu' | 'login' | 'accountDetails';

// --- Mock Data ---
const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    type: "Eva's Checking",
    number: '...9560',
    balance: 4200000.00,
    transactions: [
      { id: '1', date: '2026-02-21', description: 'Wire Transfer – Morgan Holdings LLC', amount: 450000.00, type: 'debit', status: 'posted' },
      { id: '2', date: '2026-02-20', description: 'Incoming Wire – Apex Capital', amount: 1200000.00, type: 'credit', status: 'posted' },
      { id: '3', date: '2026-02-19', description: 'ACH Payment – Property Tax', amount: 75000.00, type: 'debit', status: 'posted' },
      { id: '4', date: '2026-02-18', description: 'Dividend Payment – Vanguard Fund', amount: 320500.00, type: 'credit', status: 'posted' },
      { id: '5', date: '2026-02-17', description: 'International Transfer – UK Vendor', amount: 210750.00, type: 'debit', status: 'posted' },
      { id: '6', date: '2026-02-15', description: 'Incoming Wire – Real Estate Sale', amount: 3850000.00, type: 'credit', status: 'posted' },
      { id: '7', date: '2026-02-14', description: 'Credit Card Payment', amount: 45200.00, type: 'debit', status: 'posted' },
      { id: '8', date: '2026-02-12', description: 'Payroll Deposit – Executive Compensation', amount: 250000.00, type: 'credit', status: 'posted' },
      { id: '9', date: '2026-02-10', description: 'Investment Purchase – Tech Fund', amount: 1000000.00, type: 'debit', status: 'posted' },
      { id: '10', date: '2026-02-09', description: 'ATM Withdrawal – Private Banking', amount: 10000.00, type: 'debit', status: 'posted' },
      { id: '11', date: '2026-02-07', description: 'Interest Earned', amount: 18750.00, type: 'credit', status: 'posted' },
      { id: '12', date: '2026-02-05', description: 'Wire Transfer – Dubai Holdings', amount: 600000.00, type: 'debit', status: 'posted' },
      { id: '13', date: '2026-02-03', description: 'Incoming Wire – Consulting Fee', amount: 480000.00, type: 'credit', status: 'posted' },
      { id: '14', date: '2026-02-02', description: 'Luxury Auto Payment', amount: 220000.00, type: 'debit', status: 'posted' },
      { id: '15', date: '2026-02-01', description: 'Investment Dividend – Energy Fund', amount: 150000.00, type: 'credit', status: 'posted' }
    ]
  },
  {
    id: '2',
    type: 'BUSINESS MARKET RATE SAVINGS',
    number: '...2286',
    balance: 822250.08,
    transactions: [
      { id: 't4', date: 'Feb 01', description: 'Interest Payment', amount: 342.12, type: 'credit', status: 'posted' },
    ]
  },
  {
    id: '3',
    type: 'CHECKING',
    number: '...3813',
    balance: 2844824.33,
    transactions: [
      { id: 't5', date: 'Feb 22', description: 'Whole Foods Market', amount: 84.12, type: 'debit', status: 'posted' },
      { id: 't6', date: 'Feb 21', description: 'Apple Store Purchase', amount: 1299.00, type: 'debit', status: 'posted' },
      { id: 't7', date: 'Feb 15', description: 'Payroll Deposit', amount: 8500.00, type: 'credit', status: 'posted' },
    ]
  },
];

const USER_PROFILE = {
  fullName: 'Eva Dlotts',
  email: 'evadavis38@gmail.com',
  phone: '+12293389560',
  address: '925 west gordon ave albany ga 31701',
  accountNumber: '12345678',
  sex: 'Female'
};

// --- Components ---

const MOCK_BANKS = [
  "JPMorgan Chase", "Bank of America", "Citigroup", "Wells Fargo", "Goldman Sachs",
  "Morgan Stanley", "U.S. Bancorp", "PNC Financial Services", "Truist Financial",
  "Charles Schwab", "TD Bank", "Capital One", "BNY Mellon", "State Street",
  "American Express", "Citizens Financial Group", "Fifth Third Bank", "KeyCorp",
  "Huntington Bancshares", "Regions Financial Corporation", "Northern Trust",
  "M&T Bank", "Discover Financial", "Ally Financial", "Santander Bank"
];

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Designated credentials
    if (accountNumber === '170432158' && password === 'Eva2026!') {
      onLogin();
    } else {
      setError('Invalid account number or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#D71E28] flex flex-col items-center justify-center px-6 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center mb-10">
          <h1 className="text-[#D71E28] text-4xl font-serif font-bold tracking-tight">WELLS FARGO</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Username / Account Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D71E28] focus:border-[#D71E28] sm:text-sm"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#D71E28] focus:border-[#D71E28] sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#D71E28] hover:bg-[#b01821] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D71E28] transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-600 text-xs text-center font-bold">{error}</p>}
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between text-xs font-bold text-[#004B87]">
          <button>Forgot Password?</button>
          <button>Enroll Now</button>
        </div>
      </div>
      <p className="mt-8 text-white/60 text-[10px] text-center max-w-xs">
        © 1999 - 2026 Wells Fargo. All rights reserved. NMLSR ID 399801
      </p>
    </div>
  );
};

const HomePage = ({ account, onMenuClick, onTransferClick }: { account: Account, onMenuClick: () => void, onTransferClick: () => void }) => {
  return (
    <div className="min-h-screen bg-white font-sans pb-20 sm:pb-10 sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      {/* Header (Mobile Only) */}
      <header className="sm:hidden bg-[#D71E28] text-white py-4 px-4 flex flex-col items-center sticky top-0 z-30 shadow-lg">
        <div className="w-full flex justify-between items-center">
          <div className="w-8" /> {/* Spacer */}
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-serif font-bold tracking-widest">WELLS FARGO</h1>
          </div>
          <button onClick={onMenuClick} className="p-1 active:bg-white/10 rounded-md transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Account Info */}
      <div className="text-center py-6 border-b border-gray-100">
        <h2 className="text-[#8C1B1B] font-serif text-2xl">{account.type}</h2>
        <p className="text-gray-500 text-sm mt-1">{account.number}</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 px-6 py-8 border-b border-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-2xl text-[#D71E28] shadow-sm active:scale-95 transition-transform">
            <CreditCard className="h-6 w-6" />
          </div>
          <span className="text-[10px] text-center font-bold text-gray-600 uppercase tracking-tighter">Pay Bills</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-2xl text-[#D71E28] shadow-sm active:scale-95 transition-transform">
            <ArrowUpFromLine className="h-6 w-6" />
          </div>
          <span className="text-[10px] text-center font-bold text-gray-600 uppercase tracking-tighter">Deposit</span>
        </div>
        <button onClick={onTransferClick} className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-2xl text-[#D71E28] shadow-sm active:scale-95 transition-transform">
            <ArrowRightLeft className="h-6 w-6" />
          </div>
          <span className="text-[10px] text-center font-bold text-gray-600 uppercase tracking-tighter">Transfer</span>
        </button>
        <button onClick={onTransferClick} className="flex flex-col items-center space-y-2">
          <div className="w-14 h-14 flex items-center justify-center bg-red-50 rounded-2xl text-[#D71E28] shadow-sm active:scale-95 transition-transform">
            <ArrowUpRight className="h-6 w-6" />
          </div>
          <span className="text-[10px] text-center font-bold text-gray-600 uppercase tracking-tighter">Send</span>
        </button>
      </div>

      {/* Balance Section */}
      <div className="px-8 py-8 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Available balance</span>
          <div className="text-4xl font-bold text-gray-900 mt-1 tracking-tighter">
            ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <ChevronRight className="h-6 w-6 text-gray-300" />
      </div>
      <div className="px-6 py-3 text-center border-b border-gray-200">
        <button className="text-[#004B87] text-sm font-medium">Show Balance Details</button>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-300">
        <div className="p-3 border-r border-gray-300 bg-gray-50">
          <Search className="h-5 w-5 text-[#004B87]" />
        </div>
        <button className="flex-1 py-3 text-sm font-bold text-[#8C1B1B] border-b-4 border-[#8C1B1B]">
          All Transactions
        </button>
        <button className="flex-1 py-3 text-sm font-bold text-gray-500">
          Deposits
        </button>
      </div>

      {/* Transaction List */}
      <div className="bg-white">
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-100">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Activity</span>
        </div>
        {account.transactions.map(tx => (
          <div key={tx.id} className="px-8 py-5 border-b border-gray-50 flex justify-between items-center active:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                {tx.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </div>
              <div className="max-w-[180px]">
                <p className="text-xs font-bold text-gray-800 leading-tight uppercase tracking-tight">{tx.description}</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">{tx.date}</p>
              </div>
            </div>
            <p className={`text-sm font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
              {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      {/* Floating Map Pin */}
      <div className="fixed bottom-24 left-6">
        <div className="bg-[#00A9E0] p-3 rounded-full shadow-lg">
          <MapPin className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const AccountsPage = ({ accounts, onSelectAccount }: { accounts: Account[], onSelectAccount: (a: Account) => void }) => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20 sm:pb-10 font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      <header className="bg-[#D71E28] text-white py-4 px-4 flex justify-center items-center sticky top-0 z-30 shadow-md">
        <h1 className="text-xl font-serif font-bold tracking-widest">ACCOUNTS</h1>
      </header>
      <div className="flex flex-col">
        {accounts.map((account) => (
          <button 
            key={account.id} 
            onClick={() => onSelectAccount(account)}
            className="bg-white border-b border-gray-100 p-6 relative text-left active:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[#8C1B1B] font-bold text-lg leading-tight uppercase tracking-wide">
                  {account.type}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{account.number}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-300" />
            </div>
            <div className="mt-4 flex flex-col items-end">
              <span className="text-2xl font-bold text-gray-900">
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-gray-500 text-xs mt-1 font-bold uppercase tracking-wider">Available balance</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const MenuPage = ({ onNavigate, onLogout }: { onNavigate: (v: View) => void, onLogout: () => void }) => {
  const menuItems = [
    { label: 'Account Profile', icon: User, view: 'profile' as View },
    { label: 'Accounts', icon: CreditCard, view: 'accounts' as View },
    { label: 'Transfer & Pay', icon: ArrowRightLeft, view: 'transfer' as View },
    { label: 'Settings', icon: Settings, view: 'home' as View },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      <header className="bg-[#D71E28] text-white py-5 px-6 flex items-center sticky top-0 z-30 shadow-md">
        <h1 className="text-xl font-serif font-bold tracking-widest">MENU</h1>
      </header>
      <div className="mt-4 bg-white border-y border-gray-200">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => onNavigate(item.view)}
            className="w-full flex items-center justify-between p-5 border-b border-gray-100 last:border-0 active:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <item.icon className="h-5 w-5 text-[#D71E28]" />
              </div>
              <span className="text-gray-800 font-bold text-sm uppercase tracking-wide">{item.label}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-300" />
          </button>
        ))}
      </div>
      <div className="mt-8 px-6">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center space-x-2 p-5 bg-white border-2 border-red-100 rounded-xl text-red-600 font-bold shadow-sm active:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

const ProfilePage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      <header className="bg-[#D71E28] text-white py-4 px-4 flex items-center sticky top-0 z-30 shadow-md">
        <button onClick={onBack} className="absolute left-4 p-1 active:bg-white/10 rounded-md transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="w-full text-center text-lg font-serif font-bold tracking-widest">PROFILE</h1>
      </header>
      <div className="p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#8C1B1B] p-8 text-white text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/10">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold">{USER_PROFILE.fullName}</h2>
            <p className="text-white/70 text-sm font-medium">Member since 2018</p>
          </div>
          <div className="p-6 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Gender</p>
                <p className="text-gray-800 font-bold">{USER_PROFILE.sex}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Email Address</p>
                <p className="text-gray-800 font-bold">{USER_PROFILE.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Phone Number</p>
                <p className="text-gray-800 font-bold">{USER_PROFILE.phone}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Primary Account</p>
                <p className="text-gray-800 font-bold">{USER_PROFILE.accountNumber}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Mailing Address</p>
                <p className="text-gray-800 font-bold leading-tight">{USER_PROFILE.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountDetails = ({ account, onBack }: { account: Account, onBack: () => void }) => {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      <AnimatePresence>
        {selectedTx && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-50 flex flex-col"
          >
            <header className="bg-[#D71E28] text-white py-4 px-4 flex items-center shadow-md">
              <button onClick={() => setSelectedTx(null)} className="absolute left-4 p-1 active:bg-white/10 rounded-md transition-colors">
                <ChevronLeft className="h-6 w-6" />
              </button>
              <h1 className="w-full text-center text-lg font-serif font-bold tracking-widest uppercase">Transaction</h1>
            </header>
            
            <div className="p-10 text-center border-b border-gray-100">
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${selectedTx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {selectedTx.type === 'credit' ? <ArrowDownLeft className="h-10 w-10" /> : <ArrowUpRight className="h-10 w-10" />}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 leading-tight uppercase tracking-tight">{selectedTx.description}</h2>
              <p className="text-gray-500 text-sm font-medium">{selectedTx.date}</p>
              <p className={`text-4xl font-bold mt-8 ${selectedTx.type === 'credit' ? 'text-green-700' : 'text-gray-900'}`}>
                {selectedTx.type === 'credit' ? '+' : '-'}${selectedTx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="p-6 space-y-8">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Status</span>
                <span className="text-gray-900 font-bold capitalize px-3 py-1 bg-gray-100 rounded-full text-xs">{selectedTx.status}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Transaction ID</span>
                <span className="text-gray-900 font-mono text-xs font-bold">WF-{selectedTx.id}-TXN-2026</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Account</span>
                <span className="text-gray-900 font-bold text-sm">{account.type}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Category</span>
                <span className="text-gray-900 font-bold text-sm">{selectedTx.type === 'credit' ? 'Income' : 'Expense'}</span>
              </div>
            </div>

            <div className="mt-auto p-6 pb-10">
              <button 
                onClick={() => setSelectedTx(null)}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-[#D71E28] text-white py-4 px-4 flex items-center sticky top-0 z-30 shadow-md">
        <button onClick={onBack} className="absolute left-4 p-1 active:bg-white/10 rounded-md transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="w-full text-center text-lg font-serif font-bold tracking-widest">ACCOUNT DETAILS</h1>
      </header>

      <div className="p-8 bg-white border-b border-gray-200">
        <h2 className="text-[#8C1B1B] font-bold text-2xl uppercase tracking-wide leading-tight">{account.type}</h2>
        <p className="text-gray-500 text-sm font-medium mt-1">{account.number}</p>
        <div className="mt-8">
          <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Available Balance</p>
          <p className="text-5xl font-bold text-gray-900 mt-2 tracking-tighter">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="px-8 py-4 bg-gray-50 border-y border-gray-100">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction History</h3>
        </div>
        <div className="bg-white">
          {account.transactions.length > 0 ? (
            account.transactions.map((tx) => (
              <button 
                key={tx.id} 
                onClick={() => setSelectedTx(tx)}
                className="w-full px-8 py-5 border-b border-gray-50 flex justify-between items-center text-left active:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    {tx.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-xs leading-tight uppercase tracking-tight">{tx.description}</p>
                    <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">{tx.date}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>
                  {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </button>
            ))
          ) : (
            <div className="p-12 text-center text-gray-400">
              <p>No recent transactions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TransferFlow = ({ accounts, onComplete, onCancel }: { accounts: Account[], onComplete: (amount: number) => void, onCancel: () => void }) => {
  const [step, setStep] = useState<'details' | 'verify' | 'success'>('details');
  const [fromAccount, setFromAccount] = useState(accounts[0].id);
  const [toAccount, setToAccount] = useState('');
  const [selectedBank, setSelectedBank] = useState(MOCK_BANKS[0]);
  const [amount, setAmount] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && toAccount) setStep('verify');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
      onComplete(parseFloat(amount));
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-[#D71E28] p-6 text-center text-white">
            <h2 className="text-xl font-serif font-bold tracking-widest">WELLS FARGO</h2>
            <p className="text-xs mt-1 opacity-80 uppercase tracking-widest">Transaction Receipt</p>
          </div>
          
          <div className="p-8 space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-50 rounded-full mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Transaction Pending</h3>
              <p className="text-sm text-gray-500">Your transfer is being processed and will appear in your history shortly.</p>
            </div>

            <div className="border-t border-b border-dashed border-gray-200 py-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount</span>
                <span className="font-bold text-gray-900">${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">From Account</span>
                <span className="font-medium text-gray-900">{accounts.find(a => a.id === fromAccount)?.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">To Recipient</span>
                <span className="font-medium text-gray-900">{toAccount} ({selectedBank})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reference Number</span>
                <span className="font-mono text-gray-900">WF-{Math.floor(Math.random() * 100000000)}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <p className="text-[10px] text-blue-800 leading-relaxed">
                Notice: This transaction is currently pending verification. Funds may be held for up to 24 hours depending on the recipient's bank policies.
              </p>
            </div>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <button 
              onClick={onCancel}
              className="w-full py-4 bg-[#D71E28] text-white rounded-md font-bold shadow-md hover:bg-[#b01821] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
        <p className="mt-8 text-gray-400 text-[10px] text-center max-w-xs">
          Wells Fargo Bank, N.A. Member FDIC.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      <header className="bg-[#D71E28] text-white py-4 px-4 flex items-center sticky top-0 z-30 shadow-md">
        <button onClick={onCancel} className="absolute left-4 p-1 active:bg-white/10 rounded-md transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="w-full text-center text-lg font-serif font-bold tracking-widest">
          {step === 'details' ? 'TRANSFER' : 'VERIFY'}
        </h1>
      </header>

      <div className="p-8">
        {step === 'details' ? (
          <form onSubmit={handleDetailsSubmit} className="space-y-8">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">From Account</label>
              <select 
                className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-bold text-gray-800 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
              >
                {accounts.map(a => (
                  <option key={a.id} value={a.id}>{a.type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Recipient Bank</label>
              <select 
                className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-bold text-gray-800 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                {MOCK_BANKS.map(bank => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">To Account / Recipient</label>
              <input 
                type="text" 
                placeholder="Account or Routing Number"
                className="w-full p-4 border border-gray-200 rounded-xl bg-white font-bold text-gray-800 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  className="w-full p-4 pl-10 border border-gray-200 rounded-xl bg-white font-bold text-gray-800 text-2xl focus:ring-2 focus:ring-red-100 outline-none transition-all"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-[#D71E28] text-white rounded-xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all mt-10">
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-50 p-4 rounded-full">
                <ShieldCheck className="h-12 w-12 text-[#D71E28]" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Security Verification</h3>
            <p className="text-gray-500 text-sm">We've sent a 6-digit authorization code to your registered email address <b>{USER_PROFILE.email}</b>.</p>
            
            <div className="mt-8">
              <input 
                type="text" 
                maxLength={6}
                placeholder="000000"
                className="w-full text-center text-3xl tracking-[1em] font-mono p-4 border-b-2 border-[#D71E28] focus:outline-none bg-transparent"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isVerifying}
              className="w-full py-3 bg-[#D71E28] text-white rounded-md font-bold mt-8 flex items-center justify-center space-x-2"
            >
              {isVerifying ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>Verify & Send</span>
              )}
            </button>
            <button type="button" className="text-[#D71E28] text-sm font-bold">Resend Code</button>
          </form>
        )}
      </div>
    </div>
  );
};

const DepositFlow = ({ accounts, onComplete, onCancel }: { accounts: Account[], onComplete: (amount: number) => void, onCancel: () => void }) => {
  const [step, setStep] = useState<'details' | 'verify' | 'success'>('details');
  const [toAccount, setToAccount] = useState(accounts[0].id);
  const [amount, setAmount] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount) setStep('verify');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('success');
      onComplete(parseFloat(amount));
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-50 p-6 rounded-full mb-6">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Deposit Successful</h2>
        <p className="text-gray-500 mb-8">Your check deposit of ${parseFloat(amount).toLocaleString()} has been submitted for processing.</p>
        <button onClick={onCancel} className="w-full py-3 bg-[#D71E28] text-white rounded-md font-bold">Back to Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans sm:rounded-2xl sm:shadow-xl sm:overflow-hidden">
      <header className="bg-[#D71E28] text-white py-4 px-4 flex items-center sticky top-0 z-30 shadow-md">
        <button onClick={onCancel} className="absolute left-4 p-1 active:bg-white/10 rounded-md transition-colors"><ChevronLeft className="h-6 w-6" /></button>
        <h1 className="w-full text-center text-lg font-serif font-bold tracking-widest">
          {step === 'details' ? 'DEPOSIT' : 'VERIFY'}
        </h1>
      </header>

      <div className="p-8">
        {step === 'details' ? (
          <form onSubmit={handleDetailsSubmit} className="space-y-8">
            <div className="bg-gray-50 p-10 border-2 border-dashed border-gray-200 rounded-2xl text-center active:bg-gray-100 transition-colors">
              <PlusCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Front of Check</p>
            </div>
            <div className="bg-gray-50 p-10 border-2 border-dashed border-gray-200 rounded-2xl text-center active:bg-gray-100 transition-colors">
              <PlusCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Back of Check</p>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Deposit To</label>
              <select className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 font-bold text-gray-800 focus:ring-2 focus:ring-red-100 outline-none transition-all" value={toAccount} onChange={(e) => setToAccount(e.target.value)}>
                {accounts.map(a => <option key={a.id} value={a.id}>{a.type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400 font-bold">$</span>
                <input type="number" placeholder="0.00" className="w-full p-4 pl-10 border border-gray-200 rounded-xl bg-white font-bold text-gray-800 text-2xl focus:ring-2 focus:ring-red-100 outline-none transition-all" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="w-full py-5 bg-[#D71E28] text-white rounded-xl font-bold text-lg shadow-xl active:scale-[0.98] transition-all mt-10">Continue</button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6 text-center">
            <div className="flex justify-center mb-4"><div className="bg-red-50 p-4 rounded-full"><ShieldCheck className="h-12 w-12 text-[#D71E28]" /></div></div>
            <h3 className="text-xl font-bold text-gray-900">Security Verification</h3>
            <p className="text-gray-500 text-sm">Confirm OTP code from email address <b>{USER_PROFILE.email}</b> to complete your deposit.</p>
            <div className="mt-8">
              <input type="text" maxLength={6} placeholder="000000" className="w-full text-center text-3xl tracking-[1em] font-mono p-4 border-b-2 border-[#D71E28] focus:outline-none bg-transparent" value={authCode} onChange={(e) => setAuthCode(e.target.value)} required />
            </div>
            <button type="submit" disabled={isVerifying} className="w-full py-3 bg-[#D71E28] text-white rounded-md font-bold mt-8 flex items-center justify-center space-x-2">
              {isVerifying ? <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <span>Verify & Submit</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('login');
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleTransferComplete = (amount: number) => {
    setAccounts(prev => prev.map((acc, idx) => idx === 0 ? { ...acc, balance: acc.balance - amount } : acc));
  };

  const handleDepositComplete = (amount: number) => {
    setAccounts(prev => prev.map((acc, idx) => idx === 0 ? { ...acc, balance: acc.balance + amount } : acc));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Desktop Navigation */}
      {view !== 'login' && (
        <nav className="hidden sm:block bg-[#D71E28] text-white shadow-md z-50 sticky top-0">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-serif font-bold tracking-widest">WELLS FARGO</h1>
              <div className="flex space-x-6">
                <button onClick={() => setView('home')} className={`text-sm font-bold uppercase tracking-wide hover:text-white/80 transition-colors ${view === 'home' ? 'border-b-2 border-white pb-1' : ''}`}>Home</button>
                <button onClick={() => setView('accounts')} className={`text-sm font-bold uppercase tracking-wide hover:text-white/80 transition-colors ${view === 'accounts' ? 'border-b-2 border-white pb-1' : ''}`}>Accounts</button>
                <button onClick={() => setView('transfer')} className={`text-sm font-bold uppercase tracking-wide hover:text-white/80 transition-colors ${view === 'transfer' ? 'border-b-2 border-white pb-1' : ''}`}>Transfer</button>
                <button onClick={() => setView('deposit')} className={`text-sm font-bold uppercase tracking-wide hover:text-white/80 transition-colors ${view === 'deposit' ? 'border-b-2 border-white pb-1' : ''}`}>Deposit</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={() => setView('profile')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <User className="h-5 w-5" />
              </button>
              <button onClick={() => setView('menu')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>
      )}

      <div className="flex-1 flex flex-col relative overflow-x-hidden">
        <div className="flex-1 overflow-y-auto pb-24 sm:pb-12 sm:px-6 sm:py-8">
          <AnimatePresence mode="wait">
            {view === 'login' && (
              <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">
                <LoginPage onLogin={() => setView('home')} />
              </motion.div>
            )}
            {view === 'home' && (
              <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <HomePage account={accounts[0]} onMenuClick={() => setView('menu')} onTransferClick={() => setView('transfer')} />
              </motion.div>
            )}
            {view === 'accounts' && (
              <motion.div key="accounts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <AccountsPage 
                  accounts={accounts} 
                  onSelectAccount={(a) => { setSelectedAccount(a); setView('accountDetails'); }}
                />
              </motion.div>
            )}
            {view === 'accountDetails' && selectedAccount && (
              <motion.div key="details" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <AccountDetails account={selectedAccount} onBack={() => setView('accounts')} />
              </motion.div>
            )}
            {view === 'transfer' && (
              <motion.div key="transfer" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <TransferFlow accounts={accounts} onComplete={handleTransferComplete} onCancel={() => setView('home')} />
              </motion.div>
            )}
            {view === 'deposit' && (
              <motion.div key="deposit" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <DepositFlow accounts={accounts} onComplete={handleDepositComplete} onCancel={() => setView('home')} />
              </motion.div>
            )}
            {view === 'menu' && (
              <motion.div key="menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <MenuPage onNavigate={(v) => setView(v)} onLogout={() => setView('login')} />
              </motion.div>
            )}
            {view === 'profile' && (
              <motion.div key="profile" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="max-w-6xl mx-auto w-full bg-white min-h-screen shadow-sm">
                <ProfilePage onBack={() => setView('menu')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        {view !== 'login' && (
          <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <div className="max-w-6xl mx-auto flex justify-around items-center pt-3 pb-6 px-1">
              <button onClick={() => setView('home')} className={`flex flex-col items-center space-y-1 transition-colors ${view === 'home' ? 'text-[#D71E28]' : 'text-gray-400'}`}>
                <Home className="h-6 w-6" />
                <span className="text-[10px] font-bold">Home</span>
              </button>
              <button onClick={() => setView('accounts')} className={`flex flex-col items-center space-y-1 transition-colors ${view === 'accounts' ? 'text-[#D71E28]' : 'text-gray-400'}`}>
                <CreditCard className="h-6 w-6" />
                <span className="text-[10px] font-bold">Accounts</span>
              </button>
              <button onClick={() => setView('transfer')} className={`flex flex-col items-center space-y-1 transition-colors ${view === 'transfer' ? 'text-[#D71E28]' : 'text-gray-400'}`}>
                <div className="relative">
                  <ArrowRightLeft className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                    <span className="text-[8px] font-bold">$</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold">Transfer</span>
              </button>
              <button onClick={() => setView('deposit')} className={`flex flex-col items-center space-y-1 transition-colors ${view === 'deposit' ? 'text-[#D71E28]' : 'text-gray-400'}`}>
                <ArrowUpFromLine className="h-6 w-6" />
                <span className="text-[10px] font-bold">Deposit</span>
              </button>
              <button onClick={() => setView('menu')} className={`flex flex-col items-center space-y-1 transition-colors ${view === 'menu' ? 'text-[#D71E28]' : 'text-gray-400'}`}>
                <Menu className="h-6 w-6" />
                <span className="text-[10px] font-bold">Menu</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
