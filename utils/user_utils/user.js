
const User = require('../../user/user');

const updateUser = async (searchParam, propertyToUpdate) => {
    try {
        const user = await User.findOneAndUpdate(
            searchParam,
            { $set: propertyToUpdate },
            { upsert: true, new: true }
        ).lean().exec();
        if (user) return { updated: true, user };
        return { updated: false };
    } catch {
        return { updated: false };
    }
}


const findUser = async (searchParam) => {
    try {
        const user = await User.findOne(
            searchParam
        ).lean().exec();
        if (user) return { found: true, user };
        return { found: false };
    } catch {
        return { found: false };
    }
}



module.exports = {
    updateUser,
    findUser
}