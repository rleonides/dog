const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: '../client', shell: true };

const obj = require('child_process').spawn('npm', args, opts);
