// rpcClient.js
const axios = require('axios');
const config = require('./config');

const rpcClient = async (method, params = []) => {
  const payload = {
    jsonrpc: "1.0",
    id: "bitcoin-explorer",
    method,
    params,
  };

  const url = `${config.rpcUrl}:${config.rpcPort}`;

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' },
      auth: {
        username: config.rpcUser,
        password: config.rpcPassword,
      },
    });

    return response.data.result;
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message);
  }
};

module.exports = rpcClient;
