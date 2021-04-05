module.exports={
    roots:["<rootDir>/src"],
      transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
    globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  setupFilesAfterEnv: [
    "@testing-library/react/cleanup-after-each",
    "@testing-library/jest-dom/extend-expect"
  ],
   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
}