'use client';

import { useState } from 'react';
import { updateCareer } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";

const SingleCareerClient = ({ career }) => {
  const [positionTitle, setPositionTitle] = useState(career.positiontitle);
  const [location, setLocation] = useState(career.location);
  const [responsibilities, setResponsibilities] = useState(career.responsibilities);
  const [qualifications, setQualifications] = useState(career.qualifications);
  const [contact, setContact] = useState(career.contact);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCareer = {
      id: career.career_id,
      positionTitle,
      location,
      responsibilities,
      qualifications,
      contact,
    };

    try {
      await updateCareer(updatedCareer);
      alert("Career updated successfully");
    } catch (error) {
      console.error('Error updating career:', error);
      alert('Error updating career');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h1>{career.positiontitle}</h1>
        <p><strong>Location:</strong> {career.location}</p>
        <p><strong>Responsibilities:</strong> {career.responsibilities}</p>
        <p><strong>Qualifications:</strong> {career.qualifications}</p>
        <p><strong>Contact:</strong> {career.contact}</p>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={career.career_id} />
          <label>Position Title</label>
          <input
            type="text"
            name="positionTitle"
            value={positionTitle}
            onChange={(e) => setPositionTitle(e.target.value)}
            required
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <label>Responsibilities</label>
          <textarea
            name="responsibilities"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            required
          />
          <label>Qualifications</label>
          <textarea
            name="qualifications"
            value={qualifications}
            onChange={(e) => setQualifications(e.target.value)}
            required
          />
          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCareerClient;
