// Product data organized by categories

export const categories = [
    {
        id: 'general-pharmacy',
        name: 'General Pharmacy Medicines',
        icon: '💊',
        description: 'Essential pharmaceutical products'
    },
    {
        id: 'skin-care',
        name: 'Skin Care Products',
        icon: '🧴',
        description: 'Premium skin care and beauty products'
    },
    {
        id: 'baby-products',
        name: 'Baby Products',
        icon: '👶',
        description: 'Trusted brands for your little ones'
    },
    {
        id: 'health-drinks',
        name: 'Health Drinks',
        icon: '🥤',
        description: 'Nutritional drinks and supplements'
    }
];

export const productsData = {
    'general-pharmacy': [
        { id: 'gp1', name: 'Paracetamol 500mg', quantity: '10 tablets', price: 15, image: '💊' },
        { id: 'gp2', name: 'Ibuprofen 400mg', quantity: '10 tablets', price: 25, image: '💊' },
        { id: 'gp3', name: 'Cough Syrup', quantity: '100ml', price: 85, image: '🧪' },
        { id: 'gp4', name: 'Vitamin D3', quantity: '30 capsules', price: 120, image: '💊' },
        { id: 'gp5', name: 'Bandages', quantity: '10 pieces', price: 40, image: '🩹' },
        { id: 'gp6', name: 'Antiseptic Cream', quantity: '30g', price: 55, image: '🧴' },
        { id: 'gp7', name: 'Pain Relief Spray', quantity: '50ml', price: 95, image: '💨' },
        { id: 'gp8', name: 'Antibiotic Ointment', quantity: '15g', price: 65, image: '🧴' }
    ],

    'skin-care': {
        serum: [
            { id: 'sc1', name: 'Vitamin C Serum', quantity: '30ml', price: 450, image: '🧴', subcategory: 'Serum' },
            { id: 'sc2', name: 'Hyaluronic Acid Serum', quantity: '30ml', price: 550, image: '🧴', subcategory: 'Serum' },
            { id: 'sc3', name: 'Retinol Serum', quantity: '30ml', price: 650, image: '🧴', subcategory: 'Serum' }
        ],
        facewash: [
            { id: 'sc4', name: 'Gentle Face Wash', quantity: '100ml', price: 180, image: '🧼', subcategory: 'Face Wash' },
            { id: 'sc5', name: 'Acne Control Face Wash', quantity: '100ml', price: 220, image: '🧼', subcategory: 'Face Wash' },
            { id: 'sc6', name: 'Brightening Face Wash', quantity: '100ml', price: 250, image: '🧼', subcategory: 'Face Wash' }
        ],
        lotion: [
            { id: 'sc7', name: 'Body Lotion', quantity: '200ml', price: 280, image: '🧴', subcategory: 'Lotion' },
            { id: 'sc8', name: 'Calamine Lotion', quantity: '100ml', price: 120, image: '🧴', subcategory: 'Lotion' },
            { id: 'sc9', name: 'Sunscreen Lotion SPF 50', quantity: '100ml', price: 350, image: '☀️', subcategory: 'Lotion' }
        ],
        moisturizer: [
            { id: 'sc10', name: 'Day Moisturizer', quantity: '50g', price: 320, image: '🧴', subcategory: 'Moisturizer' },
            { id: 'sc11', name: 'Night Cream', quantity: '50g', price: 380, image: '🧴', subcategory: 'Moisturizer' },
            { id: 'sc12', name: 'Anti-Aging Moisturizer', quantity: '50g', price: 480, image: '🧴', subcategory: 'Moisturizer' }
        ],
        niacinamide: [
            { id: 'sc13', name: 'Niacinamide 10% Gel', quantity: '30ml', price: 420, image: '🧴', subcategory: 'Niacinamide Gel' },
            { id: 'sc14', name: 'Niacinamide + Zinc Gel', quantity: '30ml', price: 460, image: '🧴', subcategory: 'Niacinamide Gel' }
        ],
        aloevera: [
            { id: 'sc15', name: 'Pure Aloe Vera Gel', quantity: '100ml', price: 150, image: '🌿', subcategory: 'Aloe Vera Gel' },
            { id: 'sc16', name: 'Aloe Vera + Vitamin E Gel', quantity: '100ml', price: 180, image: '🌿', subcategory: 'Aloe Vera Gel' }
        ]
    },

    'baby-products': {
        himalaya: [
            { id: 'bp1', name: 'Himalaya Baby Soap', quantity: '75g', price: 45, brand: 'Himalaya', image: '🧼' },
            { id: 'bp2', name: 'Himalaya Baby Gel', quantity: '200ml', price: 180, brand: 'Himalaya', image: '🧴' },
            { id: 'bp3', name: 'Himalaya Baby Hair Oil', quantity: '100ml', price: 110, brand: 'Himalaya', image: '💧' },
            { id: 'bp4', name: 'Himalaya Baby Lotion', quantity: '200ml', price: 160, brand: 'Himalaya', image: '🧴' },
            { id: 'bp5', name: 'Himalaya Baby Cream', quantity: '100g', price: 140, brand: 'Himalaya', image: '🧴' }
        ],
        johnson: [
            { id: 'bp6', name: 'Johnson Baby Soap', quantity: '75g', price: 50, brand: 'Johnson', image: '🧼' },
            { id: 'bp7', name: 'Johnson Baby Gel', quantity: '200ml', price: 200, brand: 'Johnson', image: '🧴' },
            { id: 'bp8', name: 'Johnson Baby Hair Oil', quantity: '100ml', price: 130, brand: 'Johnson', image: '💧' },
            { id: 'bp9', name: 'Johnson Baby Lotion', quantity: '200ml', price: 180, brand: 'Johnson', image: '🧴' },
            { id: 'bp10', name: 'Johnson Baby Cream', quantity: '100g', price: 160, brand: 'Johnson', image: '🧴' }
        ],
        bear: [
            { id: 'bp11', name: 'Bear Baby Soap', quantity: '75g', price: 40, brand: 'Bear', image: '🧼' },
            { id: 'bp12', name: 'Bear Baby Gel', quantity: '200ml', price: 170, brand: 'Bear', image: '🧴' },
            { id: 'bp13', name: 'Bear Baby Hair Oil', quantity: '100ml', price: 100, brand: 'Bear', image: '💧' },
            { id: 'bp14', name: 'Bear Baby Lotion', quantity: '200ml', price: 150, brand: 'Bear', image: '🧴' },
            { id: 'bp15', name: 'Bear Baby Cream', quantity: '100g', price: 130, brand: 'Bear', image: '🧴' }
        ]
    },

    'health-drinks': [
        { id: 'hd1', name: 'Boost', quantity: '500g', price: 240, image: '🥤' },
        { id: 'hd2', name: 'Boost (1kg)', quantity: '1kg', price: 450, image: '🥤' },
        { id: 'hd3', name: 'Horlicks', quantity: '500g', price: 250, image: '🥛' },
        { id: 'hd4', name: 'Horlicks (1kg)', quantity: '1kg', price: 480, image: '🥛' },
        { id: 'hd5', name: 'Bournvita', quantity: '500g', price: 230, image: '🍫' },
        { id: 'hd6', name: 'Bournvita (1kg)', quantity: '1kg', price: 440, image: '🍫' },
        { id: 'hd7', name: 'Nutritional Health Mix', quantity: '500g', price: 280, image: '🌾' },
        { id: 'hd8', name: 'Protein Health Drink', quantity: '500g', price: 320, image: '💪' }
    ]
};

// Helper function to get all products from a category
export const getProductsByCategory = (categoryId) => {
    const data = productsData[categoryId];

    if (Array.isArray(data)) {
        return data;
    }

    // For nested categories (skin-care, baby-products), flatten all subcategories
    const allProducts = [];
    Object.keys(data).forEach(subKey => {
        allProducts.push(...data[subKey]);
    });

    return allProducts;
};

// Get subcategories for skin care
export const getSkinCareSubcategories = () => {
    return [
        { id: 'serum', name: 'Serum', icon: '✨' },
        { id: 'facewash', name: 'Face Wash', icon: '🧼' },
        { id: 'lotion', name: 'Lotion', icon: '🧴' },
        { id: 'moisturizer', name: 'Moisturizer', icon: '💧' },
        { id: 'niacinamide', name: 'Niacinamide Gel', icon: '🧪' },
        { id: 'aloevera', name: 'Aloe Vera Gel', icon: '🌿' }
    ];
};

// Get brands for baby products
export const getBabyProductBrands = () => {
    return [
        { id: 'himalaya', name: 'Himalaya', icon: '🏔️' },
        { id: 'johnson', name: 'Johnson', icon: '👶' },
        { id: 'bear', name: 'Bear', icon: '🐻' }
    ];
};
