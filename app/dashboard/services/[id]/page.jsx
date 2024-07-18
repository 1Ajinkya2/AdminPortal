'use client';

import { useState, useEffect } from 'react';
import { updateService } from "@/app/lib/actions";
import { fetchService } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from 'next/image';
import { UploadButton } from "../../../../utils/uploadthings";

const SingleServicePage = ({ params }) => {
  const { id } = params;
  const [service, setService] = useState(null);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(''); // For displaying errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedService = await fetchService(id);
        setService(fetchedService);
        setTitle(fetchedService.title);
        setImageUrl(fetchedService.image);
        setDescription(fetchedService.description);
      } catch (err) {
        setError('Failed to fetch service data');
      }
    };

    fetchData();
  }, [id]);

  const handleUploadComplete = (res) => {
    if (res && res[0] && res[0].url) {
      setImageUrl(res[0].url); // Update image URL with the uploaded image
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedService = {
      id: service._id,
      title,
      image: imageUrl,
      description,
    };

    try {
      await updateService(updatedService); // Implement this function to handle service updates
      alert("Service updated successfully");
    } catch (error) {
      console.error('Error updating service:', error);
      setError('Error updating service');
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={imageUrl || "/noimage.png"} alt="Service Image" width={200} height={200} />
        </div>
        <h2>{service.title}</h2>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={service._id} />
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={imageUrl}
            readOnly
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
          />
          <label>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="6"
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
