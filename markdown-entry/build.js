import fs from 'fs';

// 读取needUpdate.txt文件
fs.readFile('needUpdate.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error('Failed to read needUpdate.txt:', err);
    return;
  }

  // 获取每一行文件名
  const fileNames = data.trim().split('\n');

  // 删除needUpdate.txt文件
  fs.unlink('needUpdate.txt', err => {
    if (err) {
      console.error('Failed to delete needUpdate.txt:', err);
      return;
    }
    
    console.log('Deleted needUpdate.txt');
  });
  
  // 处理每个文件
  fileNames.forEach(fileName => {
    // 读取原文件内容
    fs.readFile(fileName, 'utf-8', (err, fileContent) => {
      if (err) {
        console.error(`Failed to read ${fileName}:`, err);
        return;
      }

      // 写入输出文件
      const outputFileName = fileName + '.html';
      fs.writeFile(outputFileName, fileContent, 'utf-8', err => {
        if (err) {
          console.error(`Failed to write ${outputFileName}:`, err);
          return;
        }
        
        console.log(`Generated ${outputFileName}`);
      });
    });
  });
});
