import {QueryResult} from "mysql2";

export const checkQueryResult = (results: QueryResult) => {
    return Array.isArray(results) && results.length === 0
}