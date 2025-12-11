export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    duration: string;
    badge?: string;
    badgeColor?: string;
    gradient: string;
    logo?: string;
    features: string[];
    category: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
}

export const products: Product[] = [
    {
        id: 'netflix-premium',
        name: 'Netflix Premium',
        description: '4K UHD • 1 Pantalla • Privado',
        price: 3.99,
        originalPrice: 9.99,
        duration: 'mes',
        badge: '-60% OFF',
        badgeColor: 'red',
        gradient: 'bg-gradient-to-br from-[#E50914] to-[#8c060c]',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZFrLfF-MVY_s80_BWaI7U8eiEp9o-pDUXzexBGx0ZprteNxui262Z6adDv7Bvh7FhM08xbBewl1MEXlXWCE7loUOzpGZfJT368mYpMc3qQmU_CXdJFwqoOu1CkQDeSRjfLWcCDlEqyJWYj8Erdn-cJsOR8rvA8ZUqHkL-Ic9WpQdx1TYkoUxIrbxJ1DrXKYaOdb2F4rCYAaU0FJ5tFZzp54OLswaYlSlR1xDgKmpkOIFgIKvkXxFnjURJqaND2Nb4Hnm6jXr0UnC',
        features: ['1 Mes', 'Renovable'],
        category: 'streaming',
        stock: 50,
        isActive: true,
        createdAt: new Date('2024-01-01')
    },
    {
        id: 'spotify-premium',
        name: 'Spotify Premium',
        description: 'Plan Individual • Sin Anuncios',
        price: 2.50,
        originalPrice: 4.99,
        duration: 'mes',
        badge: '-50% OFF',
        badgeColor: 'green',
        gradient: 'bg-gradient-to-br from-[#1DB954] to-[#116e32]',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJpoHyQqCuCA5AEMos6iUnw4z2JFh8M2zEY5O1moIFfnJmpa_GqlmDy26Gy4AobW4SlDl3fmWmqfAGV7oPClpVE9Pfq7R4MPWsiLKaW3S1W253QwHFjZhY_s18r4zXzgnLKJj3K2Ew0dsb4FAskoMYkX6nyuIKEcX-7Zl7DfOZrT7iXwM03HKW6bF7j3v4aDPOtGh_O9jhBEMhfjD7QCz58zI5-XYMufyGbWBLU80QVfI-vNPSqd0-aDkYKhvlJAz33x48YbtLyKrH',
        features: ['12 Meses', 'Garantía'],
        category: 'streaming',
        stock: 100,
        isActive: true,
        createdAt: new Date('2024-01-02')
    },
    {
        id: 'youtube-premium',
        name: 'YouTube Premium',
        description: 'Sin Anuncios • Reproducción en Segundo Plano',
        price: 2.99,
        originalPrice: 11.99,
        duration: 'mes',
        gradient: 'bg-gradient-to-br from-[#FF0000] to-[#990000]',
        features: ['6 Meses', 'Familiar'],
        category: 'streaming',
        stock: 75,
        isActive: true,
        createdAt: new Date('2024-01-03')
    },
    {
        id: 'adobe-cc',
        name: 'Adobe Creative Cloud',
        description: 'Todas las Apps • 100GB Cloud',
        price: 9.99,
        originalPrice: 54.99,
        duration: 'mes',
        badge: 'OFERTA',
        badgeColor: 'purple',
        gradient: 'bg-gradient-to-br from-[#FF0000] to-[#360505]',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC02h5TE_T0_pGYHAJgFuoRzASL8TlOo4nVlitzyFs9K1YXif-AGwBtgbx3Aa3Lsm40A7ILUJMuBY3IXXa9sXNpYKfA8abFbmjNonNX3Y25GOq23JMe14I5EzWRZS_OlaRV6yDTm5uprurgbv08qJFH3u1v1QzDjL42ZsxUiQ2FZwg0KOtup2ruMrZm7viawDDy38zwBY9VF6l7eGSqf2y1eQ-6nC6yHaFQlbswo5QqNkBRDA-fsEvNzA-unb1Y5naSdGin9WC7WTvE',
        features: ['1 Mes', 'Cuenta Privada'],
        category: 'creative',
        stock: 30,
        isActive: true,
        createdAt: new Date('2024-01-04')
    },
    {
        id: 'disney-plus',
        name: 'Disney+ Bundle',
        description: 'Sin Anuncios • Acceso 1 Año',
        price: 3.50,
        originalPrice: 7.99,
        duration: 'mes',
        gradient: 'bg-gradient-to-br from-[#113CCF] to-[#081a52]',
        logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJz_ooJNkV52KdaHCkLLLC-39SK195k_tu7yI-n192PfPmFKJ9o-GU7_wjlZxwJQLp2F3U6bPw3TCL2Lly5XDpZ0mxYYp85oWPjJbbzScZgXnqH-u1I6su2YeG9TmAwfyBHu1_hLvyEe7fQcBZlxtdjMglG72dAijpewyBPxBJjP8-zdoLCSuhHbMh823X0UQ-EdQInKIc-_ijE9O76jGoqpgujhaBZMT7M-09CPZ4jDqihxJvO0xBy--d2-k2QwngaHvFJoyzl1X-',
        features: ['12 Meses', 'Hulu Incluido'],
        category: 'streaming',
        stock: 60,
        isActive: true,
        createdAt: new Date('2024-01-05')
    },
    {
        id: 'office-365',
        name: 'Office 365 Personal',
        description: '5 Dispositivos • 1TB OneDrive',
        price: 1.99,
        originalPrice: 6.99,
        duration: 'mes',
        gradient: 'bg-gradient-to-br from-[#D83B01] to-[#a32b00]',
        features: ['12 Meses', 'PC/Mac'],
        category: 'software',
        stock: 80,
        isActive: true,
        createdAt: new Date('2024-01-06')
    },
    {
        id: 'nordvpn',
        name: 'NordVPN Standard',
        description: 'Alta Velocidad • 6 Dispositivos',
        price: 2.29,
        originalPrice: 12.99,
        duration: 'mes',
        badge: 'MEJOR VALOR',
        badgeColor: 'blue',
        gradient: 'bg-gradient-to-br from-[#4687FF] to-[#0048ba]',
        features: ['2 Años', 'Global'],
        category: 'security',
        stock: 120,
        isActive: true,
        createdAt: new Date('2024-01-07')
    },
    {
        id: 'canva-pro',
        name: 'Canva Pro',
        description: 'Contenido Ilimitado • Herramientas IA',
        price: 4.99,
        originalPrice: 14.99,
        duration: 'mes',
        gradient: 'bg-gradient-to-br from-[#00C4CC] to-[#7D2AE8]',
        features: ['1 Mes', 'Equipos'],
        category: 'creative',
        stock: 90,
        isActive: true,
        createdAt: new Date('2024-01-08')
    }
];

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter(p => p.category === category && p.isActive);
}

export function getAllProducts(): Product[] {
    return products.filter(p => p.isActive);
}
