import { updateCareer } from "@/app/lib/actions";
import { fetchCareer } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";

const SingleCareerPage = async ({ params }) => {
  const { id } = params;
  const career = await fetchCareer(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>{career.positionTitle}</h1>
        <p><strong>Location:</strong> {career.location}</p>
        <p><strong>Responsibilities:</strong> {career.responsibilities}</p>
        <p><strong>Qualifications:</strong> {career.qualifications}</p>
        <p><strong>Contact:</strong> {career.contact}</p>
      </div>
      <div className={styles.formContainer}>
        <form action={updateCareer} className={styles.form}>
          <input type="hidden" name="id" value={career.id} />
          <label>Position Title</label>
          <input type="text" name="positionTitle" defaultValue={career.positionTitle} />
          <label>Location</label>
          <input type="text" name="location" defaultValue={career.location} />
          <label>Responsibilities</label>
          <textarea name="responsibilities" defaultValue={career.responsibilities} />
          <label>Qualifications</label>
          <textarea name="qualifications" defaultValue={career.qualifications} />
          <label>Contact</label>
          <input type="text" name="contact" defaultValue={career.contact} />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCareerPage;
