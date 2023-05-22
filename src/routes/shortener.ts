import { Router } from 'express'
import { createAlias, deleteURL, redirectURL, shortenURL, getCache, bulkShortenURL } from '../controller/shortener'

const router = Router();


router.get('/:shortURL', getCache, redirectURL);

router.post('/shorten', shortenURL);

router.post('/bulk/shorten', bulkShortenURL);

router.delete('/:shortURL', deleteURL);

router.post('/alias', createAlias);


export default router