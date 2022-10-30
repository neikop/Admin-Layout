import { client } from './axios';

const uploadFile = (body: FormData): Promise<any> => client.post(`/api/uploads`, body);
const fileService = {
  uploadFile,
};
export default fileService;
