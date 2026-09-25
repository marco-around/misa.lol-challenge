# misa.lol | Challenge solved

## How to run

> Before running, make sure you have Node.js ≥ 24 and pnpm ≥ 10 installed.

```bash
pnpm install:all
pnpm dev
```

## Stacks

### server:

- typescript
- node
- fastify
- zod

### client:

- typescript
- react
- shadcnUI
- tailwindCSS
- tanstack query
- react hook form
- zod

## Time taken

**73 minutes** _(I didn't leave out any features. I managed to finish everything.)_

> I could have finished much faster, but I decided to use AI only to create the Zod schema and to double-check at the end of the project that I hadn't missed anything. (In fact, this Markdown is being written by hand.)

## Trade-offs and improvements

I think the most obvious trade-off would be the lack of a database for data persistence. If the server goes down, the profile gets reset, so I think adding a database would be the best first improvement. As a second improvement, I would move this project into a monorepo (or some way to share packages), since it shares certain things between the client and the server (the Zod schema being duplicated in both is the best example).

## Tests result

- Access http://localhost:5173 in your browser, make changes to the profile, and reload the page.
- Using an HTTP client, make a PUT request to `http://localhost:3000/api/profile`, sending this JSON:

```json
{
  "displayName": "marco",
  "bio": "marco around the world",
  "link": {
    "label": "My Portfolio",
    "url": "marcoaround.com"
  }
}
```

You will receive this message as a response:

```json
{
  "error": "validation_failed",
  "errors": {
    "link.url": "Link URL must be a valid absolute https:// URL."
  }
}
```

From there, you can freely test the validations. After any rejected PUT, a GET to `/api/profile` confirms the saved profile remains unchanged.

You can also try sending something that isn't json... Try sending: "this is not JSON"

You will receive that message:

```json
{
  "error": "invalid_json",
  "message": "Request body is not valid JSON."
}
```
