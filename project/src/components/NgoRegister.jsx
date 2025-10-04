// import { useState } from "react";
// import axios from "axios";

// const NgoRegister = () => {
//     const [formData, setFormData] = useState({ 
//         name: "", 
//         contact: "", 
//         address: "", 
//         secretKey: "" // Changed from secretCode to secretKey
//     });
//     const [message, setMessage] = useState("");
//     const [isSuccess, setIsSuccess] = useState(false);

//     const updateField = (field, value) => {
//         setFormData({ ...formData, [field]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const response = await axios.post("http://localhost:5001/register-ngo", formData);
//             setMessage(response.data.message);
//             setIsSuccess(true);
//             setFormData({ name: "", contact: "", address: "", secretKey: "" });
//         } catch (error) {
//             setIsSuccess(false);
//             setMessage(error.response?.data?.message || "Registration failed. Try again.");
//         }
//     };

//     return (
//         <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Registration</h2>
//             {message && <p className={`mb-4 text-center ${isSuccess ? "text-green-600" : "text-red-500"}`}>{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" placeholder="NGO Name" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("name", e.target.value)} value={formData.name} />
//                 <input type="text" placeholder="Contact" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("contact", e.target.value)} value={formData.contact} />
//                 <input type="text" placeholder="Address" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("address", e.target.value)} value={formData.address} />
//                 <input type="password" placeholder="Secret Key" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("secretKey", e.target.value)} value={formData.secretKey} />
//                 <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
//             </form>
//         </div>
//     );
// };

// export default NgoRegister;

// import { useState } from "react";
// import axios from "axios";

// const NgoRegister = () => {
//     const [formData, setFormData] = useState({ 
//         name: "", 
//         contact: "", 
//         address: "", 
//         secretKey: ""
//     });
//     const [message, setMessage] = useState("");
//     const [isSuccess, setIsSuccess] = useState(false);

//     const updateField = (field, value) => {
//         setFormData({ ...formData, [field]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const response = await axios.post("http://localhost:5000/register-ngo", formData);
//             if (response.data.success) {
//                 setMessage(response.data.message);
//                 setIsSuccess(true);
//                 localStorage.setItem("ngoSecretKey", formData.secretKey); // Store secret key
//                 setFormData({ name: "", contact: "", address: "", secretKey: "" });
//             } else {
//                 setMessage(response.data.message);
//                 setIsSuccess(false);
//             }
//         } catch (error) {
//             setIsSuccess(false);
//             setMessage(error.response?.data?.message || "Registration failed. Try again.");
//         }
//     };

//     return (
//         <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
//             <h2 className="text-xl font-semibold mb-4 text-center">NGO Registration</h2>
//             {message && <p className={`mb-4 text-center ${isSuccess ? "text-green-600" : "text-red-500"}`}>{message}</p>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input type="text" placeholder="NGO Name" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("name", e.target.value)} value={formData.name} />
//                 <input type="text" placeholder="Contact" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("contact", e.target.value)} value={formData.contact} />
//                 <input type="text" placeholder="Address" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("address", e.target.value)} value={formData.address} />
//                 <input type="password" placeholder="Secret Key" required className="w-full p-2 border rounded"
//                     onChange={(e) => updateField("secretKey", e.target.value)} value={formData.secretKey} />
//                 <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//                     Register
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default NgoRegister;


// import { useState } from "react";

// const NgoRegister = () => {
//     const [ngoName, setNgoName] = useState("");
//     const [secretKey, setSecretKey] = useState("");

//     const handleRegister = async () => {
//         const response = await fetch("/api/register-ngo", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ ngoName, secretKey }),
//         });
//         const data = await response.json();
//         if (data.success) alert("NGO Registered Successfully!");
//     };

//     return (
//         <div>
//             <h2>Register NGO</h2>
//             <input
//                 type="text"
//                 placeholder="NGO Name"
//                 value={ngoName}
//                 onChange={(e) => setNgoName(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Enter Secret Key"
//                 value={secretKey}
//                 onChange={(e) => setSecretKey(e.target.value)}
//             />
//             <button onClick={handleRegister}>Register</button>
//         </div>
//     );
// };

// export default NgoRegister;

import { useState } from "react";
import axios from "axios";

const NgoRegister = () => {
    const [formData, setFormData] = useState({
        ngoName: "",
        address: "",
        contact: "",
        secretKey: ""
    });
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await axios.post("http://localhost:5001/register-ngo", formData);

            if (response.data.success) {
                setIsSuccess(true);
                setMessage(response.data.message);
                localStorage.setItem("ngoSecretKey", formData.secretKey);
                setFormData({
                    ngoName: "",
                    address: "",
                    contact: "",
                    secretKey: ""
                });
            } else {
                setIsSuccess(false);
                setMessage(response.data.message || "Registration failed");
            }
        } catch (error) {
            setIsSuccess(false);
            setMessage(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">NGO Registration</h2>
            {message && (
                <p className={`mb-4 text-center ${isSuccess ? "text-green-600" : "text-red-500"}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="ngoName"
                    placeholder="NGO Name"
                    value={formData.ngoName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="password"
                    name="secretKey"
                    placeholder="Secret Key"
                    value={formData.secretKey}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Register NGO
                </button>
            </form>
        </div>
    );
};

export default NgoRegister;