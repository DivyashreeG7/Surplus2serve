// import { useEffect, useState } from "react";
// import axios from "axios";

// const NgoDashboard = () => {
//     const [donors, setDonors] = useState([]);
//     const [filteredDonors, setFilteredDonors] = useState([]);
//     const [error, setError] = useState("");
//     const [secretKey, setSecretKey] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");

// // filepath: c:\Users\Ashmitha U\Desktop\trii\backend\server.js
// // Update the verify-ngo endpoint
// // filepath: c:\Users\Ashmitha U\Desktop\trii\project\src\components\NgoDashboard.jsx
// const verifySecretKey = async () => {
//     try {
//         if (!secretKey.trim()) {
//             setError("Please enter a secret key");
//             return;
//         }

//         const response = await axios.post("http://localhost:5000/verify-ngo", { 
//             secretKey: secretKey.trim() 
//         });

//         if (response.data.success) {
//             setIsAuthenticated(true);
//             setError("");
//             localStorage.setItem("ngoSecretKey", secretKey.trim());
//             fetchDonors();
//         } else {
//             setError("Invalid secret key! Access denied.");
//         }
//     } catch (err) {
//         console.error("Verification error:", err);
//         setError(err.response?.data?.message || "Error verifying secret key.");
//     }
// };
//     // 🔹 Fetch donors data after authentication
//     const fetchDonors = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/donors");
//             setDonors(response.data);
//             setFilteredDonors(response.data);  // Set initial filtered list
//         } catch (err) {
//             setError("Failed to fetch donors.");
//         }
//     };

    
//     // 🔹 Polling every 5 seconds for new donor data (only if authenticated)
//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchDonors();
//             const interval = setInterval(fetchDonors, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAuthenticated]);
    
   

//     // ✅ Select a Donor & Notify them
//     const handleSelectDonor = async (donor) => {
//         try {
//             await axios.post("http://localhost:5000/select-donor", { donorId: donor._id });
//             setNotification(`Donor ${donor.name} has been notified!`);
//             setSelectedDonor(donor);
//         } catch (error) {
//             console.error("Error selecting donor:", error);
//             setNotification("❌ Failed to notify donor.");
//         }
//     };

//     // 🔹 Filter donors based on search query
//     useEffect(() => {
//         if (searchQuery.trim() === "") {
//             setFilteredDonors(donors);
//         } else {
//             const filtered = donors.filter(donor =>
//                 donor.address.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredDonors(filtered);
//         }
//     }, [searchQuery, donors]);

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Dashboard</h2>

//             {/* 🔹 Secret Key Input Form */}
//             {!isAuthenticated && (
//                 <div className="text-center">
//                     <p className="mb-2">Enter Secret Key to Access:</p>
//                     <input
//                         type="password"
//                         value={secretKey}
//                         onChange={(e) => setSecretKey(e.target.value)}
//                         className="p-2 border rounded-md"
//                         placeholder="Enter Secret Key"
//                     />
//                     <button
//                         onClick={verifySecretKey}
//                         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             )}

//             {/* 🔹 Search Bar (Visible only after authentication) */}
//             {isAuthenticated && (
//                 <div className="mt-4">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full p-2 border rounded-md"
//                         placeholder="Search by Address..."
//                     />
//                 </div>
//             )}

//             {/* 🔹 Donors List (Visible only after authentication) */}
//             {isAuthenticated && (
//                 <ul className="space-y-4 mt-4">
//                     {filteredDonors.length > 0 ? (
//                         filteredDonors.map((donor) => (
//                             <li key={donor.id} className="p-4 border rounded-lg shadow-sm">
//                                 <p><strong>Name:</strong> {donor.name}</p>
//                                 <p><strong>Address:</strong> {donor.address}</p>
//                                 <p><strong>Food Type:</strong> {donor.foodType}</p>
//                                 <p><strong>Reward Points:</strong> {donor.rewardPoints}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <p className="text-center">No donors available.</p>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default NgoDashboard;

// working
// import { useEffect, useState } from "react";
// import axios from "axios";

// const NgoDashboard = () => {
//     const [donors, setDonors] = useState([]);
//     const [filteredDonors, setFilteredDonors] = useState([]);
//     const [error, setError] = useState("");
//     const [secretKey, setSecretKey] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");

