"use server";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { User,Career,Service,BgImages } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addCareer = async (formData) => {
  const { positionTitle, location, responsibilities, qualifications, contact } = formData;

  if (!positionTitle || !location || !responsibilities || !qualifications || !contact) {
    throw new Error("All fields are required!");
  }

  try {
    await connectToDB();

    const newCareer = new Career({
      positionTitle,
      location,
      responsibilities,
      qualifications,
      contact,
    });

    await newCareer.save();
    
    return {
      redirect: {
        destination: "/dashboard/career",
      },
    }
  } catch (err) {
    console.error("Error creating career entry:", err.message);
    throw new Error("Failed to create career entry!");
  }
};
export const updateCareer = async (formData) => {
  const { id, positionTitle, location, responsibilities, qualifications, contact } = Object.fromEntries(formData);
  try {
    connectToDB();

    const updateFields = {
      positionTitle,
      location,
      responsibilities,
      qualifications,
      contact,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );
    // console.log("updated succesfully");
    await Career.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update career!");
  }
  revalidatePath("/dashboard/career");
  redirect("/dashboard/career");
};

export const deleteCareer = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await Career.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete career!");
  }

  revalidatePath("/dashboard/career");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const addService = async (formData) => {
  const { title, image, description } = formData;

  if (!title || !image || !description) {
    throw new Error("All fields are required!");
  }

  try {
    await connectToDB();

    const newService = new Service({
      title,
      image,
      description,
    });

    await newService.save();

  } catch (err) {
    console.error("Error creating service entry:", err.message);
    throw new Error("Failed to create service entry!");
  }
  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
};


export const updateService = async (formData) => {
  const { id, title, image, description } = formData;

  try {
    connectToDB();

    await Service.findByIdAndUpdate(id, {
      title,
      image,
      description,
    });  
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update service!");
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
};

export const deleteService = async (formData) => {
  const { id } = Object.fromEntries(formData);
  console.log("Deleting service with id:", id); 

  try {
    await connectToDB();
    const result = await Service.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Service not found");
    }
    console.log("Service deleted:", result); 
  } catch (err) {
    console.log("Error deleting service:", err);
    throw new Error("Failed to delete service!");
  }

  revalidatePath("/dashboard/services");
};

//Background Image Hanldles
export const addBgImage = async (formData) => {
  const title = formData.get('title');
  const image = formData.get('image');

  if (!title || !image) {
    throw new Error("Title and image are required");
  }

  try {
    connectToDB();

    const newBgImage = new BgImages({
      title,
      image,
    });

    await newBgImage.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create background image!");
  }

  revalidatePath("/dashboard/backgroundimages");
  redirect("/dashboard/backgroundimages");
};
export const updateImage = async (formData) => {
  const { id, title, image } = formData;

  try {
    connectToDB();

    await BgImages.findByIdAndUpdate(id, {
      title,
      image,
    });

    revalidatePath(`/dashboard/backgroundimages/${id}`);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update background image!");
  }
  revalidatePath("/dashboard/backgroundimages");
  redirect("/dashboard/backgroundimages");
};
export const deleteImage= async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    await BgImages.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete career!");
  }

  revalidatePath("/dashboard/career");
};
export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
