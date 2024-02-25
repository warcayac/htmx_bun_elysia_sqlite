import Elysia from "elysia";
import { errorMsg } from "../const-elysia";


export default function errorHandler() {
  return new Elysia()
    .onError(({error, set}) => {
      const filtered = error.toString().replace(/[\n\r\t]/g, '');
      const regex = /(?<=^|[\w\"]+\:\s+)[^\:]+(?=\s+[\w\"]+\:|$)/;
      const matches = filtered.match(regex);
      const err = matches?.[0].trim() ?? '';
      let msg : string;

      if (err.length === 0) {
        msg = 'UNKNOWN'
      } else {
        if (err[0] === '{') {
          msg = (error as any)['validator']['schema']['error'] ?? 'UNDEFINED'
        } else {
          msg = err;
          if (err === errorMsg.INTERNAL_ERROR) set.status = 500;
        }
      }

      return {
        message: msg,
        code: set.status ?? 'UNIDENTIFIED',
      };
    });
}