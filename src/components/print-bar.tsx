"use client";

import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";

/**
 * On-screen toolbar for the /resume page. Hidden entirely when printing
 * (via the .no-print class + print CSS) so it never appears in the PDF.
 */
export function PrintBar() {
  return (
    <div className="no-print sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[820px] items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-teal-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
        >
          <Printer className="h-4 w-4" />
          Save as PDF
        </button>
      </div>
    </div>
  );
}
