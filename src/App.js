import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AddPatientPage from "./pages/AddPatientPage";
import PatientDetailPage from "./pages/PatientDetailPage";
import DietPlansPage from "./pages/DietPlansPage";
import PrivateRoute from "./components/PrivateRoute";
import SidebarLayout from "./components/SidebarLayout";
import AppointmentPage from "./pages/AppointmentPage";
import StatisticsPage from "./pages/StatisticPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Giriş Sayfası */}
        <Route path="/" element={<LoginPage />} />

        {/* Giriş yaptıktan sonra erişilen bölümler */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SidebarLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="appointments"
            element={
              <PrivateRoute>
                <AppointmentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="statistics"
            element={
              <PrivateRoute>
                <StatisticsPage />
              </PrivateRoute>
            }
          />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="add-patient" element={<AddPatientPage />} />
          <Route path="patient/:id" element={<PatientDetailPage />} />
          <Route path="diet-plans" element={<DietPlansPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
