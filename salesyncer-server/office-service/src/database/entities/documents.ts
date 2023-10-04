import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  author: {
    type: String,
  },
  filepath: {
    type: String,
    required: true,
  },
});

const Documents = mongoose.model("Documents",documentsSchema);

export default Documents;