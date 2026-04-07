// This page is self explanatory. It displays the store homepage and compenents like header.
export default function Home() {
  return (
    <main className="mx-auto max-w-7xl bg-white px-6 py-10 text-black">
      <section className="rounded-xl border border-gray-200 bg-white p-8">
        <h1 className="mb-4 text-4xl font-bold">Welcome to StockDock</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-2 text-xl font-semibold">Featured Product</h2>
            <p className="text-sm">
              This area can later show your featured inventory item.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-2 text-xl font-semibold">Categories</h2>
            <p className="text-sm">
              Add product categories here later.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-2 text-xl font-semibold">Deals</h2>
            <p className="text-sm">
              Add store deals or promotions here later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}