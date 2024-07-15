import axios from 'axios';

const ACCESS_KEY = 'nTmfZBh3fHC-1xCDDBilQhBg_4ZKGGHwqFThAoBaxDc';
const BASE_URL = 'https://api.unsplash.com';

export interface User {
  id: string;
  username: string;
  name: string;
}

export interface Urls {
  regular: string;
}

export interface ImageData {
  id: string;
  description: string;
  alt_description: string;
  likes: number;
  user: User;
  urls: Urls;
}

export interface FetchImagesResponse {
  results: ImageData[];
  total: number;
}

export const fetchImages = async (query: string, page: number): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>(`${BASE_URL}/search/photos`, {
    params: { query, page, per_page: 12 },
    headers: {
      Authorization: `Client-ID ${ACCESS_KEY}`,
    },
  });
  return response.data;
};
