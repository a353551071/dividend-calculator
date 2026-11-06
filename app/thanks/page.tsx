import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You! Access Your Dividend Snowball Tracker',
  description: 'Your payment was successful. Download your 2026 Dividend Snowball & Portfolio Tracker spreadsheet.',
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 text-3xl font-bold mb-2">
          ✓
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-base text-slate-600 max-w-lg mx-auto">
          Thank you for purchasing the <strong>2026 Dividend Snowball & Portfolio Tracker</strong>.
          Your lifetime access is ready below.
        </p>
      </div>

      {/* Main Download Card */}
      <div className="bg-white rounded-2xl border-2 border-emerald-500/30 p-6 md:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Ready for Download
            </div>
            <div className="text-xl font-bold text-slate-900 mt-0.5">
              2026 Dividend Snowball Tracker (Master Edition)
            </div>
            <div className="text-xs text-slate-500">
              Compatible with Google Sheets & Microsoft Excel (.xlsx)
            </div>
          </div>

          <a
            href="/2026_Dividend_Snowball_Tracker_Master.xlsx"
            download
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md hover:shadow-emerald-600/25 flex items-center justify-center gap-2 no-underline"
          >
            <span>📥 Download Spreadsheet (.xlsx)</span>
          </a>
        </div>

        {/* 3 Quick Steps to Use in Google Sheets */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            How to open in Google Sheets (Recommended for Live Stock Prices):
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 leading-relaxed">
            <li>
              Click the green <strong>Download Spreadsheet</strong> button above to save the file.
            </li>
            <li>
              Go to <a href="https://drive.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">Google Drive</a>, click <strong>+ New</strong> → <strong>File upload</strong>, and select the downloaded file.
            </li>
            <li>
              Double-click the uploaded file and click <strong>Open with Google Sheets</strong> at the top. All <code>=GOOGLEFINANCE()</code> formulas will start updating automatically!
            </li>
          </ol>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 text-xs text-slate-600 border border-slate-200">
          💡 <strong>Tip</strong>: Bookmark this page or keep your Stripe email receipt handy so you can re-download this master template whenever you need a fresh copy.
        </div>
      </div>

      {/* Return to Calculators */}
      <div className="text-center pt-4">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 underline"
        >
          ← Return to Dividend Payout Calculator
        </Link>
      </div>
    </div>
  );
}
