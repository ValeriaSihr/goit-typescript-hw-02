import axios from "axios";

const ACCESS_KEY = "nTmfZBh3fHC-1xCDDBilQhBg_4ZKGGHwqFThAoBaxDc";
const BASE_URL = "https://api.unsplash.com";

const fetchImages = async (query, page) => {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
        params: { query, page, per_page: 12 },
        headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
        },
    });
    return response.data;
};

export { fetchImages };
