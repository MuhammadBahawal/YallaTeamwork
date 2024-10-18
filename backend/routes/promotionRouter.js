const router = require('express').Router();
const promotionController = require('../controllers/promotionController/promotionController.js');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Create a new promotion (coupon or referral)
router.post('/promotion/create', promotionController.create_promotion);

// Get promotion details by ID
router.get('/promotion/:id', promotionController.get_promotion_by_id);

// Update promotion by ID
router.put('/promotion/:id', promotionController.update_promotion_by_id);

// Update promotion by productby customer id and prodct id 
router.put('/promotion/update/:customerId/:productId', promotionController.increment_total_Sold_By_customer_id_and_product_id);

// Delete promotion by ID
router.delete('/promotion/:id', promotionController.delete_promotion);

// Add sales information to a promotion
router.post('/promotion/sales', promotionController.add_sales_to_promotion);

// Get all promotions for a specific user
router.get('/promotion/user/:userId', promotionController.get_promotions_by_user);

module.exports = router;
