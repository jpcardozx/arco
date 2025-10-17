// Enhanced loading component
export function LoadingSpinner({ size = 'md', message }: { size?: 'sm' | 'md' | 'lg'; message?: string }) {
  const sizeClasses = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-t-2 border-b-2',
    lg: 'h-16 w-16 border-t-4 border-b-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-blue-600`}
        role="status"
        aria-label="Carregando"
      />
      {message && (
        <p className="text-gray-600 text-center animate-pulse">{message}</p>
      )}
    </div>
  );
}

// Enhanced error display
export function ErrorDisplay({
  title = 'Erro',
  message,
  action,
}: {
  title?: string;
  message: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-900 mb-1">{title}</h3>
          <p className="text-red-700">{message}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Success display
export function SuccessDisplay({ message }: { message: string }) {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-green-800 font-medium">{message}</p>
      </div>
    </div>
  );
}

// Info display
export function InfoDisplay({ message }: { message: string }) {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-blue-800">{message}</p>
      </div>
    </div>
  );
}

// Skeleton loader
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-10 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}

// Progress indicator
export function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Passo {current} de {total}
        </span>
        <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
