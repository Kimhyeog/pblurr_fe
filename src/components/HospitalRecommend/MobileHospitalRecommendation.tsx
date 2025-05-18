"use client";

import { getHospitalRecommendations } from "@/api/diease";
import { HospitalRecommendation } from "@/types/types";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import Link from "next/link";

interface Props {
  selectedDistrict: string | null;
}

function MobileHospitalRecommendComponent(props: Props) {
  const [hospitals, setHospitals] = useState<HospitalRecommendation | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    if (!props.selectedDistrict) return;
    setLoading(true);
    try {
      const data = await getHospitalRecommendations(props.selectedDistrict);
      if (data) {
        setHospitals(data);
      }
    } catch (error) {
      console.error("병원 추천 데이터 가져오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [props.selectedDistrict]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full p-1 bg-gray-50 rounded-2xl shadow-lg animate-fade-in-up">
      <div className="w-full mb-3 text-md font-bold text-blue-600">
        선택된 위치: {props.selectedDistrict}
      </div>
      <h2 className="text-md font-semibold mb-4">병원 추천</h2>

      {hospitals ? (
        <div className="w-full flex flex-col gap-y-2">
          {[
            { name: hospitals.hospital1, link: hospitals.hospital1Link },
            { name: hospitals.hospital2, link: hospitals.hospital2Link },
            { name: hospitals.hospital3, link: hospitals.hospital3Link },
          ].map((hospital, index) => (
            <div
              key={index}
              className="w-full bg-white p-4 rounded-xl shadow-md flex flex-row items-center gap-x-0"
            >
              <div className="w-full text-sm font-semibold text-gray-800">
                {hospital.name}
              </div>
              <Link
                href={hospital.link}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap inline-block text-center px-2 py-1 w-[80px] bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition"
              >
                방문하기
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm text-center py-6">
          내 위치 주변 병원 정보를 검색해보세요.
        </div>
      )}
    </div>
  );
}

export default MobileHospitalRecommendComponent;
