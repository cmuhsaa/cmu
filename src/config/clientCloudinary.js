export const clientCloudinary = async (file, folder) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("folder", folder); // Optional

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      // HTTP error response, parse error message if possible
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Upload failed with status ${res.status}`
      );
    }

    const data = await res.json();

    return {
      public_id: data.public_id,
      url: data.secure_url,
      error: null,
    };
  } catch (error) {
    // Return error info in a consistent format
    console.log(error)
    return {
      public_id: null,
      url: null,
      error: error.message || "Unknown error occurred during upload",
    };
  }
};
