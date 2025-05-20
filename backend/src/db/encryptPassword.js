const crypto = require('crypto');

const password = process.argv[2];
if (!password) {
  console.error('Usage: node encryptPassword.js <password>');
  process.exit(1);
}

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(password, 'utf8', 'base64');
encrypted += cipher.final('base64');

// 복호화 테스트 (특수문자 포함 여부 확인)
try {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  console.log('[LOG] 원본 비밀번호:', password);
  console.log('[LOG] 암호화(base64):', encrypted);
  console.log('[LOG] 복호화 결과:', decrypted);
  if (password === decrypted) {
    console.log('[LOG] 복호화 성공: 원본과 일치합니다.');
  } else {
    console.error('[LOG] 복호화 실패: 원본과 일치하지 않습니다.');
  }
} catch (err) {
  console.error('[LOG] 복호화 중 오류:', err.message);
}

console.log('ENCRYPTION_KEY=' + key.toString('base64'));
console.log('IV=' + iv.toString('base64'));
console.log('DB_PASSWORD_ENC=' + encrypted);
