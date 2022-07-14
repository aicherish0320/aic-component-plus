import { series, parallel, task, src, dest } from 'gulp'
import ts from 'gulp-typescript'
import { buildConfig } from './utils/config'
import path from 'path'
import { outDir, projectRoot } from './utils/paths'
import { withTaskName } from './utils'

export const buildPackages = (dirname: string, name: string) => {
  const tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(dirname, config.output.name)
    return series(
      withTaskName(`build: ${dirname}`, () => {
        const tsConfig = path.resolve(projectRoot, 'tsconfig.json')
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules']

        return src(inputs)
          .pipe(
            ts.createProject(tsConfig, {
              declaration: true,
              strict: false,
              module: config.module
            })()
          )
          .pipe(dest(output))
      }),
      withTaskName(`copy: ${dirname}`, () => {
        return src(`${output}/**`).pipe(
          dest(path.resolve(outDir, config.output.name, name))
        )
      })
    )
  })

  return parallel(...tasks)
}
