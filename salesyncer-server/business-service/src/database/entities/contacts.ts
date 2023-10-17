import mongoose from "mongoose";

const contactsSchema = new mongoose.Schema({
  contactId: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  alternatePhone: {
    type: String,
  },
  company: {
    type: String,
  },
  profession: {
    type: String,
  },
  language: {
    type: String,
  },
  linkType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LinkType",
  },
  address: {
    addressLine1: {
      type: String,
    },
    addressLine2: {
      type: String,
    },
    place: {
      type: String,
    },
    landmark: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
  },
});

const Contacts = mongoose.model("Contacts", contactsSchema);

export default Contacts;
