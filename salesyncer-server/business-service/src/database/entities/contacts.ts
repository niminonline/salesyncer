import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
  contactId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
  },
  type: {
    type: String,
  },
  address: {
    type: String,
  },
  place: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  language: {
    type: String,
  },
});

const Contacts = mongoose.model("Contacts", contactsSchema);

export default Contacts;
