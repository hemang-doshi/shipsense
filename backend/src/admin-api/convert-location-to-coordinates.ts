import axios from "axios";
import { coordinatesType } from "../../tame/admin-types";

interface GeocodeResponse {
  results: {
    geometry: {
      lat: number;
      lng: number;
    };
  }[];
}

export async function convertLocationToCoordinates(
  address: string
): Promise<coordinatesType> {
  const apiKey = process.env.OPENCAGE_API_KEY;

  try {
    const response = await axios.get<GeocodeResponse>(
      `https://api.opencagedata.com/geocode/v1/json`,
      {
        params: {
          q: address,
          key: apiKey,
        },
      }
    );

    const coordinates = {
      latitude: response.data.results[0].geometry.lat,
      longitude: response.data.results[0].geometry.lng,
    };

    return coordinates;
  } catch (error) {
    console.error("Error fetching geocode:", error);
    throw error;
  }
}
