const fetch = require('node-fetch');

const getRewards = async() => {
    const res = await fetch(process.env.PRODUCTS_URL)
    const json = res.json();
    return json;
}

const getReward = async(reward_id) => {
    const products = await getProducts()
    return products.find(p => p.id == product);
}

const getReviews = async() => {
    const res = await fetch(process.env.REVIEW_URL)
    const json = res.json();
    return json;
}

module.exports = {
    getProducts,
    getReviews,
    getProduct
}
