const fs = require('fs')
const path = require('path')
const filePath = path.resolve('./', '新文件.txt')
const videoPath = path.resolve('../资料', '印欧语系发展史.mp4')

const process = require('process')

// fs.rename(filePath, './新文件.txt', err => {
//     if (err) { console.log('失败')
//     return }
//     console.log('成功');
// })

// fs.rename(filePath,'../资料/data.txt',err=>{})
fs.unlink(filePath,err=>{})
fs.rm(filePath,err=>{})