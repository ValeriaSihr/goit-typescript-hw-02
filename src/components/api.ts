import axios from 'axios';

const ACCESS_KEY = "nTmfZBh3fHC-1xCDDBilQhBg_4ZKGGHwqFThAoBaxDc";
const BASE_URL = "https://api.unsplash.com";

export interface ImageData {
  id: string;
  urls: { regular: string };
  alt_description: string;
  description: string;
  user: { name: string };
  likes: number;
}

export interface FetchImagesResponse {
  results: ImageData[];
  total: number;
}

const fetchImages = async (query: string, page: number): Promise<FetchImagesResponse> => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: { query, page, per_page: 12 },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return response.data;
};

export { fetchImages };