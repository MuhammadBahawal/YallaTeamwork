const promotionModel = require('../../models/promotion.js');
const { responseReturn } = require('../../utiles/response.js')
const {
    mongo: { ObjectId }
} = require('mongoose');

class PromotionController {

    // Add a new promotion (referral or coupon)
    create_promotion = async (req, res) => {
        const { customer, productId, link, type } = req.body;

        try {

            if (type === 'referral code') {
                const existingReferral = await promotionModel.findOne({ customer, type: 'referral code' });

                if (existingReferral) {
                    return responseReturn(res, 400, { error: 'A referral code already exists for this user.' });
                }
            }
            else if (type == "coupon code") {
                // Only include productId in the query if it's valid
                const query = {
                    customer,
                    ...(productId ? { product: productId } : {})  // Include product only if it's not empty
                };
                // Check if a similar promotion already exists for the user and product (if product exists)
                const promotion = await promotionModel.findOne(query);

                if (promotion) {
                    return responseReturn(res, 404, { error: 'Promotion already exists' });
                }
            }

            // Create a new promotion (product is optional)
            const newPromotion = await promotionModel.create({
                customer,
                product: productId || null,  // Set product to null if productId is not provided
                link,
                type,
            });

            responseReturn(res, 201, {
                message: 'Promotion created successfully',
                promotion: newPromotion
            });

        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    };


    // Get promotion details by ID
    get_promotion_by_id = async (req, res) => {
        const { id } = req.params;
        try {
            const promotion = await promotionModel.findById(id)
                .populate('customer')
                .populate('product');

            if (!promotion) {
                return responseReturn(res, 404, { error: 'Promotion not found' });
            }

            responseReturn(res, 200, { promotion });

        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    }

    // Update promotion by ID
    update_promotion_by_id = async (req, res) => {
        const { id } = req.params;
        try {
            const updatedPromotion = await promotionModel.findByIdAndUpdate(id, req.body, { new: true });

            if (!updatedPromotion) {
                return responseReturn(res, 404, { error: 'Promotion not found' });
            }

            responseReturn(res, 200, { message: 'Promotion updated successfully', promotion: updatedPromotion });

        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    }

    increment_total_Sold_By_customer_id_and_product_id = async (req, res) => {
        const { customerId, productId } = req.params; // Expect customerId and productId in params
        const { price, quantity } = req.body; // Expect price and quantity in the request body
    
        try {
           
            // Find the promotion by customer ID and product ID
            const updatedPromotion = await promotionModel.findOneAndUpdate(
                { customer: customerId, product: productId }, // Match by both customerId and productId
                { 
                    $inc: { 
                        total_sold: quantity, // Increment total_sold by the quantity passed in the request body
                        total_earning: price * quantity // Increment total_earning by price * quantity
                    } 
                },
                { new: true } // Return the updated document
            );
    
            // Check if the promotion was found and updated
            if (!updatedPromotion) {
                return res.status(404).json({ error: 'Promotion not found for this customer and product' });
            }
    
            // Return the updated promotion
            res.status(200).json({
                message: 'Total sold and earning updated successfully',
                promotion: updatedPromotion,
            });
    
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Server error' });
        }
    };
    
    

    // Delete promotion by ID
    delete_promotion = async (req, res) => {
        const { id } = req.params;
        try {
            const promotion = await promotionModel.findByIdAndDelete(id);

            if (!promotion) {
                return responseReturn(res, 404, { error: 'Promotion not found' });
            }

            responseReturn(res, 200, { message: 'Promotion deleted successfully', promotionId: id });

        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    }

    // Add sales information to promotion
    add_sales_to_promotion = async (req, res) => {
        const { promotionId, customerId, quantity } = req.body;
        try {
            const promotion = await promotionModel.findById(promotionId);

            if (!promotion) {
                return responseReturn(res, 404, { error: 'Promotion not found' });
            }

            promotion.sales.push({
                customerid: customerId,
                quantity,
                date: new Date(),
            });

            await promotion.save();

            responseReturn(res, 200, { message: 'Sales information added successfully', promotion });

        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    }

    // Get all promotions by user ID
    get_promotions_by_user = async (req, res) => {
        const { userId } = req.params;

        try {
            // Fetch promotions for the user and populate the product details (name, slug, price)
            const promotions = await promotionModel.find({ customer: userId })
                .populate({
                    path: 'product',    // Reference to the product field
                    select: 'name slug price',  // Only select specific fields from the product
                    model: 'products'  // Explicitly reference the 'products' collection
                });

            if (!promotions.length) {
                return responseReturn(res, 404, { error: 'No promotions found for this user' });
            }

            responseReturn(res, 200, { promotions });

        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Server error' });
        }
    }

}

module.exports = new PromotionController();
