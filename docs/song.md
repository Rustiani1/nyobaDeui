# Music API Spec

## Search Song API

Endpoint : `/api/music/search`

request Parameters :
- `query` : The search query for songs.

Response Body Success: 
```json
{
    "data": [
        {
            "title": "Song Title",
            "artist": "Artist Name",
            "album": "Album Name",
            "duration": "Duration of the song",
            "url": "URL to the song"
        },
        {
            "title": "Another Song Title",
            "artist": "Another Artist Name",
            "album": "Another Album Name",
            "duration": "Duration of the song",
            "url": "URL to the song"
        },
        ...
    ]
}

```
Response Body Error :

```json
{
    "error": "Failed to retrieve songs. Please try again later."
}
```

## Get Song Details API

Endpoint: `/api/music/songs/{songId}`

Request Parameters:
- `songId` : The unique identifier of the song.

Response Body Success:

```json
{
    "data": {
        "title": "Song Title",
        "artist": "Artist Name",
        "album": "Album Name",
        "duration": "Duration of the song",
        "url": "URL to the song"
    }
}
```

Response Body Error : 
```json
{
    "error": "Song not found."
}
```

## Add Song API
Endpoint: `POST /api/music/songs`

Request Body:
```json
{
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "duration": "Duration of the song",
    "url": "URL to the song"
}
```
Response Body Success:
```json
{
    "data": {
        "id": "Unique identifier for the newly added song",
        "message": "Song added successfully"
    }
}
```

Response Body Error:
```json
{
    "error": "Failed to add the song. Please check your request."
}
```

## Update Song API
Endpoint: `PUT /api/music/songs/{songId}`

Request Parameters:

- `songId` : The unique identifier of the song to be updated.

Request Body:
```json
{
    "title": "Updated Song Title",
    "artist": "Updated Artist Name",
    "album": "Updated Album Name",
    "duration": "Updated Duration of the song",
    "url": "Updated URL to the song"
}
```

Response Body Success:

```json
{
    "data": {
        "message": "Song updated successfully"
    }
}
```

Response Body Error:
```json
{
    "error": "Failed to update the song. Please check your request."
}
```

## Delete Song API
Endpoint: `DELETE /api/music/songs/{songId}`

Request Parameters:
- `songId` : The unique identifier of the song to be deleted.

Response Body Success:
```json
{
    "data": {
        "message": "Song deleted successfully"
    }
}
```

Response Body Error:
```json
{
    "error": "Failed to delete the song. Please try again later."
}
```