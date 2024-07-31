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

Additional optional parameters

- `full=true`: get the full node info object
- `onlysoftware=true`: look up the software name only using data exported from [demo.fedilist.com](http://demo.fedilist.com/) (see the `data/software.json` file)

## Development

```sh
npm install
npm run dev
```