//     const verifySecretKey = async () => {
//         try {
//             if (!secretKey.trim()) {
//                 setError("Please enter a secret key");
//                 return;
//             }

//             const response = await axios.post("http://localhost:5000/verify-ngo", { 
//                 secretKey: secretKey.trim() 
//             });

//             if (response.data.success) {
//                 setIsAuthenticated(true);
//                 setError("");
//                 localStorage.setItem("ngoSecretKey", secretKey.trim());
//                 fetchDonors();
//             } else {
//                 setError("Invalid secret key! Access denied.");
//             }
//         } catch (err) {
//             console.error("Verification error:", err);
//             setError(err.response?.data?.message || "Error verifying secret key.");
//         }
//     };

//     const fetchDonors = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/donors");
//             setDonors(response.data);
//             setFilteredDonors(response.data);
//         } catch (err) {
//             setError("Failed to fetch donors.");
//         }
//     };

//     // Polling every 5 seconds for donor data
//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchDonors();
//             const interval = setInterval(fetchDonors, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAuthenticated]);

//     // Filter donors based on search query
//     useEffect(() => {
//         if (searchQuery.trim() === "") {
//             setFilteredDonors(donors);
//         } else {
//             const filtered = donors.filter(donor =>
//                 donor.address.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredDonors(filtered);
//         }
//     }, [searchQuery, donors]);

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Dashboard</h2>

//             {/* Secret Key Input */}
//             {!isAuthenticated && (
//                 <div className="text-center">
//                     <p className="mb-2">Enter Secret Key to Access:</p>
//                     <input
//                         type="password"
//                         value={secretKey}
//                         onChange={(e) => setSecretKey(e.target.value)}
//                         className="p-2 border rounded-md"
//                         placeholder="Enter Secret Key"
//                     />
//                     <button
//                         onClick={verifySecretKey}
//                         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             )}

//             {/* Search Bar */}
//             {isAuthenticated && (
//                 <div className="mt-4">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full p-2 border rounded-md"
//                         placeholder="Search by Address..."
//                     />
//                 </div>
//             )}

//             {/* Donors List */}
//             {isAuthenticated && (
//                 <ul className="space-y-4 mt-4">
//                     {filteredDonors.length > 0 ? (
//                         filteredDonors.map((donor) => (
//                             <li key={donor._id} className="p-4 border rounded-lg shadow-sm">
//                                 <p><strong>Name:</strong> {donor.name}</p>
//                                 <p><strong>Address:</strong> {donor.address}</p>
//                                 <p><strong>Food Type:</strong> {donor.foodType}</p>
//                                 <p><strong>Reward Points:</strong> {donor.rewardPoints}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <p className="text-center">No donors available.</p>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default NgoDashboard;

//wrong
// import { useEffect, useState } from "react";
// import axios from "axios";

// const NgoDashboard = () => {
//     const [donors, setDonors] = useState([]);
//     const [filteredDonors, setFilteredDonors] = useState([]);
//     const [error, setError] = useState("");
//     const [secretKey, setSecretKey] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");

//     // Function to fetch donors
//     const fetchDonors = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/donors");
//             // Use response.data since your server returns the list directly
//             setDonors(response.data);
//             setFilteredDonors(response.data);
//         } catch (err) {
//             setError("Failed to fetch donors.");
//         }
//     };

//     const verifySecretKey = async () => {
//         try {
//             if (!secretKey.trim()) {
//                 setError("Please enter a secret key");
//                 return;
//             }
//             const response = await axios.post("http://localhost:5000/verify-ngo", { 
//                 secretKey: secretKey.trim() 
//             });

//             if (response.data.success) {
//                 setIsAuthenticated(true);
//                 setError("");
//                 localStorage.setItem("ngoSecretKey", secretKey.trim());
//                 fetchDonors();  // Fetch donors after successful verification
//             } else {
//                 setError("Invalid secret key! Access denied.");
//             }
//         } catch (err) {
//             console.error("Verification error:", err);
//             setError(err.response?.data?.message || "Error verifying secret key.");
//         }
//     };

