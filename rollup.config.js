import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import postcss from 'rollup-plugin-postcss';
import { eslint } from "rollup-plugin-eslint";
import { uglify } from "rollup-plugin-uglify";

const env = process.env.NODE_ENV;

const config = {
  input: "src/index.jsx",
  output: {
    format: "umd",
    name: "rollup-react-package-starter",
    file: "dist/index.js",
    exports: "named",
    globals: {
        react: 'React'
    }
  },

  plugins: [
    nodeResolve(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    commonjs(),
    eslint({
      include: "./src"
    }),
    postcss({
      modules: true,
      use: ['less']
    })
  ],
  external: ["react", "react-dom"]
};

if (env === "production") {
  config.plugins.push(uglify());
}

export default config;