import fs from 'fs';
import path from 'path';
import deleteDirectoryWithFiles from "./delete-directory-and-files.js"
import getScriptPath from "./get-script-path.js"
import { randomBytes } from 'crypto';
const names = [
    'Persian',
    'Siamese',
    'Maine Coon',
    'Ragdoll',
    'Sphynx',
    'Bengal',
    'Abyssinian',
    'British Shorthair',
    'Scottish Fold',
    'Burmese',
    'Oriental',
    'Siberian',
    'Tonkinese',
    'Russian Blue',
    'Norwegian Forest',
    'кошки',
    'பூனைகள்',
    '✨🌀🌈🐱‍👤🐱‍🚀🐱‍🐉🐱‍💻👾🎃🕺💃🎉🎲🎸🚀🌠🌌🔮💎🎭🎨🖖🌀✨',
]
const getRandomNames = (num = 1) => {
    let nameArr = [];
    for (let i = 0; i < num; i++) {
        nameArr.push(names[Math.floor(Math.random() * names.length)]);
    }
    return nameArr.join(' ');
};

async function generateRandomString(bytes) {
    return new Promise((resolve, reject) => {
      randomBytes(bytes, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer.toString('hex'));
        }
      });
    });
  }

export async function createTestDirectoryWithFiles(dirPath, numberOfFiles=20) {
    if (!dirPath) {
        dirPath = await getScriptPath();
    }
    await deleteDirectoryWithFiles(dirPath);
    // Create directory
    await fs.promises.mkdir(dirPath);
    
    let arr = Array.from({ length: numberOfFiles }, (_, i) => i);
    
 
    for await (let i of arr) {
        const num = Math.floor(Math.random() * 5) + 1;
        let ext = '.txt';
        if (i === 0) {
            ext = '.md';
        }

        let filePath = path.join(dirPath, `${getRandomNames(num)}${ext}`);
        await fs.promises.writeFile(filePath, await generateRandomString(1000));
        arr[i] = filePath;
        
    }
   return arr;
}
