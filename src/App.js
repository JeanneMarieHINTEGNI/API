import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaArrowLeft, FaDatabase, FaInbox, FaPaperclip, FaFile, FaFileAlt, FaBell, FaTh, FaBars, FaUserCircle, FaFolderOpen, FaExclamation, FaSearch, FaCogs, FaTimesCircle, FaChevronDown, FaChevronUp, FaSpinner, FaThLarge } from 'react-icons/fa';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDatabaseOpen, setIsDatabaseOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDatabase = () => {
    setIsDatabaseOpen(!isDatabaseOpen);
  };

  const menuItems = [
    { name: 'Received', icon: <FaInbox />, path: '/received' },
    { name: 'Sent', icon: <FaPaperclip />, path: '/sent' },
    { name: 'Drafts', icon: <FaFile />, path: '/drafts' },
    { name: 'Templates', icon: <FaFileAlt />, path: '/templates' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex vh-100 flex-column">
      <header className="navbar navbar-dark bg-dark">
        <div className="navbar-content">
          <h1 className="navbar-brand">ediwin</h1>
          <div className="espace">
          <div className="navbar-info">
            <div className="support"> 
            <span className="navbar-item">10</span>
            <FaUserCircle />
            <span className="navbar-item support-request">Support request</span>
            </div>
            <div className="separator"></div>
            <div className="navbar-icons"> 
              <FaBell />
              <FaTh />
              <FaBars />
            </div>
          </div>
          </div>
          <div className="usuario-modèle">
            <span className="usuario-text">Usuario</span>
          </div>
        </div>
      </header>
      <div className="menu">
        <button className="btn btn-light" onClick={toggleSidebar}>
          <FaFolderOpen /> Documents
        </button>
      </div>
      <div className="d-flex flex-grow-1">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <h2>Documents</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="filtre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="input-group-text"><FaSearch /></span>
          </div>
          <ul className="nav flex-column">
            {filteredMenuItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <a className="nav-link" href={item.path}>
                  {item.icon}<span> {item.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <button className="btn btn-light toggle-btn" onClick={toggleSidebar}>
            <FaArrowLeft />
          </button>
        </aside>
        <main className="flex-grow-1">
          <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4>
                <span className="icon-circle"><FaExclamation /></span> Received
              </h4>
            </div>
            <div className="icon-bar">
              <button className="btn btn-transparent settings-icon">
                <FaCogs />
              </button>
              <button className="btn btn-transparent compile-icon">
                <i className="fas fa-bolt icon-yellow"></i>
              </button>
              <button className="btn btn-transparent close-icon">
                <FaTimesCircle />
              </button>
              <button className="btn btn-transparent database-icon" onClick={toggleDatabase}>
                <FaDatabase />
                {isDatabaseOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button className="btn btn-transparent loading-icon">
                <FaSpinner />
              </button>
              <button className="btn btn-transparent grid-icon">
                <FaThLarge />
              </button>
            </div>
            <div className="icon-table">
              <button className="btn btn-transparent settings-icon">
                <FaCogs />
              </button>
              <button className="btn btn-transparent compile-icon">
                <i className="fas fa-bolt icon-yellow"></i>
              </button>
              <button className="btn btn-transparent close-icon">
                <FaTimesCircle />
              </button>
              <button className="btn btn-transparent database-icon" onClick={toggleDatabase}>
                <FaDatabase />
                {isDatabaseOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              <button className="btn btn-transparent loading-icon">
                <FaSpinner />
              </button>
              <button className="btn btn-transparent grid-icon">
                <FaThLarge />
              </button>
            </div>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Doc n°</th>
                  <th>Origin</th>
                  <th>Situation Change Date</th>
                  <th>Options</th>
                  <th>Doc #</th>
                  <th>Origin</th>
                  <th>Doc #</th>
                  <th>Origin</th>
                  <th>Doc #</th>
                  <th>Origin</th>
                </tr>
              </thead>
              <tbody>
                {/* Le contenu du tableau sera ajouté manuellement */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <footer className="custom-footer">
        <p>© 2025 Ediwin. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;