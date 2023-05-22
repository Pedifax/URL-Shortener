import BigTableCell from "./db";

export interface UserDecoded {
    name: string;
    picture: string;
    email: string;
}

export interface User {
    profile: {
        username: Array<BigTableCell>
        image:  Array<BigTableCell>
        level:  Array<BigTableCell>
    },
    url: {
        [key: string]: Array<BigTableCell>
    }
}
