import type { TestExecution, TestSimple, ExecutionStatus, Test, TestRun } from '@/types/models';

/**
 * Mock test execution data
 * TODO: Replace with real API data
 */
export const mockExecutions: TestExecution[] = [
  {
    id: '1',
    testName: 'User Login Flow',
    status: 'passed',
    duration: 2.4,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    environment: 'Production',
    triggeredBy: 'CI/CD',
  },
  {
    id: '2',
    testName: 'Payment Processing',
    status: 'failed',
    duration: 5.1,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    environment: 'Staging',
    errorCount: 2,
    triggeredBy: 'Manual',
  },
  {
    id: '3',
    testName: 'Product Search',
    status: 'passed',
    duration: 1.8,
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    environment: 'Production',
    triggeredBy: 'Schedule',
  },
  {
    id: '4',
    testName: 'User Registration',
    status: 'running',
    duration: 0,
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    environment: 'Development',
    triggeredBy: 'Manual',
  },
  {
    id: '5',
    testName: 'Checkout Flow',
    status: 'passed',
    duration: 8.3,
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    environment: 'Production',
    triggeredBy: 'CI/CD',
  },
];

export const mockExecutionDetail = {
  id: '1',
  testName: 'User Login Flow',
  status: 'passed',
  duration: 2.4,
  timestamp: new Date(Date.now() - 30 * 60 * 1000),
  environment: 'Production',
  steps: [
    { name: 'Navigate to login page', status: 'passed', duration: 0.5 },
    { name: 'Enter credentials', status: 'passed', duration: 0.3 },
    { name: 'Click login button', status: 'passed', duration: 0.2 },
    { name: 'Verify redirect to dashboard', status: 'passed', duration: 1.4 },
  ],
  logs: [
    {
      level: 'info',
      message: 'Starting test execution',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      level: 'info',
      message: 'Navigating to login page',
      timestamp: new Date(Date.now() - 30 * 60 * 1000 + 100),
    },
    {
      level: 'success',
      message: 'Login successful',
      timestamp: new Date(Date.now() - 30 * 60 * 1000 + 2400),
    },
  ],
  screenshots: [
    { name: 'Login Page', url: '/screenshots/login.png' },
    { name: 'Dashboard', url: '/screenshots/dashboard.png' },
  ],
};

export const mockTests: TestSimple[] = [
  {
    id: '1',
    name: 'User Login Flow',
    type: 'e2e',
    duration: 45000,
  },
  {
    id: '2',
    name: 'API Health Check',
    type: 'api',
    duration: 12000,
  },
  {
    id: '3',
    name: 'Payment Processing',
    type: 'integration',
    duration: 78000,
  },
  {
    id: '4',
    name: 'Product Search',
    type: 'e2e',
    duration: 34000,
  },
  {
    id: '5',
    name: 'User Registration',
    type: 'e2e',
    duration: 56000,
  },
];

export const mockHistoryExecutions: TestExecution[] = [
  {
    id: '1',
    testName: 'User Login Flow',
    status: 'passed',
    duration: 2.34,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    environment: 'production',
    triggeredBy: 'CI/CD',
    hasScreenshots: true,
    hasVideo: true,
  },
  {
    id: '2',
    testName: 'Payment Processing',
    status: 'failed',
    duration: 4.12,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    environment: 'staging',
    triggeredBy: 'John Doe',
    hasScreenshots: true,
    hasVideo: false,
    errorCount: 2,
  },
  {
    id: '3',
    testName: 'API Health Check',
    status: 'passed',
    duration: 0.87,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    environment: 'production',
    triggeredBy: 'Scheduler',
    hasScreenshots: false,
    hasVideo: false,
  },
  {
    id: '4',
    testName: 'User Registration',
    status: 'passed',
    duration: 3.21,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    environment: 'staging',
    triggeredBy: 'Jane Smith',
    hasScreenshots: true,
    hasVideo: true,
  },
  {
    id: '5',
    testName: 'Search Functionality',
    status: 'stopped',
    duration: 1.45,
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
    environment: 'development',
    triggeredBy: 'CI/CD',
    hasScreenshots: false,
    hasVideo: false,
  },
];

