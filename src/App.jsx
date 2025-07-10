import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Overview from "./components/Overview/Overview";
import Matches from "./components/Matches/Matches";
import Companies from "./components/Companies/Companies";
import Reporting from "./components/Reporting/Reporting";
import "./components/shared/Page.css";

function App() {
  return (
    <Router>
      <div className="app">
        <AdminPanel />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/reporting" element={<Reporting />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
