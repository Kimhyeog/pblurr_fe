/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "jermany17-backend1234-s3.s3.ap-northeast-2.amazonaws.com",
      "postfiles.pstatic.net",
      "cdn.eyesmag.com",
    ],
  },
  // 다른 설정도 여기 추가 가능
};

module.exports = nextConfig;
