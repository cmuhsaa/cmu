import { getLinksContent } from "@/lib/getDatas";
import React from "react";

export default async function page() {
  const { data } = await getLinksContent();
  return (
    <div>
      <h1 className="text-[30px]">Background</h1>
      <pre className="rounded-md p-4 text-gray-700 whitespace-pre-wrap break-words max-w-full overflow-x-auto text-xjl leading-relaxed">
        {data.background}
      </pre>
    </div>
  );
}
