const config = {
    collection: "roteiro",
    inputField: "geometria.coordinates",
    targetField: "foto_miniatura_mapa",
    // Set imageFolder to null to save it in the root folder
    imageFolder: "2c142a87-a021-4ab4-9c54-cecf1d4588c9",
    mapConfig: {
        maptype: "terrain",
        markersColor: "0x00FF00",
        pathColor: "0x00FFCC",
        size: [1250, 1250],
    },
};

export { config };
