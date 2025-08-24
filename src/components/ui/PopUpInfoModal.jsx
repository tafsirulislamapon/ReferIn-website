"use client";

export default function PopUpInfoModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?",
  message = "Adding a vacancy will 5x chances of being found by matching job seekers",
  benefits = [
    "Increasing your chances of earning a referral bonus",
    "Boost your chances of offering a paid service if they dont match"
  ],
  confirmText = "Yes I am sure, please skip for now",
  cancelText = "Cancel",
  type = "confirmation", // "confirmation" or "info"
  infoContent = null, // For info type modals
  position = "center" // "center" or "relative"
}) {
  // Handle modal close when clicking backdrop
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle confirm action
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    // Minimal overlay with very light blur
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        position === "relative" ? "bg-black/20" : "bg-black/40"
      }`}
      onClick={handleClose}
    >
      {/* Professional Modal container */}
      <div 
        className={`w-full mx-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-0 ${
          type === "info" 
            ? position === "relative" 
              ? "max-w-lg transform translate-x-8 translate-y-4" 
              : "max-w-lg" 
            : "max-w-lg"
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-clash font-bold text-theme-text">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="text-theme-text hover:text-theme-text/80 w-8 h-8 flex items-center justify-center rounded-full hover:bg-theme-text/10 transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === "info" ? (
            // Info modal content
            <div className="text-gray-700 leading-relaxed">
              {infoContent}
            </div>
          ) : (
            // Confirmation modal content
            <>
              {/* Main message */}
              <p className="text-theme-text text-center mb-6 text-lg leading-relaxed">
                {message}
              </p>

              {/* Benefits list */}
              {benefits && benefits.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="text-theme-text text-sm flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-0 md:mt-8">
                {/* Cancel button - primary position */}
                <button 
                  onClick={onClose}
                  className="flex-1 bg-[#08498E] text-white rounded-xl py-4 px-6 text-base font-semibold hover:bg-[#063a75] transition-all duration-200 shadow-sm"
                >
                  {cancelText}
                </button>

                {/* Confirm button - secondary position */}
                <button 
                  onClick={handleConfirm}
                  className="flex-1 bg-theme-bg border-2 border-theme-text/30 text-theme-text rounded-xl py-4 px-6 text-base font-semibold hover:bg-theme-text/20 hover:border-theme-text/40 transition-all duration-200"
                >
                  {confirmText}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}   