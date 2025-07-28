import { getPaginatedTeachers } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function TeacherPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;
  const search = params?.search || "";
  const sortBy = params?.sortBy || "createDate";
  const sortOrder = params?.sortOrder || "desc";

  const { teachers, total } = await getPaginatedTeachers({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  });

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Teacher List</h2>

      {/* 🔍 Filter Form */}
      <form method="get" style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="search"
          placeholder="name/email/phone/title"
          defaultValue={search}
        />
        <select name="sortBy" defaultValue={sortBy}>
          <option value="createDate">Created Date</option>
          <option value="name">Name</option>
          <option value="title">Title</option>
        </select>
        <select name="sortOrder" defaultValue={sortOrder}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button type="submit">Apply</button>
        <Link href="/teacher">
          <button type="button">Reset</button>
        </Link>
      </form>

      {teachers.length === 0 ? (
        <p>No teacher data found.</p>
      ) : (
        <>
          {teachers.map((member) => (
            <div key={member._id}>
              <Edit model="teacher" id={member._id.toString()} />
              <Link href={`/teacher/${member._id}`}>{member.name}</Link>
              {member.avatar && (
                <img
                  src={member.avatar.url}
                  alt="Teacher Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              )}
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Phone:</strong> {member.phone}
              </p>
              <p>
                <strong>Title:</strong> {member.title}
              </p>
              <p>
                <strong>About:</strong> {member.about}
              </p>
              <p>
                <strong>Address:</strong> {member.address}
              </p>
              <p>
                <strong>Created:</strong> {member.createDate?.date} at{" "}
                {member.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated:</strong> {member.updateDate?.date} at{" "}
                {member.updateDate?.formatedTime}
              </p>
              <hr style={{ margin: "25px 0" }} />
            </div>
          ))}

          {/* ⏮ Pagination */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {page > 1 && (
              <Link
                href={`?${buildQuery({
                  search,
                  sortBy,
                  sortOrder,
                  page: page - 1,
                })}`}
              >
                <button>Previous</button>
              </Link>
            )}
            <span>
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`?${buildQuery({
                  search,
                  sortBy,
                  sortOrder,
                  page: page + 1,
                })}`}
              >
                <button>Next</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// 🔧 Query Builder
function buildQuery(params) {
  return Object.entries(params)
    .filter(([_, val]) => val !== "")
    .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
    .join("&");
}