export const mockHistoryExecutionDetail = {
  id: '1',
  testName: 'User Login Flow',
  status: 'passed' as ExecutionStatus,
  duration: 2.34,
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  environment: 'production',
  triggeredBy: 'CI/CD',
  logs: [
    { timestamp: new Date(), level: 'info' as const, message: 'Test execution started' },
    { timestamp: new Date(), level: 'info' as const, message: 'Navigating to login page' },
    { timestamp: new Date(), level: 'success' as const, message: 'Login form loaded successfully' },
    { timestamp: new Date(), level: 'info' as const, message: 'Entering credentials' },
    { timestamp: new Date(), level: 'success' as const, message: 'Login successful' },
    { timestamp: new Date(), level: 'info' as const, message: 'Redirected to dashboard' },
    { timestamp: new Date(), level: 'success' as const, message: 'Test completed successfully' },
  ],
  errors: [],
  screenshots: ['screenshot1.png', 'screenshot2.png', 'screenshot3.png'],
  videoUrl: 'video.mp4',
  config: {
    browser: 'chrome',
    timeout: 30000,
    retries: 2,
    baseUrl: 'https://app.example.com',
  },
};

export const mockTestDetail = {
  id: '1',
  name: 'User Login Flow',
  description: 'Tests the complete user authentication process including login form validation, API calls, and redirect behavior.',
  type: 'ui',
  status: 'active',
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
  tags: ['auth', 'critical', 'smoke'],
  successRate: 98,
  totalRuns: 342,
  avgDuration: 2.3,
  code: `describe('User Login Flow', () => {
  it('should display login form', () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('should show validation errors for invalid inputs', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-button"]').click();
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome back').should('be.visible');
  });
});`,
  config: {
    timeout: 30000,
    retries: 2,
    environment: 'staging',
    baseUrl: 'https://staging.example.com',
    browser: 'chrome',
  },
};

export const mockTestRuns: TestRun[] = [
  {
    id: '1',
    status: 'passed',
    duration: 2.1,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    environment: 'staging',
  },
  {
    id: '2',
    status: 'passed',
    duration: 2.4,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    environment: 'staging',
  },
  {
    id: '3',
    status: 'failed',
    duration: 1.8,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    environment: 'production',
    errors: 'Timeout: Element not found [data-testid="login-button"]',
  },
  {
    id: '4',
    status: 'passed',
    duration: 2.2,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    environment: 'staging',
  },
  {
    id: '5',
    status: 'passed',
    duration: 2.5,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    environment: 'staging',
  },
];

export const mockTestsPageData: Test[] = [
  {
    id: '1',
    name: 'User Login Flow',
    description: 'Tests the complete user authentication process',
    type: 'ui',
    status: 'active',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
    duration: 2.3,
    successRate: 98,
    tags: ['auth', 'critical', 'smoke'],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'API Health Check',
    description: 'Verifies all API endpoints are responding correctly',
    type: 'api',
    status: 'active',
    lastRun: new Date(Date.now() - 15 * 60 * 1000),
    duration: 0.8,
    successRate: 100,
    tags: ['api', 'health', 'monitoring'],
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Payment Processing',
    description: 'End-to-end payment flow with Stripe integration',
    type: 'integration',
    status: 'active',
    lastRun: new Date(Date.now() - 5 * 60 * 60 * 1000),
    duration: 4.5,
    successRate: 94,
    tags: ['payment', 'stripe', 'critical'],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    name: 'User Registration',
    description: 'Tests new user signup and email verification',
    type: 'ui',
    status: 'active',
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
    duration: 3.2,
    successRate: 96,
    tags: ['auth', 'email', 'signup'],
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    name: 'Product Search',
    description: 'Validates search functionality and filters',
    type: 'ui',
    status: 'inactive',
    lastRun: new Date(Date.now() - 48 * 60 * 60 * 1000),
    duration: 1.5,
    successRate: 88,
    tags: ['search', 'ui'],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: '6',
    name: 'Database Migration',
    description: 'Tests database schema migrations',
    type: 'unit',
    status: 'draft',
    tags: ['database', 'migration'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];
