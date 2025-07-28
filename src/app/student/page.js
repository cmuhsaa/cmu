import { getAllBatch, getPaginatedStudents } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function StudentPage({ searchParams }) {
  const params = await searchParams
  const page = parseInt(params?.page) || 1;
  const limit = 10;
  const search = params?.search || "";
  const type = params?.type || "";
  const batch = params?.batch || "";
  const sortBy = params?.sortBy || "createDate";
  const sortOrder = params?.sortOrder || "desc";

  const { students, total } = await getPaginatedStudents({
    page,
    limit,
    search,
    type,
    batch,
    sortBy,
    sortOrder,
  });

  const batches = await getAllBatch();
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Student List</h2>

      {/* 🔍 Filters (read-only via query params) */}
      <form method="get" style={{ marginBottom: "1rem" }}>
        <input type="text" name="search" placeholder="name/email/phone" defaultValue={search} />
        <select name="type" defaultValue={type}>
          <option value="">All Types</option>
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
          <option value="Alumni">Alumni</option>
        </select>
        <select name="batch" defaultValue={batch}>
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b._id} value={b._id.toString()}>
              {b.name}
            </option>
          ))}
        </select>
        <select name="sortBy" defaultValue={sortBy}>
          <option value="createDate">Created Date</option>
          <option value="name">Name</option>
        </select>
        <select name="sortOrder" defaultValue={sortOrder}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button type="submit">Apply</button>
        <Link href="/student"><button type="button">Reset</button></Link>
      </form>

      {students.length === 0 ? (
        <p>No student data found.</p>
      ) : (
        <>
          {students.map((member) => (
            <div key={member._id}>
              <Edit model="student" id={member._id.toString()} />
              <Link href={`/student/${member._id}`}>{member.name}</Link>

              {member.avatar && (
                <img
                  src={`${member.avatar.url}`}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                />
              )}

              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Phone:</strong> {member.phone}</p>
              <p><strong>Type:</strong> {member.type}</p>
              <p><strong>Profession:</strong> {member.profession}</p>
              <p><strong>Batch:</strong> {member.batch?.name}</p>
              <p><strong>About:</strong> {member.about}</p>
              <p><strong>Address:</strong> {member.address}</p>
              <p><strong>Active:</strong> {member.isActive ? "Yes" : "No"}</p>
              <p><strong>Created:</strong> {member.createDate?.date} at {member.createDate?.formatedTime}</p>
              <p><strong>Updated:</strong> {member.updateDate?.date} at {member.updateDate?.formatedTime}</p>

              <hr style={{ margin: "25px 0" }} />
            </div>
          ))}

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {page > 1 && (
              <Link href={`?${buildQuery({ search, type, batch, sortBy, sortOrder, page: page - 1 })}`}>
                <button>Previous</button>
              </Link>
            )}
            <span>Page {page} of {totalPages}</span>
            {page < totalPages && (
              <Link href={`?${buildQuery({ search, type, batch, sortBy, sortOrder, page: page + 1 })}`}>
                <button>Next</button>
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Utility to rebuild query string
function buildQuery(params) {
  return Object.entries(params)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}
