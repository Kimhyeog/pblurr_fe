import { data } from "@/data/disease";
import Image from "next/image";
import { motion } from "framer-motion";

function DieasesBox() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white flex flex-col items-center p-8 gap-6 rounded-2xl">
      <div className="w-full flex flex-col gap-y-5">
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5"
        >
          <div
            className="lg:text-2xl font-bold px-3 py-1 w-full
        text-center sm:text-left
        text-2xl sm:text-lg
      "
          >
            {`'`}피부르르{`'`}가 제공하는 피부질환 목록
          </div>
          {data.map((item, index) => (
            <motion.li key={index} variants={itemVariants} className="w-full">
              <div className="flex flex-col md:flex-row items-center bg-gray-100 rounded-2xl p-6 w-full shadow-md">
                <Image
                  src={item.imgSrc}
                  alt={item.title}
                  width={150}
                  height={150}
                  className="w-32 h-32 object-cover rounded-xl mb-4 md:mb-0 md:mr-6"
                />
                <div className="flex flex-col text-center md:text-left">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export default DieasesBox;
