'use client'
import { updateService } from "@/app/lib/actions";
import { fetchService } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useState } from "react";
import { UploadThing } from "@/app/lib/uploadimage"; 

const SingleServicePage = async ({ params }) => {
  const { id } = params;
  const service = await fetchService(id);

  const [imageUrl, setImageUrl] = useState(service.image);

  const handleUploadComplete = (res) => {
    setImageUrl(res.fileUrl);
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={imageUrl || "/noimage.png"} alt="" width={200} height={200} />
        </div>
        <h2>{service.title}</h2>
      </div>
      <div className={styles.formContainer}>
        <form action={updateService} className={styles.form}>
          <input type="hidden" name="id" value={service._id} />
          <label>Title</label>
          <input type="text" name="title" defaultValue={service.title} />
          <label>Image URL</label>
          <input type="text" name="image" value={imageUrl} readOnly />
          <UploadThing
            endpoint="imageUploader" 
            onClientUploadComplete={handleUploadComplete}
          />
          <label>Description</label>
          <textarea type="text" name="description" defaultValue={service.description} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
