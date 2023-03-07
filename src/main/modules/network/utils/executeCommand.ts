import { execFile } from 'child_process';
import env from '../env';

export default ({
  cmd,
  args,
}: {
  cmd: string;
  args: readonly string[] | null;
}) =>
  new Promise((resolve, reject) => {
    execFile(cmd, args, { env }, (error, output) => {
      if (error) {
        reject(error);
      } else {
        resolve(output);
      }
    });
  });
