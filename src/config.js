const NODE_ENV = process.env.NODE_ENV;

const config = {
  apiHost: NODE_ENV === 'development' ? 'http://127.0.0.1' : 'https://blog.daifee.com'
};


export default config;
