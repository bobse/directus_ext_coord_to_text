# Lat,Long to Text

This extension uses Google Maps Api.

## Configuration:

Edit `config.ts` and set:

```
    collection: "<NAME OF THE COLLECTION>",
    inputField: "<NAME OF THE FIELD TO WATCH>",
    targetField: "<NAME OF THE FIELD WHICH WILL RECIEVE THE MAP ID FROM
    THE COORDS>",
    imageFolder: "<FOLDER ID> or null",

```

-   InputField and targetField can be nested fields. Example: "geometria.coordinates"

## Instalation:

1. `npm install`
2. Open package.json and set the `path` in `directus:extension` for the build.
3. Run `npm run build`
4. Copy the build folder to directus folder inside `/extensions/hooks`

## Important notes:

Required Env vars:

-   `GOOGLE_MAPS_API_KEY` - API KEY FROM GOOGLE
-   `ADMIN_API_KEY` - a API key from directus to allow the hook to post the map image to the DB
-   `PUBLIC_URL` - URL Base for directus. Example: 'http://localhost:8055'
