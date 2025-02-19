// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.9_@types+node@20.4.7_sass@1.66.1/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT")
      realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/plugins.ts
import { resolve } from "path";
import { VitePWA } from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pwa@0.16.5_vite@4.4.9_workbox-build@7.0.0_workbox-window@7.0.0/node_modules/vite-plugin-pwa/dist/index.js";
import { visualizer } from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/rollup-plugin-visualizer@5.9.2_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createHtmlPlugin } from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/vite-plugin-html@3.2.0_vite@4.4.9/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vue from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.3.4_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue-jsx@3.0.2_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import eslintPlugin from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.49.0_vite@4.4.9/node_modules/vite-plugin-eslint/dist/index.mjs";
import viteCompression from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.4.9/node_modules/vite-plugin-compression/dist/index.mjs";
import vueSetupExtend from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.0/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var createVitePlugins = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true })
  ];
};
var createCompression = (viteEnv) => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};
var createVitePwa = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};

// package.json
var package_default = {
  name: "geeker-admin",
  private: true,
  version: "1.2.0",
  type: "module",
  description: "geeker-admin open source management system",
  author: {
    name: "Geeker",
    email: "848130454@qq.com",
    url: "https://github.com/HalseySpicy"
  },
  license: "MIT",
  homepage: "https://github.com/HalseySpicy/Geeker-Admin",
  repository: {
    type: "git",
    url: "git@github.com:HalseySpicy/Geeker-Admin.git"
  },
  bugs: {
    url: "https://github.com/HalseySpicy/Geeker-Admin/issues"
  },
  scripts: {
    dev: "vite",
    serve: "vite",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "npm run build:dev && vite preview",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}"',
    "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged",
    prepare: "husky install",
    release: "standard-version",
    commit: "git add -A && czg && git push"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.1.0",
    "@kjgl77/datav-vue3": "^1.7.1",
    "@vueuse/core": "^10.4.1",
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^5.1.12",
    axios: "^1.5.0",
    dayjs: "^1.11.9",
    "driver.js": "^1.3.0",
    echarts: "^5.4.3",
    "echarts-gl": "^2.0.8",
    "echarts-liquidfill": "^3.1.0",
    "element-plus": "^2.3.4",
    "js-base64": "^3.7.5",
    md5: "^2.3.0",
    mitt: "^3.0.1",
    nprogress: "^0.2.0",
    pinia: "^2.1.6",
    "pinia-plugin-persistedstate": "^3.2.0",
    "print-js": "^1.6.0",
    qs: "^6.11.2",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.0",
    vue: "^3.3.4",
    "vue-i18n": "^9.4.0",
    "vue-router": "^4.2.4",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@commitlint/cli": "^17.7.1",
    "@commitlint/config-conventional": "^17.7.0",
    "@types/md5": "^2.3.2",
    "@types/nprogress": "^0.2.0",
    "@types/qs": "^6.9.8",
    "@types/sortablejs": "^1.15.2",
    "@typescript-eslint/eslint-plugin": "^6.7.0",
    "@typescript-eslint/parser": "^6.7.0",
    "@vitejs/plugin-vue": "^4.3.4",
    "@vitejs/plugin-vue-jsx": "^3.0.2",
    autoprefixer: "^10.4.15",
    "cz-git": "^1.7.1",
    czg: "^1.7.1",
    eslint: "^8.49.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-vue": "^9.17.0",
    husky: "^8.0.3",
    postcss: "^8.4.29",
    "postcss-html": "^1.5.0",
    prettier: "^3.0.3",
    "rollup-plugin-visualizer": "^5.9.2",
    sass: "^1.66.1",
    "standard-version": "^9.5.0",
    stylelint: "^15.10.3",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^4.3.0",
    "stylelint-config-recommended-scss": "^13.0.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^34.0.0",
    "stylelint-config-standard-scss": "^11.0.0",
    typescript: "^5.1.6",
    "unplugin-vue-setup-extend-plus": "^1.0.0",
    vite: "^4.4.9",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-pwa": "^0.16.5",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-tsc": "^1.8.11"
  },
  engines: {
    node: ">=16.0.0"
  },
  browserslist: {
    production: [
      "> 1%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite.config.ts
import dayjs from "file:///D:/Projects/overseaprojectinfomationsystem/node_modules/.pnpm/dayjs@1.11.9/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "D:\\Projects\\overseaprojectinfomationsystem";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcb3ZlcnNlYXByb2plY3RpbmZvbWF0aW9uc3lzdGVtXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxvdmVyc2VhcHJvamVjdGluZm9tYXRpb25zeXN0ZW1cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL292ZXJzZWFwcm9qZWN0aW5mb21hdGlvbnN5c3RlbS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gXCIuL2J1aWxkL2dldEVudlwiO1xuaW1wb3J0IHsgY3JlYXRlUHJveHkgfSBmcm9tIFwiLi9idWlsZC9wcm94eVwiO1xuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMgfSBmcm9tIFwiLi9idWlsZC9wbHVnaW5zXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuXG5jb25zdCB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0gPSBwa2c7XG5jb25zdCBfX0FQUF9JTkZPX18gPSB7XG4gIHBrZzogeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9LFxuICBsYXN0QnVpbGRUaW1lOiBkYXlqcygpLmZvcm1hdChcIllZWVktTU0tREQgSEg6bW06c3NcIilcbn07XG5cbi8vIEBzZWU6IGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcbiAgY29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcm9vdCk7XG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudik7XG4gIHJldHVybiB7XG4gICAgYmFzZTogdml0ZUVudi5WSVRFX1BVQkxJQ19QQVRILFxuICAgIHJvb3QsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICBcInZ1ZS1pMThuXCI6IFwidnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanNcIlxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXylcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyLnNjc3NcIjtgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgICBwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCxcbiAgICAgIG9wZW46IHZpdGVFbnYuVklURV9PUEVOLFxuICAgICAgY29yczogdHJ1ZSxcbiAgICAgIC8vIExvYWQgcHJveHkgY29uZmlndXJhdGlvbiBmcm9tIC5lbnYuZGV2ZWxvcG1lbnRcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eSh2aXRlRW52LlZJVEVfUFJPWFkpXG4gICAgfSxcbiAgICBwbHVnaW5zOiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52KSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBwdXJlOiB2aXRlRW52LlZJVEVfRFJPUF9DT05TT0xFID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICAgIG1pbmlmeTogXCJlc2J1aWxkXCIsXG4gICAgICAvLyBlc2J1aWxkIFx1NjI1M1x1NTMwNVx1NjZGNFx1NUZFQlx1RkYwQ1x1NEY0Nlx1NjYyRlx1NEUwRFx1ODBGRFx1NTNCQlx1OTY2NCBjb25zb2xlLmxvZ1x1RkYwQ3RlcnNlclx1NjI1M1x1NTMwNVx1NjE2Mlx1RkYwQ1x1NEY0Nlx1ODBGRFx1NTNCQlx1OTY2NCBjb25zb2xlLmxvZ1xuICAgICAgLy8gbWluaWZ5OiBcInRlcnNlclwiLFxuICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xuICAgICAgLy8gXHRjb21wcmVzczoge1xuICAgICAgLy8gXHRcdGRyb3BfY29uc29sZTogdml0ZUVudi5WSVRFX0RST1BfQ09OU09MRSxcbiAgICAgIC8vIFx0XHRkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICAvLyBcdH1cbiAgICAgIC8vIH0sXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgLy8gXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHVGRjBDXHU1M0VGXHU3NTY1XHU1RkFFXHU1MUNGXHU1QzExXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0XG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICAvLyBcdTg5QzRcdTVCOUFcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmsgXHU1OTI3XHU1QzBGXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFN0YXRpYyByZXNvdXJjZSBjbGFzc2lmaWNhdGlvbiBhbmQgcGFja2FnaW5nXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxvdmVyc2VhcHJvamVjdGluZm9tYXRpb25zeXN0ZW1cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RzXFxcXG92ZXJzZWFwcm9qZWN0aW5mb21hdGlvbnN5c3RlbVxcXFxidWlsZFxcXFxnZXRFbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL292ZXJzZWFwcm9qZWN0aW5mb21hdGlvbnN5c3RlbS9idWlsZC9nZXRFbnYudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Rlc3RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09IFwidGVzdFwiO1xufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gZ2VuZXJhdGUgcGFja2FnZSBwcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcG9ydE1vZGUoKTogYm9vbGVhbiB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5WSVRFX1JFUE9SVCA9PT0gXCJ0cnVlXCI7XG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcbiAgY29uc3QgcmV0OiBhbnkgPSB7fTtcblxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcbiAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpO1xuICAgIHJlYWxOYW1lID0gcmVhbE5hbWUgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHJlYWxOYW1lID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHJlYWxOYW1lO1xuICAgIGlmIChlbnZOYW1lID09PSBcIlZJVEVfUE9SVFwiKSByZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XG4gICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QUk9YWVwiKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZWFsTmFtZSA9IEpTT04ucGFyc2UocmVhbE5hbWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgfVxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogR2V0IHVzZXIgcm9vdCBkaXJlY3RvcnlcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290UGF0aCguLi5kaXI6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcb3ZlcnNlYXByb2plY3RpbmZvbWF0aW9uc3lzdGVtXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxvdmVyc2VhcHJvamVjdGluZm9tYXRpb25zeXN0ZW1cXFxcYnVpbGRcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL292ZXJzZWFwcm9qZWN0aW5mb21hdGlvbnN5c3RlbS9idWlsZC9wcm94eS50c1wiO2ltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSBcInZpdGVcIjtcblxudHlwZSBQcm94eUl0ZW0gPSBbc3RyaW5nLCBzdHJpbmddO1xuXG50eXBlIFByb3h5TGlzdCA9IFByb3h5SXRlbVtdO1xuXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz47XG5cbi8qKlxuICogXHU1MjFCXHU1RUZBXHU0RUUzXHU3NDA2XHVGRjBDXHU3NTI4XHU0RThFXHU4OUUzXHU2NzkwIC5lbnYuZGV2ZWxvcG1lbnQgXHU0RUUzXHU3NDA2XHU5MTREXHU3RjZFXG4gKiBAcGFyYW0gbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcbiAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fTtcbiAgZm9yIChjb25zdCBbcHJlZml4LCB0YXJnZXRdIG9mIGxpc3QpIHtcbiAgICBjb25zdCBodHRwc1JFID0gL15odHRwczpcXC9cXC8vO1xuICAgIGNvbnN0IGlzSHR0cHMgPSBodHRwc1JFLnRlc3QodGFyZ2V0KTtcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9odHRwLXBhcnR5L25vZGUtaHR0cC1wcm94eSNvcHRpb25zXG4gICAgcmV0W3ByZWZpeF0gPSB7XG4gICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHdzOiB0cnVlLFxuICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCBcIlwiKSxcbiAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXG4gICAgICAuLi4oaXNIdHRwcyA/IHsgc2VjdXJlOiBmYWxzZSB9IDoge30pXG4gICAgfTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxvdmVyc2VhcHJvamVjdGluZm9tYXRpb25zeXN0ZW1cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFByb2plY3RzXFxcXG92ZXJzZWFwcm9qZWN0aW5mb21hdGlvbnN5c3RlbVxcXFxidWlsZFxcXFxwbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Qcm9qZWN0cy9vdmVyc2VhcHJvamVjdGluZm9tYXRpb25zeXN0ZW0vYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1odG1sXCI7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gXCJ1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXMvdml0ZVwiO1xuXG4vKipcbiAqIFx1NTIxQlx1NUVGQSB2aXRlIFx1NjNEMlx1NEVGNlxuICogQHBhcmFtIHZpdGVFbnZcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVZpdGVQbHVnaW5zID0gKHZpdGVFbnY6IFZpdGVFbnYpOiAoUGx1Z2luT3B0aW9uIHwgUGx1Z2luT3B0aW9uW10pW10gPT4ge1xuICBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUsIFZJVEVfUkVQT1JULCBWSVRFX1BXQSB9ID0gdml0ZUVudjtcbiAgcmV0dXJuIFtcbiAgICB2dWUoKSxcbiAgICAvLyB2dWUgXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IGpzeC90c3ggXHU4QkVEXHU2Q0Q1XG4gICAgdnVlSnN4KCksXG4gICAgLy8gZXNMaW50IFx1NjJBNVx1OTUxOVx1NEZFMVx1NjA2Rlx1NjYzRVx1NzkzQVx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NzU0Q1x1OTc2Mlx1NEUwQVxuICAgIGVzbGludFBsdWdpbigpLFxuICAgIC8vIG5hbWUgXHU1M0VGXHU0RUU1XHU1MTk5XHU1NzI4IHNjcmlwdCBcdTY4MDdcdTdCN0VcdTRFMEFcbiAgICB2dWVTZXR1cEV4dGVuZCh7fSksXG4gICAgLy8gXHU1MjFCXHU1RUZBXHU2MjUzXHU1MzA1XHU1MzhCXHU3RjI5XHU5MTREXHU3RjZFXG4gICAgY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiksXG4gICAgLy8gXHU2Q0U4XHU1MTY1XHU1M0Q4XHU5MUNGXHU1MjMwIGh0bWwgXHU2NTg3XHU0RUY2XG4gICAgY3JlYXRlSHRtbFBsdWdpbih7XG4gICAgICBpbmplY3Q6IHtcbiAgICAgICAgZGF0YTogeyB0aXRsZTogVklURV9HTE9CX0FQUF9USVRMRSB9XG4gICAgICB9XG4gICAgfSksXG4gICAgLy8gXHU0RjdGXHU3NTI4IHN2ZyBcdTU2RkVcdTY4MDdcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcbiAgICAgIHN5bWJvbElkOiBcImljb24tW2Rpcl0tW25hbWVdXCJcbiAgICB9KSxcbiAgICAvLyB2aXRlUFdBXG4gICAgVklURV9QV0EgJiYgY3JlYXRlVml0ZVB3YSh2aXRlRW52KSxcbiAgICAvLyBcdTY2MkZcdTU0MjZcdTc1MUZcdTYyMTBcdTUzMDVcdTk4ODRcdTg5QzhcdUZGMENcdTUyMDZcdTY3OTBcdTRGOURcdThENTZcdTUzMDVcdTU5MjdcdTVDMEZcdTUwNUFcdTRGMThcdTUzMTZcdTU5MDRcdTc0MDZcbiAgICBWSVRFX1JFUE9SVCAmJiAodmlzdWFsaXplcih7IGZpbGVuYW1lOiBcInN0YXRzLmh0bWxcIiwgZ3ppcFNpemU6IHRydWUsIGJyb3RsaVNpemU6IHRydWUgfSkgYXMgUGx1Z2luT3B0aW9uKVxuICBdO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gXHU2ODM5XHU2MzZFIGNvbXByZXNzIFx1OTE0RFx1N0Y2RVx1RkYwQ1x1NzUxRlx1NjIxMFx1NEUwRFx1NTQwQ1x1NzY4NFx1NTM4Qlx1N0YyOVx1ODlDNFx1NTIxOVxuICogQHBhcmFtIHZpdGVFbnZcbiAqL1xuY29uc3QgY3JlYXRlQ29tcHJlc3Npb24gPSAodml0ZUVudjogVml0ZUVudik6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdID0+IHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTID0gXCJub25lXCIsIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIH0gPSB2aXRlRW52O1xuICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KFwiLFwiKTtcbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXTtcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImd6aXBcIikpIHtcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICBleHQ6IFwiLmd6XCIsXG4gICAgICAgIGFsZ29yaXRobTogXCJnemlwXCIsXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImJyb3RsaVwiKSkge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICAgIGV4dDogXCIuYnJcIixcbiAgICAgICAgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIsXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHBsdWdpbnM7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBWaXRlUHdhXG4gKiBAcGFyYW0gdml0ZUVudlxuICovXG5jb25zdCBjcmVhdGVWaXRlUHdhID0gKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSA9PiB7XG4gIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSB9ID0gdml0ZUVudjtcbiAgcmV0dXJuIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXG4gICAgICBzaG9ydF9uYW1lOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxuICAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiLFxuICAgICAgaWNvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogXCIvbG9nby5wbmdcIixcbiAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBcIi9sb2dvLnBuZ1wiLFxuICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IFwiL2xvZ28ucG5nXCIsXG4gICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9KTtcbn07XG4iLCAie1xuICBcIm5hbWVcIjogXCJnZWVrZXItYWRtaW5cIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwidmVyc2lvblwiOiBcIjEuMi4wXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiZ2Vla2VyLWFkbWluIG9wZW4gc291cmNlIG1hbmFnZW1lbnQgc3lzdGVtXCIsXG4gIFwiYXV0aG9yXCI6IHtcbiAgICBcIm5hbWVcIjogXCJHZWVrZXJcIixcbiAgICBcImVtYWlsXCI6IFwiODQ4MTMwNDU0QHFxLmNvbVwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hhbHNleVNwaWN5XCJcbiAgfSxcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSGFsc2V5U3BpY3kvR2Vla2VyLUFkbWluXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJnaXRAZ2l0aHViLmNvbTpIYWxzZXlTcGljeS9HZWVrZXItQWRtaW4uZ2l0XCJcbiAgfSxcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9IYWxzZXlTcGljeS9HZWVrZXItQWRtaW4vaXNzdWVzXCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICBcInNlcnZlXCI6IFwidml0ZVwiLFxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBkZXZlbG9wbWVudFwiLFxuICAgIFwiYnVpbGQ6dGVzdFwiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgdGVzdFwiLFxuICAgIFwiYnVpbGQ6cHJvXCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBwcm9kdWN0aW9uXCIsXG4gICAgXCJ0eXBlOmNoZWNrXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAtLXNraXBMaWJDaGVja1wiLFxuICAgIFwicHJldmlld1wiOiBcIm5wbSBydW4gYnVpbGQ6ZGV2ICYmIHZpdGUgcHJldmlld1wiLFxuICAgIFwibGludDplc2xpbnRcIjogXCJlc2xpbnQgLS1maXggLS1leHQgLmpzLC50cywudnVlIC4vc3JjXCIsXG4gICAgXCJsaW50OnByZXR0aWVyXCI6IFwicHJldHRpZXIgLS13cml0ZSBcXFwic3JjLyoqLyoue2pzLHRzLGpzb24sdHN4LGNzcyxsZXNzLHNjc3MsdnVlLGh0bWwsbWR9XFxcIlwiLFxuICAgIFwibGludDpzdHlsZWxpbnRcIjogXCJzdHlsZWxpbnQgLS1jYWNoZSAtLWZpeCBcXFwiKiovKi57dnVlLGxlc3MscG9zdGNzcyxjc3Msc2Nzc31cXFwiIC0tY2FjaGUgLS1jYWNoZS1sb2NhdGlvbiBub2RlX21vZHVsZXMvLmNhY2hlL3N0eWxlbGludC9cIixcbiAgICBcImxpbnQ6bGludC1zdGFnZWRcIjogXCJsaW50LXN0YWdlZFwiLFxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5IGluc3RhbGxcIixcbiAgICBcInJlbGVhc2VcIjogXCJzdGFuZGFyZC12ZXJzaW9uXCIsXG4gICAgXCJjb21taXRcIjogXCJnaXQgYWRkIC1BICYmIGN6ZyAmJiBnaXQgcHVzaFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCI6IFwiXjIuMS4wXCIsXG4gICAgXCJAa2pnbDc3L2RhdGF2LXZ1ZTNcIjogXCJeMS43LjFcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC40LjFcIixcbiAgICBcIkB3YW5nZWRpdG9yL2VkaXRvclwiOiBcIl41LjEuMjNcIixcbiAgICBcIkB3YW5nZWRpdG9yL2VkaXRvci1mb3ItdnVlXCI6IFwiXjUuMS4xMlwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS41LjBcIixcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuOVwiLFxuICAgIFwiZHJpdmVyLmpzXCI6IFwiXjEuMy4wXCIsXG4gICAgXCJlY2hhcnRzXCI6IFwiXjUuNC4zXCIsXG4gICAgXCJlY2hhcnRzLWdsXCI6IFwiXjIuMC44XCIsXG4gICAgXCJlY2hhcnRzLWxpcXVpZGZpbGxcIjogXCJeMy4xLjBcIixcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjMuNFwiLFxuICAgIFwianMtYmFzZTY0XCI6IFwiXjMuNy41XCIsXG4gICAgXCJtZDVcIjogXCJeMi4zLjBcIixcbiAgICBcIm1pdHRcIjogXCJeMy4wLjFcIixcbiAgICBcIm5wcm9ncmVzc1wiOiBcIl4wLjIuMFwiLFxuICAgIFwicGluaWFcIjogXCJeMi4xLjZcIixcbiAgICBcInBpbmlhLXBsdWdpbi1wZXJzaXN0ZWRzdGF0ZVwiOiBcIl4zLjIuMFwiLFxuICAgIFwicHJpbnQtanNcIjogXCJeMS42LjBcIixcbiAgICBcInFzXCI6IFwiXjYuMTEuMlwiLFxuICAgIFwic2NyZWVuZnVsbFwiOiBcIl42LjAuMlwiLFxuICAgIFwic29ydGFibGVqc1wiOiBcIl4xLjE1LjBcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjMuNFwiLFxuICAgIFwidnVlLWkxOG5cIjogXCJeOS40LjBcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4yLjRcIixcbiAgICBcInZ1ZWRyYWdnYWJsZVwiOiBcIl40LjEuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xNy43LjFcIixcbiAgICBcIkBjb21taXRsaW50L2NvbmZpZy1jb252ZW50aW9uYWxcIjogXCJeMTcuNy4wXCIsXG4gICAgXCJAdHlwZXMvbWQ1XCI6IFwiXjIuMy4yXCIsXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJAdHlwZXMvcXNcIjogXCJeNi45LjhcIixcbiAgICBcIkB0eXBlcy9zb3J0YWJsZWpzXCI6IFwiXjEuMTUuMlwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNi43LjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNi43LjBcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl40LjMuNFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiOiBcIl4zLjAuMlwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTVcIixcbiAgICBcImN6LWdpdFwiOiBcIl4xLjcuMVwiLFxuICAgIFwiY3pnXCI6IFwiXjEuNy4xXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC40OS4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMC4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXZ1ZVwiOiBcIl45LjE3LjBcIixcbiAgICBcImh1c2t5XCI6IFwiXjguMC4zXCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yOVwiLFxuICAgIFwicG9zdGNzcy1odG1sXCI6IFwiXjEuNS4wXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjAuM1wiLFxuICAgIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI6IFwiXjUuOS4yXCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNjYuMVwiLFxuICAgIFwic3RhbmRhcmQtdmVyc2lvblwiOiBcIl45LjUuMFwiLFxuICAgIFwic3R5bGVsaW50XCI6IFwiXjE1LjEwLjNcIixcbiAgICBcInN0eWxlbGludC1jb25maWctaHRtbFwiOiBcIl4xLjEuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1yZWNlc3Mtb3JkZXJcIjogXCJeNC4zLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtc2Nzc1wiOiBcIl4xMy4wLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtdnVlXCI6IFwiXjEuNS4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXN0YW5kYXJkXCI6IFwiXjM0LjAuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZC1zY3NzXCI6IFwiXjExLjAuMFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjEuNlwiLFxuICAgIFwidW5wbHVnaW4tdnVlLXNldHVwLWV4dGVuZC1wbHVzXCI6IFwiXjEuMC4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC45XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiOiBcIl4wLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tZXNsaW50XCI6IFwiXjEuOC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1odG1sXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1wd2FcIjogXCJeMC4xNi41XCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjogXCJeMi4wLjFcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMS44LjExXCJcbiAgfSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTE2LjAuMFwiXG4gIH0sXG4gIFwiYnJvd3NlcnNsaXN0XCI6IHtcbiAgICBcInByb2R1Y3Rpb25cIjogW1xuICAgICAgXCI+IDElXCIsXG4gICAgICBcIm5vdCBkZWFkXCIsXG4gICAgICBcIm5vdCBvcF9taW5pIGFsbFwiXG4gICAgXSxcbiAgICBcImRldmVsb3BtZW50XCI6IFtcbiAgICAgIFwibGFzdCAxIGNocm9tZSB2ZXJzaW9uXCIsXG4gICAgICBcImxhc3QgMSBmaXJlZm94IHZlcnNpb25cIixcbiAgICAgIFwibGFzdCAxIHNhZmFyaSB2ZXJzaW9uXCJcbiAgICBdXG4gIH0sXG4gIFwiY29uZmlnXCI6IHtcbiAgICBcImNvbW1pdGl6ZW5cIjoge1xuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXG4gICAgfVxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNULFNBQVMsY0FBYyxlQUFzQztBQUNuWCxTQUFTLFdBQUFBLGdCQUFlOzs7QUNxQmpCLFNBQVMsV0FBVyxTQUE4QjtBQUN2RCxRQUFNLE1BQVcsQ0FBQztBQUVsQixhQUFXLFdBQVcsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUMxQyxRQUFJLFdBQVcsUUFBUSxPQUFPLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDcEQsZUFBVyxhQUFhLFNBQVMsT0FBTyxhQUFhLFVBQVUsUUFBUTtBQUN2RSxRQUFJLFlB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
