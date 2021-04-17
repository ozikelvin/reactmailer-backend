const { createCoupon, generateRandomCoupon, deleteCoupon } = require("../utils/coupon_utils/coupon");


const createACoupon = (req, res, next) => {
    const COUPON = generateRandomCoupon(8);
    const newCoupon = {
        code: COUPON.toString()
    }
    const { created, newCoupon } = await createCoupon(newCoupon);
    if (!created) return res.status(404).json({ Message: 'Something went wrong', success: false });
    res.status(200).json({ Message: 'Coupon created', success: true, newCoupon });
}


const deleteACoupon = (req, res, next) => {
    const { couponID } = req.body;
    const { deleted } = await deleteCoupon({ _id: couponID });
    if (!deleted) return res.status(404).json({ Message: 'Something went wrong', success: false });
    res.status(200).json({ Message: 'Coupon deleted', success: true });

}


module.exports = {
    createACoupon,
    deleteACoupon
}