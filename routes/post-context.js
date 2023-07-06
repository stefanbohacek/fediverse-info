import express from 'express';
import rejectRequest from '../modules/rejectRequest.js';
import getOriginalPostURL from '../modules/getOriginalPostURL.js';
import getStatusContext from '../modules/getStatusContext.js';
// import fetchStatus from '../modules/fetchStatus.js';
import NodeCache from 'node-cache';

const router = express.Router();
const appCache = new NodeCache( { stdTTL: 100, checkperiod: 60 } );

router.get('/', async (req, res) => {
  if (req.query.url){
    const statusURL = req.query.url;
    const statusURLObject = new URL(statusURL);
    const domain = statusURLObject.hostname;
    const statusId = statusURLObject.pathname.split('/')[2];
    
    let statusContext = {};

    const cacheKey = `status_context:${domain}:${statusId}`;
    const cachedData = appCache.get(cacheKey);

    if (cachedData == undefined){
      const originalStatusURL = await getOriginalPostURL(statusURL);
      statusContext = await getStatusContext(originalStatusURL);
    } else {
      statusContext = cachedData;
    }
  
    res.json(statusContext)
  } else {
    rejectRequest(req, res, 422);
  }
});

export default router;