const NODE_ENV = process.env.NODE_ENV;
const publicUrl = process.env.PUBLIC_URL;

const config = {
  apiHost: NODE_ENV === 'development' ? 'http://127.0.0.1:8087' : 'https://blog.daifee.com',
  publicUrl: publicUrl
};


export default config;
