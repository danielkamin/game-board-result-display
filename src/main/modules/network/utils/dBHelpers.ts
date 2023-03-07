const percentageFromDB = (db: string) => 2 * (parseFloat(db) + 100);

const dBFromPercentage = (quality: string) => parseFloat(quality) / 2 - 100;

export { percentageFromDB, dBFromPercentage };
