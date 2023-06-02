# Fediverse info services

Currently available endpoints:

**/node-info**

Example: `/node-info?domain=mastodon.social`

Response:

```json
{
  "domain": "mastodon.social",
  "software": {
    "name": "mastodon",
    "version": "4.1.2+nightly-20230523"
  }
}
```

Optionally you can also pass the `full=true` parameter to get the full node info object.

## Development

```sh
npm install
npm run dev
```