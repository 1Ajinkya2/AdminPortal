import { fetchImages} from "@/app/lib/data";
import {deleteImage} from "@/app/lib/actions";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css"; 
import Image from "next/image";
import Link from "next/link";
import { BgImages } from "@/app/lib/models";

const BackgroundImages = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, images } = await fetchImages(q, page);

  if (!images) {
    return <div>No images found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a background image..." />
        <Link href="/dashboard/backgroundimages/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image._id}>
              <td>{image.title}</td>
              <td>
                <Image
                  src={image.image || "/noimage.png"}
                  alt=""
                  width={200}
                  height={150}
                  className={styles.imageImage}
                />
              </td>
              <td>
                <div className={styles.buttons}>
                <Link href={`/dashboard/backgroundimages/${image._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteImage}>
                    <input type="hidden" name="id" value={image._id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
            
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default BackgroundImages;
