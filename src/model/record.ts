import BigTableCell from "./db"


export interface Record {
    info: {
        longURL: Array<BigTableCell>
        level: Array<BigTableCell>
    },
    country_stat: {
        [key: string]: Array<BigTableCell>
    },
    referer_stat: {
        [key: string]: Array<BigTableCell>
    }
    refer?: boolean // Indicate if we need to redirect to refer page first
}

export interface Stat {
    [key: string]: number
}

