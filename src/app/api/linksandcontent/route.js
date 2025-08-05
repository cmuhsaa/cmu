import { NextResponse } from "next/server";
import OrganizationInfo from "@/models/linksandcontent";
import connectDB from "@/config/db";
import cloudinary from "@/config/cloudinary";

export async function PUT(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    // 1️⃣ Fetch existing document
    const existing = await OrganizationInfo.findById(
      "688fa8122fd0e230caef9c64"
    );
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Data not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Build updateData with fallback to existing data
    const updateData = {
      history: formData.get("history") || existing.history,
      formation: formData.get("formation") || existing.formation,
      establishment: formData.get("establishment") || existing.establishment,
      vision: formData.get("vision") || existing.vision,
      mission: formData.get("mission") || existing.mission,
      achievements: formData.get("achievements") || existing.achievements,
      address: formData.get("address") || existing.address,
      phonePresident: formData.get("phonePresident") || existing.phonePresident,
      phoneSecretary: formData.get("phoneSecretary") || existing.phoneSecretary,
      email: formData.get("email") || existing.email,
      socialLinks: formData.get("socialLinks")
        ? JSON.parse(formData.get("socialLinks"))
        : existing.socialLinks,
    };

    // 3️⃣ Messages (patron, president, secretary)
    const messages = ["patronMessage", "presidentMessage", "secretaryMessage"];
    messages.forEach((type) => {
      const messageDataStr = formData.get(type);
      const fallback = existing[type] || { text: "", image: {} };

      if (messageDataStr) {
        const messageData = JSON.parse(messageDataStr);
        updateData[type] = {
          ...fallback,
          ...messageData,
          image: fallback.image || {},
        };
      } else {
        updateData[type] = fallback;
      }
    });

    // 4️⃣ Handle images if new image provided
    const imageTypes = [
      { image: "patronImage", key: "patronMessage" },
      { image: "presidentImage", key: "presidentMessage" },
      { image: "secretaryImage", key: "secretaryMessage" },
    ];

    for (const type of imageTypes) {
      const imageFile = formData.get(type.image);
      if (imageFile && imageFile.size > 0) {
        if (imageFile.size > 4.2 * 1024 * 1024) {
          return NextResponse.json(
            { error: "Image shold be less than 4.2 MB" },
            { status: 500 }
          );
        }
        const buffer = Buffer.from(await imageFile.arrayBuffer());

        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "committee" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        updateData[type.key].image = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }
    }

    // 5️⃣ Update document
    const updatedInfo = await OrganizationInfo.findByIdAndUpdate(
      existing._id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedInfo,
      message: "Content updated successfully",
    });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update content" },
      { status: 500 }
    );
  }
}
