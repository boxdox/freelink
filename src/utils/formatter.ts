import { format, Options } from 'prettier'

const defaultOptions: Options = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  printWidth: 80,
  quoteProps: 'as-needed',
  semi: false,
  tabWidth: 2,
  useTabs: false,
}

type IFormatter = (
  content: string,
  options?: Options,
  parser?: Options['parser']
) => string

export const formatter: IFormatter = (
  content,
  options = defaultOptions,
  parser = 'html'
) => {
  let opts = { ...defaultOptions, ...options, parser }
  return format(content, opts)
}
