import React, { useEffect, useState } from 'react'
import api from '../../utils/api';
import env from '../../utils/env';
import axios from 'axios';

type statCountPerLink = { 'country': number, 'referrer': number, 'countries': string[], 'referrers': string[] }

type statCountType = { [key: string]: statCountPerLink };

const initStatCountPerLink: statCountPerLink = {
  country: 0,
  referrer: 0,
  countries: [],
  referrers: []
}

export default function UserURLs({ credential, userLevel, updateDep, updateList }: any) {
  const [stats, setStats] = useState<any>();
  const [statCounts, setStatsCounts] = useState<statCountType>();
  const [codeToFull, setCodeToFull] = useState<{ [key: string]: string }>();

  const renderPctg = (n: number) => {
    if (isNaN(n)) return "-";
    return n + '%';
  }
  const deleteURL = async (k: string) => {
    try {
      await api.delete("/" + k);
      delete stats[k];
      updateList();
    } catch (err) {
      console.log("deleteURL failed!");
      throw err;
    }
  }

  const countryImg = (c: string) => {
    if (c == "UNK")
      return "https://upload.wikimedia.org/wikipedia/commons/2/2f/Missing_flag.png?20051021141549"
    return "https://flagcdn.com/w160/" + c.toLowerCase() + ".png"
  }

  useEffect(() => {
    const loadCode = async () => {
      try {
        const res = await axios.get("https://flagcdn.com/en/codes.json");
        setCodeToFull(res.data);
      } catch (err) {
        console.log("loadCode failed!");
        throw err;
      }
    }

    const loadStats = async () => {
      try {
        const response = await api.post("/user/stats", { credential });
        console.log(response);
        setStats(response.data.data);

      } catch (err) {
        console.log("getUserStats failed!");
        throw err;
      }

    }
    loadCode().catch(console.error);
    loadStats().catch(console.error);
  }, [updateDep])

  useEffect(() => {
    for (const key in stats) {
      const count: statCountPerLink = structuredClone(initStatCountPerLink);
      let countryCount = 0;
      let referrerCount = 0;

      count.countries = Object.keys(stats[key]['country_stat']).sort((a, b) => (stats[key]['country_stat'][b] - stats[key]['country_stat'][a]));
      count.referrers = Object.keys(stats[key]['referer_stat']).sort((a, b) => (stats[key]['referer_stat'][b] - stats[key]['referer_stat'][a]));

      for (const c in stats[key]['country_stat']) {
        countryCount += stats[key]['country_stat'][c];
      }

      for (const c in stats[key]['referer_stat']) {
        referrerCount += stats[key]['referer_stat'][c];
      }
      count.country = countryCount;
      count.referrer = referrerCount;

      setStatsCounts(prevState => ({ ...prevState, [key]: count }));
    }
  }, [stats, updateDep])

  return (
    <div className="relative overflow-x-auto">
      {/* {JSON.stringify(stats) + JSON.stringify(statCounts)} */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              short Urls
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Referrer sites
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {stats && Object.keys(stats).map((k, _i) => (
            <tr className="bg-white border-b" key={k}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <a href={env.BASE_URL + '/' + k} target="_blank">
                  {'/' + k}
                </a>
              </th>
              <td className="px-6 py-4">
                {statCounts && statCounts[k] && statCounts[k].countries.map((country, i) => (
                  <>
                    {statCounts[k].country > 0 ?
                      <div className={`flex flex-row mt-1 ` + (userLevel > 1 ? "justify-between" : "justify-center")} key={k + country + i}>
                        <img src={countryImg(country)}
                          className='object-fill w-8 h-6' alt={codeToFull ? codeToFull[country.toLowerCase()] : "country"}
                          title={codeToFull ? codeToFull[country.toLowerCase()] : "country"} />
                        {userLevel == 2 &&
                          <div className='ml-1'>{renderPctg(Number(((stats[k]["country_stat"][country] / statCounts[k].country)).toFixed(2)) * 100)}</div>
                        }
                      </div> :
                      <div className='flex justify-center'>
                        -
                      </div>
                    }
                  </>
                ))}
              </td>
              <td className="px-6 py-4">
                {statCounts && statCounts[k] && statCounts[k].referrers.map((referrer, i) => (
                  <>
                    {statCounts[k].referrer > 0 ?
                      <div className={`flex flex-row mt-1 ` + (userLevel > 1 ? "justify-between" : "justify-center")} key={k + referrer + i}>
                        {referrer != "Others" ? 
                        <img src={('/' + referrer + '.png')}
                        className='object-fill w-6 h-6' alt="referrer"
                        title={referrer} /> : <>Others</>
                      }
                        {userLevel == 2 &&
                          <div className='ml-1'>{renderPctg(Number(((stats[k]["referer_stat"][referrer] / statCounts[k].referrer)).toFixed(2)) * 100)}</div>
                        }
                      </div> :
                      <div className='flex justify-center'>
                        -
                      </div>
                    }
                  </>
                ))}
              </td>
              <td className="px-6 py-4">
                <button type="button" onClick={() => { deleteURL(k) }}
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}
