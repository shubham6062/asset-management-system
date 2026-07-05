import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-ink text-white flex flex-col items-center justify-center px-6">
      <p className="asset-tag mb-6">SYS-001</p>
      <h1 className="text-4xl font-semibold mb-3 text-center">AssetLedger</h1>
      <p className="text-slate-300 max-w-md text-center mb-8">
        Track every laptop, desktop, and device your team owns — who has it,
        what state it's in, and where it lives.
      </p>
      <Link
        to="/login"
        className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-md font-medium"
      >
        Log in
      </Link>
    </div>
  );
}
