import md5 from 'md5'
import bs58 from 'bs58'

export const shortener = (url: string) => {
    
    // TODO: check if the url exists in our database

    const binaryHash = Buffer.from(md5(url+Date.now()), "binary");
    let b58 = bs58.encode(binaryHash);

    // truncate to a length of 8
    //b58 = b58.substring(0, 8);

    // shuffle and truncate to a length of 8
    const shuffled_b58 = [...b58].sort(() => Math.random()-.5).join('');


    return shuffled_b58.substring(0, 8);
}