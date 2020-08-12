var dataLayer = document.dataLayer || [];

const path = document.location.pathname.split(/\/|\./)[2];

const db = [
    {
        id: 1,
        name: 'sony alpha dslr camera',
        initial_price: 550, 
        final_price: 500,
        stock_availability: true,
        brand_id: 27, 
        brand_name: 'sony',
        department_id: 2, 
        department_name: 'eletronics',
        category_id: 9, 
        category_name: 'cameras'
    },
    {
        id: 2,
        name: 'optoma 4k hdr projector',
        initial_price: 1600, 
        final_price: 1500,
        stock_availability: true,
        brand_id: 24, 
        brand_name: 'optoma',
        department_id: 2, 
        department_name: 'eletronics',
        category_id: 13, 
        category_name: 'projectors'
    },
    {
        id: 3,
        name: 'hp envy specter 360',
        initial_price: 2800, 
        final_price: 2500,
        stock_availability: true,
        brand_id: 16, 
        brand_name: 'hp',
        department_id: 2, 
        department_name: 'eletronics',
        category_id: 12, 
        category_name: 'notebooks'
    },
    {
        id: 4,
        name: 'dell alienware area 51',
        initial_price: 4500, 
        final_price: 4500,
        stock_availability: false,
        brand_id: 8, 
        brand_name: 'dell',
        department_id: 2, 
        department_name: 'eletronics',
        category_id: 12, 
        category_name: 'notebooks'
    }
];

const insertList = (result, products, listName) => {
    products.map((item, index) => {
        let newItem = JSON.parse(JSON.stringify(item));
        newItem['list'] = listName;
        newItem['list_position'] = index + 1;
        result.push(newItem);
    })
}

const bindEventAddToCart = () => {
    Array.from(document.querySelectorAll('div.product-item')).map(item => {
        let productName = item.querySelector('.product-name').text.toLowerCase();
        item.querySelector('button').addEventListener('mousedown', () => {
            product = JSON.parse(JSON.stringify(db.filter(item => item.name == productName)[0]));
            product['added_quantity'] = 1;
            dataLayer.push({
                event: 'add_to_cart',
                ecommerce: {
                    product: product
                }
            })
        })
    })
}

$(document).ready(() => {
    var products = [], product;
    // push no dataLayer e associação de eventos em elementos para cada página 
    switch(path){
        case('index'):
            // imprimit_produtos
            products = [];
            insertList(products, db, 'featured products');
            insertList(products, db, 'latest products');
            insertList(products, db, 'top selling products');
            dataLayer.push({
                event: 'products_impression',
                ecommerce: {
                    products: products
                }
            })
            // adicionar_carrinhp
            bindEventAddToCart();
            break;
        case('product'): // Página de detalhes do produto de id = 1
            let id = 1;
            // visualizar_produto
            product = db.filter(item => item.id == id)[0];
            dataLayer.push({
                event: 'product_detail',
                ecommerce: {
                    product: product
                }
            });
            // imprimir_produtos
            products = [];
            insertList(products, db, 'similar products');
            dataLayer.push({
                event: 'products_impression',
                ecommerce: {
                    products: products
                }
            });
            // adicionar_carrinho a partir da lista de produtos
            bindEventAddToCart();
            // adicionar_carrinho do produto da página
            document.querySelector('div.sidebar button').addEventListener('mousedown', () => {
                product = JSON.parse(JSON.stringify(db.filter(item => item.id == id)[0]));
                product['added_quantity'] = parseInt(document.querySelector('#qty').value);
                dataLayer.push({
                    event: 'add_to_cart',
                    ecommerce: {
                        product: product
                    }
                })
            })
            break;
        case('category'):
            // imprimir_produtos
            products = [];
            insertList(products, db, 'computers');
            dataLayer.push({
                event: 'products_impression',
                ecommerce: {
                    products: products
                }
            })
            // adicionar_carrinho
            bindEventAddToCart();
            break;
        case('cart'):
            products = [];
            let productsQuantity = 0;
            Array.from(document.querySelectorAll('tbody tr')).map(item => {
                let productName = item.querySelector('td').textContent.toLowerCase().trim();
                let textBox = item.querySelector('input');
                let previousValue = parseInt(textBox.value);
                
                // visualização do carrinho
                productsQuantity += previousValue;
                product = JSON.parse(JSON.stringify(db.filter(item => item.name == productName)[0]));
                product['quantity'] = previousValue;
                products.push(product);

                // adiçionar e remover do carrinho
                textBox.addEventListener('focus', () => {
                    previousValue = parseInt(textBox.value);
                });
                textBox.addEventListener('blur', () => {
                    let result = parseInt(textBox.value) - previousValue;
                    if(result != 0){
                        product = JSON.parse(JSON.stringify(db.filter(item => item.name == productName)[0]));
                        let revenueLabel = document.querySelectorAll('tfoot th')[1];
                        let revenue = parseFloat(revenueLabel.textContent.split('$')[1].replace(',', ''));
                        revenue += result * product.final_price;
                        revenueLabel.textContent = '$' + Intl.NumberFormat('en-US').format(revenue.toString());
                        if(result > 0){
                            product['added_quantity'] = result;
                            dataLayer.push({
                                event: 'add_to_cart',
                                ecommerce: {
                                    product: product
                                }
                            });
                        } else if (result < 0){
                            product['removed_quantity'] = result * -1;
                            dataLayer.push({
                                event: 'remove_from_cart',
                                ecommerce: {
                                    product: product
                                }
                            });
                        }
                    }
                });
                item.querySelector('button').addEventListener('mousedown', () => {
                    previousValue = parseInt(textBox.value);
                    product = JSON.parse(JSON.stringify(db.filter(item => item.name == productName)[0]));
                    product['removed_quantity'] = previousValue;
                    dataLayer.push({
                        event: 'remove_from_cart',
                        ecommerce: {
                            product: product
                        }
                    });
                });


            })
            // Visualização do carrinho
            dataLayer.push({
                event: 'view_cart',
                ecommerce: {
                    checkout: {
                        step: 1,
                        products_quantity: productsQuantity
                    },
                    products: products
                }
            })
            // Atualização do carrinho
            document.querySelector('button[type="submit"]').addEventListener('mousedown', () => {
                dataLayer.push({
                    event: 'update_cart',
                    ecommerce: {
                        checkout: {
                            step: 2
                        }
                    }
                })
            })
            // Finalização da compra - button checkout
            document.querySelector('a.btn').addEventListener('mousedown', () => {
                let purchaseId = parseInt(Math.random() * 100000);
                let productsQuantity = 0;
                let revenue = parseFloat(document.querySelectorAll('tfoot th')[1].textContent.split('$')[1].replace(',', ''));
                let payment = ['credit card', 'debit card', 'bank transfer', 'paypal'][parseInt(Math.random()*4)];
                products = [];
                Array.from(document.querySelectorAll('tbody tr')).map(item => {
                    let productName = item.querySelector('td').textContent.toLowerCase().trim();
                    product = JSON.parse(JSON.stringify(db.filter(item => item.name == productName)[0]));
                    product['quantity'] = parseInt(item.querySelector('input').value);
                    productsQuantity += product.quantity;
                    products.push(product);
                });
                dataLayer.push({
                    event: 'purchase_completed',
                    ecommerce: {
                        purchase: {
                            id: purchaseId,
                            products_quantity: productsQuantity,
                            revenue: revenue,
                            payment_method: payment
                        },
                        products: products
                    }
                })
            })

            
        break;
    }
});
