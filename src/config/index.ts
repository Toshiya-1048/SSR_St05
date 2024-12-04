export const config = {
  paths: {
    public: '/assets',
    dist: '/dist',
    client: '/client.js',
    assets: {
      spine: '/assets'
    }
  },
  assets: {
    js: [
      'https://unpkg.com/@esotericsoftware/spine-player@4.2.*/dist/iife/spine-player.js'
    ],
    css: [
      'https://unpkg.com/@esotericsoftware/spine-player@4.2.*/dist/spine-player.css'
    ]
  },
  server: {
    ports: {
      csr: 3000,
      ssr: 9000
    }
  }
}; 