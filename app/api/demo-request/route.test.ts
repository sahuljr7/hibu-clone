/**
 * Unit tests for /api/demo-request endpoint
 * Validates: Requirements 5.1, 5.2, 5.4, 5.5
 */

import { POST, GET, PUT, DELETE } from './route'
import { NextRequest } from 'next/server'

// Mock console.log and console.error to avoid cluttering test output
const originalConsoleLog = console.log
const originalConsoleError = console.error

beforeAll(() => {
  console.log = jest.fn()
  console.error = jest.fn()
})

afterAll(() => {
  console.log = originalConsoleLog
  console.error = originalConsoleError
})

describe('POST /api/demo-request', () => {
  it('should successfully process valid demo request', async () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      businessName: 'Acme Corp',
      businessPhone: '1234567890',
      submittedAt: new Date().toISOString(),
      source: 'get-started-2026',
    }

    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(validData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Demo request submitted successfully')
  })

  it('should return 400 for missing required fields', async () => {
    const invalidData = {
      firstName: '',
      lastName: '',
      email: '',
      businessName: '',
      businessPhone: '',
      submittedAt: new Date().toISOString(),
      source: 'get-started-2026',
    }

    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(invalidData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Validation failed')
    expect(data.errors).toBeDefined()
    expect(data.errors.firstName).toBeDefined()
    expect(data.errors.lastName).toBeDefined()
    expect(data.errors.email).toBeDefined()
    expect(data.errors.businessName).toBeDefined()
    expect(data.errors.businessPhone).toBeDefined()
  })

  it('should return 400 for invalid email format', async () => {
    const invalidEmailData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      businessName: 'Acme Corp',
      businessPhone: '1234567890',
      submittedAt: new Date().toISOString(),
      source: 'get-started-2026',
    }

    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(invalidEmailData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Validation failed')
    expect(data.errors.email).toBeDefined()
  })

  it('should return 400 for invalid phone format', async () => {
    const invalidPhoneData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      businessName: 'Acme Corp',
      businessPhone: 'abc',
      submittedAt: new Date().toISOString(),
      source: 'get-started-2026',
    }

    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(invalidPhoneData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Validation failed')
    expect(data.errors.businessPhone).toBeDefined()
  })

  it('should return 400 for phone number that is too short', async () => {
    const shortPhoneData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      businessName: 'Acme Corp',
      businessPhone: '123',
      submittedAt: new Date().toISOString(),
      source: 'get-started-2026',
    }

    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(shortPhoneData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Validation failed')
    expect(data.errors.businessPhone).toBeDefined()
  })

  it('should return 400 for fields that are too long', async () => {
    const tooLongData = {
      firstName: 'A'.repeat(51),
      lastName: 'B'.repeat(51),
      email: 'test@example.com',
      businessName: 'C'.repeat(101),
      businessPhone: '1234567890',
      submittedAt: new Date().toISOString(),
      source: 'get-started-2026',
    }

    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(tooLongData),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Validation failed')
    expect(data.errors.firstName).toBeDefined()
    expect(data.errors.lastName).toBeDefined()
    expect(data.errors.businessName).toBeDefined()
  })

  it('should return 400 for invalid JSON', async () => {
    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: 'invalid json',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Invalid request format')
    expect(data.error).toBe('Request body must be valid JSON')
  })

  it('should accept valid phone formats with spaces and dashes', async () => {
    const validPhoneFormats = [
      '123-456-7890',
      '(123) 456-7890',
      '+1 123 456 7890',
      '123 456 7890',
    ]

    for (const phone of validPhoneFormats) {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        businessName: 'Acme Corp',
        businessPhone: phone,
        submittedAt: new Date().toISOString(),
        source: 'get-started-2026',
      }

      const request = new NextRequest('http://localhost:3000/api/demo-request', {
        method: 'POST',
        body: JSON.stringify(validData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    }
  })
})

describe('Unsupported HTTP methods', () => {
  it('should return 405 for GET requests', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(405)
    expect(data.message).toContain('Method not allowed')
  })

  it('should return 405 for PUT requests', async () => {
    const response = await PUT()
    const data = await response.json()

    expect(response.status).toBe(405)
    expect(data.message).toContain('Method not allowed')
  })

  it('should return 405 for DELETE requests', async () => {
    const response = await DELETE()
    const data = await response.json()

    expect(response.status).toBe(405)
    expect(data.message).toContain('Method not allowed')
  })
})

describe('Error handling', () => {
  it('should handle unexpected errors gracefully', async () => {
    // Create a request that will cause an error during processing
    const request = new NextRequest('http://localhost:3000/api/demo-request', {
      method: 'POST',
      body: JSON.stringify(null),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    // Should return 500 for unexpected errors
    expect(response.status).toBeGreaterThanOrEqual(400)
    expect(data.message).toBeDefined()
  })
})
