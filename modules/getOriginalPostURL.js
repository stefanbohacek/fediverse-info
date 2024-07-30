export default async (url) => {
  let returnURL = url;
  let urlObject = new URL(url);
  const domain = urlObject.hostname;
  const postId = urlObject.pathname.split('/')[2];

  try {
      const resp = await fetch(`https://${domain}/api/v1/statuses/${postId}`);
      const respJSON = await resp.json();
      const results = respJSON;
      returnURL = results.url;
  } catch (error) {
      console.log(error);
  }

  return returnURL;
};
