import axios from "axios";
import FormData from "form-data";
import { HttpError } from "../types/custom.error";

class ImageService{
  async uploadImage(file: Express.Multer.File){
    const { IMAGE_SERVER_URL } = process.env;
    const fileBuffer = file.buffer;
    const formData = new FormData();
    formData.append('image', fileBuffer, {
      filename: file.originalname,
    });
    const response = await axios.post(`${IMAGE_SERVER_URL}/upload`, formData, {
      headers: formData.getHeaders(),
    }).catch((error) => {
      throw new HttpError(error.response.data.error, error.response.status);
    });
    return `${IMAGE_SERVER_URL}/${response.data.imageName}`;  
  }
}

export default new ImageService();