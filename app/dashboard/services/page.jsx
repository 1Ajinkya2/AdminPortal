import { deleteService } from "@/app/lib/actions";
import { fetchServices } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css"; // Consider renaming this for services
import Image from "next/image";
import Link from "next/link";

const Services = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, services } = await fetchServices(q, page);

  if (!services) {
    return <div>No services found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a service..." />
        <Link href="/dashboard/services/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Image</td>
            <td>Description</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.title}</td>
              <td>
                <Image
                  src={"https://utfs.io/f/952875e5-0470-4344-9798-cf248d13237b-g2g8ti.jpg" || "/noimage.png"}
                  alt=""
                  width={40}
                  height={40}
                  className={styles.serviceImage}
                />
              </td>
              <td>{service.description.slice(0, 50)}...</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/services/${service._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={service._id} />
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

export default Services;
