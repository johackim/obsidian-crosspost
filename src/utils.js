import fs from 'fs';
import os from 'os';
import https from 'https';

export const downloadFile = async (url, dest) => new Promise((resolve) => {
    const folder = dest || `${os.tmpdir()}/${process.env.npm_package_name}`;
    fs.mkdirSync(folder, { recursive: true });

    const fileName = url.split('/').pop();
    const file = fs.createWriteStream(`${folder}/${fileName}`);

    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            resolve(`${folder}/${fileName}`);
        });
    });
});
