

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");
const app = express();
const twilio = require('twilio');
const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


// Add this route


// ✅ CORS Configuration (Supports Multiple Frontend URLs)
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://yourdomain.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

// ✅ MongoDB Atlas Connection
const MONGODB_URI = "mongodb+srv://ashmithau0:GAsc6jbakxa3YNb2@cluster0.pzsoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const JWT_SECRET = "xK8aP2z$Lm7QrT9wY3vE6cJ1nB5gF0dH4sU*jA&fZ@pN";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB Atlas");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
};
connectDB();

// =========================
// 🔹 User Schema & Model
// =========================
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);


const reverseGeocode = async (latitude, longitude) => {
    try {
        if (!process.env.OPENCAGE_API_KEY) {
            throw new Error("OpenCage API key not configured");
        }

        console.log("Geocoding request:", { latitude, longitude }); // Debug log

        const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_API_KEY}`
        );
        
        console.log("Geocoding response:", response.data); // Debug log

        if (response.data.results.length > 0) {
            return response.data.results[0].formatted;
        }
        return null;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        throw error; // Propagate error for handling in the main route
    }
};


// ==========================
// 🔹 Signup Route
// ==========================
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: "24h" });

        res.status(201).json({ message: "User registered successfully", token, userId: newUser._id });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error during registration" });
    }
});


app.delete('/donors/:id', async (req, res) => {
    try {
        const donorId = req.params.id;
        await Donor.findByIdAndDelete(donorId);
        res.json({ success: true, message: 'Donor removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing donor', error: error.message });
    }
});


// =========================
// 🔹 Login Route
// =========================
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ $or: [{ username }, { email: username }] });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid username or password" });

        const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error during login" });
    }
});



const donationHistorySchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    foodType: { type: String, required: true },
    servings: { type: Number, required: true },
    donationDate: { type: Date, default: Date.now },
    address: { type: String, required: true },
    points: { type: Number, default: 10 }
});

const DonationHistory = mongoose.model("DonationHistory", donationHistorySchema);



// Add these to server.js
// Event Schema
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventInfo: { type: String, required: true },
    donorName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    endTime: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model("Event", eventSchema);

// Pre-donate endpoint
app.post("/pre-donate", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ success: true, message: "Event registered successfully" });
    } catch (error) {
        console.error("Event registration error:", error);
        res.status(500).json({ success: false, message: "Error registering event" });
    }
});

// Get events endpoint
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find().sort({ endTime: 1 });
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
});
// =========================
// 🔹 Donor Schema & Model
// =========================
const donorSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    foodType: { type: String, trim: true },
    servings: { type: Number, required: true },
    preparedTime: { type: Date, required: true }, // Add this field
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});


const Donor = mongoose.model("Donor", donorSchema);

// =========================
// 🔹 NGO Schema & Secret Key
// =========================
const ngoSchema = new mongoose.Schema({
    ngoName: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    secretKey: { type: String, required: true },
    currentLatitude: { type: Number },
    currentLongitude: { type: Number },
    currentAddress: { type: String }
});
const NGO = mongoose.model("NGO", ngoSchema);

// =========================
// 🔹 NGO Registration Route
// =========================
// 🔹 Register NGO
// filepath: c:\Users\Ashmitha U\Desktop\trii\backend\server.js
// Update the verify-ngo endpoint
// 🔹 Register NGO
// ===================================
app.post("/register-ngo", async (req, res) => {
    try {
        const { ngoName, contact, address, secretKey } = req.body;

        // Validate required fields
        if (!ngoName || !contact || !address || !secretKey) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if NGO already exists
        const existingNgo = await NGO.findOne({
            $or: [
                { ngoName: ngoName },
                { secretKey: secretKey.trim().toLowerCase() }
            ]
        });

        if (existingNgo) {
            return res.status(400).json({
                success: false,
                message: "NGO with this name or secret key already exists"
            });
        }

        // Create new NGO
        const newNgo = new NGO({
            ngoName,
            contact,
            address,
            secretKey: secretKey.trim().toLowerCase()
        });

        await newNgo.save();

        res.status(201).json({
            success: true,
            message: "NGO registered successfully"
        });
    } catch (error) {
        console.error("NGO Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Error registering NGO",
            error: error.message
        });
    }
});
function formatPhoneNumber(phone) {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('91')) {
        return `+91${cleaned}`; // Add India country code
    }
    return `+${cleaned}`;
}
// Add these near the top of your file after other imports

// Add this route to handle notifications
// Add this debugging middleware
app.use((req, res, next) => {
    console.log('Request body:', req.body);
    next();
});

if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    console.error("❌ Twilio credentials missing in environment variables");
}
// Add this debugging middleware at the top of your routes
// app.post("/notify-donors", async (req, res) => {
//     try {
//         const { donors } = req.body;
        
//         // Debug logs
//         console.log('Environment variables:', {
//             sid: process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Missing',
//             token: process.env.TWILIO_AUTH_TOKEN ? 'Set' : 'Missing',
//             phone: process.env.TWILIO_PHONE_NUMBER
//         });
        
//         console.log('Received donors:', donors);

//         if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
//             throw new Error('Twilio credentials are not properly configured');
//         }

//         if (!donors || donors.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No donors provided"
//             });
//         }

//         const notifications = await Promise.allSettled(
//             donors.map(async (donor) => {
//                 try {
//                     const formattedPhone = formatPhoneNumber(donor.contact);
//                     console.log(`Attempting to send SMS to ${formattedPhone}`);

//                     const message = await client.messages.create({
//                         body: `Dear ${donor.name}, Thank you for your food donation! Your donation of ${donor.servings} servings has been accepted.`,
//                         to: formattedPhone,
//                         from: process.env.TWILIO_PHONE_NUMBER
//                     });

//                     console.log(`SMS sent successfully to ${donor.name}, SID: ${message.sid}`);
                    
//                     // Remove donor from database
//                     await Donor.findByIdAndDelete(donor._id);
                    
//                     return { success: true, sid: message.sid, phone: formattedPhone };
//                 } catch (err) {
//                     console.error(`Failed to send SMS to ${donor.name}:`, err);
//                     return { success: false, error: err.message, phone: donor.contact };
//                 }
//             })
//         );

//         const successCount = notifications.filter(n => n.status === 'fulfilled').length;

//         res.json({
//             success: successCount > 0,
//             message: `Successfully notified ${successCount} out of ${donors.length} donors`,
//             details: notifications
//         });

//     } catch (error) {
//         console.error("Notification error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to send notifications",
//             error: error.message
//         });
//     }
// });

// Update the /notify-donors endpoint
// app.post("/notify-donors", async (req, res) => {
//     try {
//         const { donors, ngoSecretKey } = req.body;
        
//         console.log("Received notification request:", { donors, ngoSecretKey }); // Debug log

//         if (!donors || donors.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No donors provided"
//             });
//         }

//         // Verify Twilio credentials
//         if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
//             throw new Error("Twilio credentials not properly configured");
//         }

//         // Get NGO details
//         const ngo = await NGO.findOne({ secretKey: ngoSecretKey?.trim().toLowerCase() });
//         if (!ngo) {
//             return res.status(400).json({
//                 success: false,
//                 message: "NGO not found with provided secret key"
//             });
//         }

//         // Send notifications and track results
//         const results = [];
//         for (const donor of donors) {
//             try {
//                 const formattedPhone = formatPhoneNumber(donor.contact);
//                 console.log(`Attempting to send SMS to ${formattedPhone}`); // Debug log

//                 const message = await client.messages.create({
//                     body: `Dear ${donor.name},
// Your food donation of ${donor.servings} servings has been accepted by ${ngo.ngoName}.

// NGO Contact: ${ngo.contact}
// NGO Address: ${ngo.currentAddress || ngo.address}

// Thank you for your contribution!`,
//                     to: formattedPhone,
//                     from: process.env.TWILIO_PHONE_NUMBER
//                 });

//                 console.log(`SMS sent successfully, SID: ${message.sid}`); // Debug log

//                 // Create donation history entry
//                 await DonationHistory.create({
//                     donorName: donor.name,
//                     email: donor.email,
//                     foodType: donor.foodType,
//                     servings: donor.servings,
//                     address: donor.address,
//                     points: 10,
//                 });

//                 // Remove donor from active list
//                 await Donor.findByIdAndDelete(donor._id);

//                 results.push({
//                     success: true,
//                     donorName: donor.name,
//                     messageSid: message.sid
//                 });
//             } catch (error) {
//                 console.error(`Error sending notification to ${donor.name}:`, error);
//                 results.push({
//                     success: false,
//                     donorName: donor.name,
//                     error: error.message
//                 });
//             }
//         }

//         const successfulNotifications = results.filter(r => r.success).length;

//         res.json({
//             success: successfulNotifications > 0,
//             message: `Successfully notified ${successfulNotifications} out of ${donors.length} donors`,
//             details: results
//         });

//     } catch (error) {
//         console.error("Notification error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to send notifications",
//             error: error.message
//         });
//     }
// });

app.post("/notify-donors", async (req, res) => {
    try {
        const { donors, ngoSecretKey } = req.body;
        
        if (!donors || donors.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No donors provided"
            });
        }

        // Get NGO details
        const ngo = await NGO.findOne({ secretKey: ngoSecretKey.trim().toLowerCase() });
        if (!ngo) {
            return res.status(400).json({
                success: false,
                message: "NGO not found"
            });
        }

        const results = [];
        for (const donor of donors) {
            try {
                const formattedPhone = formatPhoneNumber(donor.contact);
                console.log(`Attempting to notify ${donor.name} at ${formattedPhone}`);

                // Send SMS
                const message = await client.messages.create({
                    body: `Dear ${donor.name},\nYour food donation of ${donor.servings} servings has been accepted by:\n\nNGO Name: ${ngo.ngoName}\nNGO Contact: ${ngo.contact}\nNGO Address: ${ngo.currentAddress || ngo.address}\n\nThank you for your contribution!`,
                    to: formattedPhone,
                    from: process.env.TWILIO_PHONE_NUMBER
                });

                // Create history entry
                await DonationHistory.create({
                    donorName: donor.name,
                    email: donor.email,
                    foodType: donor.foodType,
                    servings: donor.servings,
                    address: donor.address,
                    points: 10,
                    donationDate: new Date()
                });

                // Remove donor from active list
                await Donor.findByIdAndDelete(donor._id);

                results.push({
                    success: true,
                    donorName: donor.name,
                    messageSid: message.sid
                });

                console.log(`✅ Successfully processed donor: ${donor.name}`);
            } catch (error) {
                console.error(`Error processing donor ${donor.name}:`, error);
                results.push({
                    success: false,
                    donorName: donor.name,
                    error: error.message
                });
            }
        }

        const successCount = results.filter(r => r.success).length;

        res.json({
            success: successCount > 0,
            message: `Successfully processed ${successCount} out of ${donors.length} donors`,
            details: results
        });

    } catch (error) {
        console.error("Notification error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to process notifications",
            error: error.message
        });
    }
});
// Update phone formatting function
function formatPhoneNumber(phone) {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Remove leading zeros
    cleaned = cleaned.replace(/^0+/, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('91')) {
        cleaned = '91' + cleaned;
    }
    
    // Add plus sign
    cleaned = '+' + cleaned;
    
    console.log(`Original number: ${phone}, Formatted number: ${cleaned}`); // Debug log
    return cleaned;
}
// 🔹 Verify NGO Secret Key
app.post("/verify-ngo", async (req, res) => {
    try {
        const { secretKey, latitude, longitude } = req.body;
        
        console.log("Verification request received:", { secretKey, latitude, longitude });

        // Input validation
        if (!secretKey) {
            return res.status(400).json({ 
                success: false, 
                message: "Secret key is required" 
            });
        }

        if (!latitude || !longitude) {
            return res.status(400).json({ 
                success: false, 
                message: "Location coordinates are required" 
            });
        }

        // Find NGO
        const ngo = await NGO.findOne({ 
            secretKey: secretKey.trim().toLowerCase() 
        });

        if (!ngo) {
            console.log("NGO not found with secret key:", secretKey);
            return res.status(401).json({
                success: false,
                message: "Invalid secret key"
            });
        }

        try {
            // Get address from coordinates
            const address = await reverseGeocode(latitude, longitude);
            
            if (!address) {
                return res.status(400).json({
                    success: false,
                    message: "Could not determine location address"
                });
            }

            // Update NGO location
            const updatedNgo = await NGO.findByIdAndUpdate(
                ngo._id,
                {
                    $set: {
                        currentLatitude: latitude,
                        currentLongitude: longitude,
                        currentAddress: address
                    }
                },
                { new: true, runValidators: true }
            );

            if (!updatedNgo) {
                throw new Error("Failed to update NGO location");
            }

            res.json({
                success: true,
                message: "Verified successfully",
                ngo: {
                    name: updatedNgo.ngoName,
                    address: address
                },
                location: {
                    latitude,
                    longitude,
                    address
                }
            });

        } catch (error) {
            console.error("Location update error:", error);
            return res.status(500).json({
                success: false,
                message: "Error updating location",
                error: error.message
            });
        }
    } catch (error) {
        console.error("Verification error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during verification",
            error: error.message
        });
    }
});

