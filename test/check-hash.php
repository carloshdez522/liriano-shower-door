<?php
$hash = '$2b$12$VNSz1CWyVMVsFm22pOM5XugJ1BsLTfXhBi22ZokU8KWeMMo0MYDmC';
echo "Test liriano hash: " . (password_verify('liriano', $hash) ? 'MATCH' : 'NO_MATCH') . "\n";

$hash2 = '$2b$12$Ccw3U.myTR5FLTBiZYkjlOAO8r0tTQCYk1l2jZQ02pGxmLiX/cKGy';
echo "Test admin hash: " . (password_verify('admin', $hash2) ? 'MATCH' : 'NO_MATCH') . "\n";

$hash3 = '$2y$10$/onSqMNakTgiAKCmqyaTgezcnnXM/7xHDcSjF.xobdDlJM5oIiAhi';
echo "Test liriano pass: " . (password_verify('Mis@el2012', $hash3) ? 'MATCH' : 'NO_MATCH') . "\n";

$hash4 = '$2y$12$5fLr9HtpJm0ZI20iMInQH.Dn3sxkyrqxjWY.Rad8n45ZB3quQzmuG';
echo "Test admin pass (Portraittree): " . (password_verify('Portraittree', $hash4) ? 'MATCH' : 'NO_MATCH') . "\n";
