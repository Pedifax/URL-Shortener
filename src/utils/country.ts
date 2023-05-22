import geoip  from 'geoip-lite';
import requestIp from 'request-ip';
import { urlTable } from '../utils/bigTableClient';


export const updateCountryCount = async(req: any, shortURL: string) => {

    try{
        const ip: string | null = requestIp.getClientIp(req);
        const country: string = geoip.lookup(ip!)!['country'];
        
        // Write the country data into DB
        const row = urlTable.row(`${shortURL}`);
        await row.increment(`country_stat:${country}`, 1);

    }

    catch(err){
        const row = urlTable.row(`${shortURL}`);
        // UNK means the country is unknown
        await row.increment(`country_stat:UNK`, 1);
    }


}