// components/SeoulMap.tsx

"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState } from "react";

const geoUrl = "/assets/seoul-districts-geo.json"; // public 폴더에 넣어놨다고 가정

const SeoulMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  return (
    <div className="w-full h-auto">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 20000, // 서울 맞게 축척 조정
          center: [126.978, 37.5665], // 서울 중심 좌표 (longitude, latitude)
        }}
        width={200}
        height={200}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const districtName = geo.properties.name;

              const isSelected = selectedDistrict === districtName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    console.log(districtName);
                    setSelectedDistrict(districtName);
                  }}
                  style={{
                    default: {
                      fill: isSelected ? "#3B82F6" : "#E5E7EB", // 선택되었을 때 색 다르게
                      outline: "none",
                    },
                    hover: {
                      fill: "#60A5FA", // hover 시 색
                      outline: "none",
                      filter: "drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5))", // hover 시 그림자
                    },
                    pressed: {
                      fill: "#2563EB", // 클릭할 때 색
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default SeoulMap;
