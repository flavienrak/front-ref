import api from '@/axios/axios.instance';
import { AxiosError } from 'axios';

const mailVerificationService = async (token: string) => {
  try {
    const res = await api.get(`/mail/${token}`);
    return res.data;
  } catch (error) {
    return { error: `TOKEN VERIFICATION ERROR: ${error}` };
  }
};

const codeVerificationService = async (data: {
  token: string;
  code: number;
}) => {
  try {
    const res = await api.post(`/mail/${data.token}/code`, {
      code: data.code,
    });
    return res.data;
  } catch (error) {
    return { error: `CODE VERIFICATION ERROR: ${error}` };
  }
};

export { mailVerificationService, codeVerificationService };
