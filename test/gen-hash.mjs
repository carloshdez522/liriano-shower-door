import bcrypt from 'bcryptjs';
const h1 = bcrypt.hashSync('liriano', 12).replace('$2b$', '$2y$');
const h2 = bcrypt.hashSync('admin', 12).replace('$2b$', '$2y$');
console.log('liriano hash:', h1);
console.log('admin hash:', h2);
console.log('liriano verify:', bcrypt.compareSync('liriano', h1));
console.log('admin verify:', bcrypt.compareSync('admin', h2));
