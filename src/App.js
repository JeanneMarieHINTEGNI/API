import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  FaFolder,
  FaChevronUp,
  FaChevronDown,
  FaSearch,
  FaDownload,
  FaExclamationTriangle,
  FaArrowsAlt,
} from "react-icons/fa";

function App() {
  const [isOpen, setIsOpen] = useState(false); // Inbox menu toggle
  const [activeTab, setActiveTab] = useState(""); // Active tab state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [startDate, setStartDate] = useState(""); // Start date state
  const [endDate, setEndDate] = useState(""); // End date state
  const [isInboutOpen, setIsInboutOpen] = useState(true); // Inbout section toggle

  // Filtered menu items based on search
  const filteredMenuItems = [
    { id: "download", label: "Download ⬇️", icon: <FaDownload /> },
    { id: "verification-error", label: "Verification Error ⚠️", icon: <FaExclamationTriangle /> },
    { id: "move", label: "Déplacer ➡️", icon: <FaArrowsAlt /> },
  ].filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Inbout menu toggle handler
  const toggleMenu = () => {
    setIsInboutOpen(!isInboutOpen);
  };

  // Sidebar toggle handler
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define the dark blue color
  const darkBlue = "#2c3e50";

  return (
    <div className="d-flex vh-100 flex-column">
      {/* HEADER */}
      <header className="bg-dark text-white py-3" style={{ backgroundColor: darkBlue }}>
        <nav className="container d-flex justify-content-between align-items-center">
          <h1 className="h5 m-0">React App Interface</h1>
          <ul className="nav" style={{ marginTop: "-10px" }}>
            <li className="nav-item">
              <button className="btn btn-outline-light">Documents</button>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <div className="d-flex flex-grow-1">
        {/* SIDEBAR */}
        <aside
          className={`bg-secondary text-white d-flex flex-column position-relative`}
          style={{
            width: isSidebarOpen ? "250px" : "80px",
            transition: "width 0.3s",
            padding: isSidebarOpen ? "1rem" : "0.5rem",
            backgroundColor: darkBlue,
          }}
        >
          <h1 className={`h6 mb-4 ${isSidebarOpen ? "" : "d-none"}`} style={{ color: "white" }}>
            Menu
          </h1>

          {/* Search input */}
          <div className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${isSidebarOpen ? "" : "d-none"}`}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search menu items"
              />
              <button className="btn btn-light">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Inbout Toggle */}
          <div className="position-relative w-100 mb-3">
            {/* Icône en arrière-plan */}
            <FaFolder
              className="position-absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "2rem",
                color: "#aaa", // Couleur plus claire
                zIndex: -1, // Derrière le bouton
              }}
            />
            <button
              className="btn btn-light d-flex align-items-center justify-content-start"
              onClick={toggleMenu}
              aria-expanded={isInboutOpen}
              style={{
                width: "auto", // La largeur s'ajuste automatiquement
                padding: "0.3rem 0.8rem", // Ajuste le padding pour rendre le bouton plus compact
              }}
            >
              {/* Icône de Inbout avant le texte */}
              <FaFolder className={`${isSidebarOpen ? "" : "d-none"}`} style={{ marginRight: "0" }} />
              <span className={`${isSidebarOpen ? "" : "d-none"}`} style={{ marginLeft: "5px" }}>
                Inbout
              </span>
              <span>
                {isInboutOpen ? <FaChevronDown /> : <FaChevronUp />}
              </span>

            </button>
          </div>

          {/* Menu Items */}
          {isInboutOpen && (
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
                      {item.icon} <span className={isSidebarOpen ? "ms-2" : "d-none"}>{item.label}</span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-center">No results found 😞</li>
              )}
            </ul>
          )}

          {/* Sidebar Toggle Button (Fixé en bas à droite) */}
          <button
            className="btn btn-outline-light position-absolute"
            onClick={toggleSidebar}
            style={{
              bottom: "1rem",
              right: "1rem",
            }}
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-grow-1 p-4">
          {/* Période de début et fin */}
          <div className="d-flex justify-content-end mb-2">
            <form className="border p-2 rounded" style={{ width: "300px", height: "80px" }}>
              <h6 className="mb-1" style={{ fontSize: "14px" }}>Définir période</h6>
              <div className="d-flex justify-content-between">
                <div className="mb-1" style={{ width: "48%" }}>
                  <label htmlFor="startDate" className="form-label d-block mb-0" style={{ fontSize: "12px" }}>Début</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ height: "25px", fontSize: "12px" }} 
                  />
                </div>
                <div className="mb-1" style={{ width: "48%" }}>
                  <label htmlFor="endDate" className="form-label d-block mb-0" style={{ fontSize: "12px" }}>Fin</label>
                  <input
                    type="date"
                    className="form-control form-control-sm"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ height: "25px", fontSize: "12px" }} 
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Tabs */}
          {activeTab && (
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4" style={{ marginTop: "-45px" }}>
              <Tab eventKey="download" title={<><FaDownload /> Download</>}>
                <div className="text-center py-5 " style={{ marginTop: "-10px" }}>
                  <p>Download your files here ⬇️</p>
                </div>
              </Tab>

              <Tab eventKey="verification-error" title={<><FaExclamationTriangle /> Verification Error</>}>
                <div className="text-center py-5">
                  <p>Details about verification errors ⚠️</p>
                </div>
              </Tab>

              <Tab eventKey="move" title={<><FaArrowsAlt /> Déplacer</>}>
                <div className="text-center py-5">
                  <p>You can move your files here ➡️</p>
                </div>
              </Tab>
            </Tabs>
          )}

          {/* Default Content */}
          {!activeTab && (
            <div className="text-center text-secondary">
              <p>Select a tab to view its content</p>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-2" style={{ backgroundColor: darkBlue }}>
        <small>© 2025 - Thank you for visiting our page!</small>
      </footer>
    </div>
  );
}

export default App;
