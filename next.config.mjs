/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // v2からの移行リダイレクト
      {
        source: '/v2/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/v2',
        destination: '/',
        permanent: true,
      },
      // 旧版クエリパラメータからのリダイレクト
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'apparel' }], destination: '/apparel', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'department' }], destination: '/department', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'drugstore' }], destination: '/drugstore', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'ec' }], destination: '/ec', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'food' }], destination: '/food', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'hotel' }], destination: '/hotel', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'sports' }], destination: '/sports', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'industry', value: 'supermarket' }], destination: '/supermarket', permanent: true },
    ]
  },
}

export default nextConfig
