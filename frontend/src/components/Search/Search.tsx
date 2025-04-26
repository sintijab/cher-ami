import { useState, useRef } from 'react';

export const Search = ({ categories }: { categories: string[]}) => {
  const [selectedRegion, setSelectedRegion] = useState('All categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOptionClick = (region: any) => {
    setSelectedRegion(region);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-xxl min-w-[200px]">
      <div className="relative mt-2">
        <div className="absolute top-1 left-1 flex items-center mr-3">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="rounded border border-transparent py-1 px-1.5 text-center flex items-center text-sm transition-all text-slate-600"
          >
            <span className="text-ellipsis overflow-hidden">{selectedRegion}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <div className="h-6 border-l border-slate-200 ml-1"></div>
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="min-w-[150px] overflow-hidden absolute left-0 mt-10 bg-white border border-slate-200 rounded-md shadow-lg z-10"
            >
              <ul>
                {categories.map((category) => (
                  <li
                    key={category}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
                    onClick={() => handleOptionClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <input
          type="text"
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-1 pl-36 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
          placeholder="Search by policy groups, account details or price category, e.g. cancellations of multi-policy holders..."
        />
        <button
          type="button"
          className="absolute right-2 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

