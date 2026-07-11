import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does CodeSage analyze repositories?",
    answer:
      "CodeSage clones your repository, scans every source file, generates embeddings and builds an AI knowledge base for instant search and chat.",
  },
  {
    question: "Which Git providers are supported?",
    answer:
      "GitHub, GitLab, Bitbucket and local repositories are supported.",
  },
  {
    question: "Is my source code secure?",
    answer:
      "Yes. Your repositories remain private and are processed securely with encrypted storage and access control.",
  },
  {
    question: "Can I use my own AI model?",
    answer:
      "Enterprise customers can integrate custom LLMs and private deployments.",
  },
  {
    question: "Does CodeSage support large repositories?",
    answer:
      "Yes. CodeSage is designed for repositories ranging from small projects to enterprise-scale codebases.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-36">

      <div className="mx-auto max-w-5xl px-10">

        <div className="text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            FAQ
          </span>

          <h2 className="mt-8 text-6xl font-black">

            Frequently Asked

            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Questions

            </span>

          </h2>

        </div>

        <div className="mt-20 space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={faq.question}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#111827]/70 backdrop-blur-xl"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="flex w-full items-center justify-between px-8 py-6 text-left"
              >

                <span className="text-xl font-semibold">

                  {faq.question}

                </span>

                <ChevronDown
                  className={`transition ${
                    open === index
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {open === index && (

                <div className="border-t border-white/10 px-8 py-6 text-zinc-400 leading-8">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}