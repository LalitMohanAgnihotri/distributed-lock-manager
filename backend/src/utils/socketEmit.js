import { io } from '../server.js';

export function emitUpdate(event, payload = {}) {
  if (io) io.emit(event, payload);
}