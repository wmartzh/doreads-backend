import axios from "axios";
import FormData from "form-data";

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
    });
    return JSON.stringify(response.data.imageName);
  }
}

export default new ImageService();