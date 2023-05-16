import express from 'express';
import rejectRequest from '../modules/rejectRequest.js';
import NodeCache from 'node-cache';

const router = express.Router();
const appCache = new NodeCache( { stdTTL: 100, checkperiod: 60 } );

router.get('/', async (req, res) => {
  if (req.query.domain){
    const domain = req.query.domain;

    let nodeInfoURL, nodeInfo = {
      domain
    };

    const cacheKey = `nodeinfo:${domain}${req.query.full ? ':full' : ''}`;

    const cachedData = appCache.get(cacheKey);

    if (cachedData == undefined){
      try{
        const resp = await fetch(`https://${domain}/.well-known/nodeinfo`);
        let results = await resp.json();
        if (results.links){
          results.links.forEach(link => {
            if (link.rel.includes('nodeinfo.diaspora.software/ns/schema')){
              nodeInfoURL = link.href;
            }
          });
        }

        if (nodeInfoURL){
          const resp = await fetch(nodeInfoURL);
          let results = await resp.json();
    
          if (req.query.full){
            nodeInfo.nodeInfo = results;
          } else {
            nodeInfo.software = {
              name: results?.software?.name,
              version: results?.software?.version,
            }
          }
        }        
        const success = appCache.set(cacheKey, nodeInfo);
      } catch(err){
        console.log('node-info error', err);
      }
  

    } else {
      nodeInfo = cachedData;
    }
  
    res.json(nodeInfo)
  } else {
    rejectRequest(req, res, 422);
  }
});

export default router;