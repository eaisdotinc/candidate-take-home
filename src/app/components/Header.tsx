const Header = () => {
  return (
    <div className="bg-gradient-to-r from-rose-800 via-rose-700 to-rose-800 text-amber-50 p-3 md:p-5 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-amber-200 opacity-30"></div>
      <div className="flex items-center justify-center gap-2 md:gap-3">
        <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 4H6C4.34315 4 3 5.34315 3 7V17C3 18.6569 4.34315 20 6 20H18C19.6569 20 21 18.6569 21 17V7C21 5.34315 19.6569 4 18 4Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M4 8L10.1056 12.5528C11.2959 13.3967 12.8216 13.4141 14.0312 12.5956L20 8"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-serif tracking-wide m-0">
          Lost Girls Vintage
        </h1>
      </div>
      <p className="text-center text-amber-100 mt-1 md:mt-2 font-light text-xs md:text-sm italic tracking-wide">
        Curated fashion from bygone eras
      </p>
    </div>
  );
};

export default Header;
