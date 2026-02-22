import NodeCache from "node-cache";
const appCache = new NodeCache({ stdTTL: 100, checkperiod: 60 });

export default async (domain, full) => {
  let nodeInfoURL,
    nodeInfo = {
      domain,
    };

  if (domain) {
    const cacheKey = `nodeinfo:${domain}${full ? ":full" : ""}`;
    const cachedData = appCache.get(cacheKey);

    if (cachedData == undefined) {
      try {
        const resp = await fetch(`https://${domain}/.well-known/nodeinfo`);
        let results = await resp.json();
        if (results.links) {
          results.links.forEach((link) => {
            if (link.rel.includes("nodeinfo.diaspora.software/ns/schema")) {
              nodeInfoURL = link.href;
            }
          });
        }

        if (nodeInfoURL) {
          const resp = await fetch(nodeInfoURL);
          let results = await resp.json();

          if (full) {
            nodeInfo.nodeInfo = results;

            try {
              const instanceData = await fetch(
                `https://${domain}/api/v2/instance`,
              );
              const instanceDataJSON = await instanceData.json();

              if (instanceDataJSON && instanceDataJSON.domain) {
                nodeInfo.instance_data = {
                  thumbnail_url: instanceDataJSON?.thumbnail?.url,
                  icon_url: instanceDataJSON?.icon[0]?.src,
                  contact_name:
                    instanceDataJSON?.contact?.account?.display_name,
                  contact_username:
                    instanceDataJSON?.contact?.account?.username,
                };
              }
            } catch (error) {
              // noop
            }
          } else {
            nodeInfo.software = {
              name: results?.software?.name,
              version: results?.software?.version,
            };
          }
        }
        const success = appCache.set(cacheKey, nodeInfo);
      } catch (err) {
        console.log("node-info error", err);
      }
    } else {
      nodeInfo = cachedData;
    }
  }

  return nodeInfo;
};
