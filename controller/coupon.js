const { createCoupon, generateRandomCoupon, deleteCoupon } = require("../utils/coupon_utils/coupon");


const createACoupon = async (req, res, next) => {
    const COUPON = generateRandomCoupon(8);
    const newCouponToSend = {
        code: COUPON.toString()
    }
    const { created, newCoupon } = await createCoupon(newCouponToSend);
    if (!created) return res.status(404).json({ Message: 'Something went wrong', success: false });
    res.status(200).json({ Message: 'Coupon created Successfully', success: true, newCoupon });
}


const deleteACoupon = async(req, res, next) => {
    const { couponID } = req.body;
    const { deleted } = await deleteCoupon({ _id: couponID });
    if (!deleted) return res.status(404).json({ Message: 'Something went wrong', success: false });
    res.status(200).json({ Message: 'Coupon deleted', success: true });

}


module.exports = {
    createACoupon,
    deleteACoupon
} 
