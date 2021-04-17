
const User = require('../../user/user');

const updateUser = async (searchParam, propertyToUpdate) => {
    try {
        const user = await User.findOneAndUpdate(
            searchParam,
            { $set: propertyToUpdate },
            { upsert: true, new: true }
        ).lean().exec();
        console.log(user);
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

const getAllUsers = async () => {
    try {
        const user = await User.find({}).select('name email registrationMonth').lean().exec();
        if (user) return { foundUsers: true, users };
        return { foundUsers: false };
    } catch {
        return { foundUsers: false };
    }
}


const deleteUser = async (searchParam) => {
    try {
        const err = await User.deleteOne(searchParam);
        if (err) return { deleted: false };
        return { deleted: true };
    } catch {
        return { deleted: false };
    }
}

module.exports = {
    updateUser,
    findUser,
    getAllUsers,
    deleteUser
}