import { Product,Service,Career, User,BgImages } from "./models";
import { connectToDB } from "./utils";
import { pool } from './utils';

// Function to fetch users with pagination and search
export const fetchUsers = async (q, page) => {
  const regex = `%${q}%`; // PostgreSQL uses % for wildcards
  const ITEM_PER_PAGE = 2;
  const offset = ITEM_PER_PAGE * (page - 1);

  try {
    await connectToDB();

    // Count total matching users
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM Users WHERE username ILIKE $1',
      [regex]
    );
    const count = parseInt(countResult.rows[0].count, 10);

    // Fetch paginated users
    const usersResult = await pool.query(
      'SELECT * FROM Users WHERE username ILIKE $1 LIMIT $2 OFFSET $3',
      [regex, ITEM_PER_PAGE, offset]
    );
    const users = usersResult.rows;

    return { count, users };
  } catch (err) {
    console.error('Error fetching users:', err);
    throw new Error('Failed to fetch users!');
  }
};

// Function to fetch a single user by ID
export const fetchUser = async (id) => {
  try {
    await connectToDB();
    const userResult = await pool.query('SELECT * FROM Users WHERE user_id = $1', [id]);
    return userResult.rows[0];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw new Error('Failed to fetch user!');
  }
};

// Function to fetch a single career by ID
export const fetchCareer = async (id) => {
  try {
    await connectToDB();
    const careerResult = await pool.query('SELECT * FROM Career WHERE career_id = $1', [id]);
    return careerResult.rows[0];
  } catch (err) {
    console.error('Error fetching career:', err);
    throw new Error('Failed to fetch career!');
  }
};

// Function to fetch careers with pagination and search
export const fetchCareers = async (q, page) => {
  const regex = `%${q}%`; 
  const ITEMS_PER_PAGE = 2;
  const offset = ITEMS_PER_PAGE * (page - 1);

  try {
    await connectToDB();

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM Career WHERE positionTitle ILIKE $1',
      [regex]
    );
    const count = parseInt(countResult.rows[0].count, 10);

    const careersResult = await pool.query(
      'SELECT * FROM Career WHERE positionTitle ILIKE $1 LIMIT $2 OFFSET $3',
      [regex, ITEMS_PER_PAGE, offset]
    );
    console.log(careersResult.rows);
    return { count, careers: careersResult.rows };
  } catch (err) {
    console.error('Error fetching careers:', err);
    throw new Error('Failed to fetch careers!');
  }
};


export const fetchService = async (id) => {
  try {
    await connectToDB();
    console.log(`Fetching service with ID: ${id}`); // Log the ID being fetched

    const serviceResult = await pool.query('SELECT * FROM Service WHERE service_id = $1', [id]);

    if (serviceResult.rows.length === 0) {
      console.log(`No service found with ID: ${id}`); // Log if no service is found
      return null;
    }

    return serviceResult.rows[0];
  } catch (err) {
    console.error('Error fetching service:', err);
    throw new Error('Failed to fetch service!');
  }
};
// Function to fetch services with pagination and search
export const fetchServices = async (q, page) => {
  const regex = `%${q}%`; // PostgreSQL uses % for wildcards
  const ITEM_PER_PAGE = 2;
  const offset = ITEM_PER_PAGE * (page - 1);

  try {
    await connectToDB();

    // Count total matching services
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM Service WHERE title ILIKE $1',
      [regex]
    );
    const count = parseInt(countResult.rows[0].count, 10);

    // Fetch paginated services including service_id
    const servicesResult = await pool.query(
      'SELECT service_id, title, image, description FROM Service WHERE title ILIKE $1 LIMIT $2 OFFSET $3',
      [regex, ITEM_PER_PAGE, offset]
    );
    return { count, services: servicesResult.rows };
  } catch (err) {
    console.error('Error fetching services:', err);
    throw new Error('Failed to fetch services!');
  }
};


// Function to fetch a single background image by ID
export const fetchImage = async (id) => {
  try {
    await connectToDB();
    const imageResult = await pool.query('SELECT * FROM BgImages WHERE bgimages_id = $1', [id]);
    return imageResult.rows[0];
  } catch (err) {
    console.error('Error fetching image:', err);
    throw new Error('Failed to fetch background image!');
  }
};

// Function to fetch images with pagination and search
export const fetchImages = async (q, page) => {
  const regex = `%${q}%`; 
  const ITEM_PER_PAGE = 2;
  const offset = ITEM_PER_PAGE * (page - 1);

  try {
    await connectToDB();

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM BgImages WHERE title ILIKE $1',
      [regex]
    );
    const count = parseInt(countResult.rows[0].count, 10);

    // Fetch paginated images
    const imagesResult = await pool.query(
      'SELECT * FROM BgImages WHERE title ILIKE $1 LIMIT $2 OFFSET $3',
      [regex, ITEM_PER_PAGE, offset]
    );
    return { count, images: imagesResult.rows };
  } catch (err) {
    console.error('Error fetching images:', err);
    throw new Error('Failed to fetch images!');
  }
};
