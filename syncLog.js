import { writeFileSync } from 'fs';
import { format } from 'util';

export default function debug(...args) {
  writeFileSync(1, `${format(...args)}\n`, { flag: 'a' });
}
