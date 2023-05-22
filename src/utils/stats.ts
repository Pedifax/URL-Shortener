import geoip  from 'geoip-lite';
import requestIp from 'request-ip';
import { urlTable } from '../utils/bigTableClient';

// Import Datadog
import DDlogger from '../utils/datadog'


export const updateURLStats = async(req: any, shortURL: string) => {
    // Log request header
    // DDlogger.log('info', JSON.stringify(req.headers));

    // 1. First get country count
    let country: string = "";

    try{
        const ip: string | null = requestIp.getClientIp(req);
        country = geoip.lookup(ip!)!['country'];
    }

    catch(err){
        country = "UNK";
    }

    // 2. Get referer count
    let referer: string = "";

    try{
        let refererStr: undefined|string = req.headers.referer;
        if (refererStr === undefined){
            referer = "Others";
        }
        else{
            const regex = /(facebook|google|mail|instagram|twitter|reddit)/g;
            const match = refererStr.match(regex);

            if (match) { 
                // Change first letter to caps
                referer = match[0].charAt(0).toUpperCase() + match[0].slice(1);
            } else {
                referer = "Others";
            }
        }
    }
    catch{
        referer = "Others";
    }
    

    // 3. Write to DB
    try{
        // Get the row
        const row = urlTable.row(`${shortURL}`);

        // UNK means the country is unknown
        await row.increment(`country_stat:${country}`, 1);
        await row.increment(`referer_stat:${referer}`, 1);
        

    }
    catch {
        // If the database failed there, we DO NOT return Internal Error
        // After all, the redirecting function is the first priority
        console.error('URL stats logging error');
    }
    
}