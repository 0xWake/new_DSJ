import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default defineConfig([
  // 忽略文件夹
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // 所有 JS / Vue 文件通用规则
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      prettier
    },
    rules: {
      // Prettier 格式化规则
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // 单引号
          semi: false, // 无分号
          printWidth: 80, // 每行最大长度
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      'vue/no-setup-props-destructure': 'off',
      'no-undef': 'error'
    }
  },

  // 官方推荐规则
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // 关闭 ESLint 与 Prettier 冲突的规则
  prettierConfig
])
