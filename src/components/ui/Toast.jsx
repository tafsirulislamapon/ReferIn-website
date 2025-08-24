export default function Toast({ message, isVisible, type = "info" }) {
  if (!isVisible) return null;

  const bgColor = {
    info: "bg-[#2563EB]",
    success: "bg-[#10B981]",
    warning: "bg-[#F59E0B]",
    error: "bg-[#EF4444]"
  }[type];

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in`}>
      <p className="font-semibold text-sm whitespace-nowrap">{message}</p>
    </div>
  );
} 