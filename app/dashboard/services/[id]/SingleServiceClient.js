'use client';

import { useState } from 'react';
import { updateService } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from 'next/image';
import { UploadButton } from "../../../../utils/uploadthings";

const SingleServiceClient = ({ service }) => {
  const [imageUrl, setImageUrl] = useState(service.image);
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedService = {
      id: service.service_id,
      title,
      image: imageUrl,
      description,
    };

    try {
      await updateService(updatedService);
      alert("Service updated successfully");
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error updating service');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={imageUrl || "/noimage.png"} alt="Service Image" width={200} height={200} />
        </div>
        <h2>{service.title}</h2>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={service.service_id} />
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Image URL</label>
          <input type="text" name="image" value={imageUrl} readOnly />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res && res[0] && res[0].url) {
                setImageUrl(res[0].url);
                alert("Upload Completed");
              }
            }}
            onUploadError={(error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleServiceClient;
