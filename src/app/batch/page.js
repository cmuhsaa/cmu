import Edit from "@/components/Edit";
import { getAllBatch } from "@/lib/getDatas";

const Batch = async () => {
  const batchesData = await getAllBatch();
  return (
    <div>
      <h2>Batch List</h2>
      {batchesData.length === 0 ? (
        <p>No batch data found.</p>
      ) : (
        <>
          {batchesData?.map((batch) => (
            <div key={batch._id}>
              <hr style={{ margin: "25px 0" }} />
              <Edit model="batch" id={batch._id.toString()} />
              <strong>Name:</strong> {batch.name} <br />
              <strong>Created:</strong> {batch.createDate?.date} at{" "}
              {batch.createDate?.formatedTime} <br />
              <strong>Updated:</strong> {batch.updateDate?.date} at{" "}
              {batch.updateDate?.formatedTime}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Batch;
