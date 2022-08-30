import { utils, writeFile } from 'xlsx'
import { accDiv } from './mathUtils'

export function getFileSuffix(filename: string) {
  const index = filename.lastIndexOf('.')
  if (index < 0) return ''
  return filename.slice(index, filename.length)
}

export function getFileNameWithoutSubffix(filename: string) {
  const index = filename.lastIndexOf('.')
  if (index < 0) return filename
  return filename.slice(0, index)
}

export function formatFileSize(size: number) {
  let formatStr = ''
  const _b = 1024
  const _kb = 1048576 // 1024 * 1024
  // const _b = 1000
  // const _kb = 1000000
  if (size < _b) {
    formatStr = `${size}B`
  } else if (size < _kb) {
    const kb = Math.ceil(accDiv(size, _b))
    formatStr = `${kb}KB`
  } else {
    const mb = accDiv(size, _kb).toFixed(2)
    formatStr = `${mb}MB`
  }
  return formatStr
}

export function exportSheetFile(sheetData: unknown[][], filename: string) {
  const ws = utils.aoa_to_sheet(sheetData)
  const wb = utils.book_new()
  // 设置自动宽度
  const colWidth = sheetData.map((row) =>
    row.map((val) => {
      if (val == null) return { wch: 10 }
      else if ((val as string).toString().charCodeAt(0) > 255) {
        return {
          wch: (val as string).toString().length * 2 + 5
        }
      } else {
        return {
          wch: (val as string).toString().length + 5
        }
      }
    })
  )
  const result = colWidth[0]
  for (let i = 1; i < colWidth.length; i++) {
    for (let j = 0; j < colWidth[i].length; j++) {
      if (result[j]['wch'] < colWidth[i][j]['wch']) {
        result[j]['wch'] = colWidth[i][j]['wch']
      }
    }
  }
  ws['!cols'] = result
  // 设置自动宽度end
  utils.book_append_sheet(wb, ws, 'sheet')
  writeFile(wb, `${filename}.xlsx`)
}
