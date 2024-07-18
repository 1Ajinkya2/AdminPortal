import { Product,Service,Career, User,BgImages } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchCareer = async (id) => {
  console.log(id);
  try {
    await connectToDB();
    const career = await Career.findById(id);
    return career;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch career!");
  }
};

export const fetchCareers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEMS_PER_PAGE = 2;

  try {
    await connectToDB();
    const count = await Career.find({ positionTitle: { $regex: regex } }).count();
    const careers = await Career.find({ positionTitle: { $regex: regex } })
      .limit(ITEMS_PER_PAGE)
      .skip(ITEMS_PER_PAGE * (page - 1));
      console.log("Career Data Fetched");
    return { count, careers };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch careers!");
  }
};

export const fetchService = async (id) => {
  console.log(id);
  try {    
    connectToDB();
    const service = await Service.findById(id);
    return service;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};

export const fetchServices = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    await connectToDB();
    const count = await Service.find({ title: { $regex: regex } }).count();
    const services = await Service.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    console.log("Service Data Fetched");
    return { count, services };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch services!");
  }
};

export const fetchImages = async (q, page) => {
  const regex = new RegExp(q, "i");
  const ITEM_PER_PAGE = 2;

  try {
    await connectToDB(); 
    const count = await BgImages.countDocuments({ title: { $regex: regex } });
    const images = await BgImages.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, images };
  } catch (err) {
    console.error("Error fetching images:", err);
    throw new Error("Failed to fetch images!");
  }
};
// DUMMY DATA
export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
