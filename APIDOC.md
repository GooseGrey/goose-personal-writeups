# API Documentation

## 1. Check Wargame Coverage

### Endpoint
```
GET /wargames/:name
```

### Description
This endpoint tells the user whether the site mentioned has been covered or not. It checks if the input could be one covered but modified if its input was close or not.

### Parameters
- `name` (path parameter, required): The name of the wargame to check

### Request Type
`GET`

### Response Format
`Plain Text`

### Example Request
```
GET /wargames/picoctf
```

### Example Response
```
Yes, I have worked on picoctf.
```

### Error Handling
This endpoint does not return explicit error codes, but handles various scenarios:

- **Exact match found**: Returns confirmation message
  ```
  Yes, I have worked on {wargameName}.
  ```

- **Similar match found (single)**: Returns suggestion
  ```
  Did you mean: {similarName}?
  ```

- **Similar matches found (multiple)**: Returns multiple suggestions
  ```
  Did you mean one of these: {name1}, {name2}, ...?
  ```

- **No match found**: Returns informational message
  ```
  No, I have not worked on {wargameName}. Maybe I should try it out!
  ```

---

## 2. Get Write-up

### Endpoint
```
GET /writeups/:wargame/:category/:number
```

### Description
This endpoint sends the text content of the write-up for the challenge specified.

### Parameters
- `wargame` (path parameter, required): The name of the wargame platform
- `category` (path parameter, required): The category of the challenge
- `number` (path parameter, required): The challenge number (must be a valid number)

### Request Type
`GET`

### Response Format
`Plain Text`

### Example Request
```
GET /writeups/picoctf/cryptography/1
```

### Example Response
```
This is the complete write-up for the challenge...
[Full write-up content in plain text]
```

### Error Handling

#### 400 Bad Request
- **Invalid parameters**: When parameters are missing or the number is not a valid number
  ```
  Invalid parameters. Please provide valid wargame, category, and challenge number.
  ```

- **Write-up not found**: When the specified write-up doesn't exist in the database
  ```
  Sorry, write-up not found for {wargame} - {category} - {number}.
  ```

#### 500 Internal Server Error
- **File not found**: When the write-ups.json file doesn't exist
  ```
  File of write-ups does not exist
  ```

- **General server error**: When any other server-side error occurs
  ```
  something went wrong on server side
  ```

---

## 3. Get Random Quote

### Endpoint
```
GET /quotes
```

### Description
This endpoint sends a random quote from all the quotes in the database. It provides both French and English versions along with the name of the author.

### Parameters
None

### Request Type
`GET`

### Response Format
`JSON`

### Example Request
```
GET /quotes
```

### Example Response
```json
{
  "fr": "La vie est belle",
  "en": "Life is beautiful",
  "author": "Unknown"
}
```

### Error Handling

#### 500 Internal Server Error
- **File not found**: When the quotes.json file doesn't exist
  - Response Type: `Plain Text`
  ```
  File of quotes does not exist
  ```

- **General server error**: When any other server-side error occurs
  - Response Type: `Plain Text`
  ```
  something went wrong on server side
  ```

---

## 4. Add New Quote

### Endpoint
```
POST /quotes/add
```

### Description
This endpoint allows the user to add a new quote to the community-participating database of quotes, and sends a random quote from the updated database.

### Parameters
Request body (JSON):
- `fr` (string, required): The quote in French (must not be empty)
- `en` (string, required): The quote in English (must not be empty)
- `author` (string, required): The author of the quote (must not be empty)

### Request Type
`POST`

### Response Format
`JSON` (success) or `Plain Text` (error)

### Example Request
```
POST /quotes/add
Content-Type: application/json

{
  "fr": "La connaissance est pouvoir",
  "en": "Knowledge is power",
  "author": "Francis Bacon"
}
```

### Example Response
```json
{
  "fr": "Le succès n'est pas final",
  "en": "Success is not final",
  "author": "Winston Churchill"
}
```

### Error Handling

#### 400 Bad Request
- **Invalid quote data**: When any required field is missing or empty
  - Response Type: `Plain Text`
  ```
  Invalid quote data.
  ```

#### 500 Internal Server Error
- **File not found**: When the quotes.json file doesn't exist
  - Response Type: `Plain Text`
  ```
  File of quotes does not exist
  ```

- **General server error**: When any other server-side error occurs (e.g., file write failure)
  - Response Type: `Plain Text`
  ```
  something went wrong on server side
  ```