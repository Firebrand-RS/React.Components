import { Config, QueryParams } from './types';

export abstract class ApiClient {
  private apiKey: string;
  private basePath: string;

  constructor({ apiKey, basePath }: Config) {
    this.apiKey = apiKey;
    this.basePath = basePath;
  }

  protected request<T>(
    resourse: string,
    queryParams?: QueryParams
  ): Promise<T> {
    const apiQueryParam = {
      api_key: this.apiKey,
    };
    const queryString = new URLSearchParams(
      Object.assign(apiQueryParam, queryParams)
    );

    const url = this.basePath + resourse + '?' + queryString.toString();
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json() as T;
        }
        throw new Error(`Request error [code: ${response.statusText}]`);
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
