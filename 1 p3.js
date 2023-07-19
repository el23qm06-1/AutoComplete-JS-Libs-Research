import fs from 'fs'

let baseDir = process.argv[1].split('/').slice(0, 3).join('/') + '/Src'
function proceessDir(dir=baseDir){
  dir[dir.length - 1] != '/' && (dir = dir + '/')

  let f = fs.readdirSync(dir).map(f => ({name: f, path: dir + f, stat: fs.statSync(dir + f)}))

  f.map(f => {
    if(f.stat.isDirectory()){
      if(f.name == '.git'){
        fs.renameSync(f.path, f.path + '_')
        return
      }
      proceessDir(f.path)
    }
  })
}

proceessDir()