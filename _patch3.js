const fs = require('fs');
let nav = fs.readFileSync('components/navbar.vue', 'utf8');
const target = "            autoLoadData() {\n                let user = sessionStorage.getItem('user');";
if (nav.includes(target)) {
  nav = nav.replace(target, replacement);
  fs.writeFileSync('components/navbar.vue', nav);
  console.log('patched OK');
} else {
  console.log('target not found');
}
console.log('guard:', nav.includes('if (!process.client) return;'));