// 🔹 API to verify secret key for NGO Dashboard access
// In your server.js file, update the verify-ngo endpoint
// app.post("/verify-ngo", async (req, res) => {
//     try {
//         const { secretKey } = req.body;
//         if (!secretKey) {
//             return res.status(400).json({ success: false, message: "Secret key is required" });
//         }

//         const ngo = await NGO.findOne({ secretKey });
//         if (ngo) {
//             res.json({ 
//                 success: true, 
//                 message: "Secret key verified successfully",
//                 ngo: { name: ngo.name, address: ngo.address }
//             });
//         } else {
//             res.json({ 
//                 success: false, 
//                 message: "Invalid secret key"
//             });
//         }
//     } catch (error) {
//         console.error("NGO verification error:", error);
//         res.status(500).json({ 
//             success: false, 
//             message: "Server error during verification"
//         });
//     }
// });

// ✅ Update Donor Status when NGO selects them
app.post("/select-donor", async (req, res) => {
    try {
        const { donorId } = req.body;
        const donor = await Donor.findById(donorId);

        if (!donor) return res.status(404).json({ message: "Donor not found" });

        donor.status = "Selected";
        await donor.save();

        res.status(200).json({ message: "Donor has been selected and notified." });
    } catch (error) {
        console.error("Error selecting donor:", error);
        res.status(500).json({ message: "Error selecting donor" });
    }
});  

