import React from 'react';
import { FaChevronLeft, FaChevronRight, FaFolder } from 'react-icons/fa';

function Sidebar({ isOpen, toggleSidebar, searchTerm, setSearchTerm, filteredMenuItems, setActiveTab, activeTab }) {
  return (
    <aside className="sidebar">
      <h2 className={`h6 mb-4 ${isOpen ? "" : "d-none"}`}>
        Menu
      </h2>

      {/* Search input */}
      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className={`form-control ${isOpen ? "" : "d-none"}`}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-light">
            <FaFolder />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      {isOpen && (
        <ul className="list-unstyled">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  className={`btn btn-sm w-100 text-start d-flex align-items-center ${
                    activeTab === item.id ? "btn-primary" : "btn-outline-light"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.icon} <span className={isOpen ? "ms-2" : "d-none"}>{item.label}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="text-center">No results found 😞</li>
          )}
        </ul>
      )}

      {/* Sidebar Toggle Button */}
      <button
        className="btn btn-outline-light position-absolute"
        onClick={toggleSidebar}
        style={{
          bottom: "1rem",
          right: "1rem",
        }}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </aside>
  );
}

export default Sidebar;
