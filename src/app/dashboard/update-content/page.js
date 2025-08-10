// app/admin/update-content/page.tsx
import UpdateForm from "@/components/UpdateContent";
import { getLinksContent } from "@/lib/getDatas";
import React from "react";

const UpdateContentPage = async () => {
  const { data } = await getLinksContent();

  return (
    <main className="mx-auto">
      <UpdateForm initialData={JSON.parse(JSON.stringify(data))} />
    </main>
  );
};

export default UpdateContentPage;
