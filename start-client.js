const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'workflow', shell: true };
require('child_process').spawn('npm', args, opts);