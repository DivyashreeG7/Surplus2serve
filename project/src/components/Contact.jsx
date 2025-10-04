// import { useState } from "react";
// import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";

// export default function ContactUs() {
//     const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
//     const [errors, setErrors] = useState({});
//     const [success, setSuccess] = useState(false);

//     const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//         setErrors({ ...errors, [e.target.id]: "" });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let newErrors = {};

//         if (!formData.name) newErrors.name = "Name is required";
//         if (!formData.email) newErrors.email = "Email is required";
//         else if (!validateEmail(formData.email)) newErrors.email = "Email is invalid";
//         if (!formData.subject) newErrors.subject = "Subject is required";
//         if (!formData.message) newErrors.message = "Message is required";

//         if (Object.keys(newErrors).length === 0) {
//             setSuccess(true);
//             setTimeout(() => setSuccess(false), 5000);
//             setFormData({ name: "", email: "", subject: "", message: "" });
//         }
//         setErrors(newErrors);
//     };

//     return (
//         <div>
//             <div className="hero h-64 bg-cover bg-center bg-black bg-opacity-50 flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=2070)` }}>
//                 Get in Touch
//             </div>

//             <div className="container mx-auto px-4 py-12 max-w-5xl grid md:grid-cols-2 gap-12">
//                 <div className="space-y-8">
//                     <div className="p-8 bg-white shadow-lg rounded-lg">
//                         <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
//                         <div className="flex items-center gap-4 text-gray-600 mb-4"><Mail /> contact@example.com</div>
//                         <div className="flex items-center gap-4 text-gray-600 mb-4"><Phone /> +91 98765 43210</div>
//                         <div className="flex items-center gap-4 text-gray-600"><MapPin /> 123 Business Avenue, Tech Park, Bangalore - 560001</div>
//                         <div className="mt-6 flex gap-4">
//                             <a href="#" className="text-gray-600 hover:text-blue-600"><Twitter /></a>
//                             <a href="#" className="text-gray-600 hover:text-blue-600"><Linkedin /></a>
//                             <a href="#" className="text-gray-600 hover:text-blue-600"><Github /></a>
//                         </div>
//                     </div>
//                     <div className="p-8 bg-white shadow-lg rounded-lg">
//                         <iframe
//                             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.49085577079365!3d12.954294595483649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709005436287!5m2!1sen!2sin"
//                             className="w-full h-64 rounded-lg"
//                             allowFullScreen
//                             loading="lazy"
//                         ></iframe>
//                     </div>
//                 </div>

//                 <div className="p-8 bg-white shadow-lg rounded-lg">
//                     <h2 className="text-2xl font-semibold mb-6">Feedback</h2>
//                     <form onSubmit={handleSubmit}>
//                         {['name', 'email', 'subject', 'message'].map((field) => (
//                             <div key={field} className="mb-4">
//                                 <label className="block text-gray-700 mb-2" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                                 {field === 'message' ? (
//                                     <textarea id={field} className={`w-full p-3 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg`} rows="4" placeholder={`Your ${field} here...`} value={formData[field]} onChange={handleChange}></textarea>
//                                 ) : (
//                                     <input type={field === 'email' ? 'email' : 'text'} id={field} className={`w-full p-3 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg`} placeholder={`Your ${field}`} value={formData[field]} onChange={handleChange} />
//                                 )}
//                                 {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
//                             </div>
//                         ))}
//                         <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex justify-center items-center gap-2">
//                             <Send /> Send Message
//                         </button>
//                     </form>
//                     {success && (
//                         <div className="mt-4 p-4 bg-green-100 text-green-700 flex items-center gap-2 rounded-lg">
//                             <CheckCircle2 /> Thank you! Your message has been sent successfully.
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState } from "react";
// import { createIcons, Mail, Phone, MapPin, Twitter, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";
// import "./Contact.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

//   const validateForm = () => {
//     let isValid = true;
//     let newErrors = {};

//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
//     if (!formData.subject) newErrors.subject = "Subject is required";
//     if (!formData.message) newErrors.message = "Message is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//     setErrors({ ...errors, [e.target.id]: "" });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       setSuccess(true);
//       setFormData({ name: "", email: "", subject: "", message: "" });
//       setTimeout(() => setSuccess(false), 5000);
//     }
//   };

//   return (
//     <div>
//       <div className="hero">
//         <h1>Get in Touch</h1>
//       </div>

//       <div className="container">
//         <div className="grid">
//           <div className="contact-info">
//             <div className="card info-card">
//               <h2>Contact Information</h2>
//               <div className="info-item">
//                 <Mail /> <span>contact@example.com</span>
//               </div>
//               <div className="info-item">
//                 <Phone /> <span>+91 98765 43210</span>
//               </div>
//               <div className="info-item">
//                 <MapPin /> <span>123 Business Avenue, Tech Park, Bangalore - 560001</span>
//               </div>
//               <div className="social-links">
//                 <h3>Connect With Us</h3>
//                 <div className="social-icons">
//                   <a href="#"><Twitter /></a>
//                   <a href="#"><Linkedin /></a>
//                   <a href="#"><Github /></a>
//                 </div>
//               </div>
//             </div>
//             <div className="card map-container">
//               <iframe
//                 src="https://www.google.com/maps/embed?..."
//                 allowFullScreen
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>
//             </div>
//           </div>

//           <div className="card">
//             <h2>Feedback</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="name">Name</label>
//                 <input type="text" id="name" value={formData.name} onChange={handleChange} />
//                 {errors.name && <div className="error">{errors.name}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input type="email" id="email" value={formData.email} onChange={handleChange} />
//                 {errors.email && <div className="error">{errors.email}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="subject">Subject</label>
//                 <input type="text" id="subject" value={formData.subject} onChange={handleChange} />
//                 {errors.subject && <div className="error">{errors.subject}</div>}
//               </div>

//               <div className="form-group">
//                 <label htmlFor="message">Message</label>
//                 <textarea id="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
//                 {errors.message && <div className="error">{errors.message}</div>}
//               </div>

//               <button type="submit" className="submit-btn">
//                 <Send /> <span>Send Message</span>
//               </button>
//             </form>

//             {success && (
//               <div className="success-message">
//                 <CheckCircle2 /> <span>Thank you! Your message has been sent successfully.</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
import React, { useState } from "react";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Hide the message after 3 seconds
    setTimeout(() => setFormSubmitted(false), 3000);

    // Optional: Reset form fields (uncomment if needed)
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

        {/* Success Message */}
        {formSubmitted && (
          <div className="flex items-center justify-center text-green-600 font-semibold bg-green-100 p-3 rounded-md mb-4 transition-opacity duration-500">
            <CheckCircle2 className="w-5 h-5 mr-2" /> Thank you for your valuable response!
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" /> Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="mt-6 text-center text-gray-600 space-y-2">
          <p className="flex items-center justify-center gap-2"><Mail className="w-5 h-5 text-blue-600" /> example@mail.com</p>
          <p className="flex items-center justify-center gap-2"><Phone className="w-5 h-5 text-blue-600" /> +91 98765 43210</p>
          <p className="flex items-center justify-center gap-2"><MapPin className="w-5 h-5 text-blue-600" /> Mysore, India</p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-3">
            <a href="#" className="text-blue-500 hover:text-blue-700"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-blue-500 hover:text-blue-700"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-blue-500 hover:text-blue-700"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
