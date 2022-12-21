import axios from "axios";

import { config } from "./config";

const GOOGLE_API = process.env.GOOGLE_MAPS_API_KEY;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

async function coordsToMap(coords: Array<number[]>): Promise<string | null> {
    if (!GOOGLE_API) {
        throw new Error("Please set GOOGLE_MAPS_API_KEY env variable");
    }
    if (!ADMIN_API_KEY) {
        throw new Error("Please set ADMIN_API_KEY env variable");
    }
    if (!(coords[0] instanceof Array)) {
        throw new Error("Invalid coords format");
    }

    const url = generateGoogleUrl(coords);
    return await saveImagetoDirectus(url);
}

function generateGoogleUrl(coords: Array<number[]>): string {
    const coordsText = [...coords]
        .map((coord) => [...coord].reverse())
        .join("|");
    const sizeText = config.mapConfig.size.join("x");
    const url =
        "https://maps.googleapis.com/maps/api/staticmap?" +
        `size=${sizeText}` +
        `&maptype=${config.mapConfig.maptype || "terrain"}` +
        `&markers=color:${
            config.mapConfig.markersColor || "green"
        }|${coordsText}` +
        `&path=color:${
            config.mapConfig.pathColor || "green"
        }|weight:4|${coordsText}` +
        "&style=feature:poi|element:labels|visibility:off" +
        `&key=${GOOGLE_API}`;

    return encodeURI(url);
}

async function saveImagetoDirectus(
    urlImageDownload: string
): Promise<string | null> {
    try {
        const data = {
            url: urlImageDownload,
            data: {
                folder: config.imageFolder,
            },
        };
        const axiosConfig = {
            headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
        };
        const res = await axios.post(
            `${process.env.PUBLIC_URL}/files/import`,
            data,
            axiosConfig
        );
        return res.data?.data?.id;
    } catch (err) {
        console.error("Could not save map");
        console.error(err);
        return null;
    }
}

export { coordsToMap };
