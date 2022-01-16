import crypto from 'crypto';
import SHA256 from "crypto-js/sha256"
import publicIp from 'public-ip';

/*
X-Hashcash: 1:20:YYMMDD[hhmm[ss]]:IPADDRESS::McMybZIhxKXu57jd:ckvi
ver:bits:date:resource:ext:rand:counter
The header contains:
ver: Hashcash 형식 버전, 1(버전 0 대체).
bits: 해시된 코드의 "부분 사전 이미지"(0) 비트 수입니다. 여기서 우리는 5 HEX에 해당하는 20비트를 사용하고 있습니다.
date: 메시지가 전송된 시간(YYMMDD[hhmm[ss]] 형식).
resource: 전송 중인 리소스 데이터 문자열(예: IP 주소 또는 이메일 주소).
ext: 확장자(선택 사항, 버전 1에서는 무시됨).
rand: base-64 형식으로 인코딩된 임의의 문자 문자열입니다.
nounce: base-64 형식으로 인코딩된 이진 카운터.
*/

function generateRandomString(size) {
    let longString = '';
    for (let i = 0; i < size; i += 1) {
        longString += Math.random().toString(18).substr(2, 1);
    }
    return SHA256(longString).toString();
}

export const parse = (decoded) => {
    const [version, bits, date, ip, opts, str, nonce] = decoded.split(':');
    return { version, bits, date, ip, opts, str, nonce }
}

// bits = version * 4 to simplify - this logic should be the same at the backend or the hash will be invalid.
export const generate = async (version = 0, bits = version * 4, complexity = 100) => {
    const ip = await publicIp.v4();
    let decodedhash = `${version}:${bits}::${ip}:::`;
    if (version === 0) return { decodedhash };
    const rand = generateRandomString(complexity);
    let nonce = 0;
    const prefix = Array(bits / 4).fill(0).join('');
    const startDate = Date.now();
    let hash = '';
    do {
        decodedhash = `${version}:${bits}:${startDate}:${ip}::${rand}:${nonce}`;
        hash = crypto.createHash('sha1').update(decodedhash).digest('hex');
        nonce += 1;
    } while (hash.substr(0, bits / 4) !== prefix)

    const endDate = Date.now();

    return { decodedhash, timespent: (endDate - startDate) / 1000 };
}
