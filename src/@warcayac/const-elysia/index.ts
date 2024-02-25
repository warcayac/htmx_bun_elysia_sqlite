import { error, t } from "elysia";

import { TJMap } from "../types-common";


export const contentType = {
  JSON : { "Content-Type": "application/json" },
  HTML : { "Content-Type": "text/html" },
  TEXT : { "Content-Type": "text/plain" },
}

export function jsonResponse(message: string, code: number = 200, other?: TJMap) {
  return Response.json({message, status: code, ...other}, {status: code});
}

export const httpResponse = {
  200 : (other?: TJMap) => jsonResponse('Success', 200, other),
  400 : (message?: string) => jsonResponse(message ?? 'Bad Request', 400),
  404 : (message?: string) => jsonResponse(message ?? 'Not Found', 404),
  OK : (other?: TJMap) => jsonResponse('Success', 200, other),
  SUCCESS: (code?: number, other?: TJMap) => jsonResponse('Success', code ?? 200, other),
  NOT_FOUND : (message?: string) => jsonResponse(message ?? 'Not Found', 404),
  BAD_REQUEST : (message?: string) => jsonResponse(message ?? 'Bad Request', 400),
  UNKNOWN : () => jsonResponse('Unknown', 500), // Internal Server Error
  INTERNAL_ERROR : () => jsonResponse('Internal Error', 500),
  CLIENT_ERROR: (code?: number, message?: string) => jsonResponse(message ?? 'Bad Request', code ?? 400),
}

export const errorMsg = {
  BODY_MALFORMATTED : 'Body malformatted or missing property',
  INTERNAL_ERROR : 'Internal Error',
  ACCESS_DENIED : 'Access Denied',
  UNKNOWN_ERROR : 'Unknown Error',
  PROPERTY_MISSING : 'Property missing or unmet requirements',
  INVALID_TOKEN : 'Invalid or expired token',
}

const getMissingMsg = (name: string) => `${name} missing or malformatted`;

export const patterns = {
  objectId: /^[A-Za-z0-9]{24}$/.source,
  jwtBearer: /^Bearer\s([A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)$/.source,
}

// elementos que pueden emplearse para componer un parser
export const parserItems = {
  objectId: { 
    id: t.String({ pattern: patterns.objectId, error: getMissingMsg('Id') }) 
  },
  bearerAuth: { 
    authorization: t.String({ pattern: patterns.jwtBearer, error: getMissingMsg('Auth token') }) 
  },
}

// usado por los handlers de peticiones
export const parsers = {
  paramObjectId: {
    params: t.Object(parserItems.objectId)
  },
  headerBearerAuth: {
    headers: t.Object(parserItems.bearerAuth)
  },
}
