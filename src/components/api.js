import axios from 'axios';

const KEY = '32445891-4e5aca6c6794ec22921e6fc5b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImg = async (photoTag, page) => {
  try {
    const response = await axios.get(
    `?q=${photoTag}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ); 
    const result = await response.data;
    return result;
  } catch (error) {
    throw error;
  }
 
};