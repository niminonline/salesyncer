import mongoose from "mongoose";

const linkTypeSchema = new mongoose.Schema({
  link: {
    type: String,
  },
});

const LinkType = mongoose.model("LinkType",linkTypeSchema);

export default LinkType;