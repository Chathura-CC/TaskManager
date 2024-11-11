import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard!</h1>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
