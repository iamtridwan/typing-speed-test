import data from './data.json';



export function getData(level: string) {
    const levelData = (data as any)[level.toLowerCase()];
    const randomIndex = Math.floor(Math.random() * levelData.length);
    return levelData[randomIndex]['text']
}