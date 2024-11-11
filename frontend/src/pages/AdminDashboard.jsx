import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
