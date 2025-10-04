// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Donate from "./components/Donate";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import NgoDashboard from "./components/NgoDashboard";
// import NgoRegister from "./components/NgoRegister";

// function App() {
//     const [isAuth, setIsAuth] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [isNgoAuth, setIsNgoAuth] = useState(false);

//     // ✅ Check if user is logged in
//     useEffect(() => {
//         const checkAuth = () => {
//             const token = localStorage.getItem("token");
//             setIsAuth(!!token);
//             setLoading(false);
//         };

//         checkAuth();
//         window.addEventListener("storage", checkAuth);
//         window.addEventListener("auth-change", checkAuth);

//         return () => {
//             window.removeEventListener("storage", checkAuth);
//             window.removeEventListener("auth-change", checkAuth);
//         };
//     }, []);

//     // ✅ NGO Secret Key Verification
//     const verifyNgoAccess = () => {
//         const enteredKey = prompt("Enter NGO Secret Key:");
//         const storedKey = localStorage.getItem("ngoSecretKey");

//         if (enteredKey === storedKey) {
//             setIsNgoAuth(true);
//         } else {
//             setIsNgoAuth(false);
//             alert("Invalid Secret Key! Access Denied.");
//         }
//     };

//     // ✅ Show Loading Screen While Checking Auth
//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gray-100">
//                 <div className="text-lg font-semibold text-gray-700">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <Router>
//             {isAuth && <Navbar setIsAuth={setIsAuth} verifyNgoAccess={verifyNgoAccess} />}
//             <Routes>
//                 {/* ✅ User must Login or Signup first */}
//                 <Route path="/" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to="/home" />} />
//                 <Route path="/signup" element={!isAuth ? <Signup setIsAuth={setIsAuth} /> : <Navigate to="/home" />} />

//                 {/* ✅ Protected Routes (Only Accessible After Login) */}
//                 <Route path="/home" element={isAuth ? <Home setIsAuth={setIsAuth} /> : <Navigate to="/" />} />
//                 <Route path="/donate" element={isAuth ? <Donate /> : <Navigate to="/" />} />
//                 <Route path="/about" element={isAuth ? <About /> : <Navigate to="/" />} />
//                 <Route path="/contact" element={isAuth ? <Contact /> : <Navigate to="/" />} />
//                 <Route path="/register-ngo" element={isAuth ? <NgoRegister /> : <Navigate to="/" />} />

//                 {/* ✅ NGO Dashboard - Requires Secret Key Validation */}
//                 <Route path="/ngodashboard" element={isNgoAuth ? <Donors/> : <Navigate to="/" />} />
//             </Routes>
//         </Router>
//     );

// }
// export default App;

// App.jsx
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Donate from "./components/Donate";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import NgoDashboard from "./components/NgoDashboard";
// import NgoRegister from "./components/NgoRegister";
// import NgoAuth from "./components/NgoAuth";

// function App() {
//     const [isAuth, setIsAuth] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [isNgoAuth, setIsNgoAuth] = useState(localStorage.getItem("isNgoAuth") === "true");

//     useEffect(() => {
//         const checkAuth = () => {
//             const token = localStorage.getItem("token");
//             setIsAuth(!!token);
//             setLoading(false);
//         };
//         checkAuth();
//     }, []);

//     if (loading) {
//         return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//     }

//     return (
//         <Router>
//             {isAuth && <Navbar setIsAuth={setIsAuth} />}
//             <Routes>
//                 <Route path="/" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to="/home" />} />
//                 <Route path="/signup" element={!isAuth ? <Signup setIsAuth={setIsAuth} /> : <Navigate to="/home" />} />
//                 <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
//                 <Route path="/donate" element={isAuth ? <Donate /> : <Navigate to="/" />} />
//                 <Route path="/about" element={isAuth ? <About /> : <Navigate to="/" />} />
//                 <Route path="/contact" element={isAuth ? <Contact /> : <Navigate to="/" />} />
//                 <Route path="/register-ngo" element={isAuth ? <NgoRegister /> : <Navigate to="/" />} />
//                 <Route path="/ngodashboard" element={<NgoDashboard setIsNgoAuth={setIsNgoAuth} />} />
//             </Routes>
//         </Router>
//     );
// }
// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Donate from "./components/Donate";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NgoDashboard from "./components/NgoDashboard";
import NgoRegister from "./components/NgoRegister";
import NgoAuth from "./components/NgoAuth";
import Donors from "./components/Donors";
import Info from "./components/info";
import Display from "./components/display";
import History from "./components/History";

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isNgoAuth, setIsNgoAuth] = useState(localStorage.getItem("isNgoAuth") === "true");

    // ✅ Check if user is logged in
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsAuth(!!token);
            setLoading(false);
        };
        checkAuth();
    }, []);

    // ✅ NGO Authentication Handler
    const handleNgoAuthSuccess = () => {
        setIsNgoAuth(true);
        localStorage.setItem("isNgoAuth", "true");
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <Router>
            {isAuth && <Navbar setIsAuth={setIsAuth} />}
            <Routes>
                <Route path="/" element={!isAuth ? <Login setIsAuth={setIsAuth} /> : <Navigate to="/home" />} />
                <Route path="/signup" element={!isAuth ? <Signup setIsAuth={setIsAuth} /> : <Navigate to="/home" />} />
                <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/" />} />
                <Route path="/donate" element={isAuth ? <Donate /> : <Navigate to="/" />} />
                <Route path="/about" element={isAuth ? <About /> : <Navigate to="/" />} />
                <Route path="/contact" element={isAuth ? <Contact /> : <Navigate to="/" />} />
                <Route path="/register-ngo" element={isAuth ? <NgoRegister /> : <Navigate to="/" />} />
                <Route path="/donors" element={isNgoAuth ? <Donors /> : <Navigate to="/ngo-auth" />} />
                 // Add these routes in App.jsx
                 <Route path="/history" element={isAuth ? <History /> : <Navigate to="/" />} />
    {/* ...existing routes... */}
              <Route path="/pre-donate" element={isAuth ? <Info /> : <Navigate to="/" />} />
              <Route path="/events" element={isAuth ? <Display /> : <Navigate to="/" />} />

                {/* ✅ Redirect to NGO Authentication Page if not Authenticated */}
                <Route path="/ngo-auth" element={<NgoAuth onAuthSuccess={handleNgoAuthSuccess} />} />
                <Route path="/ngodashboard" element={isNgoAuth ? <NgoDashboard /> : <Navigate to="/ngo-auth" />} />
            </Routes>
        </Router>
    );
}

export default App;
