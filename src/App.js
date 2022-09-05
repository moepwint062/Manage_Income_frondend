import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/css/commonMenu.css";
import TopBar from "./layouts/topBar";
import Login from "./pages/Login/login";
import ProtectedRoute from "./routes/protectedRoute";
import Register from "./pages/Login/register";
import HomePage from "./pages/HomePage/homePage";
import Logout from "./pages/Login/logout";

function App() {
  const name = localStorage.getItem("userName");
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      // marginLeft: "10px",
      width: "100%",
    },
  };
  return (
    <div>
      <TopBar userName={name} />
      <div className="body">
        <BrowserRouter>
          <div style={styles.contentDiv}>
            <div style={styles.contentMargin} id="mainContent">
              <div className="row justify-content-center" style={{ padding: "4% 0% 0% 4%" }}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Navigate replace to="/login" />} />
                  <Route path="/register" element={<Register/>} />
                  <Route exact path='/' element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/logout" element={<Logout />} />
                  </Route>
                </Routes>
                  
              </div>
            </div>
          </div>
        </BrowserRouter>
        {/* <div className="main--body" id="mainbody" /> */}
      </div>
    </div>
  );
}

export default App;
