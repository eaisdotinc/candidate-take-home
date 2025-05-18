const VintageCorner = ({ position }:{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}) => {
  const positionClasses = {
    'top-left': 'top-0 left-0 rotate-180',
    'top-right': 'top-0 right-0 -rotate-90',
    'bottom-left': 'bottom-0 left-0 rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-0'
  };
  
  return (
    <div className={`absolute w-5 h-5 ${positionClasses[position]}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0C0 11.0457 8.9543 20 20 20V0H0Z" fill="#F9E4D4" />
        <path d="M1 1C1 10.4934 9.50659 19 19 19V1H1Z" stroke="#D4A276" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

export default VintageCorner;