import React from 'react';
import { FaArrowLeft, FaInbox, FaPaperclip, FaFile, FaFileAlt } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <h2>Documents</h2>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/received"><FaInbox /> Received</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/sent"><FaPaperclip /> Sent</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/drafts"><FaFile /> Drafts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/templates"><FaFileAlt /> Templates</a>
        </li>
      </ul>
      <button className="btn btn-light" onClick={toggleSidebar}>
        <FaArrowLeft />
      </button>
    </aside>
  );
};

export default Sidebar;