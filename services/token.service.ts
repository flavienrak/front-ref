import api from '@/axios/axios.instance';

const verifyTokenService = async (token: string) => {
  try {
    const res = await api.get(`/token/${token}`);
    return res.data;
  } catch (error) {
    return { error: `TOKEN VERIFICATION ERROR: ${error}` };
  }
};

const verifyOAuthTokenService = async (token: string) => {
  try {
    const res = await api.get(`/token/${token}/oauth`);
    return res.data;
  } catch (error) {
    return { error: `OAUTH TOKEN VERIFICATION ERROR: ${error}` };
  }
};

export { verifyTokenService, verifyOAuthTokenService };
