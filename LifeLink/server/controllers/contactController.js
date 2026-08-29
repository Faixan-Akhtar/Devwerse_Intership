const Contact = require("../models/Contact.js");

const submitContact = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const contact = await Contact.create({
      fullName,
      email: email.toLowerCase(),
      subject,
      message,
    });

    return res.status(201).json({
      message: "Your message has been sent successfully!",
      contact: {
        id: contact._id,
        fullName: contact.fullName,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      message: "Something went wrong while sending your message",
    });
  }
};

module.exports = {
  submitContact,
};
