import faker from 'faker';

faker.locale = 'es'
const { commerce, image } = faker

const generateFakeProducts = (n) => {
    let fakeProducts = []
    for (let index = 0; index < n; index++) {
        const fakeProduct = {
            title: commerce.product(),
            price: commerce.price(10, 1000),
            thumbnail: image.abstract(190, 190)
        }
        fakeProducts.push(fakeProduct)
    }

    console.log(fakeProducts);

    return fakeProducts
}


export default generateFakeProducts 