//     // Polling every 5 seconds for donor data after authentication
//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchDonors();
//             const interval = setInterval(fetchDonors, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAuthenticated]);

//     // Filter donors based on search query
//     useEffect(() => {
//         if (searchQuery.trim() === "") {
//             setFilteredDonors(donors);
//         } else {
//             const filtered = donors.filter(donor =>
//                 donor.address.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredDonors(filtered);
//         }
//     }, [searchQuery, donors]);

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Dashboard</h2>

//             {/* Secret Key Input */}
//             {!isAuthenticated && (
//                 <div className="text-center">
//                     <p className="mb-2">Enter Secret Key to Access:</p>
//                     <input
//                         type="password"
//                         value={secretKey}
//                         onChange={(e) => setSecretKey(e.target.value)}
//                         className="p-2 border rounded-md"
//                         placeholder="Enter Secret Key"
//                     />
//                     <button
//                         onClick={verifySecretKey}
//                         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             )}

//             {/* Search Bar */}
//             {isAuthenticated && (
//                 <div className="mt-4">
//                     <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full p-2 border rounded-md"
//                         placeholder="Search by Address..."
//                     />
//                 </div>
//             )}

//             {/* Donors List */}
//             {isAuthenticated && (
//                 <ul className="space-y-4 mt-4">
//                     {filteredDonors.length > 0 ? (
//                         filteredDonors.map((donor) => (
//                             <li key={donor._id} className="p-4 border rounded-lg shadow-sm">
//                                 <p><strong>Name:</strong> {donor.name}</p>
//                                 <p><strong>Address:</strong> {donor.address}</p>
//                                 <p><strong>Food Type:</strong> {donor.foodType}</p>
//                                 <p><strong>Reward Points:</strong> {donor.rewardPoints}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <p className="text-center">No donors available.</p>
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default NgoDashboard;



// import { useEffect, useState } from "react";
// import axios from "axios";

// const NgoDashboard = () => {
//     const [donors, setDonors] = useState([]);
//     const [filteredDonors, setFilteredDonors] = useState([]);
//     const [error, setError] = useState("");
//     const [secretKey, setSecretKey] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedDonors, setSelectedDonors] = useState([]);

//     // Function to fetch donors
//     const fetchDonors = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/donors");
//             setDonors(response.data);
//             setFilteredDonors(response.data);
//         } catch (err) {
//             setError("Failed to fetch donors.");
//         }
//     };

//     // Verify secret key and fetch donors
//     const verifySecretKey = async () => {
//         try {
//             if (!secretKey.trim()) {
//                 setError("Please enter a secret key");
//                 return;
//             }
//             const response = await axios.post("http://localhost:5000/verify-ngo", { 
//                 secretKey: secretKey.trim() 
//             });

//             if (response.data.success) {
//                 setIsAuthenticated(true);
//                 setError("");
//                 localStorage.setItem("ngoSecretKey", secretKey.trim());
//                 fetchDonors();  // Fetch donors only after successful verification
//             } else {
//                 setError("Invalid secret key! Access denied.");
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Error verifying secret key.");
//         }
//     };

//     // Polling every 5 seconds after authentication
//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchDonors();
//             const interval = setInterval(fetchDonors, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAuthenticated]);

//     // Filter donors based on search query
//     useEffect(() => {
//         if (searchQuery.trim() === "") {
//             setFilteredDonors(donors);
//         } else {
//             const filtered = donors.filter(donor =>
//                 donor.address.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredDonors(filtered);
//         }
//     }, [searchQuery, donors]);

//     // Handle donor selection
//     const handleDonorSelect = (donorId) => {
//         setSelectedDonors(prevSelected =>
//             prevSelected.includes(donorId)
//                 ? prevSelected.filter(id => id !== donorId) // Deselect if already selected
//                 : [...prevSelected, donorId] // Add if not selected
//         );
//     };

//     // Send message to selected donors
//     const sendMessageToDonors = async () => {
//         if (selectedDonors.length === 0) {
//             setError("No donors selected!");
//             return;
//         }
//         try {
//             await axios.post("http://localhost:5000/notify-donors", { donorIds: selectedDonors });
//             alert("Message sent to selected donors!");
//             setSelectedDonors([]); // Clear selection after sending
//         } catch (err) {
//             setError("Failed to send message.");
//         }
//     };

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Dashboard</h2>

