import process from 'process';
import Elysia from "elysia";

import WInfo from './WInfo';
import type { TJMap } from '../types-common';


// function printContext(context: any) {
//   const rrr = JSON.stringify(
//     context, 
//     (key,value) => typeof value === 'bigint' ? value.toString() : value
//   );
//   console.log(rrr);
// }

const wlogger = (showBody: boolean = false, showLog: boolean = true) => new Elysia()
  .onRequest((context) => {
    context.store = { 
      ...context.store, 
      _info: new WInfo(
        context.request.method,
        new URL(context.request.url).pathname,
        process.hrtime.bigint(),
        new Date().toISOString(),
        showBody,
        ['onRequest'],
      ),
    }
  })
  .onBeforeHandle(context => {
    const info = (context.store as TJMap)['_info'] as WInfo;
    info.steps.push('onBeforeHandle');
    if (info.method === 'POST' && context.body && info.showPostBody) {
      info.body = ' 🚨 ' + JSON.stringify(context.body);
    }
  })
  .onAfterHandle(context => {
    const info = (context.store as TJMap)['_info'] as WInfo;
    info.steps.push('onAfterHandle');
    info.status = ((context as TJMap)['response'] as TJMap)['status'] as number;
  })
  // .onError(context => {
  //   const info = (context.store as TJMap)['_info'] as WInfo;
  //   if (Object.keys(context.error).find(e => e === 'status') !== undefined) {
  //     info.status = (context.error as TJMap)['status'] as number;
  //     console.log(info.getLog());
  //   }
  // })
  .onError(({store}) => {
    const info = (store as TJMap)['_info'] as WInfo;
    info.steps.push('onError');
  })
  .onResponse((context) => {
    const info = (context.store as TJMap)['_info'] as WInfo;
    info.steps.push('onResponse');
    // printContext(context);

    info.status = info.status ?? ((context as TJMap)['set'] as TJMap)['status'] as number;
    if (showLog) console.log(info.getLog());
  })
;

export default wlogger;