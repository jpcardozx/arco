export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-900 animate-pulse">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="h-96 bg-slate-800 rounded-xl mb-12"></div>
                <div className="space-y-8">
                    <div className="h-8 bg-slate-800 rounded w-1/3"></div>
                    <div className="h-32 bg-slate-800 rounded"></div>
                    <div className="h-32 bg-slate-800 rounded"></div>
                </div>
            </div>
        </div>
    )
}
