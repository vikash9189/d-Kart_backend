let property = {
    // mongoURI: 'mongodb://localhost:27017/d-Kart',
    getMongoose: require('mongoose'),
    // port: 5001,
    getFast2Sms: require('fast-two-sms'),
    // authorizationKey: "RFnv5gIrvuZSJRhvvkxvvYgbxQ42minWkTnYrIYM9ebm2dQQIHIqne1GLYVD",
    bcrypt: require('bcrypt'),
    // saltRound: 15,
    jwt: require('jsonwebtoken'),
    // jwtSecret: "Vi13ka05sh2000"

}

let signUpSchema = {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    contactNumber:
    {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        unique: true
    },

    gender: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountCreationDateTime: {
        type: Object,
        required: true
    },
    userType:String
}

let itemSchema = {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    },
    itemType: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: []
    },
    brand: String,
    gender: String,
    small: Number,
    medium: Number,
    large: Number,
    xLarge: Number
}

let wishListSchema = {
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    }
}

let cartSchema = {
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    size:String
}

let AddressSchema = {
    name: String,
    contactNumber: String,
    pincode: String,
    locality: String,
    address: String,
    city: String,
    state: String,
    userId: {
        type: String,
        required: true
    }
}

let Orders = {
    address: {
        name: String,
        contactNumber: String,
        pincode: String,
        locality: String,
        address: String,
        city: String,
        state: String,
    },
    userId: {
        type: String,
        required: true
    },
    product:{
            productId: {
                type: String,
                required: true
            }
            , quantity: {
                type: Number,
                required: true
            },
            size:String
         },
        
    paymentMethod:
    {
        type: String,
        required: true
    },
    UPI_Id: String,
    order:{
        type:String,
        required:true
    },
    orderDate:String,
}


module.exports = {
    Property: property,
    signUpSchema: signUpSchema,
    itemSchema: itemSchema,
    wishlistSchema: wishListSchema,
    cartSchema: cartSchema,
    addressSchema: AddressSchema,
    orders: Orders
}

