import React, { useState, useRef, useEffect } from 'react';
// Import desired icons (example using Font Awesome icons)
import { FaRegCircle, FaTimesCircle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'; // Example base icons
// You might want more specific icons like in your reference:
// import { FaCode, FaCheck, FaAngleDoubleLeft, FaAngleDoubleRight, FaTimes, FaBan } from 'react-icons/fa';
// import { GoPrimitiveDot } from 'react-icons/go'; // For 'Not Attempted' potentially

// clsx is helpful for conditional classes, install it: npm install clsx
import clsx from 'clsx';

/**
 * ProblemTracker Component
 * @param {Object[]} problems - Array of problem objects
 * @param {string} problems[].name - The problem title
 * @param {string} [problems[].description] - An optional problem description
 * @param {string} [problems[].link] - A permalink or any link for the problem
 */
export default function ProblemTracker({ problems }) {
  const [items, setItems] = useState(
    problems.map(() => ({
      status: 'trying', // Default status
      isDropdownOpen: false,
    }))
  );

  const dropdownRefs = useRef([]);

  const closeAllDropdowns = (exceptIndex = -1) => {
    setItems(prev => prev.map((item, i) => (
      i === exceptIndex ? item : { ...item, isDropdownOpen: false }
    )));
  };

  const toggleDropdown = (index, e) => {
    if (e) e.stopPropagation();
    const currentlyOpen = items[index].isDropdownOpen;
    closeAllDropdowns(currentlyOpen ? -1 : index);
    if (!currentlyOpen) {
      setItems(prev => {
        const updated = [...prev];
        updated[index].isDropdownOpen = true;
        return updated;
      });
    }
  };

  const handleStatusChange = (index, newStatus) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].status = newStatus;
      updated[index].isDropdownOpen = false;
      return updated;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const openDropdownIndex = items.findIndex(item => item.isDropdownOpen);
      if (openDropdownIndex !== -1 &&
        dropdownRefs.current[openDropdownIndex] &&
        !dropdownRefs.current[openDropdownIndex].contains(event.target)) {
        closeAllDropdowns();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [items]);


  // --- Helper functions for display ---

  // Define status options order and display properties
  // Adjust icons and colors to match your second reference image preferences
  const statusMap = {
    trying: { text: 'Trying', Icon: FaRegCircle, color: 'bg-yellow-200', iconColor: 'text-yellow-700', highlight: 'bg-yellow-600/20 text-yellow-200' },
    skipped: { text: 'Skipped', Icon: FaTimesCircle, color: 'bg-red-200', iconColor: 'text-red-700', highlight: 'bg-red-600/20 text-red-200' },
    solved: { text: 'Solved', Icon: FaCheckCircle, color: 'bg-green-200', iconColor: 'text-green-700', highlight: 'bg-green-600/20 text-green-200' },
    // Add other statuses if needed, e.g.:
    // not_attempted: { text: 'Not Attempted', Icon: GoPrimitiveDot, color: 'bg-gray-200', iconColor: 'text-gray-500', highlight: 'bg-gray-600/20 text-gray-200'},
    // reviewing: { text: 'Reviewing', Icon: FaAngleDoubleLeft, color: 'bg-blue-200', iconColor: 'text-blue-700', highlight: 'bg-blue-600/20 text-blue-200'},
  };

  // Define the order in which statuses appear in the dropdown
  const statusOrder = ['trying', 'solved', 'skipped']; // Customize order

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de problemas</h1>

        <div className="space-y-4">
          {problems.map((problem, index) => {
            const currentStatusKey = items[index].status;
            const currentStatusInfo = statusMap[currentStatusKey] || { text: 'Unknown', Icon: FaQuestionCircle, color: 'bg-gray-300', iconColor: 'text-gray-600', highlight: 'bg-gray-400' };

            return (
              <div key={index} className="border-t pt-4">
                <div className="flex items-center justify-between space-x-4">
                  {/* Problem Info */}
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold">{problem.name}</h2>
                    {problem.description && (
                      <p className="text-gray-600 text-sm">{problem.description}</p>
                    )}
                    {problem.link && (
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm"
                      >
                        View Problem
                      </a>
                    )}
                  </div>

                  {/* Status Indicator Area */}
                  <div
                    className="relative"
                    ref={el => dropdownRefs.current[index] = el}
                  >
                    {/* Clickable Status CIRCLE Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleDropdown(index, e)}
                      className={clsx(
                        "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                        currentStatusInfo.color // Apply background color
                      )}
                      aria-label={`Change status for ${problem.name}, currently ${currentStatusInfo.text}`}
                      aria-haspopup="true"
                      aria-expanded={items[index].isDropdownOpen}
                    >
                      {/* Display only the ICON */}
                      <currentStatusInfo.Icon
                        className={clsx("w-4 h-4", currentStatusInfo.iconColor)} // Apply specific icon color
                        aria-hidden="true"
                      />
                    </button>

                    {/* Custom Dropdown Menu - Styled like reference image 2 */}
                    {items[index].isDropdownOpen && (
                      <div
                        className="absolute right-0 top-full mt-2 w-48 bg-slate-800 text-slate-300 rounded-md shadow-lg z-10 py-1" // Dark bg, light text
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby={`status-button-${index}`}
                      >
                        {statusOrder.map((statusKey) => {
                          const optionInfo = statusMap[statusKey];
                          if (!optionInfo) return null; // Skip if statusKey is invalid

                          const isCurrent = currentStatusKey === statusKey;

                          return (
                            <button
                              key={statusKey}
                              onClick={() => handleStatusChange(index, statusKey)}
                              className={clsx(
                                "flex items-center w-full px-3 py-2 text-sm rounded focus:outline-none transition-colors duration-150 ease-in-out",
                                isCurrent
                                  ? 'bg-indigo-600 text-white font-semibold' // Highlight style for current/active
                                  : 'hover:bg-slate-700 text-slate-300', // Hover style for others
                              )}
                              role="menuitem"
                            >
                              <optionInfo.Icon
                                className={clsx(
                                  "mr-3 flex-shrink-0 w-4 h-4", // Adjusted margin
                                  isCurrent ? 'text-white' : optionInfo.iconColor // Icon color adjusts for highlight
                                )}
                                aria-hidden="true"
                              />
                              <span>{optionInfo.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}