//             {/* Secret Key Input */}
//             {!isAuthenticated && (
//                 <div className="text-center">
//                     <p className="mb-2">Enter Secret Key to Access:</p>
//                     <input
//                         type="password"
//                         value={secretKey}
//                         onChange={(e) => setSecretKey(e.target.value)}
//                         className="p-2 border rounded-md"
//                         placeholder="Enter Secret Key"
//                     />
//                     <button
//                         onClick={verifySecretKey}
//                         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             )}

//             {/* Show features only after authentication */}
//             {isAuthenticated && (
//                 <>
//                     {/* Search Bar */}
//                     <div className="mt-4">
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full p-2 border rounded-md"
//                             placeholder="Search by Address..."
//                         />
//                     </div>

//                     {/* Donors List */}
//                     <ul className="space-y-4 mt-4">
//                         {filteredDonors.length > 0 ? (
//                             filteredDonors.map((donor) => (
//                                 <li key={donor._id} className="p-4 border rounded-lg shadow-sm flex items-center">
//                                     <input
//                                         type="checkbox"
//                                         className="mr-2"
//                                         checked={selectedDonors.includes(donor._id)}
//                                         onChange={() => handleDonorSelect(donor._id)}
//                                     />
//                                     <div>
//                                         <p><strong>Name:</strong> {donor.name}</p>
//                                         <p><strong>Address:</strong> {donor.address}</p>
//                                         <p><strong>Food Type:</strong> {donor.foodType}</p>
//                                         <p><strong>Reward Points:</strong> {donor.rewardPoints}</p>
//                                     </div>
//                                 </li>
//                             ))
//                         ) : (
//                             <p className="text-center">No donors available.</p>
//                         )}
//                     </ul>

//                     {/* Send Message Button */}
//                     {selectedDonors.length > 0 && (
//                         <button
//                             onClick={sendMessageToDonors}
//                             className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                         >
//                             Send Message to Selected Donors
//                         </button>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default NgoDashboard;

// import { useState } from "react";
// import Donors from "./Donors";

// const NgoDashboard = ({ setIsNgoAuth }) => {
//     const [secretKey, setSecretKey] = useState("");
//     const [error, setError] = useState("");
//     const storedKey = localStorage.getItem("ngoSecretKey");
//     const isAuthenticated = localStorage.getItem("isNgoAuth") === "true";

//     const handleVerify = () => {
//         if (secretKey === storedKey) {
//             localStorage.setItem("isNgoAuth", "true");
//             setIsNgoAuth(true);
//         } else {
//             setError("Invalid Secret Key!");
//         }
//     };

//     return (
//         <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold text-center">NGO Dashboard</h2>
//             {!isAuthenticated ? (
//                 <div className="text-center mt-4">
//                     <p>Enter Secret Key:</p>
//                     <input
//                         type="password"
//                         value={secretKey}
//                         onChange={(e) => setSecretKey(e.target.value)}
//                         className="p-2 border rounded-md w-full"
//                         placeholder="Enter Secret Key"
//                     />
//                     <button
//                         onClick={handleVerify}
//                         className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             ) : (
//                 <Donors />
//             )}
//         </div>
//     );
// };

// export default NgoDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";

// const NgoDashboard = () => {
//     const [donors, setDonors] = useState([]);
//     const [filteredDonors, setFilteredDonors] = useState([]);
//     const [error, setError] = useState("");
//     const [secretKey, setSecretKey] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedDonors, setSelectedDonors] = useState([]);

//     // Function to fetch donors
//     const fetchDonors = async () => {
//         try {
//             const response = await axios.get("http://localhost:5000/donors");
//             setDonors(response.data);
//             setFilteredDonors(response.data);
//         } catch (err) {
//             setError("Failed to fetch donors.");
//         }
//     };

//     // Verify secret key and fetch donors
//     const verifySecretKey = async () => {
//         try {
//             if (!secretKey.trim()) {
//                 setError("Please enter a secret key");
//                 return;
//             }
//             const response = await axios.post("http://localhost:5000/verify-ngo", { 
//                 secretKey: secretKey.trim() 
//             });

