import { CheckCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const tiers = [
  {
    name: "Bootsrapped",
    id: "tier-bootstrapped",
    href: "#",
    price: "Free!",
    description: "Strapped for cash! No worries we got you covered",
    features: ["3 Integrations", "5 Users", "Basic Support"],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: "£ ----",
    description: "A plan that scales with your rapidly growing business.",
    features: ["Unlimited Integrations", "Upto 20 Users", "Priority Support"],
    featured: false,
    cta: "Buy plan",
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: "Custom",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited Integrations",
      "Unlimited Users",
      "Dedicaed Phone Support",
      "Dedicated Setup Support",
    ],
    featured: true,
    cta: "Contact sales",
  },
];

export default function Pricing() {
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h4 className="font-semibold leading-7 text-slate-700">
            Pricing
          </h4>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Pricing plans for teams of all sizes
          </p>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 justify-between gap-24 lg:mx-10 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={clsx(
                tier.featured ? "bg-slate-900 ring-gray-900" : "ring-gray-200",
                "rounded-lg p-8 ring-1 xl:p-10"
              )}
            >
              <h3
                id={tier.id}
                className={clsx(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-lg font-semibold leading-8"
                )}
              >
                {tier.name}
              </h3>
              <p
                className={clsx(
                  tier.featured ? "text-gray-300" : "text-gray-600",
                  "mt-4 text-sm leading-6"
                )}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={clsx(
                    tier.featured ? "text-white" : "text-gray-900",
                    "text-4xl font-bold tracking-tight"
                  )}
                >
                  {tier.price}
                </span>
                {typeof tier.price !== "string" ? (
                  <span
                    className={clsx(
                      tier.featured ? "text-gray-300" : "text-gray-600",
                      "text-sm font-semibold leading-6"
                    )}
                  ></span>
                ) : null}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.featured
                    ? "bg-slate-200/50 text-white hover:bg-white/20 focus-visible:outline-white"
                    : "bg-slate-900 text-white shadow-sm hover:bg-indigo-800 focus-visible:outline-indigo-600",
                  "mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                )}
              >
                {tier.cta}
              </a>
              <ul
                role="list"
                className={clsx(
                  tier.featured ? "text-gray-300" : "text-slate-600",
                  "mt-8 space-y-3 text-sm leading-6 xl:mt-10"
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckCircleIcon
                      className={clsx(
                        tier.featured ? "text-white" : "text-slate-900",
                        "h-6 w-5 flex-none"
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
