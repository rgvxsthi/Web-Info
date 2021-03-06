var mongoose = require('mongoose');
var User = mongoose.model('users');
var Product = mongoose.model('products');
var Order = mongoose.model('orders');
var express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());


/* For all the user's operation */
// Create new user
var createUser = function(req, res) {
    var user = new User({
        "name":req.body.User.name,
        "firstName":req.body.User.firstName,
        "lastName":req.body.User.lastName,
        "email":req.body.User.email,
        "password":req.body.User.password,
        "phoneNumber":req.body.User.phoneNumber,
        "streetAddress": req.body.User.streetAddress,
        "userRating": 0,
        "numOrders": 0,
        "Scores": 0
    });
    
    user.save(function(err, newUser) {
        if (!err) {
            res.send(newUser);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all users
var findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (!err) {
            res.send(users);
        } else {
            res.sendStatus(404);
        }
    });
};
 
// Find one user by id
var findOneUser = function(req, res) {
    var userInx = req.params.id;
    User.findById(userInx, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};
 
//Find one user by name
var findUserByName = function(req, res) {
    var userName = req.params.name;
    User.findOne({name:userName}, function(err, user) {
        if (!err) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    });
};

//Update user's data by name
//Can't change the name, otherwise, it won't be able to find it
var updateUserByName = function(req, res) {
    var userName = req.params.name;
    User.findOne({name:userName}, function(err, user) {
        if (err) {
            res.sendStatus(404);
        }
        
        user.createdAt = req.body.createdAt;
        user.userId = req.body.userId;
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phoneNumber = req.body.phoneNumber;
        user.userRating = req.body.userRating;
        user.streetAddress.text = req.body.streetAddress.text;
        user.streetAddress.components = req.body.streetAddress.components;

        user.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(user);
        });
    });

};

//Update user's data by id
var updateUserById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.sendStatus(404);
        }
       
        user.createdAt = req.body.createdAt;
        user.userId = req.body.userId;
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.phoneNumber = req.body.phoneNumber;
        user.userRating = req.body.userRating;
        user.streetAddress.text = req.body.streetAddress.text;
        user.streetAddress.components = req.body.streetAddress.components;
        user.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(user);
        });
    });
};

//Update the user's rating based on the user's id
var updateRatingById = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.sendStatus(404);
        }
        user.numOrders = user.numOrders + 1;
        user.Scores = user.Scores + req.params.userRating;
        user.userRating = (user.Scores / user.numOrders);
        
        user.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(user);
        });
    });
};

//Delete user by id
var deleteUserById = function(req, res) {
    var userId = req.params.id;
    User.findByIdAndRemove(userId, function(err, user) {
        if (!err) {
            res.send("delete user");
        } else {
            res.status(404).send(err);
        }
   });
};


module.exports.createUser = createUser;
module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.findUserByName = findUserByName;
module.exports.updateUserById = updateUserById;
module.exports.updateUserByName = updateUserByName;
module.exports.deleteUserById = deleteUserById;
module.exports.updateRatingById = updateRatingById;
/* User's operations end here */
/******************************/

