/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {tsconfig: {module: "CommonJS"}}]
    },
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: ["ts", "js"],
}