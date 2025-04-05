import { data } from "@/data/disease";

function DieasesBox() {
  return (
    <div className="bg-white flex flex-col items-center p-8 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center bg-gray-100 rounded-2xl p-6 w-full max-w-3xl shadow-md"
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="w-32 h-32 object-cover rounded-xl mr-6"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DieasesBox;
