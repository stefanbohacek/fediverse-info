const fetchStatus = async (instance, url) => {
  let results = {};
  try {
      const resp = await fetch(`https://${instance}/authorize_interaction?uri=${url}`);
      const respJSON = await resp.json();
      results = respJSON;
      return results;
  } catch (error) {
      console.log(error);
      return results;
  }
}

export default fetchStatus;
