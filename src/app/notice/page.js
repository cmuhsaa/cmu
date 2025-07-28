import { getPaginatedNotices } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function NoticePage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { notices, total } = await getPaginatedNotices({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Notice List</h2>
      {notices.length === 0 ? (
        <p>No notice data found.</p>
      ) : (
        <>
          {notices.map((notice) => (
            <div key={notice._id}>
              <Edit model="notice" id={notice._id.toString()} />
              <Link href={`/notice/${notice._id}`}>title: {notice.title}</Link>

              <p><strong>Description:</strong> {notice.description}</p>
              <p><strong>Type:</strong> {notice.type}</p>
              <p><strong>Date & Time:</strong> {notice.dateTime}</p>
              <p>
                <strong>Created:</strong> {notice.createDate?.date} at {notice.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated:</strong> {notice.updateDate?.date} at {notice.updateDate?.formatedTime}
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {notice.images?.length > 0
                  ? notice.images.map((image) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt="Notice"
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                          objectFit: "contain",
                        }}
                      />
                    ))
                  : "No images available"}
              </p>
              <hr style={{ margin: "25px 0" }} />
            </div>
          ))}

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {page > 1 && (
              <Link href={`?page=${page - 1}`}>
                <button>Previous</button>
              </Link>
            )}
            <span>Page {page} of {totalPages}</span>
            {page < totalPages && (
              <Link href={`?page=${page + 1}`}>
                <button>Next</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
