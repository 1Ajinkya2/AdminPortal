import { deleteService } from "@/app/lib/actions";
import { fetchServices } from "@/app/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css"; 
import Image from "next/image";
import Link from "next/link";

const Services = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = parseInt(searchParams?.page, 10) || 1; // Ensure page is an integer
  const { count, services } = await fetchServices(q, page);

  if (!services || services.length === 0) {
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
            <tr key={service.service_id}>
              <td>{service.title}</td>
              <td>
                <Image
                  src={service.image || "/noimage.png"}
                  alt={service.title || "No Image"}
                  width={200}
                  height={150}
                  className={styles.serviceImage}
                />
              </td>
              <td>{service.description.slice(0, 50)}...</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/services/${service.service_id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteService} method="POST">
                    <input type="hidden" name="id" value={service.service_id} />
                    <button type="submit" className={`${styles.button} ${styles.delete}`}>
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
