import { fetchCareers } from "@/app/lib/data";
import{deleteCareer} from "@/app/lib/actions";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

const Career = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  let data;

  try {
    data = await fetchCareers(q, page);
  } catch (error) {
    console.error("Failed to fetch career data:", error);
    data = { count: 0, careers: [] };
  }

  const { count, careers } = data;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a position..." />
        <Link href="/dashboard/career/add">
          <button className={styles.addButton}>Add New Position</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Position Title</td>
            <td>Location</td>
            <td>Responsibilities</td>
            <td>Qualifications</td>
            <td>Contact</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {careers.map((career) => (
            <tr key={career.id}>
              <td>{career.positionTitle}</td>
              <td>{career.location}</td>
              <td>{career.responsibilities}</td>
              <td>{career.qualifications}</td>
              <td>{career.contact}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/career/${career.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCareer} method="POST">
                    <input type="hidden" name="id" value={career.id} />
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

export default Career;
