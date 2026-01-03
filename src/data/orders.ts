export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    productId: string;
    productName: string;
    amount: number;
    paymentMethod: 'crypto' | 'hotmart';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    createdAt: Date;
    updatedAt: Date;
    deliveryEmail?: string;
    transactionId?: string;
}

// Datos de ejemplo para órdenes
export const orders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Juan Pérez',
        customerEmail: 'juan.perez@email.com',
        productId: 'netflix-premium',
        productName: 'Netflix Premium',
        amount: 3.99,
        paymentMethod: 'crypto',
        status: 'completed',
        createdAt: new Date('2024-01-15T10:30:00'),
        updatedAt: new Date('2024-01-15T10:35:00'),
        deliveryEmail: 'juan.perez@email.com',
        transactionId: 'TXN-CRYPTO-001'
    },
    {
        id: 'ORD-002',
        customerName: 'María García',
        customerEmail: 'maria.garcia@email.com',
        productId: 'spotify-premium',
        productName: 'Spotify Premium',
        amount: 2.50,
        paymentMethod: 'hotmart',
        status: 'completed',
        createdAt: new Date('2024-01-15T11:15:00'),
        updatedAt: new Date('2024-01-15T11:20:00'),
        deliveryEmail: 'maria.garcia@email.com',
        transactionId: 'TXN-HOTMART-002'
    },
    {
        id: 'ORD-003',
        customerName: 'Carlos Rodríguez',
        customerEmail: 'carlos.r@email.com',
        productId: 'adobe-cc',
        productName: 'Adobe Creative Cloud',
        amount: 9.99,
        paymentMethod: 'crypto',
        status: 'pending',
        createdAt: new Date('2024-01-15T14:20:00'),
        updatedAt: new Date('2024-01-15T14:20:00'),
        transactionId: 'TXN-CRYPTO-003'
    },
    {
        id: 'ORD-004',
        customerName: 'Ana Martínez',
        customerEmail: 'ana.m@email.com',
        productId: 'disney-plus',
        productName: 'Disney+ Bundle',
        amount: 3.50,
        paymentMethod: 'hotmart',
        status: 'failed',
        createdAt: new Date('2024-01-15T15:45:00'),
        updatedAt: new Date('2024-01-15T15:50:00'),
        transactionId: 'TXN-HOTMART-004'
    },
    {
        id: 'ORD-005',
        customerName: 'Luis Fernández',
        customerEmail: 'luis.f@email.com',
        productId: 'youtube-premium',
        productName: 'YouTube Premium',
        amount: 2.99,
        paymentMethod: 'crypto',
        status: 'completed',
        createdAt: new Date('2024-01-15T16:30:00'),
        updatedAt: new Date('2024-01-15T16:35:00'),
        deliveryEmail: 'luis.f@email.com',
        transactionId: 'TXN-CRYPTO-005'
    },
    {
        id: 'ORD-006',
        customerName: 'Sofia López',
        customerEmail: 'sofia.lopez@email.com',
        productId: 'nordvpn',
        productName: 'NordVPN Standard',
        amount: 2.29,
        paymentMethod: 'hotmart',
        status: 'completed',
        createdAt: new Date('2024-01-16T09:00:00'),
        updatedAt: new Date('2024-01-16T09:05:00'),
        deliveryEmail: 'sofia.lopez@email.com',
        transactionId: 'TXN-HOTMART-006'
    },
    {
        id: 'ORD-007',
        customerName: 'Diego Torres',
        customerEmail: 'diego.t@email.com',
        productId: 'office-365',
        productName: 'Office 365 Personal',
        amount: 1.99,
        paymentMethod: 'crypto',
        status: 'pending',
        createdAt: new Date('2024-01-16T10:15:00'),
        updatedAt: new Date('2024-01-16T10:15:00'),
        transactionId: 'TXN-CRYPTO-007'
    },
    {
        id: 'ORD-008',
        customerName: 'Elena Ramírez',
        customerEmail: 'elena.r@email.com',
        productId: 'canva-pro',
        productName: 'Canva Pro',
        amount: 4.99,
        paymentMethod: 'hotmart',
        status: 'completed',
        createdAt: new Date('2024-01-16T11:30:00'),
        updatedAt: new Date('2024-01-16T11:35:00'),
        deliveryEmail: 'elena.r@email.com',
        transactionId: 'TXN-HOTMART-008'
    }
];

export function getOrderById(id: string): Order | undefined {
    return orders.find(o => o.id === id);
}

export function getOrdersByStatus(status: Order['status']): Order[] {
    return orders.filter(o => o.status === status);
}

export function getAllOrders(): Order[] {
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function getOrderStats() {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'completed').length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const failed = orders.filter(o => o.status === 'failed').length;
    const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.amount, 0);

    return {
        total,
        completed,
        pending,
        failed,
        totalRevenue
    };
}
