# Lat,Long to Text

This extension uses Google Maps Api.

## Configuration:

Edit `config.ts` and set:

```
    collection: "<NAME OF THE COLLECTION>",
    inputField: "<NAME OF THE FIELD TO WATCH>",
    targetField: "<NAME OF THE FIELD WHICH WILL RECIEVE THE TEXT FROM THE COORDS>",
```

-   InputField and targetField can be nested fields. Example: "geometria.coordinates"

## Instalation:

1. `npm install`
2. Open package.json and set the `path` in `directus:extension` for the build.
3. Run `npm run build`
4. Copy the build folder to directus folder inside `/extensions/hooks`

## Important notes:

In order to run this extension you need to Set GOOGLE_MAPS_API_KEY inside your environment variables
