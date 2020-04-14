class Shell {
  static exec(commands, onStdout, onStderr) {
    return new Promise((resolve, reject) => {
      const exec = require('child_process').exec;
      const child = exec(commands);
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', onStdout);
      child.stderr.on('data', onStderr);
      child.on('close', (code) => {
        if (code > 0) {
          reject(code)
        } else {
          resolve(code)
        }
      });
    })
  }
}
module.exports = Shell
