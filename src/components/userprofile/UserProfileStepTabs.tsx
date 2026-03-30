import React from "react";

interface StepTabsProps {
  steps: string[];
  currentStep: number;
  onStepChange: (index: number) => void;
}

const UserProfileStepTabs: React.FC<StepTabsProps> = ({
  steps,
  currentStep,
  onStepChange,
}) => {
  return (
    <div className="rounded-3xl bg-sky-100 px-4 py-5">
      <div className="flex items-center gap-3 overflow-x-auto">
        {steps.map((step, index) => {
          const active = currentStep === index;

          return (
            <React.Fragment key={step}>
              <button
                type="button"
                onClick={() => onStepChange(index)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-700 text-white shadow-sm"
                    : "bg-white text-slate-500 border"
                }`}
              >
                {step}
              </button>

              {index < steps.length - 1 && (
                <div className="hidden md:block h-px min-w-[48px] border-t border-dotted border-sky-400" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfileStepTabs;