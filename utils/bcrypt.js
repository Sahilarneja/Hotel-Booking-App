const bcrypt = require('bcrypt');

const encryptPassword = {
    hashPwd(originalPwd) {
        const hashedPwd = bcrypt.hashSync(originalPwd, 10);
        return hashedPwd;
    },
    matchPwd(originalPwd, hashedPwd) {
        const matchedOrNot = bcrypt.compareSync(originalPwd, hashedPwd);
        return matchedOrNot;
    }
};

module.exports = encryptPassword;
