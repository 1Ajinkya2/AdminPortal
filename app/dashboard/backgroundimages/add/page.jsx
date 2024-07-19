"use client";

import { useState } from 'react';
import { UploadButton } from "../../../../utils/uploadthings";
import { addBgImage } from '@/app/lib/actions';
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

export default function AddBgImagePage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    try {
      await addBgImage(formData);
      alert("Background image added successfully");
    } catch (error) {
      console.error('Error adding background image:', error);
      alert('Error adding background image');
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0] && res[0].url) {
              setImage(res[0].url);
              alert("Upload Completed");
            }
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
