import process from 'process';
import * as a from 'ansis';


export default class WInfo {
  public status? : number;
  public body? : string;
  /* ------------------------------------------------------------------------------------------ */
  constructor(
    public readonly method: string,
    public readonly path: string,
    public readonly start_time: bigint,
    public readonly stamp: string,
    public showPostBody: boolean = false,
    public steps: string[],
  ) {}
  /* ------------------------------------------------------------------------------------------ */
  toString(): string {
    const record = [
      this.stamp + ' |',
      this.method,
      this.path,
      `- ${this.status}`,
      this.formatElapsedTime(),
    ];

    return record.join(' ');
  }
  /* ------------------------------------------------------------------------------------------ */
  formatElapsedTime(): string {
    const diff = process.hrtime.bigint() - this.start_time;
    const seconds = Number(diff) / 1e9;
    const milliseconds = Number(diff) / 1e6;
    const microseconds = Number(diff) / 1e3;

    return seconds >= 1
      ? `(${seconds.toFixed(2)} s)`
      : milliseconds >= 1
        ? `(${milliseconds.toFixed(2)} ms)`
        : microseconds >= 1
          ? `(${microseconds.toFixed(2)} µs)`
          : `(${diff} ns)`
    ;
  }
  /* ------------------------------------------------------------------------------------------ */
  getLog() {
    const message = this.toString();
    const family =  this.status === undefined || this.status >= 600 ? 0 : Math.floor(this.status/100);
    const colors = [
      a.gray,                   // Unknown
      a.yellow,                 // Informational (1xx)
      a.hex('#00ff7f'),   // Success (2xx)
      a.hex('#55ffff'),   // Redirection (3xx)
      a.hex('#ffaa00'),   // Client Error (4xx)
      a.hex('#ff2a35'),   // Server Error (5xx)
    ];
    const mycolor = colors[family]!;

    return `${mycolor.open}${message}${mycolor.close} ${a.gray `${this.body ?? ''}`}`;
  }
}