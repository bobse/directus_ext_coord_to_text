import axios from "axios";

const GOOGLE_API = process.env.GOOGLE_MAPS_API_KEY;

async function coordsToText(coords: Array<number[]>): Promise<string> {
    if (!GOOGLE_API) {
        throw new Error("Please set GOOGLE_MAPS_API_KEY env variable");
    }

    let lat: number;
    let lon: number;
    if (coords[0] instanceof Array) {
        if (
            typeof coords[0][0] === "number" &&
            typeof coords[0][1] === "number"
        ) {
            [lon, lat] = coords[0];
            return await getFromGoogle(lat, lon);
        }
    }

    throw new Error("Invalid coords format");
}

async function getFromGoogle(lat: number, lon: number): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API}`;
    let textAddress = "";
    try {
        const res = await axios.get(url);
        // console.log(JSON.stringify(res.data));
        textAddress = res.data?.results[0].formatted_address;
    } catch (err) {
        console.error("Could not retrieve data from GOOGLE MAPS API");
        console.error(err);
    } finally {
        return textAddress;
    }
}

export { coordsToText };