// ✅ Get Donors including their status
// Update the donors endpoint with better error handling
app.get("/donors", async (req, res) => {
    try {
        const donors = await Donor.find().sort({ createdAt: -1 });
        console.log("Fetched donors:", donors.length); // Debug log
        res.status(200).json(donors);
    } catch (error) {
        console.error("Fetch donors error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching donors",
            error: error.message 
        });
    }
});

app.post("/send-notifications", async (req, res) => {
    const { donorIds } = req.body;

    // ✅ Update the database to mark selected donors as notified
    await Donor.updateMany(
        { _id: { $in: donorIds } },
        { $set: { notified: true } }
    );

    res.json({ success: true, message: "Notifications sent successfully!" });
});
// Update the donate endpoint
app.post("/donate", async (req, res) => {
    try {
        const { name, contact, email, foodType, servings, latitude, longitude, preparedTime } = req.body;
        
        // Get address from coordinates
        const address = await reverseGeocode(latitude, longitude);
        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Could not determine address from location"
            });
        }

        const newDonation = new Donor({
            name,
            contact,
            address,
            email,
            foodType,
            servings: Number(servings),
            preparedTime: new Date(preparedTime),
            latitude,
            longitude
        });

        await newDonation.save();

        // Fetch all registered NGOs
        const ngos = await NGO.find({});

        // Send SMS notifications to all NGOs
        for (const ngo of ngos) {
            try {
                const formattedPhone = formatPhoneNumber(ngo.contact);
                await client.messages.create({
                    body: `New food donation available!


Please check your NGO dashboard for more details.`,
                    to: formattedPhone,
                    from: process.env.TWILIO_PHONE_NUMBER
                });
                console.log(`✅ Notification sent to NGO: ${ngo.ngoName}`);
            } catch (error) {
                console.error(`Failed to send notification to NGO ${ngo.ngoName}:`, error);
            }
        }
        
        res.status(201).json({
            success: true,
            message: "Donation submitted successfully and NGOs have been notified!",
            address: address
        });
    } catch (error) {
        console.error("Donation submission error:", error);
        res.status(500).json({
            success: false,
            message: "Error submitting donation",
            error: error.message
        });
    }
});
app.post("/notify-donor/:id", async (req, res) => {
    try {
        const donorId = req.params.id;
        console.log(`Notification sent to donor: ${donorId}`);
        res.json({ success: true, message: "Notification sent!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending notification" });
    }
});

app.get("/donation-history", async (req, res) => {
    try {
        const history = await DonationHistory.find().sort({ donationDate: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching donation history" });
    }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
