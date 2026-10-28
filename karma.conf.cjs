// Configuración de Karma: el "ejecutor" que corre las pruebas de Jasmine.
//  - Jasmine  -> escribe las pruebas (describe / it / expect / spyOn)
//  - Karma    -> las ejecuta y muestra los resultados
//  - esbuild  -> compila TypeScript/React para que Karma pueda cargarlo
//  - jsdom    -> navegador simulado (para correr sin abrir Chrome)
//  - karma-coverage -> informe de cobertura de código
const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const { createInstrumenter } = require("istanbul-lib-instrument");

// Plugin que marca cada línea del código fuente (src/) para medir cobertura.
// Las pruebas (src/pruebas) no se instrumentan: solo se mide el código de la app.
const instrumenter = createInstrumenter({ esModules: true, produceSourceMap: false });
const pluginCobertura = {
  name: "cobertura",
  setup(build) {
    build.onLoad({ filter: /src[\\/].*\.(ts|tsx)$/ }, async (args) => {
      const codigo = await fs.promises.readFile(args.path, "utf8");
      const esPrueba = args.path.includes(`${path.sep}pruebas${path.sep}`);
      const { code } = await esbuild.transform(codigo, {
        loader: args.path.endsWith("x") ? "tsx" : "ts",
        jsx: "automatic",
        sourcefile: args.path,
      });
      return {
        contents: esPrueba ? code : instrumenter.instrumentSync(code, args.path),
        loader: "js",
      };
    });
  },
};

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    plugins: [
      require("karma-jasmine"),
      require("karma-esbuild"),
      require("karma-jsdom-launcher"),
      require("karma-coverage"),
      require("karma-spec-reporter"),
    ],
    files: [
      { pattern: "src/pruebas/setup.ts", watched: false },
      { pattern: "src/pruebas/**/*.test.@(ts|tsx)", watched: false },
      // Todo el código de la app se carga también, para que la cobertura incluya
      // los archivos que ninguna prueba toca (aparecen con 0 %, sin esconderlos).
      { pattern: "src/**/*.@(ts|tsx)", watched: false, included: true },
    ],
    exclude: ["src/main.tsx", "src/**/*.d.ts"],
    preprocessors: {
      "src/**/*.@(ts|tsx)": ["esbuild"],
    },
    esbuild: {
      jsx: "automatic",
      target: "es2020",
      define: { "process.env.NODE_ENV": '"test"' },
      plugins: [pluginCobertura],
    },
    client: { jasmine: { random: false } }, // orden fijo para resultados repetibles
    reporters: ["spec", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }, { type: "text", file: "texto.txt", subdir: "." }, { type: "lcovonly", subdir: "." }],
    },
    // Por defecto corre en jsdom (no necesita Chrome). Para ver el navegador real: npm run test:chrome
    browsers: ["jsdom"],
    customLaunchers: {
      ChromeSinCabeza: { base: "ChromeHeadless", flags: ["--no-sandbox"] },
    },
    singleRun: true,
    restartOnFileChange: false,
  });
};
