import { NextResponse } from "next/server";
import OrganizationInfo from "@/models/linksandcontent";
import { localTime } from "@/config/localTime";
import connectDB from "@/config/db";
import { AuthCheck } from "@/lib/auth";

export async function PUT(request) {
  await connectDB();
  await AuthCheck(request); // যদি authentication লাগে

  try {
    const id = "6888cdd92a90d10b44cee678";
    const formData = await request.json();

    const background = formData["background"];
    const introduction = formData["introduction"];
    const messageFromChiefPatron = formData["messageFromChiefPatron"];
    const messageFromPresident = formData["messageFromPresident"];
    const messageFromSecretary = formData["messageFromSecretary"];
    const objectives = formData["objectives"];
    const address = formData["address"];
    const phonePresident = formData["phonePresident"];
    const phoneSecretary = formData["phoneSecretary"];
    const email = formData["email"];

    // Social links
    const facebook = formData["facebook"];
    const youtube = formData["youtube"];
    const whatsapp = formData["whatsapp"];
    const twitter = formData["twitter"];

    const existing = await OrganizationInfo.findById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Organization info not found" },
        { status: 404 }
      );
    }

    const updated = await OrganizationInfo.findByIdAndUpdate(
      id,
      {
        background: background || existing.background,
        introduction: introduction || existing.introduction,
        messageFromChiefPatron:
          messageFromChiefPatron || existing.messageFromChiefPatron,
        messageFromPresident:
          messageFromPresident || existing.messageFromPresident,
        messageFromSecretary:
          messageFromSecretary || existing.messageFromSecretary,
        objectives: objectives || existing.objectives,
        address: address || existing.address,
        phonePresident: phonePresident || existing.phonePresident,
        phoneSecretary: phoneSecretary || existing.phoneSecretary,
        email: email || existing.email,
        socialLinks: {
          facebook: facebook || existing.socialLinks.facebook,
          youtube: youtube || existing.socialLinks.youtube,
          whatsapp: whatsapp || existing.socialLinks.whatsapp,
          twitter: twitter || existing.socialLinks.twitter,
        },
        updateDate: localTime(),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Organization info updated", data: updated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
