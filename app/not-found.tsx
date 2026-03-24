import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="text-center px-5">
        <h1 className="text-6xl font-serif font-bold text-dark mb-4">404</h1>
        <p className="text-lg text-dark-muted mb-8">ページが見つかりませんでした</p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 text-sm font-medium tracking-wider uppercase bg-terra text-white hover:bg-terra-hover transition-colors"
        >
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
