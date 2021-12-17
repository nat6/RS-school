interface IResponse {
  json(): unknown;
  body: unknown;
  bodyUsed: boolean;
  headers: unknown;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}
export default IResponse;
