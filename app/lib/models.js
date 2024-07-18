import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
  },
  { timestamps: true }
);


const careerSchema = new mongoose.Schema({
  positionTitle: { type: String, required: true },
  location: { type: String, required: true },
  responsibilities: { type: String, required: true }, 
  qualifications: { type: String, required: true },
  contact: { type: String, required: true },
});

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});
const bgImagesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});
export const BgImages = mongoose.models.BgImages || mongoose.model("BgImages", bgImagesSchema);
export const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export const Career = mongoose.models.Career || mongoose.model("Career", careerSchema);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Product =mongoose.models.Product || mongoose.model("Product", productSchema);
