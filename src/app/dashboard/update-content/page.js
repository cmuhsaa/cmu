// app/admin/update-content/page.tsx
import UpdateForm from "@/components/UpdateContent";
import { getLinksContent } from "@/lib/getDatas";
import React from "react";

const UpdateContentPage = async () => {
  const { data } = await getLinksContent();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update CUAA Content</h1>
      <UpdateForm content={JSON.parse(JSON.stringify(data))} />
    </main>
  );
};

export default UpdateContentPage;
