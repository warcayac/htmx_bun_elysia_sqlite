import { app } from "../../src/index.tsx";
import { TJMap } from "../../src/@warcayac/types-common/types";


const SERVER_URL = `${app.server?.hostname}:${app.server?.port}`

export const http = {
  get: async (path: string) : Promise<Response> => {
    const req = new Request(
      `${SERVER_URL}${path}`
    );
    return app.fetch(req);
  },

  post: async (path: string, body: TJMap) : Promise<Response> => {
    const req = new Request(
      `${SERVER_URL}${path}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    return app.fetch(req);
  },

  delete: async (path: string) : Promise<Response> => {
    const req = new Request(
      `${SERVER_URL}${path}`, 
      { method: 'DELETE' },
    );
    return app.fetch(req);
  },

  patch: async (path: string, body: TJMap) : Promise<Response> => {
    const req = new Request(
      `${SERVER_URL}${path}`, 
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
    return app.fetch(req);
  },
};
