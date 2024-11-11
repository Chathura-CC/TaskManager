import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Welcome to Serendip Task Manager
        </h1>
        <p className="mb-4 text-lg md:text-xl">
          The best task management app for individuals and teams.
        </p>
        <Link
          to="/signup"
          className="p-2 text-white bg-blue-500 rounded-md md:text-lg"
        >
          Get Started
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
