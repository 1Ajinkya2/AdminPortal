import React from "react";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req) => ({ id: "service1" }); 

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
};

export const OurFileRouter = ourFileRouter;

const UploadComponent = () => {
  const handleUploadComplete = (res) => {
    console.log("Upload complete:", res);
    // Handle upload completion
  };

  const handleUploadError = (error) => {
    console.error("Upload error:", error);
    // Handle upload error
  };

  return (
    <div>
      <h2>Upload Component</h2>
      {/* Example usage of UploadThing */}
      <UploadThing
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
    </div>
  );
};

export default UploadComponent;
