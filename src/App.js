import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar/navbar.component";
import Upload from "./components/upload/upload.component";
import MaterialTable from "./components/reactTable/table-material-ui.component";

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar />
          <br/>
          <Route path="/movements/upload" exact component={Upload} />
          <Route path="/" exact component={MaterialTable} />
      </Router>
    </div>
    
  );
}

export default App;
