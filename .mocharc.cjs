module.exports = {
  require: ["test/configure.ts"],
  spec: ["test"],
  recursive: true,
  clearScreen: true,
  parallel: true,
  maxWorkers: 1,
  extension: ["ts"],
};
