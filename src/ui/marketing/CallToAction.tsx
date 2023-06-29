export default function CallToAction() {
  return (
    <div className="bg-white">
      <div className="px-6 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Don&apos;t let security <br />
            ... slow inovation down.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-xl leading-8 text-slate-700">
            Boost innovation with our easy-to-use security and compliance tool,
            letting your teams focus on what matters.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Get started
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-slate-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
