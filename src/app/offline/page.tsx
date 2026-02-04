export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-md w-full mx-4 p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-slate-800/50 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728m12.728 0A6.364 6.364 9 0112 5.636 6.364 6.364 0 005.636 12m12.728 0A6.364 6.364 0 0112 18.364 6.364 6.364 0 005.636 12M12 12h.01"
              />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Você está offline
            </h2>
            <p className="text-slate-400 text-sm">
              Volte quando a conexão for restaurada.
            </p>
          </div>

          {/* Action */}
          <a
            href="/"
            className="inline-block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center"
          >
            Tentar novamente
          </a>
        </div>
      </div>
    </div>
  )
}
