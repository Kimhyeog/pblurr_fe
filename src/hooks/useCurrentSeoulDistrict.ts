// hooks/useCurrentSeoulDistrict.ts
import { useEffect, useState } from "react";

export const useCurrentSeoulDistrict = () => {
  const [district, setDistrict] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (district || error) return; // 이미 값이 있으면 실행하지 않음

    const fetchDistrict = async () => {
      if (!navigator.geolocation) {
        setError("위치 정보 접근이 불가능합니다.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
                },
              }
            );

            const data = await response.json();
            console.log("Kakao API 응답:", data);

            const regionInfo = data.documents?.[0];
            const region1 = regionInfo?.region_1depth_name;
            const region2 = regionInfo?.region_2depth_name;

            if (!region2) {
              setError("주소 정보를 확인할 수 없습니다.");
              return;
            }

            if (region1 === "서울" || region1 === "서울특별시") {
              setDistrict(region2);
            } else {
              setError("현재 위치는 서울에 있지 않습니다.");
            }
          } catch (err) {
            console.error("카카오 API 오류:", err);
            setError("위치 정보 처리 중 오류 발생");
          }
        },
        (geoError) => {
          console.error("위치 접근 거부됨:", geoError);
          setError("위치 접근이 거부되었습니다.");
        }
      );
    };

    fetchDistrict();
  }, [district, error]);

  return { district, error };
};
