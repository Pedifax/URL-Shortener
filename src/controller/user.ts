import { RequestHandler } from "express";
import { userTable, urlTable } from '../utils/bigTableClient';
import { UserDecoded, User } from "../model/user";
import { Record, Stat } from "../model/record"

import jwt_decode from "jwt-decode";
import DDlogger from "../utils/datadog";


export const login: RequestHandler = async(req, res) => {
    const { credential } = req.body;
    const decoded: UserDecoded = jwt_decode(credential);

    try{
        const [rowExists] = await userTable.row(decoded.email).exists();

        // If user does not exist in database
        if (!rowExists) {
            const rowToInsert = {
                key: decoded.email,
                data: {
                    profile: { // column family
                        username: {
                            value: decoded.name
                        },
                        image: {
                            value: decoded.picture
                        },
                        level: {
                            value: 0 // stands for starter level user
                        }
                    } 
                }
            }

            await userTable.insert(rowToInsert);
        }
        else { // If user exists in database
            const [singleRow] = await userTable.row(decoded.email).get();
            const user: User = singleRow.data;
            
            res.status(200).send({"username": user.profile.username[0].value, "image": user.profile.image[0].value, "level": user.profile.level[0].value});

        }

    }
    catch(err){
        console.log(err);
        res.status(500).send({error: "Internal Server Error"});
    }
}


export const updateLevel: RequestHandler = async(req, res) => {
    const { credential, targetLevel } = req.body;
    // level 0: starter, level 1: basic, level 2: expert
    const decoded: UserDecoded = jwt_decode(credential);

    try{
        const rowToInsert = {
            key: decoded.email,
            data: {
                profile: { // column family
                    level: {
                        value: targetLevel
                    }
                } 
            }
        }

        await userTable.insert(rowToInsert);
        const [singleRow] = await userTable.row(decoded.email).get();
        const user: User = singleRow.data;

        res.status(200).send({message: "Update level successfully", level: user.profile.level[0].value});
    }
    catch(err){
        console.log(err);
        res.status(500).send({error: "Internal Server Error"});
    }


}

// export getUserStats

export const getUserStats: RequestHandler = async(req, res, next) => {
    const { credential } = req.body;
    const decoded: UserDecoded = jwt_decode(credential);
    
    try{
        
        const [singleRow] = await userTable.row(decoded.email).get();
        const user: User = singleRow.data;
        
        // Get all short URLs
        const shortURLS: string[] = Object.keys(user.url);
       
        // Get short URL data from urlTable
        const [rows] = await urlTable.getRows({keys: shortURLS});
       
        // Iterate all row to retrieve stats
        let returnObj: any = {}
        
        rows.forEach(row => {
            
            const record: Record = row.data

            let country_stat: Stat = {'UNK': 0}
            let referer_stat: Stat = {'Others': 0}
            
            // Get country stat
            if ('country_stat' in record){
                for(const country of Object.keys(record.country_stat)){
                    country_stat[country] = parseInt(record.country_stat[country][0].value);
                }
            }
            
            // Get referer stat
            if ('referer_stat' in record){
                for(const referer of Object.keys(row.data.referer_stat)){
                    referer_stat[referer] = parseInt(row.data.referer_stat[referer][0].value);
                }
            }

            returnObj[row.id] = {};
            returnObj[row.id]['country_stat'] = country_stat;
            returnObj[row.id]['referer_stat'] = referer_stat;

        })
        
        
        res.status(200).send({data: returnObj});
    }
    catch (err){
        console.log(err);
        next(err);
        // res.status(500).send({error: "Internal Server Error"});
    }
}
