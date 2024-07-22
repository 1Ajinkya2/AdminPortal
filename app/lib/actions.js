"use server";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import { connectDB, pool } from "./utils";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);
  
  try {
    await connectToDB();
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO Users (username, email, password, phone, address, isAdmin, isActive)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [username, email, hashedPassword, phone, address, isAdmin, isActive];
    
    await pool.query(query, values);
  } catch (err) {
    console.error(err);
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

    const query = `
      INSERT INTO Career (positiontitle, location, responsibilities, qualifications, contact)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [positionTitle, location, responsibilities, qualifications, contact];

    await pool.query(query, values);
  } catch (err) {
    console.error("Error creating career entry:", err.message);
    throw new Error("Failed to create career entry!");
  }
  revalidatePath("/dashboard/career");
  redirect("/dashboard/career");
};

export const updateCareer = async (formData) => {
  const { id, positionTitle, location, responsibilities, qualifications, contact } = formData;

  try {
    await connectToDB();

    // Define the SQL query
    const query = `
      UPDATE Career
      SET positiontitle = $1, location = $2, responsibilities = $3, qualifications = $4, contact = $5
      WHERE career_id = $6
    `;

    // Values to be bound to the query
    const values = [positionTitle, location, responsibilities, qualifications, contact, id];

    // Execute the query
    await pool.query(query, values);
  } catch (err) {
    console.error('Error updating career:', err);
    throw new Error("Failed to update career!");
  }

  revalidatePath("/dashboard/career");
  redirect("/dashboard/career");
};



export const deleteCareer = async (formData) => {
  const { id } = Object.fromEntries(formData);
  
  try {
    await connectToDB();
    const query = `
      DELETE FROM Career
      WHERE career_id = $1
    `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error("Career not found");
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete career!");
  }

  revalidatePath("/dashboard/career");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } = formData;

  try {
    await connectToDB();

    const query = `
      UPDATE Users
      SET username=$2, email=$3, password=$4, phone=$5, address=$6, isadmin=$7,isactive=$8
      WHERE user_id = $1
    `;

    const values = [id, username, email, password, phone, address, isAdmin, isActive];

    await pool.query(query, values);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const query = `
      DELETE FROM Users
      WHERE user_id = $1
    `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error("User not found");
    }
  } catch (err) {
    console.error(err);
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

    const query = `
      INSERT INTO Service (title, image, description)
      VALUES ($1, $2, $3)
    `;
    const values = [title, image, description];

    await pool.query(query, values);
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
    await connectToDB();

    const query = `
      UPDATE Service
      SET title = $1, image = $2, description = $3
      WHERE service_id = $4
    `;
    const values = [title, image, description, id];

    await pool.query(query, values);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update service!");
  }

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
};

export const deleteService = async (formData) => {
  const { id } = Object.fromEntries(formData);
  
  try {
    await connectToDB();
    const query = `
      DELETE FROM Service
      WHERE service_id = $1
    `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error("Service not found");
    }
  } catch (err) {
    console.error("Error deleting service:", err);
    throw new Error("Failed to delete service!");
  }

  revalidatePath("/dashboard/services");
};

// Background Image Handles
export const addBgImage = async (formData) => {
  const title = formData.get('title');
  const image = formData.get('image');

  if (!title || !image) {
    throw new Error("Title and image are required");
  }

  try {
    await connectToDB();

    const query = `
      INSERT INTO BgImages (title, image)
      VALUES ($1, $2)
    `;
    const values = [title, image];

    await pool.query(query, values);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create background image!");
  }

  revalidatePath("/dashboard/backgroundimages");
  redirect("/dashboard/backgroundimages");
};

export const updateImage = async (formData) => {
  const { id, title, image } = formData;

  try {
    await connectToDB();

    const query = `
      UPDATE BgImages
      SET title = $1, image = $2
      WHERE bgimages_id = $3
    `;
    const values = [title, image, id];

    await pool.query(query, values);

    revalidatePath(`/dashboard/backgroundimages/${id}`);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to update background image!");
  }

  revalidatePath("/dashboard/backgroundimages");
  redirect("/dashboard/backgroundimages");
};

export const deleteImage = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectToDB();
    const query = `
      DELETE FROM BgImages
      WHERE bgimages_id = $1
    `;

    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      throw new Error("Background image not found");
    }
  } catch (err) {
    console.error("Error deleting background image:", err);
    throw new Error("Failed to delete background image!");
  }

  revalidatePath("/dashboard/backgroundimages");
};
