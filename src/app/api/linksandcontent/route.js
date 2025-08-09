import { NextResponse } from "next/server";
import OrganizationInfo from "@/models/linksandcontent";
import connectDB from "@/config/db";

export async function PUT(request) {
  try {
    await connectDB();

    const formData = await request.json();

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
      history: formData.history || existing.history,
      formation: formData.formation || existing.formation,
      establishment: formData.establishment || existing.establishment,
      vision: formData.vision || existing.vision,
      mission: formData.mission || existing.mission,
      achievements: formData.achievements || existing.achievements,
      address: formData.address || existing.address,
      phonePresident: formData.phonePresident || existing.phonePresident,
      phoneSecretary: formData.phoneSecretary || existing.phoneSecretary,
      email: formData.email || existing.email,
      socialLinks: formData.socialLinks
        ? formData.socialLinks
        : existing.socialLinks,
      secretaryMessage: {
        ...(formData.secretaryMessage || existing.secretaryMessage),
        image: formData.secretaryMessage.image.url
          ? formData.secretaryMessage.image
          : existing.secretaryMessage.image,
      },
      presidentMessage: {
        ...(formData.presidentMessage || existing.presidentMessage),
        image: formData.presidentMessage.image.url
          ? formData.presidentMessage.image
          : existing.presidentMessage.image,
      },
      patronMessage: {
        ...(formData.patronMessage || existing.patronMessage),
        image: formData.patronMessage.image.url
          ? formData.patronMessage.image
          : existing.patronMessage.image,
      },
    };

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
