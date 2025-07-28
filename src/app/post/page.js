import { getPaginatedPosts } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function PostPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { posts, total } = await getPaginatedPosts({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Post List</h2>

      {posts.length === 0 ? (
        <p>No post data found.</p>
      ) : (
        <>
          {posts.map((post) => (
            <div key={post._id}>
              <Edit model="post" id={post._id.toString()} />
              <Link href={`/post/${post._id}`}>
                <>title: {post.title}</>
              </Link>

              <p>
                <strong>Content:</strong> {post.content}
              </p>

              <p>
                <strong>YouTube Video:</strong>
              </p>
              {post.youtubeLink ? (
                <div className="video-container">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${getYouTubeID(post.youtubeLink)}`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>No video</p>
              )}

              <p>
                <strong>Images:</strong>{" "}
                {post.images?.length > 0
                  ? post.images.map((image) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt="Post"
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
              <a href={`?page=${page - 1}`}>
                <button>Previous</button>
              </a>
            )}
            <span>
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <a href={`?page=${page + 1}`}>
                <button>Next</button>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function getYouTubeID(url) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url?.match(regExp);
  return match ? match[1] : null;
}
