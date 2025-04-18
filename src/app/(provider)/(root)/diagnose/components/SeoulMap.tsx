//SeoulMap.tsx

"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState, useRef } from "react";
import HospitalRecommendComponent from "@/components/HospitalRecommend/HospitalRecommendation";

const geoUrl = "/assets/seoul-districts-geo.json";

const SeoulMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-y-10 items-center">
      <div ref={mapRef} className="relative  flex flex-col items-center">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100000, // 서울만 볼거면 이 정도
            center: [126.978, 37.5665],
          }}
          width={800}
          height={800}
          style={{
            width: "600px", // 고정
            height: "600px",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const districtName = geo.properties.name;
                const isSelected = selectedDistrict === districtName;
                const isHovered = hoveredDistrict === districtName;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      console.log(districtName);
                      setSelectedDistrict(districtName);
                    }}
                    {...({
                      onMouseEnter: () => setHoveredDistrict(districtName),
                      onMouseLeave: () => setHoveredDistrict(null),
                      onMouseMove: (event: React.MouseEvent) => {
                        const bounds = mapRef.current?.getBoundingClientRect();
                        if (bounds) {
                          setTooltipPosition({
                            x: event.clientX - bounds.left + 12,
                            y: event.clientY - bounds.top + 12,
                          });
                        }
                      },
                    } as any)}
                    style={{
                      default: {
                        fill: isSelected ? "#7FC5E0" : "#E5E7EB",
                        stroke: "#D1D5DB", // 전체 구 경계선
                        strokeWidth: 0.8,
                        outline: "none",
                        transition: "all 0.3s ease",
                      },
                      hover: {
                        fill: "#E5E7EB",
                        strokeWidth: 1.2,
                        outline: "none",
                        transition: "all 0.3s ease",
                        filter: "drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.4))",
                      },
                      pressed: {
                        fill: "#7FC5E0",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {hoveredDistrict && (
          <div
            className="absolute bg-[#7FC5E0] text-white text-lg font-bold px-3 py-2 rounded-md shadow-xl  animate-fade pointer-events-none z-50"
            style={{
              top: tooltipPosition.y,
              left: tooltipPosition.x,
              whiteSpace: "nowrap",
            }}
          >
            {hoveredDistrict}
          </div>
        )}
      </div>
      <div>
        {selectedDistrict ? (
          <div className="text-lg font-semibold text-blue-600 animate-fade-in-up">
            <HospitalRecommendComponent selectedDistrict={selectedDistrict} />
          </div>
        ) : (
          <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl w-full h-[300px] shadow-lg animate-fade-in-up">
            <div className="mb-4 text-xl font-bold text-blue-600">
              선택된 위치: {selectedDistrict || "선택되지 않음"}
            </div>
            <div className="h-full flex flex-col justify-center items-center">
              <div className="font-bold text-gray-500 px-3 py-10 text-center text-lg">
                내 위치의 지역구를 클릭하세요.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeoulMap;
