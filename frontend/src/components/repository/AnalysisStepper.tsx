import { Check } from "lucide-react";
import { analysisSteps } from "../../constants/repository";

interface Props {
  currentStep: number;
}

export default function AnalysisStepper({
  currentStep,
}: Props) {
  return (
    <div className="mb-10 flex items-center justify-between">
      {analysisSteps.map((step, index) => {
        const active = index === currentStep;
        const completed = index < currentStep;

        return (
          <div
            key={step}
            className="flex flex-1 items-center"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  completed
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-zinc-500"
                }`}
              >
                {completed ? (
                  <Check size={18} />
                ) : (
                  index + 1
                )}
              </div>

              <span className="mt-3 text-center text-xs text-zinc-400">
                {step}
              </span>
            </div>

            {index !== analysisSteps.length - 1 && (
              <div className="mx-6 mt-[-24px] h-px flex-1 bg-zinc-700" />
            )}
          </div>
        );
      })}
    </div>
  );
}