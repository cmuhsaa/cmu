import Edit from "@/components/Edit";
import { getAllBatch } from "@/lib/getDatas";

const Batch = async () => {
  const batchesData = await getAllBatch();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Batch List</h2>

      {batchesData.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No batch data found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-200">
            {batchesData?.map((batch) => (
              <div key={batch._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{batch.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Created:</span> {batch.createDate?.date} at {batch.createDate?.formatedTime}
                      </p>
                      <p>
                        <span className="font-medium">Updated:</span> {batch.updateDate?.date} at {batch.updateDate?.formatedTime}
                      </p>
                    </div>
                  </div>
                  <Edit model="batch" id={batch._id.toString()} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Batch;