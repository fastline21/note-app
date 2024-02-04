# Note App

This is a basic note app. It has a CRUD functionality. The basic fields for the note are title, and body. The ID is auto generated using UUID v4. This is build on Typescript + Express.js. The data storage that use is file-storage solution. Under data folder. the data store in a json file.

## Setup

- Create `data` folder in the root directory for data storage
- run `npm install` to install node modules
- run `npm run build` to build source code
- run `npm start` to start the app.

## Sample cURL

### Get All Notes

```
curl --location 'http://localhost:8080/api/v1/notes' \
--header 'Content-Type: application/json'
```

### Get Single Note

```
curl --location 'http://localhost:8080/api/v1/notes/2' \
--header 'Content-Type: application/json'
```

### Create Note

```
curl --location 'http://localhost:8080/api/v1/notes' \
--header 'Content-Type: application/json' \
--data '{
    "title": "456",
    "body": "123"
}'
```

### Update Note

```
curl --location --request PUT 'http://localhost:8080/api/v1/notes/cd71ba8f-0d91-4d6b-bf46-46414d215743' \
--header 'Content-Type: application/json' \
--data '{
    "title": "123123123123",
    "body": "124"
}'
```

### Delete Note

```
curl --location --request DELETE 'http://localhost:8080/api/v1/notes/c69b2b28-e01a-4f9c-a93f-20d40586a965' \
--header 'Content-Type: application/json'
```
