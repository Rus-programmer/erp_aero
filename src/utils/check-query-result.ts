import {QueryResult} from "mysql2";

export const isQueryResultEmpty = (results: QueryResult) => {
    return Array.isArray(results) && results.length === 0
}