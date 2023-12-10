const AITool = require("../models/AITools");
const AIToolForm = require('../models/formdata')

const AIController = {
  async getAITool(req, res, next) {
    try {
      const page = parseInt(req.query.page) - 1 || 0;
      const limit = parseInt(req.query.limit) || 100000;
      const search = req.query.search || "";
      let varient = req.query.varient || "All"; // Default to "all" if not provided
      let sort = req.query.sort || "varient";
      let genre = req.query.genre || "All";

      const genreOptions = [
        "AI Writing",
        "AI Video",
        "AI Image",
        "AI Audio",
        "SEO",
        "AI Social Media",
        "ChatBot",
        "Data Search",
        "AI Tools",
      ];

      genre === "All"
        ? (genre = [...genreOptions])
        : (genre = req.query.genre.split(","));
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      let sortBy = {};
      if (sort[1]) {
        sortBy[sort[0]] = sort[1];
      } else {
        sortBy[sort[0]] = "asc";
      }

      const query = {
        name: { $regex: search, $options: "i" },
        genre: { $in: genre },
        varient: { $in: varient }
      };

      // Filter by varient if it's not "all"
      varient === "All"
        ? (varient = ["free", "freemium", "paid", "Trial"]) // Fix typo: Change "Trail" to "Trial"
        : (varient = req.query.varient.split(","));
      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

      const varientQuery = { varient: { $in: varient } }; // Fix property name: Change "varient" to "variant"
      Object.assign(query, varientQuery);
      const tools = await AITool.find(query)
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit);

      const total = await AITool.countDocuments(query);

      const response = {
        error: false,
        total,
        page: page + 1,
        limit,
        genres: genreOptions,
        tools,
      };

      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
  async addTools(req, res) {
    try {
      const newTool = new AITool(req.body);
      const savedTool = await newTool.save();
      res.status(201).json(savedTool);
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },
  async addToolsdata(req, res) {
    try {
      const newTool = new AIToolForm(req.body);
      const savedTool = await newTool.save();
      res.status(201).json(savedTool);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = AIController;
