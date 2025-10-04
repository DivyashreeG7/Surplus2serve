import React, { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Features from "./Features";
import Impact from "./Impact";
import { motion } from "framer-motion";
import { FiUsers, FiLogOut, FiPlusCircle, FiArrowRight } from "react-icons/fi";

function Home({ setIsAuth }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [donors, setDonors] = useState([]);
  const [showDonors, setShowDonors] = useState(false);
  const [newDonors, setNewDonors] = useState(0);
  const [showNgoForm, setShowNgoForm] = useState(false);
  const [ngoData, setNgoData] = useState({
    name: "",
    address: "",
    contact: "",
    secretKey: "",
  });

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading for better UX
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  // Fetch donors function
  const fetchDonors = async () => {
    try {
      const response = await fetch("http://localhost:5001/donors");
      const data = await response.json();
      setDonors(data);
      setShowDonors(true);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  // Fetch new donors count when component mounts
  useEffect(() => {
    const checkNewDonors = async () => {
      try {
        const response = await fetch("http://localhost:5001/donors");
        const data = await response.json();
        setNewDonors(data.length); 
      } catch (error) {
        console.error("Error checking new donors:", error);
      }
    };

    checkNewDonors();
  }, []);

  // Handle NGO registration form submission
  const handleNgoRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/register-ngo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ngoData),
      });

      const result = await response.json();
      if (result.success) {
        alert("NGO Registered Successfully!");
        setShowNgoForm(false);
        setNgoData({ name: "", address: "", contact: "", secretKey: "" });
      } else {
        alert("NGO Registration Failed: " + result.message);
      }
    } catch (error) {
      console.error("Error registering NGO:", error);
    }
  };

  // Handle NGO input change
  const handleNgoInputChange = (e) => {
    setNgoData({ ...ngoData, [e.target.name]: e.target.value });
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-indigo-700">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">DonationHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNgoForm(!showNgoForm)}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <FiPlusCircle className="mr-2" />
                Register NGO
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchDonors}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <FiUsers className="mr-2" />
                View Donors
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <FiLogOut className="mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-500">Total Donors</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{newDonors}</p>
            <p className="mt-1 text-sm text-gray-500">Helping make a difference</p>
          </motion.div>
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-500">Recent Activity</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">+12%</p>
            <p className="mt-1 text-sm text-gray-500">From last month</p>
          </motion.div>
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-medium text-gray-500">Community Impact</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">24+</p>
            <p className="mt-1 text-sm text-gray-500">NGOs supported</p>
          </motion.div>
        </div>

        {/* NGO Registration Form */}
        {showNgoForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register New NGO</h2>
            <form onSubmit={handleNgoRegister}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NGO Name</label>
                  <input
                    type="text"
                    name="name"
                    value={ngoData.name}
                    onChange={handleNgoInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={ngoData.address}
                    onChange={handleNgoInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={ngoData.contact}
                    onChange={handleNgoInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                  <input
                    type="password"
                    name="secretKey"
                    value={ngoData.secretKey}
                    onChange={handleNgoInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNgoForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Register NGO
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Donors List */}
        {showDonors && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Our Generous Donors</h2>
              <button
                onClick={() => setShowDonors(false)}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Close
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donors.map((donor, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${donor.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(donor.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Main Sections */}
        <Suspense fallback={
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        }>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Hero />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="my-12"
          >
            <Features />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="my-12"
          >
            <Impact />
          </motion.div>
        </Suspense>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white mb-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to make a bigger impact?</h2>
            <p className="text-lg mb-6">Join our community of donors and help us support more NGOs in need.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium flex items-center mx-auto"
            >
              Get Started <FiArrowRight className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-xl font-bold">DonationHub</h3>
              <p className="mt-2 text-gray-400">Bridging the gap between donors and NGOs</p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider">About</h4>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Our Mission</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Team</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider">Support</h4>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider">Legal</h4>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <p className="text-gray-400 text-sm">&copy; 2023 DonationHub. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;