/***************************************/
/* For all the products operation */
// Create new product
var createProduct = function(req, res) {
    var product = new Product(
        {
            "userId":req.body.Product.userId,
            "receiverName": req.body.Product.receiverName,
            "phoneNumber": req.body.Product.phoneNumber,
            "createdAt":req.body.Product.createdAt,
            "name":req.body.Product.name,
            "description":req.body.Product.description,
            "expirationDate":req.body.Product.expirationDate,
            "category":req.body.Product.category,
            "condition":req.body.Product.condition,
            "rating":req.body.Product.rating,
            "marker":req.body.Product.marker,
            "address":req.body.Product.address,
            "delivered":false
        }
    );

    product.save(function(err, newProduct) {
        if (!err) {
            res.send(newProduct);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all products
var findAllProducts = function(req, res) {
    Product.find(function(err, products) {
        if (!err) {
            res.send(products);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find one product by id
var findOneProduct = function(req, res) {
    var restInx = req.params.id;
    Product.findById(restInx, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};
 
//Find one product by name
var findProductByName = function(req, res) {
    var restName = req.params.name;
    Product.find({name:restName}, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};


//Update product's data by name
var updateProductByName = function(req, res) {
    var restName = req.params.name;
    Product.findOne({name:restName}, function(err, product) {
        if (err) {
            res.sendStatus(404);
        }        
        product.receiverName = req.body.receiverName;
        product.createdAt = req.body.createdAt;
        product.name = req.body.name;
        product.description = req.body.description;
        product.expirationDate = req.body.expirationDate;
        product.category = req.body.category;
        product.condition = req.body.condition;
        product.rating = req.body.rating;
        product.delivered = req.body.delivered;
        product.phoneNumber = req.body.phoneNumber;

        product.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(product);
        });
    });


};

//Update product's data by id
var updateProductById = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.sendStatus(404);
        }
        product.userId = req.body.userId;
        product.receiverName = req.body.receiverName;
        product.createdAt = req.body.createdAt;
        product.name = req.body.name;
        product.description = req.body.description;
        product.expirationDate = req.body.expirationDate;
        product.category = req.body.category;
        product.condition = req.body.condition;
        product.rating = req.body.rating;
        product.delivered = req.body.delivered;
        product.phoneNumber = req.body.phoneNumber;
        product.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(product);
        });
    });

};

//Delete restaurant by id
var deleteProductById = function(req, res) {
    var restId = req.params.id;
    Product.findByIdAndRemove(restId, function(err, product) {
        if (!err) {
            res.send("delete product");
        } else {
            res.sendStatus(404);
        }
    });
};

//Find one product by category
var findProductByCategory = function(req, res) {
    var productCategory = req.params.category;
    Product.find({category:productCategory}, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};

//Find one product by a specific userId
var findProductByUserId = function(req, res) {
    var productUserId = req.params.userId;
    Product.find({userId:productUserId}, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find product from the receiver's name
var findOrderByReceiverId = function(req, res) {
    var productUserId = req.params.receiverId;
    Product.find({receiverName:productUserId}, function(err, product) {
        if (!err) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
};

//Update product's deliver status by product id and update the receiver
var changeProductStatusById = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.sendStatus(404);
        }
        product.delivered = req.body.delivered;
        product.receiverName = req.body.receiverName;
        product.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(product);
        });
    });
};

//Set product receiver 
var setProductRecieverById = function(req, res) {
    Product.findById(req.params.id, function(err, product) {
        if (err) {
            res.sendStatus(404);
        }
        //chnage receiver name
        product.receiverName = req.body.receiverName;
        product.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(product);
        });
    });
};

module.exports.createProduct = createProduct;
module.exports.findAllProducts = findAllProducts;
module.exports.findOneProduct = findOneProduct;
module.exports.findProductByName = findProductByName;
module.exports.updateProductById = updateProductById;
module.exports.updateProductByName = updateProductByName;
module.exports.deleteProductById = deleteProductById;
module.exports.findProductByCategory = findProductByCategory;
module.exports.findProductByUserId = findProductByUserId;
module.exports.changeProductStatusById = changeProductStatusById;
module.exports.findOrderByReceiverId = findOrderByReceiverId;
module.exports.setProductRecieverById = setProductRecieverById;
/* Product's operations end here */
/************************************/

/***************************************/
/* For all the orders operation */
// Create new Order
var createOrder = function(req, res) {
    var order = new Order(
        {
            "orderId":req.body.orderId,
            "supplierId":req.body.supplierId,
            "recieverId":req.body.recieverId,
            "createdAt":req.body.createdAt,
            "supRating":req.body.supRating,
            "recRating":req.body.recRating,
            "productId":req.body.productId 
        }
    );

    order.save(function(err, newOrder) {
        if (!err) {
            res.send(newOrder);
        } else {
            res.sendStatus(400);
        }
    });
};
 
// Find all products
var findAllOrders = function(req, res) {
    Order.find(function(err, orders) {
        if (!err) {
            res.send(orders);
        } else {
            res.sendStatus(404);
        }
    });
};

// Find one order by id
var findOneOrder = function(req, res) {
    var restInx = req.params.id;
    Order.findById(restInx, function(err, order) {
        if (!err) {
            res.send(order);
        } else {
            res.sendStatus(404);
        }
    });
};

//Update orders data by id
var updateOrderById = function(req, res) {
    Order.findById(req.params.id, function(err, order) {
        if (err) {
            res.sendStatus(404);
        }
        order.supplierId = req.body.supplierId,
        order.recieverId = req.body.recieverId,
        order.createdAt = req.body.createdAt,
        order.supRating = req.body.supRating,
        order.recRating = req.body.recRating,
        order.productId = req.body.productId 

        order.save(function(err) {
            if (err)
                res.sendStatus(404);

            res.send(order);
        });
    });

};

//Delete order by id
var deleteOrderById = function(req, res) {
    var restId = req.params.id;
    Order.findByIdAndRemove(restId, function(err, order) {
        if (!err) {
            res.send("delete order");
        } else {
            res.sendStatus(404);
        }
    });
};


module.exports.createOrder = createOrder;
module.exports.findAllOrders = findAllOrders;
module.exports.findOneOrder = findOneOrder;
module.exports.updateOrderById = updateOrderById;
module.exports.deleteOrderById = deleteOrderById;

/* Restaurant's operations end here */
/************************************/

