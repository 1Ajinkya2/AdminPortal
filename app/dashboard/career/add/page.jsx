  'use client'
  import React, { useRef } from 'react';
  import { Editor } from '@tinymce/tinymce-react';
  import { addCareer } from "@/app/lib/actions";
  import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
  import { useRouter } from 'next/navigation';

  const AddCareerPage = () => {
    const router = useRouter();

    const formRef = useRef(null);
    const responsibilitiesEditorRef = useRef(null);
    const qualificationsEditorRef = useRef(null);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(formRef.current);
      const data = {
        positionTitle: formData.get('positionTitle'),
        location: formData.get('location'),
        responsibilities: responsibilitiesEditorRef.current.getContent(),
        qualifications: qualificationsEditorRef.current.getContent(),
        contact: formData.get('contact'),
      };

      try {
        const { redirect } = await addCareer(data);

        if (redirect) {
          router.push(redirect.destination);
        }

        formRef.current.reset();
        responsibilitiesEditorRef.current.setContent('Responsibility');
        qualificationsEditorRef.current.setContent('qualifications');

      } catch (err) {
        console.error("Failed to submit career entry:", err.message);
      }
    };

    return (
      <div className={styles.container}>
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            placeholder="Position Title" 
            name="positionTitle" 
            required 
          />
          <input 
            type="text" 
            placeholder="Location" 
            name="location" 
            required 
          />
          <Editor
            id="responsibilities-editor"
            apiKey='p9lnt6673vlmlborg8h4nmpeu40m0nfv1ghdk9vqtaj6ja5x'
            init={{
              height: 400,
              // wi/dth: 0,
              skin:'oxide-dark',
              content_css:'dark',
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
            }}
            initialValue="responsibility"
            onInit={(evt, editor) => responsibilitiesEditorRef.current = editor}
          />
          <Editor
            id="qualifications-editor"
            apiKey='p9lnt6673vlmlborg8h4nmpeu40m0nfv1ghdk9vqtaj6ja5x'
            init={{
              height: 400,
              skin:'oxide-dark',
              content_css:'dark',
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
            }}
            initialValue="qualifications"
            onInit={(evt, editor) => qualificationsEditorRef.current = editor}
          />
          <input 
            type="email" 
            placeholder="Contact Email" 
            name="contact" 
            required 
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  export default AddCareerPage;
