import axios from 'axios';
import { delay } from 'lodash';
import { useState } from 'react';
import { z } from 'zod';

export enum RequestStatus {
  ERROR = 'error',
  FETCHING = 'fetching',
  IDLE = 'idle',
  SUCCESS = 'success',
}

type Response = {
  statusCode: number;
  body: {
    email: string;
    link: string;
    sendResult: any;
  };
};

export const useAuth = () => {
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const emailSchema = z.string().email().min(5);

  const login = async (email: string) => {
    setStatus(RequestStatus.FETCHING);
    try {
      emailSchema.parse(email);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/link/authorize?email=${email}`
      );

      if (response.status === 200) {
        setStatus(RequestStatus.SUCCESS);

        return response.data as Response;
      }
    } catch (error) {
      setStatus(RequestStatus.ERROR);

      return error;
    }

    delay(() => setStatus(RequestStatus.IDLE), 3000);
  };

  return { login, status };
};
