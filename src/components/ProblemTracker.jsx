import React, { useState, useRef, useEffect } from 'react';

/**
 * ProblemTracker Component
 * @param {Object[]} problems - Array of problem objects
 * @param {string} problems[].name - The problem title
 * @param {string} [problems[].description] - An optional problem description
 * @param {string} [problems[].link] - A permalink or any link for the problem
 */
export default function ProblemTracker({ problems }) {
  // We'll track two things for each problem:
  // 1) status: 'trying', 'skipped', or 'solved'
  // 2) isDropdownOpen: whether the 3-dot menu is open
  // This state array has the same length as the problems array.
  const [items, setItems] = useState(
    problems.map(() => ({
      status: 'trying',
      isDropdownOpen: false,
    }))
  );

  // When the user changes a problem's status
  const handleStatusChange = (index, newStatus) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].status = newStatus;
      return updated;
    });
  };

  // Toggle the 3-dot dropdown menu
  const toggleDropdown = (index) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index].isDropdownOpen = !updated[index].isDropdownOpen;
      return updated;
    });
  };

  // Close any open dropdown if user clicks outside it
  // We'll track references to each dropdown
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      dropdownRefs.current.forEach((ref, i) => {
        if (ref && !ref.contains(e.target)) {
          setItems((prev) => {
            const updated = [...prev];
            updated[i].isDropdownOpen = false;
            return updated;
          });
        }
      });
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleInternalSolution = (index) => {
    alert(`Internal solution for: ${problems[index].name}`);
    toggleDropdown(index);
  };

  const handleCopyPermalink = (index) => {
    const link = problems[index].link || window.location.href;
    navigator.clipboard.writeText(link);
    alert(`Permalink copied to clipboard: ${link}`);
    toggleDropdown(index);
  };

  // Compute background color for the circle based on status
  const getStatusBgColor = (status) => {
    switch (status) {
      case 'trying':
        return '#FEF9C3'; // yellow-200
      case 'skipped':
        return '#FECACA'; // red-200
      case 'solved':
        return '#BBF7D0'; // green-200
      default:
        return '#E5E7EB'; // gray-200
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de problemas</h1>

        {/* We render each problem in a "row" */}
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <div key={index} className="border-t pt-4">
              <div className="flex items-center space-x-4">
                {/* Status Circle + Select */}


                {/* Problem Info */}
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{problem.name}</h2>
                  {problem.description && (
                    <p className="text-gray-600">{problem.description}</p>
                  )}
                </div>

                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getStatusBgColor(items[index].status) }}
                >
                  <select
                    className="w-full h-full rounded-full text-center appearance-none cursor-pointer bg-transparent focus:outline-none"
                    value={items[index].status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="trying" className="bg-yellow-200">
                      Trying
                    </option>
                    <option value="skipped" className="bg-red-200">
                      Skipped
                    </option>
                    <option value="solved" className="bg-green-200">
                      Solved
                    </option>
                  </select>
                </div>


              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
