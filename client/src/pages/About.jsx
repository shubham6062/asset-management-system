export default function About() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink mb-6">About</h1>
      <div className="bg-white border border-slate-200 rounded-md p-6 max-w-lg text-sm text-slate-600 leading-relaxed">
        <p className="mb-3">
          AssetLedger is a simple asset inventory management system for tracking
          company hardware — laptops, desktops, routers, printers, and more.
        </p>
        <p>
          Admins can add, edit, and remove assets and manage user accounts.
          Regular users can view the dashboard and search the asset list.
        </p>
      </div>
    </div>
  );
}
