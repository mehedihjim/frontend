"use client";
export const DetailsView = ({ data }: { data: any }) => {
    if (!data) return <p>Loading...</p>;
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 my-6">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2 bg-orange-600 text-white p-2 rounded">
              Batch: {data.batch_number} 
            </h2>
            <p className="text-gray-600">Farmer: <strong>{data.farmer_name}</strong></p>
            <p className="text-gray-600">Farmer Phone:<strong>{data.farmer_phone}</strong></p>
            <p className="text-gray-600">Bird Type: <strong>{data.hen_type}</strong></p>
            <p className="text-gray-600">Shed: <strong>{data.shed_name}</strong></p>
            <p className="text-gray-600">Age: <strong>{data.age} days</strong></p>
            <p className="text-gray-600">Chick Count: <strong>{data.chick_number}</strong></p>
            <p className="text-gray-600">Avg. Weight: <strong>{data.average_weight} gm</strong></p>
            <p className="text-gray-600">Expected Price: <strong>৳{data.expected_price} /kg</strong></p>
            <p className="text-gray-600">Available for Sale: <strong>{data.available_for_sale_count}</strong></p>
            <p className={`text-sm font-semibold mt-2 ${data.sale_status === 'Ready' ? 'text-green-600' : 'text-red-500'}`}>
              Status: {data.sale_status}
            </p>
          </div>
          <div className="bg-gray-100 p-4 text-md text-gray-500">
           <strong> Location:</strong> {data.location?.union_name_bn}, {data.location?.upzilla_name_bn}, {data.location?.district_name_bn}, {data.location?.division_name_bn}
          </div>
        </div>
      );
};