export default function BlueTick({ checked = true }) {
  return (
    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${checked ? 'bg-[#2563EB]' : 'border-2 border-white/30'}`}>
      {checked && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M11.6667 3.5L5.25 9.91667L2.33333 7" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
