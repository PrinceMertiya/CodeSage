import {
  
  Mail
} from "lucide-react";

import { FaGithub ,FaLinkedin, FaTwitter } from "react-icons/fa";



export default function Footer() {
  return (
    <footer id = "contact" className="border-t border-white/10 bg-[#09090F]">

      <div className="mx-auto max-w-[1450px] px-10 py-20">

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Brand */}

          <div className="lg:col-span-2">

            <h2 className="text-4xl font-black">

              Code

              <span className="text-violet-400">

                Sage

              </span>

            </h2>

            <p className="mt-6 max-w-md leading-8 text-zinc-400">

              AI-powered repository intelligence platform
              helping developers understand, analyze and
              visualize large codebases.

            </p>

            <div className="mt-8 flex gap-4">

              {[
                { icon: FaGithub, label: "GitHub" },
                { icon: FaLinkedin, label: "LinkedIn" },
                { icon: FaTwitter, label: "Twitter" },
                { icon: Mail, label: "Email" },
              ].map(({ icon: Icon, label }, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-violet-500"
                >
                  <Icon size={20} />
                </button>
              ))}

            </div>

          </div>

          {/* Product */}

          <div>

            <h3 className="mb-6 font-semibold">

              Product

            </h3>

            <div className="space-y-4 text-zinc-400">

              <p>Dashboard</p>

              <p>AI Assistant</p>

              <p>Architecture</p>

              <p>Analytics</p>

              <p>Pricing</p>

            </div>

          </div>

          {/* Resources */}

          <div>

            <h3 className="mb-6 font-semibold">

              Resources

            </h3>

            <div className="space-y-4 text-zinc-400">

              <p>Documentation</p>

              <p>Blog</p>

              <p>Support</p>

              <p>API</p>

              <p>Status</p>

            </div>

          </div>

          {/* Company */}

          <div>

            <h3 className="mb-6 font-semibold">

              Company

            </h3>

            <div className="space-y-4 text-zinc-400">

              <p>About</p>

              <p>Careers</p>

              <p>Privacy</p>

              <p>Terms</p>

              <p>Contact</p>

            </div>

          </div>

        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8 text-zinc-500">

          <p>

            © 2026 CodeSage. All rights reserved.

          </p>

          <p>

            Built with ❤️ using React + AI

          </p>

        </div>

      </div>

    </footer>
  );
}