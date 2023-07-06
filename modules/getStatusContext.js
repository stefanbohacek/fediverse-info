const getStatusContext = async (statusURL) => {
  let results = {};

  try {
    const url = new URL(statusURL)
    const domain = url.hostname;
    const postId = url.pathname.split('/')[2];
    const apiURL = `https://${domain}/api/v1/statuses/${postId}/context`;
    
    try {
        const resp = await fetch(apiURL);
        const respJSON = await resp.json();
        results = respJSON;
        return results;
    } catch (error) {
        console.log(error);
        return results;
    }
  } catch (error) {
    console.log(error);
    return results;
  }

}

export default getStatusContext;
