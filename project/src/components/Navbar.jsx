import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Bell, Home, Info, Mail, Shield, LogOut } from "lucide-react";
import axios from "axios";
import { Calendar } from 'lucide-react';
import { History as HistoryIcon } from 'lucide-react';


function Navbar({ setIsAuth }) {
    const [isOpen, setIsOpen] = useState(false);
    const [donorNotifications, setDonorNotifications] = useState(0);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    // Polling for New Donor Notifications with Animation Trigger
    useEffect(() => {
        let previousCount = 0;
        
        const fetchDonorCount = async () => {
            try {
                const response = await axios.get("http://localhost:5001/donors");
                const currentCount = response.data.length;
                
                if (currentCount > previousCount) {
                    setHasNewNotifications(true);
                    setTimeout(() => setHasNewNotifications(false), 2000);
                }
                
                setDonorNotifications(currentCount);
                previousCount = currentCount;
            } catch (error) {
                console.error("Failed to fetch donor notifications:", error);
                setDonorNotifications(0);
            }
        };

        fetchDonorCount();
        const interval = setInterval(fetchDonorCount, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        setIsAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("ngoAuth");
        navigate("/");
    };

    const verifyNgoAccess = () => {
        const ngoAuth = localStorage.getItem("ngoAuth");
        if (!ngoAuth) {
            navigate("/ngo-auth");
        } else {
            navigate("/ngodashboard");
        }
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo with animation */}
                    <Link 
                        to="/" 
                        className="text-2xl font-bold text-gray-900 flex items-center"
                    >
                        <span className="bg-gradient-to-r from-green-500 to-lime-500 text-transparent bg-clip-text">
                            Surplus2Serve
                        </span>
                        <span className="ml-1 text-lime-500 animate-pulse">🌊</span>
                    </Link>
                    
                <Link 
                to="/events" 
           className={`flex items-center px-3 py-2 rounded-md transition-all ${
        isActive("/events") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"
    }`}
>
    <Calendar className="mr-2 h-4 w-4" />
    Events
</Link>

<Link 
    to="/history" 
    className={`flex items-center px-3 py-2 rounded-md transition-all ${
        isActive("/history") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"
    }`}
>
    <HistoryIcon className="mr-2 h-4 w-4" />
    History
</Link>
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            to="/home" 
                            className={`flex items-center px-3 py-2 rounded-md transition-all ${isActive("/home") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"}`}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            className={`flex items-center px-3 py-2 rounded-md transition-all ${isActive("/about") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"}`}
                        >
                            <Info className="mr-2 h-4 w-4" />
                            About
                        </Link>
                        <Link 
                            to="/contact" 
                            className={`flex items-center px-3 py-2 rounded-md transition-all ${isActive("/contact") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"}`}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            Contact
                        </Link>
                        
                        <div className="relative">
                            <button 
                                onClick={verifyNgoAccess}
                                className="flex items-center bg-gradient-to-r from-green-500 to-lime-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-lime-600 font-medium transition-all shadow-md hover:shadow-lg"
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                NGO Dashboard
                                {donorNotifications > 0 && (
                                    <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center justify-center ${hasNewNotifications ? 'animate-bounce' : ''}`}>
                                        {donorNotifications}
                                    </span>
                                )}
                            </button>
                        </div>

                        <Link 
                            to="/register-ngo" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 font-medium transition-all shadow-md hover:shadow-lg flex items-center"
                        >
                            Register NGO
                        </Link>

                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium transition-all shadow-md hover:shadow-lg flex items-center"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="md:hidden p-2 rounded-md text-gray-700 hover:text-lime-600 hover:bg-lime-50 transition-all"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu with animation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="mt-2 space-y-2 bg-white shadow-lg rounded-lg p-4 border border-gray-100">
                        <Link 
                            to="/home" 
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-md transition-all ${isActive("/home") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"}`}
                        >
                            <Home className="mr-3 h-5 w-5" />
                            Home
                        </Link>
                        <Link 
                            to="/about" 
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-md transition-all ${isActive("/about") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"}`}
                        >
                            <Info className="mr-3 h-5 w-5" />
                            About Us
                        </Link>
                        <Link 
                            to="/contact" 
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center px-4 py-3 rounded-md transition-all ${isActive("/contact") ? "text-lime-600 font-medium bg-lime-50" : "text-gray-600 hover:text-lime-600 hover:bg-lime-50"}`}
                        >
                            <Mail className="mr-3 h-5 w-5" />
                            Contact
                        </Link>
                        
                        <button 
                            onClick={() => {
                                verifyNgoAccess();
                                setIsOpen(false);
                            }}
                            className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-lg hover:from-green-600 hover:to-lime-600 font-medium transition-all shadow-md"
                        >
                            <div className="flex items-center">
                                <Shield className="mr-3 h-5 w-5" />
                                NGO Dashboard
                            </div>
                            {donorNotifications > 0 && (
                                <span className={`bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full ${hasNewNotifications ? 'animate-pulse' : ''}`}>
                                    {donorNotifications}
                                </span>
                            )}
                        </button>

                        <Link 
                            to="/register-ngo" 
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-all shadow-md"
                        >
                            Register NGO
                        </Link>

                        <button 
                            onClick={() => {
                                handleLogout();
                                setIsOpen(false);
                            }}
                            className="flex items-center justify-center w-full px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all shadow-md"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;