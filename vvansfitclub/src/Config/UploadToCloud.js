
const uploadToCloudinary = async (file) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "vvansGym");

    console.log("📤 Uploading file to Cloudinary...");

    const res = await fetch("https://api.cloudinary.com/v1_1/dcalyvpgw/image/upload", {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();
    console.log("📦 Cloudinary response:", fileData);

    if (fileData.secure_url) {
      console.log("✅ Cloudinary URL:", fileData.secure_url);
      return fileData.secure_url;
    } else {
      console.error("❌ No secure_url returned");
      return null;
    }
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    return null;
  }
};

export default uploadToCloudinary;
