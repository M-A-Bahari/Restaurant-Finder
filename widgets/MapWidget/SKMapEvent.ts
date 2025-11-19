import { SKEvent } from "../../simplekit/src/events";
export class SKMapEvent extends SKEvent {
  constructor(
    type: string,
    timeStamp: number,
    public x: number,
    public y: number,
    source?: object,
    public data?: {} | undefined,
  ) {
    super(type, timeStamp, source);
  }
}