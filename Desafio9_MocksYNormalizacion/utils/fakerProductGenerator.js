import faker from 'faker';

faker.locale = 'es'

const generateFakeProducts = (n) => {
    let fakeProducts = []
    for (let index = 0; index < n; index++) {
        const fakeProduct = {
            title: faker.commerce.product(),
            price: faker.commerce.price(10, 10000),
            thumbnail: faker.image.abstract(200,200,true)
        }
        fakeProducts.push(fakeProduct)
    }

    return fakeProducts
}

export default generateFakeProducts 