import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students and personal projects.",
    features: [
      "1 Repository",
      "Basic AI Chat",
      "Architecture Viewer",
      "Dashboard",
      "Community Support",
    ],
    button: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    description: "Best for developers and startups.",
    features: [
      "Unlimited Repositories",
      "Unlimited AI Chat",
      "Architecture Analysis",
      "Dependency Mapping",
      "Export Reports",
      "Priority Support",
      "Advanced Search",
    ],
    button: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and large organizations.",
    features: [
      "Unlimited Everything",
      "Private Deployment",
      "Custom AI Models",
      "SSO Authentication",
      "Dedicated Support",
      "API Access",
      "99.9% SLA",
    ],
    button: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-36">

      <div className="mx-auto max-w-[1450px] px-10">

        <div className="text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            Pricing
          </span>

          <h2 className="mt-8 text-6xl font-black">

            Simple Pricing

            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Built For Every Developer

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-zinc-400">

            Start free and upgrade whenever your team grows.

          </p>

        </div>

        <div className="mt-24 grid gap-8 lg:grid-cols-3">

          {plans.map((plan) => (

            <div
              key={plan.name}
              className={`relative rounded-[32px] border p-8 transition duration-300 hover:-translate-y-3 ${
                plan.popular
                  ? "border-violet-500 bg-gradient-to-b from-violet-600/10 to-[#111827] shadow-[0_30px_80px_rgba(124,58,237,.25)]"
                  : "border-white/10 bg-[#111827]/70 backdrop-blur-xl"
              }`}
            >

              {plan.popular && (
                <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold">

                  <Star size={15} fill="white" />

                  Most Popular

                </div>
              )}

              <h3 className="text-3xl font-bold">

                {plan.name}

              </h3>

              <p className="mt-4 text-zinc-400">

                {plan.description}

              </p>

              <div className="mt-10 flex items-end">

                <span className="text-6xl font-black">

                  {plan.price}

                </span>

                {plan.period && (
                  <span className="mb-2 ml-2 text-zinc-400">

                    {plan.period}

                  </span>
                )}

              </div>

              <button
                className={`mt-10 w-full rounded-2xl py-4 font-semibold transition ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105"
                    : "border border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >

                {plan.button}

              </button>

              <div className="mt-10 space-y-5">

                {plan.features.map((feature) => (

                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >

                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15">

                      <Check
                        size={15}
                        className="text-green-400"
                      />

                    </div>

                    <span className="text-zinc-300">

                      {feature}

                    </span>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}