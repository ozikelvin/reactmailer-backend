const crypto = require('crypto');
const Coupon = require('../../coupon/coupon');

const updateCoupon = async (searchParam, propertyToUpdate) => {
    try {
        const coupon = await Coupon.findOneAndUpdate(
            searchParam,
            { $set: propertyToUpdate },
            { upsert: true, new: true }
        ).lean().exec();

        if (coupon) return { updated: true, coupon };
        return { updated: false };
    } catch {
        return { updated: false };
    }
}


const findCoupon = async (searchParam) => {
    try {
        const coupon = await Coupon.findOne(
            searchParam
        ).lean().exec();


        console.log(coupon);
        if (coupon) return { foundCoupon: true, couponFound: coupon };
        return { foundCoupon: false };
    } catch {
        return { foundCoupon: false };
    }
}


const getAllCoupons = async () => {
    try {
        const coupons = await Coupon.find({}).lean().exec();
        if (coupons) return { found: true, coupons };
        return { found: false };
    } catch {
        return { found: false };
    }
}




const createCoupon = async (coupon) => {
    try {
        const newCoupon = await Coupon.create(coupon);
        if (newCoupon) return { created: true, newCoupon };
        return { created: false };
    } catch {
        return { found: false };
    }
}

const deleteCoupon = async (searchParam) => {
    try {
        const err = await Coupon.deleteOne(searchParam);
        if (err) return { deleted: false };
        return { deleted: true };
    } catch {
        return { deleted: false };
    }
}



const generateRandomCoupon = (length) => {
    const OTP = crypto.randomBytes(64).toString("hex").substr(0, length);
    return OTP;
}

module.exports = {
    updateCoupon,
    findCoupon,
    getAllCoupons,
    createCoupon,
    generateRandomCoupon,
    deleteCoupon
}