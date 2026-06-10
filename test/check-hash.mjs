import fs from 'fs';
import bcrypt from 'bcryptjs';

const config = fs.readFileSync('app/config.php', 'utf8');
const hashMatch = config.match(/define\('ADMIN_PASS_HASH',\s*'([^']+)'\)/);
if (hashMatch) {
  const hash = hashMatch[1].replace(/\$2b\$/, '$2y$');
  console.log('ADMIN_PASS_HASH:', hash);
  console.log('Mis@el2012 -> hash:', bcrypt.compareSync('Mis@el2012', hash));
}
