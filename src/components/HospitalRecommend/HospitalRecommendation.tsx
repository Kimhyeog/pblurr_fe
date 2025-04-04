"use client";

import { useState } from "react";
import { getHospitalRecommendations } from "@/api/diease/index"; // API 파일 import
import { HospitalRecommendation } from "@/types/types";

function HospitalRecommendComponent() {
  const [location, setLocation] = useState("");
  const [hospitals, setHospitals] = useState<HospitalRecommendation | null>(
    null
  );

  const handleSearch = async () => {
    if (!location.trim()) {
      alert("지역을 입력하세요.");
      return;
    }

    const result = await getHospitalRecommendations(location);
    if (result) {
      setHospitals(result);
    } else {
      alert("병원 추천 정보를 가져오는 데 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>병원 추천</h2>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="지역 입력 (예: 강동구)"
      />
      <button onClick={handleSearch}>검색</button>

      {hospitals && (
        <div>
          <h3>{hospitals.location} 추천 병원</h3>
          <ul>
            <li>
              <a
                href={hospitals.hospital1Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hospitals.hospital1}
              </a>
            </li>
            <li>
              <a
                href={hospitals.hospital2Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hospitals.hospital2}
              </a>
            </li>
            <li>
              <a
                href={hospitals.hospital3Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hospitals.hospital3}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HospitalRecommendComponent;