//             if (response.data.success) {
//                 setIsAuthenticated(true);
//                 setError("");
//                 localStorage.setItem("ngoSecretKey", secretKey.trim());
//                 fetchDonors();  // Fetch donors only after successful verification
//             } else {
//                 setError("Invalid secret key! Access denied.");
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Error verifying secret key.");
//         }
//     };

//     // Polling every 5 seconds after authentication
//     useEffect(() => {
//         if (isAuthenticated) {
//             fetchDonors();
//             const interval = setInterval(fetchDonors, 5000);
//             return () => clearInterval(interval);
//         }
//     }, [isAuthenticated]);

//     // Filter donors based on search query
//     useEffect(() => {
//         if (searchQuery.trim() === "") {
//             setFilteredDonors(donors);
//         } else {
//             const filtered = donors.filter(donor =>
//                 donor.address.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredDonors(filtered);
//         }
//     }, [searchQuery, donors]);

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Dashboard</h2>

//             {/* Secret Key Input */}
//             {!isAuthenticated && (
//                 <div className="text-center">
//                     <p className="mb-2">Enter Secret Key to Access:</p>
//                     <input
//                         type="password"
//                         value={secretKey}
//                         onChange={(e) => setSecretKey(e.target.value)}
//                         className="p-2 border rounded-md"
//                         placeholder="Enter Secret Key"
//                     />
//                     <button
//                         onClick={verifySecretKey}
//                         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                         Submit
//                     </button>
//                     {error && <p className="text-red-500 mt-2">{error}</p>}
//                 </div>
//             )}

//             {/* Show features only after authentication */}
//             {isAuthenticated && (
//                 <>
//                     {/* Search Bar */}
//                     <div className="mt-4">
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="w-full p-2 border rounded-md"
//                             placeholder="Search by Address..."
//                         />
//                     </div>

//                     {/* Donors List */}
//                     <ul className="space-y-4 mt-4">
//                         {filteredDonors.length > 0 ? (
//                             filteredDonors.map((donor) => (
//                                 <li key={donor._id} className="p-4 border rounded-lg shadow-sm flex items-center">
//                                     <div>
//                                         <p><strong>Name:</strong> {donor.name}</p>
//                                         <p><strong>Address:</strong> {donor.address}</p>
//                                         <p><strong>Food Type:</strong> {donor.foodType}</p>
//                                         <p><strong>Reward Points:</strong> {donor.rewardPoints}</p>
//                                     </div>
//                                 </li>
//                             ))
//                         ) : (
//                             <p className="text-center">No donors available.</p>
//                         )}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// };

// export default NgoDashboard;
// App.jsx


// NgoDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NgoDashboard() {
    const [donors, setDonors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // ✅ Check if NGO is Authenticated
    useEffect(() => {
        const isNgoAuth = localStorage.getItem("ngoAuth");
        if (!isNgoAuth) {
            navigate("/ngo-auth");
        }
    }, [navigate]);

    // ✅ Fetch Donors from Server
    useEffect(() => {
        fetch("http://localhost:5000/donors")
            .then((res) => res.json())
            .then((data) => setDonors(data))
            .catch((error) => console.error("Error fetching donors:", error));
    }, []);

    // ✅ Handle Notifications
    const sendNotification = (donorId) => {
        fetch(`http://localhost:5000/notify-donor/${donorId}`, { method: "POST" })
            .then(() => alert("Notification sent!"))
            .catch((error) => console.error("Error sending notification:", error));
    };

    // ✅ Filter Donors Based on Search Term
    const filteredDonors = donors.filter((donor) =>
        donor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Donor List</h1>
            <input
                type="text"
                placeholder="Search by Address"
                className="border p-2 mb-4 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Address</th>
                        <th className="border p-2">Food Type</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDonors.map((donor) => (
                        <tr key={donor._id} className="border">
                            <td className="border p-2">{donor.name}</td>
                            <td className="border p-2">{donor.address}</td>
                            <td className="border p-2">{donor.foodType}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => sendNotification(donor._id)}
                                >
                                    Notify
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default NgoDashboard;
