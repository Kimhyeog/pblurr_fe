"use client";

import { useEffect, useState } from "react";
import { getHospitalRecommendations } from "@/api/diease/index";
import { HospitalRecommendation } from "@/types/types";

interface Props {
  selectedDistrict: string | null;
}

function HospitalRecommendComponent(props: Props) {
  const [hospitals, setHospitals] = useState<HospitalRecommendation | null>(
    null
  );

  const fetchHospitals = async () => {
    if (!props.selectedDistrict) return;

    try {
      const data = await getHospitalRecommendations(props.selectedDistrict);
      if (data) {
        setHospitals(data);
      }
    } catch (error) {
      console.error("병원 추천 데이터 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [props.selectedDistrict]);

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-lg animate-fade-in-up">
      <div className="mb-4 text-xl font-bold text-blue-600">
        선택된 위치 : {props.selectedDistrict}
      </div>
      <h2 className="text-2xl font-semibold mb-6">병원 추천</h2>

      {hospitals ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="py-3 px-6 text-left text-md font-bold uppercase">
                  병원명
                </th>
                <th className="py-3 px-6 text-left text-md font-bold uppercase">
                  링크
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: hospitals.hospital1, link: hospitals.hospital1Link },
                { name: hospitals.hospital2, link: hospitals.hospital2Link },
                { name: hospitals.hospital3, link: hospitals.hospital3Link },
              ].map((hospital, index) => (
                <tr
                  key={index}
                  className="whitespace-nowrap border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="whitespace-nowrap py-4 px-6 text-gray-800">
                    {hospital.name}
                  </td>
                  <td className="whitespace-nowrap py-4 px-6">
                    <a
                      href={hospital.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
                    >
                      방문하기
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-500 whitespace-nowrap">
          내 위치 주변 병원 정보를 검색해보세요.
        </div>
      )}
    </div>
  );
}

export default HospitalRecommendComponent;
