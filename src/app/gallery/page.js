import { getPaginatedGalleries } from "@/lib/getDatas";
import Edit from "@/components/Edit";
import Link from "next/link";

export default async function GalleryPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const limit = 10;

  const { galleries, total } = await getPaginatedGalleries({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2>Gallery List</h2>
      {galleries.length === 0 ? (
        <p>No gallery data found.</p>
      ) : (
        <>
          {galleries.map((item) => (
            <div key={item._id}>
              <Edit model="gallery" id={item._id.toString()} />
              <h3>{item.title}</h3>

              <p><strong>YouTube Video:</strong></p>
              {item.youtubeLink ? (
                <div className="video-container">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${getYouTubeID(item.youtubeLink)}`}
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p>No video link</p>
              )}

              <p>
                <strong>Created At:</strong> {item.createDate?.date} {item.createDate?.formatedTime}
              </p>
              <p>
                <strong>Updated At:</strong> {item.updateDate?.date} {item.updateDate?.formatedTime}
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {item.images?.length > 0
                  ? item.images.map((image, index) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt={`Gallery Image ${index + 1}`}
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

// Helper function
function getYouTubeID(url) {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url?.match(regExp);
  return match ? match[1] : null;
}
