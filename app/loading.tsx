export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-sm text-brand-muted">読み込み中...</p>
      </div>
    </div>
  );
}
