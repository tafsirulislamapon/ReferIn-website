interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressDots({ currentStep, totalSteps }: ProgressDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${
            index + 1 === currentStep
              ? "w-12 bg-blue-600"
              : index + 1 < currentStep
              ? "w-2 bg-blue-600"
              : "w-2 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
} 