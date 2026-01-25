exports.askAI = async (req, res) => {
  try {
    const { message } = req.body;

    let reply = "";

    if (message.toLowerCase().includes("jwt")) {
      reply = "JWT (JSON Web Token) is a secure way to send user identity data between client and server.";
    } 
    else if (message.toLowerCase().includes("react")) {
      reply = "React is a JavaScript library used to build user interfaces.";
    }
    else if (message.toLowerCase().includes("node")) {
      reply = "Node.js allows JavaScript to run on the server side.";
    }
    else {
      reply = "You asked: " + message + ". This feature will use real AI later.";
    }

    res.json({ reply });

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ msg: "AI failed" });
  }
};