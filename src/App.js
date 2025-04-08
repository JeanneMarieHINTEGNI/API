import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import {
    FaFolder,
    FaChevronLeft,
    FaChevronRight,
    FaSearch,
    FaDownload,
    FaExclamationTriangle,
    FaArrowsAlt,
} from "react-icons/fa";
import axios from "axios";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [apiData, setApiData] = useState(null);
    const [partenaire, setPartenaire] = useState(1);

    const API_BASE_URL = ""; // Ajoute l'URL de ton API ici

    const filteredMenuItems = [
        { id: "download", label: "Download ⬇", icon: <FaDownload /> },
        { id: "verification-error", label: "Verification Error ⚠", icon: <FaExclamationTriangle /> },
        { id: "move", label: "Déplacer ➡", icon: <FaArrowsAlt /> },
    ].filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchData = async (etat) => {
      try {
          const dataToSend = {
              procedureName: "dbo.PS_SELECT_AFFICHE_GRILLE_INBOUND_OUTBOUND_UN_ETAT",
              parameters: {
                  P_PARTENAIRE: parseInt(partenaire, 10),
                  P_ETAT: etat,
                  P_DATE_DEBUT: startDate,
                  P_DATE_FIN: endDate,
                  TraceErrorLigne: "some_value_here",
                  RETURN_VALUE: 1,
              },
              RecordsetType: 3,
              EnableRecordsetType: true,
              request: "requiredRequestValue",
          };
  
          console.log("Données envoyées à l'API :", dataToSend);
  
          const response = await axios.post(`${API_BASE_URL}/executeProcedure`, dataToSend);
          const resultData = JSON.parse(response.data.result);
          setApiData(resultData);
          console.log("Données reçues de l'API:", resultData);
      } catch (error) {
          console.error("Erreur lors de la récupération des données :", error);
      }
  };
  

    const darkBlue = "#2c3e50";

    return (
        <div className="d-flex vh-100 flex-column">
            <header className="bg-dark text-white py-3" style={{ backgroundColor: darkBlue }}>
                <nav className="container d-flex justify-content-between align-items-center">
                    <h1 className="h5 m-0">React App Interface</h1>
                    <ul className="nav">
                        <li className="nav-item">
                            <button className="btn btn-outline-light">Documents</button>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="d-flex flex-grow-1">
                <aside
      className={`bg-secondary text-white d-flex flex-column position-relative`}
      style={{
        width: isSidebarOpen ? "250px" : "80px",
        transition: "width 0.3s",
        padding: isSidebarOpen ? "1rem" : "0.5rem",
        backgroundColor: darkBlue,
      }}
    >
      <h1
        className={`h6 mb-4 ${isSidebarOpen ? "" : "d-none"}`}
        style={{ color: "white" }}
      >
        Menu
      </h1>

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

      <button
        className="btn btn-light w-100 mb-3 d-flex align-items-center justify-content-between"
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        <span className={`${isSidebarOpen ? "" : "d-none"}`}>Inbound</span>
        <FaFolder />
      </button>

      {isOpen && (
        <ul className="list-unstyled">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  className={`btn btn-sm w-100 text-start d-flex align-items-center ${activeTab === item.id ? "btn-primary" : "btn-outline-light"}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    fetchData(
                      item.id === "download"
                        ? 1
                        : item.id === "verification-error"
                        ? 2
                        : 3
                    );
                  }}
                >
                  {item.icon} <span className={`${isSidebarOpen ? "ms-2" : "d-none"}`}>{item.label}</span>
                </button>
              </li>
            ))
          ) : (
            <li className="text-center">No results found</li>
          )}
        </ul>
      )}

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

                <main className="flex-grow-1 p-4">
                    <div className="d-flex justify-content-end mb-2">
                        <form className="border p-3 rounded" style={{ width: "400px" }}>
                            <h5 className="mb-3" style={{ fontSize: "18px" }}>
                                Définir période
                            </h5>

                            <div className="d-flex justify-content-between">
                                <div className="mb-3" style={{ width: "48%" }}>
                                    <label htmlFor="startDate" className="form-label" style={{ fontSize: "14px" }}>
                                        Début
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3" style={{ width: "48%" }}>
                                    <label htmlFor="endDate" className="form-label" style={{ fontSize: "14px" }}>
                                        Fin
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="partenaire" className="form-label" style={{ fontSize: "14px" }}>
                                    Partenaire
                                </label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    id="partenaire"
                                    value={partenaire}
                                    onChange={(e) => setPartenaire(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>

                    {activeTab && (
                        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                            <Tab eventKey="download" title={<><FaDownload /> Download</>}>
                                <div className="text-center py-5">
                                    
                                    {apiData && apiData[0] && apiData[0].Headers ? (
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    {apiData[0].Headers.map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {apiData[0].Data.length > 0 ? (
                                                    apiData[0].Data.map((row, index) => (
                                                        <tr key={index}>
                                                            {Object.values(row).map((value, colIndex) => (
                                                                <td key={colIndex}>{value}</td>
                                                            ))}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={apiData[0].Headers.length}>Aucune donnée disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Aucune donnée disponible</p>
                                    )}
                                </div>
                            </Tab>

                            <Tab eventKey="verification-error" title={<><FaExclamationTriangle />Error Verification</>}>
                                <div className="text-center py-5">
                                    
                                    {apiData && apiData[0] && apiData[0].Headers ? (
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    {apiData[0].Headers.map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {apiData[0].Data.map((row, index) => (
                                                    <tr key={index}>
                                                        {Object.values(row).map((value, colIndex) => (
                                                            <td key={colIndex}>{value}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Aucune donnée disponible</p>
                                    )}
                                </div>
                            </Tab>

                            <Tab eventKey="move" title={<><FaArrowsAlt /> Moved</>}>
                                <div className="text-center py-5">
                                    
                                    {apiData && apiData[0] && apiData[0].Headers ? (
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    {apiData[0].Headers.map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {apiData[0].Data && apiData[0].Data.length > 0 ? (
                                                    apiData[0].Data.map((row, index) => (
                                                        <tr key={index}>
                                                            {apiData[0].Headers.map((header, colIndex) => (
                                                                <td key={colIndex}>{row[header] || ''}</td> 
                                                            ))}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={apiData[0].Headers.length}>Aucune donnée disponible</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Aucune donnée disponible</p>
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    )}

                    {!activeTab && (
                        <div className="text-center text-secondary">
                            <p>Select a tab to view its content</p>
                        </div>
                    )}
                </main>
            </div>

            <footer className="bg-dark text-white text-center py-2" style={{ backgroundColor: darkBlue }}>
                <small>© 2025 - Thank you for visiting our page!</small>
            </footer>
        </div>
    );
}

export default App;