const AiTool = require('../models/AITools');

const AIController = {
  async addToolsdata(req, res) {
    try {
      const { toolName, websiteUrl, g2ReviewUrl, toolDescription, yourName, yourEmail } = req.body;

      // Validate input
      if (!toolName || !websiteUrl || !toolDescription || !yourName || !yourEmail) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      // Create a new instance of the AiTool model
      const newAiTool = new AiTool({
        toolName,
        websiteUrl,
        g2ReviewUrl,
        toolDescription,
        yourName,
        yourEmail
      });

      // Save the tool to the database
      const savedTool = await newAiTool.save();

      // Send a response with the saved tool data
      res.status(201).json({ message: 'AI tool added successfully', data: savedTool });
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);

      // Send an error response
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = AIController;
