# misa.lol — Full-stack developer trial

**Exercise:** Build a mini profile editor.  
**Time:** 75 minutes for the exercise, including setup and verification, followed by a 15-minute walkthrough.  
**Stack:** Use a web stack you know. A familiar starter, UI library, or template is welcome; mention what you started with.

## The task

misa.lol lets people create a personal page for their identity, music, socials, and links. For this exercise, build a small, standalone editor for one fictional profile and one external link.

We want to see how you connect a usable interface to a working backend, handle invalid input, and explain your decisions. Use the example below; the live misa.lol service is not needed.

## Starting data

Your server should begin with this profile:

```json
{
  "displayName": "Nova",
  "bio": "Music, late nights, and things I make.",
  "link": {
    "label": "My website",
    "url": "https://example.com"
  }
}
```

## What to build

1. **Load and edit.** Load the profile from your backend into a form with four labeled fields: display name, bio, link label, and link URL.
2. **Preview.** Show a simple profile card beside or below the form. Update the name, bio, and link as the user types. Treat entered text as plain text. A valid link URL should produce a working link; an invalid URL must not become a clickable link in the preview.
3. **Save.** A Save button sends the form to the backend. Show when a save is pending, prevent repeated submissions while it is pending, and show success only after the server confirms it.
4. **Keep the data.** Refreshing the browser must load the saved profile from the backend. Server memory is sufficient; losing data when the server restarts is acceptable. Browser-only storage does not satisfy this requirement.
5. **Handle errors.** Show useful validation errors and load/save failure messages. A failed save must preserve the user's form entries so they can correct or retry them. Keep the interface usable on a narrow screen and with a keyboard.

Use simple styling. This is one editor with one preview; no separate public profile page is needed.

## Backend contract

| Request            | Expected behavior                                                                           |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `GET /api/profile` | Return `200` and the current profile in the shape above.                                    |
| `PUT /api/profile` | Accept the complete profile, validate it, save it, and return `200` with the saved profile. |
| Invalid update     | Return `400` with useful error information. Leave the stored profile unchanged.             |

Enforce these rules **on the server**, even when someone bypasses the form:

- All four values must be strings. Missing values and incorrect types are invalid.
- Trim leading and trailing whitespace before checking lengths and saving.
- Display name: 1–40 characters after trimming.
- Bio: 0–160 characters after trimming; an empty bio is allowed.
- Link label: 1–30 characters after trimming.
- Link URL: a valid absolute `https://` URL with a hostname. Reject malformed URLs and other schemes, including `http:`, `javascript:`, and `data:`.

Use your language's normal string-length convention. Choose and document your error response shape; exact error wording is up to you. Handle malformed JSON as an invalid request rather than crashing the server.

## Scope and time

Suggested allocation: 10 minutes setup and planning, 45 minutes implementation, 15 minutes verification, 5 minutes handoff notes. Stop at 75 minutes and submit what you have, including anything unfinished.

Authentication, multiple users, multiple links, uploads, music, animations, deployment, and a database are outside this exercise. There are no bonus points for extra features or spending longer. A local application is enough.

## Verification and submission

Submit a repository link or ZIP containing your source and a short README with:

- Exact install/run commands and the required runtime version.
- Approximate time spent, what works, and anything unfinished.
- Results from checking a successful save followed by a browser refresh, and an invalid request sent directly to the API. Confirm that rejection leaves the saved profile unchanged.
- One implementation tradeoff and the first thing you would improve for production.
- Any starter code, libraries, or AI tools you used.

Automated tests are welcome, but a clear, reproducible manual check is sufficient within this time limit. Do not include credentials or real user data.

## Tools and walkthrough

AI assistants, documentation, and search are allowed. Briefly explain what they helped with and how you verified the result; private prompts or chat history are not required. You should be able to explain and make a small change to the submitted code.

The 15-minute walkthrough covers a demo, tracing a save through the frontend and backend, one small change to an existing validation rule, and your tradeoffs. Normal development tools remain allowed.

We assess working behavior, server validation, clear failure handling, readable code, usability, and your explanation. Elaborate visuals and framework choice do not earn extra credit.

Product context: [misa.lol](https://misa.lol/), reviewed 18 September 2026. The constraints above are exercise rules, not claims about misa.lol's production implementation.
