const express = require("express"),
  app = express(),
  cors = require("cors"),
  compression = require("compression"),
  helmet = require("helmet"),
  cookieParser = require("cookie-parser"),
  env = require("./env"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  https = require("https"),
  connectDB = require("./config/database/mongoose"), // Import koneksi MongoDB
  port = env.port || 9000;

// Middleware
app.use(helmet());
app.use(compression());
app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use("/public", express.static(__dirname + "/public")); // Public directory

// Log Configuration
const log_path = env.log_path || path.join(__dirname, "logs");
if (!fs.existsSync(log_path)) {
  fs.mkdirSync(log_path, { recursive: true });
}

// Log Errors
app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400,
    stream: fs.createWriteStream(path.join(log_path, "error.log"), { flags: "a" }),
  })
);

// Log Success Requests
app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode > 400,
    stream: fs.createWriteStream(path.join(log_path, "access.log"), { flags: "a" }),
  })
);

// Enable CORS
app.use(cors());

// Cookie Parser
app.use(cookieParser());

// Routes
const indexRoute = require("./routes/indexRoute");
indexRoute(app);

// Start Server After Database Connection
const startServer = async () => {
  await connectDB(); // Pastikan MongoDB terhubung sebelum server berjalan

  if (env.node_env === "production-https") {
    try {
      const privateKey = fs.readFileSync(env.httpsPrivateKey, "utf8");
      const certificate = fs.readFileSync(env.httpsCertificate, "utf8");
      const credentials = { key: privateKey, cert: certificate };
      const httpsApps = https.createServer(credentials, app);
      httpsApps.listen(port, () => console.log(`🚀 Server running securely on port ${port}`));
    } catch (error) {
      console.error("❌ HTTPS configuration error:", error);
      process.exit(1);
    }
  } else {
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  }
};

// Run Server
startServer();

module.exports = app;
