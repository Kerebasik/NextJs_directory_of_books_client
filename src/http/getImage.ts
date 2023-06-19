import axios from "axios";

export const getImage = async (url:string) => {
    const response = await axios.get(`http://localhost:5000/${url}`, {
        responseType: 'arraybuffer',
    });
    const imageBuffer = Buffer.from(response.data, 'binary');
    const imageUrl = `data:${response.headers['content-type']};base64,${imageBuffer.toString('base64')}`;
    return imageUrl;
};