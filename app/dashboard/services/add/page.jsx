"use client";

import { useState } from 'react';
import { UploadButton } from "../../../../utils/uploadthings"; 
import { addService } from '@/app/lib/actions'; 
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
export default function AddServicePage() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title,
      image,
      description,
    };

    try {
      await addService(formData); 
      alert("Service added successfully");
    } catch (error) {
      console.error('Error adding service:', error);
      alert('Error adding service');
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
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="6"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
