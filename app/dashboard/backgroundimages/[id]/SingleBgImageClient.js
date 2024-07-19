'use client';

import { useState } from 'react';
import { updateImage } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from 'next/image';
import { UploadButton } from "../../../../utils/uploadthings";

const SingleBgImageClient = ({ bgImage }) => {
  const [imageUrl, setImageUrl] = useState(bgImage.image);
  const [title, setTitle] = useState(bgImage.title);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedBgImage = {
      id: bgImage._id,
      title,
      image: imageUrl,
    };

    try {
      await updateImage(updatedBgImage);
      alert("Background image updated successfully");
    } catch (error) {
      console.error('Error updating background image:', error);
      alert('Error updating background image');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={imageUrl || "/noimage.png"} alt="Background Image" width={200} height={200} />
        </div>
        <h2>{title}</h2>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={bgImage._id} />
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
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleBgImageClient;
