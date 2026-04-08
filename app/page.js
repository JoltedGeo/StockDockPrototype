import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Hero Section */}
      <section className="mb-10 grid gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-8">
        <div className="flex flex-col justify-center">
          <p className="mb-3 inline-block w-fit rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
            Satguru Store
          </p>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            Welcome to StockDock
          </h1>

          <p className="mb-6 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
            Explore household essentials, kitchen tools, workspace products,
            and bulk deals in one place. Search products, browse categories,
            and shop smarter with Satguru Store.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/search"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Shop Products
            </Link>

            <Link
              href="/account"
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
            >
              My Account
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <img
            src="/hanger.jpg"
            alt="Featured Satguru product"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Featured + Categories + Deals */}
      <section className="mb-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">
            Featured Product
          </h2>
          <p className="mb-4 text-gray-600">
            Highlight a popular store item here to attract users quickly.
          </p>
          <img
            src="/hanger.jpg"
            alt="Featured Product"
            className="mb-4 h-44 w-full rounded-xl object-cover"
          />
          <p className="mb-4 font-semibold text-gray-900">
            Stainless Steel Hanger
          </p>
          <Link
            href="/search"
            className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            View Product
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Categories</h2>
          <p className="mb-4 text-gray-600">
            Browse products by type and find what you need faster.
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="rounded-lg bg-gray-50 px-4 py-3">Kitchen Appliances</li>
            <li className="rounded-lg bg-gray-50 px-4 py-3">Home Appliances</li>
            <li className="rounded-lg bg-gray-50 px-4 py-3">Office & Workspace</li>
            <li className="rounded-lg bg-gray-50 px-4 py-3">Bulk Deals</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Deals</h2>
          <p className="mb-4 text-gray-600">
            Keep customers updated with discounts and special store offers.
          </p>
          <div className="rounded-2xl bg-indigo-50 p-5 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-700">
              This Week
            </p>
            <p className="mb-1 text-3xl font-extrabold text-indigo-700">20% OFF</p>
            <p className="text-gray-600">Selected kitchen and bulk items</p>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="mb-6 text-3xl font-bold text-gray-900">Shop By Category</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 p-4 transition hover:shadow-md">
            <img
              src="/lighter.jpg"
              alt="Kitchen Appliances"
              className="mb-4 h-44 w-full rounded-xl object-cover"
            />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Kitchen Appliances
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Explore lighter tools and essential kitchen items.
            </p>
            <Link
              href="/search"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Browse Category
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 transition hover:shadow-md">
            <img
              src="/knife.jpg"
              alt="Home Appliances"
              className="mb-4 h-44 w-full rounded-xl object-cover"
            />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Home Appliances
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Find household utility tools and daily-use products.
            </p>
            <Link
              href="/search"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Browse Category
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 transition hover:shadow-md">
            <img
              src="/bulk.jpg"
              alt="Bulk Deals"
              className="mb-4 h-44 w-full rounded-xl object-cover"
            />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Bulk Deals</h3>
            <p className="mb-4 text-sm text-gray-600">
              Save more when buying product packs in bulk.
            </p>
            <Link
              href="/search"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Browse Category
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4 transition hover:shadow-md">
            <img
              src="/scissors.jpg"
              alt="Office and Workspace"
              className="mb-4 h-44 w-full rounded-xl object-cover"
            />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Office & Workspace
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Shop practical office accessories and workspace tools.
            </p>
            <Link
              href="/search"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Browse Category
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}