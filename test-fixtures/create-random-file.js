import fs from 'node:fs/promises'

const createRandomFile = async (filePath, size=10) => {
    const content = generateRandomContent(size);
    return await fs.writeFile(filePath, content);
};

const generateRandomContent = (size) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let content = '';
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        content += characters.charAt(randomIndex);
    }
    return content;
};

export default createRandomFile;
