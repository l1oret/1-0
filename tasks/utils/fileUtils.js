import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const createFile = (filename, content) => {
  const file = process.env.APP_ROOT + filename;

  fs.writeFile(file, content, function (err) {
    let ok = true;

    if (err) {
      ok = false;
      console.error(`Error! ${file}`, err);
    } else {
      console.info(`Saved! ${file}`);
    }

    return ok;
  });
};

const readFile = (filename, encoding = 'utf8') =>
  fs.readFileSync(process.env.APP_ROOT + filename, encoding);

export default { createFile, readFile };
