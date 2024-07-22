'use client';

import { useState } from 'react';
import { updateUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from 'next/image';

const SingleUserClient = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [isAdmin, setIsAdmin] = useState(user.isadmin);
  const [isActive, setIsActive] = useState(user.isactive);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedUser = {
      id: user.user_id,
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    try {
      await updateUser(updatedUser);
      alert("User updated successfully");
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.img || "/noavatar.png"} alt="User Image" width={200} height={200} />
        </div>
        <h2>{user.username}</h2>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={user.user_id} />
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>Address</label>
          <textarea
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            value={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value === 'true')}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <label>Is Active?</label>
          <select
            name="isActive"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value === 'true')}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserClient;
