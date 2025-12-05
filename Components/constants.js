import {
    Home, Calendar, MessageSquare, FileText, ShoppingCart,
    CircleDollarSign, Mail, Briefcase, ListChecks, Users, Newspaper, LayoutGrid
} from 'lucide-react';

export const MENU_ITEMS = [
    {
        isSectionHeader: true,
        title: 'Menu',
        id: 'menu-section'
    },
    {
        id: 'dashboards',
        label: 'Dashboards',
        icon: Home,
        link: '/dashboard',
        subItems: [
            { id: 'dash-default', label: 'Default', link: '/dashboard/default' },
            { id: 'dash-saas', label: 'Saas', link: '/dashboard/saas' },
            { id: 'dash-crypto', label: 'Crypto', link: '/dashboard/crypto' },
            { id: 'dash-blog', label: 'Blog', link: '/dashboard/blog' },
            { id: 'dash-job', label: 'Job', link: '/dashboard/job' },
        ]
    },
    {
        isSectionHeader: true,
        title: 'Apps',
        id: 'apps-section'
    },
    {
        id: 'calendar',
        label: 'Calendar',
        icon: Calendar,
        link: '/calendar'
    },
    {
        id: 'chat',
        label: 'Chat',
        icon: MessageSquare,
        link: '/chat'
    },
    {
        id: 'file-manager',
        label: 'File Manager',
        icon: FileText, // Using FileText as closest generic file icon
        link: '/file-manager'
    },
    {
        id: 'ecommerce',
        label: 'Ecommerce',
        icon: ShoppingCart,
        link: '/ecommerce',
        subItems: [
            { id: 'ecom-products', label: 'Products', link: '/ecommerce/products' },
            { id: 'ecom-detail', label: 'Product Detail', link: '/ecommerce/product-detail' },
            { id: 'ecom-orders', label: 'Orders', link: '/ecommerce/orders' },
            { id: 'ecom-customers', label: 'Customers', link: '/ecommerce/customers' },
            { id: 'ecom-cart', label: 'Cart', link: '/ecommerce/cart' },
            { id: 'ecom-checkout', label: 'Checkout', link: '/ecommerce/checkout' },
            { id: 'ecom-shops', label: 'Shops', link: '/ecommerce/shops' },
            { id: 'ecom-add-product', label: 'Add Product', link: '/ecommerce/add-product' },
        ]
    },
    {
        id: 'crypto',
        label: 'Crypto',
        icon: CircleDollarSign,
        link: '/crypto',
        subItems: [
            { id: 'crypto-wallet', label: 'Wallet', link: '/crypto/wallet' },
            { id: 'crypto-buy-sell', label: 'Buy/Sell', link: '/crypto/buy-sell' },
            { id: 'crypto-exchange', label: 'Exchange', link: '/crypto/exchange' },
            { id: 'crypto-lending', label: 'Lending', link: '/crypto/lending' },
            { id: 'crypto-orders', label: 'Orders', link: '/crypto/orders' },
            { id: 'crypto-kyc', label: 'KYC Application', link: '/crypto/kyc-application' },
            { id: 'crypto-ico', label: 'ICO Landing', link: '/crypto/ico-landing' },
        ]
    },
    {
        id: 'email',
        label: 'Email',
        icon: Mail,
        link: '/email',
        subItems: [
            { id: 'email-inbox', label: 'Inbox', link: '/email/inbox' },
            { id: 'email-read', label: 'Read Email', link: '/email/read' },
            { id: 'email-templates', label: 'Templates', link: '/email/templates' },
        ]
    },
    {
        id: 'invoices',
        label: 'Invoices',
        icon: FileText,
        link: '/invoices',
        subItems: [
            { id: 'invoices-list', label: 'Invoice List', link: '/invoices/list' },
            { id: 'invoices-detail', label: 'Invoice Detail', link: '/invoices/detail' },
        ]
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: Briefcase,
        link: '/projects',
        subItems: [
            { id: 'projects-grid', label: 'Projects Grid', link: '/projects/grid' },
            { id: 'projects-list', label: 'Projects List', link: '/projects/list' },
            { id: 'projects-overview', label: 'Project Overview', link: '/projects/overview' },
            { id: 'projects-create', label: 'Create New', link: '/projects/create' },
        ]
    },
    {
        id: 'tasks',
        label: 'Tasks',
        icon: ListChecks,
        link: '/tasks',
        subItems: [
            { id: 'tasks-list', label: 'Task List', link: '/tasks/list' },
            { id: 'tasks-kanban', label: 'Kanban Board', link: '/tasks/kanban' },
            { id: 'tasks-create', label: 'Create Task', link: '/tasks/create' },
        ]
    },
    {
        id: 'contacts',
        label: 'Contacts',
        icon: Users,
        link: '/contacts',
        subItems: [
            { id: 'contacts-grid', label: 'User Grid', link: '/contacts/grid' },
            { id: 'contacts-list', label: 'User List', link: '/contacts/list' },
            { id: 'contacts-profile', label: 'Profile', link: '/contacts/profile' },
        ]
    },
    {
        id: 'blog',
        label: 'Blog',
        icon: Newspaper,
        link: '/blog',
        subItems: [
            { id: 'blog-list', label: 'Blog List', link: '/blog/list' },
            { id: 'blog-grid', label: 'Blog Grid', link: '/blog/grid' },
            { id: 'blog-details', label: 'Blog Details', link: '/blog/details' },
        ]
    },
    {
        id: 'jobs',
        label: 'Jobs',
        icon: Briefcase,
        link: '/jobs',
        subItems: [
            { id: 'job-list', label: 'Job List', link: '/jobs/list' },
            { id: 'job-grid', label: 'Job Grid', link: '/jobs/grid' },
            { id: 'job-apply', label: 'Apply Job', link: '/jobs/apply' },
            { id: 'job-details', label: 'Job Details', link: '/jobs/details' },
            { id: 'job-candidate-list', label: 'Candidate List', link: '/jobs/candidate-list' },
            { id: 'job-candidate-overview', label: 'Candidate Overview', link: '/jobs/candidate-overview' },
        ]
    },
];
