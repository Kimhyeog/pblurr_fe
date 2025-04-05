"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState, useRef } from "react";

const geoUrl = "/assets/seoul-districts-geo.json";

const SeoulMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div className=" flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-2xl" ref={mapRef}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 20000,
            center: [126.978, 37.5665],
          }}
          width={200}
          height={200}
          style={{ width: "100%", height: "auto" }}
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

      {selectedDistrict && (
        <div className="text-lg font-semibold text-blue-600 animate-fade-in-up">
          선택된 구: {selectedDistrict}
        </div>
      )}
    </div>
  );
};

export default SeoulMap;
