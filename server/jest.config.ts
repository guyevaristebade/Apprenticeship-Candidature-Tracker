export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"], // Les fichiers de test doivent se trouver dans __tests__/ et avoir l'extension .test.ts
  moduleFileExtensions: ["ts", "js"],
  rootDir: "./",
  moduleDirectories: ["node_modules", "src"], // Pour simplifier les imports
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
