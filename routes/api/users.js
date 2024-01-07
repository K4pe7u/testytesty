const express = require("express");
const router = express.Router();
const { User } = require("../../db/models/user");
const { getUser } = require("../../db/services/users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../../auth/auth");

const { secretJwt } = require("../../config");

const nodemailer = require("nodemailer");
const { token } = require("morgan");

const secretKey = process.env.MAILER_KEY;
const secretMail = process.env.MAILER_MAIL;
const verifyBase = process.env.BASE_URL;

const mainTransporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: secretMail,
    pass: secretKey,
  },
  secure: true,
});

// VERIFY

router.get("/verify", async (req, res) => {
  try {
    const token = req.query.token;
    console.log("Received token:", token);
    const decoded = jwt.verify(token, secretJwt);
    console.log("Decoded token:", decoded);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    user.isVerified = true;

    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Email verification successful",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred during verification",
    });
  }
});

// REGISTER

router.post("/signup", async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name === "" || email === "" || password === "") {
      return res.status(400).json({
        status: "Failed",
        message: "Empty input fields!",
      });
    }

    if (!/^[a-zA-Z]*$/.test(name)) {
      return res.status(422).json({
        status: "Failed",
        message: "Invalid name entered!",
      });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(422).json({
        status: "Failed",
        message: "Invalid email entered!",
      });
    }

    if (password.length < 12) {
      return res.status(400).json({
        status: "Failed",
        message: "Password is too short!",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: "Failed",
        message: "Email already exists in the database",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ email: email }, secretJwt, { expiresIn: "24h" });

    const mailOptions = {
      from: secretMail,
      to: email,
      subject: `Confirm registrations to "So-Yummy"`,
      html: `
      <p>Hello ${name}!</p>
      <p>Thank you for signing up with So Yummy.</p>
      <p>Please click on the following link to verify your email address:</p>
      <a href="${verifyBase}/api/users/verify?token=${encodeURIComponent(
        token
      )}">Verify Email</a>
    `,
    };

    const info = await mainTransporter.sendMail(mailOptions);
    console.log("Verification email has been sent:", info.response);

    res.status(201).json({
      status: "Success",
      message: "Signup successful!",
      user: {
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.error(error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "Failed",
        message: "Validation error. Please check your input data.",
      });
    }

    res.status(500).json({
      status: "Failed",
      message: "An error occurred while processing the request!",
    });
  }
});

// LOGIN

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Email or password is wrong!",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        status: "Unauthorized",
        message:
          "Account not verified. Please check your email for the verification link.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Email or password is wrong",
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secretJwt, {
      expiresIn: "4h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      status: "Success",
      message: "Successful login!",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// LOGOUT

router.post("/logout", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID:", userId);

    const user = await getUser(userId);
    console.log("User data:", user);

    if (!user || !user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
      });
    }

    console.log("User token:", user.token);

    user.token = null;
    await user.save();

    res.status(200).json({
      message: "Logout is done",
    });
    return;
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during logout.",
    });
  }
});

//CURRENT

router.get("/current", auth, async (req, res) => {
  try {
    const currentUser = req.user.id;
    // console.log("Current User ID:", currentUser);
    const currentUserData = await User.findOne({ _id: currentUser });

    if (!currentUserData) {
      return res
        .status(401)
        .json({ status: "Unauthorized", message: "Not authorized" });
    }

    res.status(200).json({
      status: "OK",
      user: {
        id: currentUserData._id,
        name: currentUserData.name,
        email: currentUserData.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: "Internal Server Error", code: 500 });
  }
});

//UPDATE

router.patch("/update", auth, async (req, res) => {
  try {
    const currentUser = req.user.id;

    const { newName, newEmail } = req.body;

    const currentUserData = await User.findOne({ _id: currentUser });

    if (!currentUserData) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Not authorized",
      });
    }

    if (
      (newName && !/^[a-zA-Z]*$/.test(newName)) ||
      (newEmail && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newEmail))
    ) {
      return res.status(422).json({
        status: "Failed",
        message: "Invalid input data!",
      });
    }

    if (newName) {
      currentUserData.name = newName;
    }

    if (newEmail) {
      currentUserData.email = newEmail;
    }

    await currentUserData.save();

    res.status(200).json({
      status: "OK",
      message: "User data updated successfully",
      user: {
        id: currentUserData._id,
        name: currentUserData.name,
        email: currentUserData.email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while processing the request!",
    });
  }
});

//SUBSCRIBE

router.patch("/subscribe", async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;

    const mailOptions = {
      from: secretMail,
      to: email,
      subject: `Confirmation of Newsletter Subscription to "So-Yummy"`,
      text: `Hello ${name}!

      Thank you for subscribing to our "So Yummy" Newsletter. We are thrilled to have you join our community of food enthusiasts!
      
      You will now receive the latest recipes, culinary tips, and exclusive offers directly to your email inbox. We believe our culinary inspirations will add flavor to your life.
      
      If you have any questions or would like to share your ideas, feel free to reply to this message. We're here to make your culinary journey even more delightful!
      
      Thanks again for joining "So Yummy." We look forward to delicious moments together!
      
      Bon Appétit!
      The So Yummy Team 🍽️✨`,
    };
    try {
      const info = await mainTransporter.sendMail(mailOptions);
      console.log("The newsletter email has been sent:", info.response);
      return res.status(200).json({
        status: "OK",
        code: 200,
      });
    } catch (error) {
      console.log("Error while sending newsletter email:", error);
      return;
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ status: "Internal Server Error", code: 500 });
  }
});

module.exports = router;
