import { NextRequest, NextResponse } from 'next/server'
import { demoRequestFormSchema } from '@/components/get-started/validation'

/**
 * API Route: POST /api/demo-request
 * Handles demo request form submissions
 * Validates: Requirements 5.1, 5.2, 5.4, 5.5
 */

interface DemoRequestPayload {
  firstName: string
  lastName: string
  email: string
  businessName: string
  businessPhone: string
  submittedAt: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json() as DemoRequestPayload

    // Server-side validation using the same zod schema
    const validationResult = demoRequestFormSchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      businessName: body.businessName,
      businessPhone: body.businessPhone,
    })

    // Return validation errors if validation fails
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    // TODO: In a real implementation, this would:
    // 1. Store the data in a database
    // 2. Send notification emails to sales team
    // 3. Integrate with CRM system (e.g., Salesforce, HubSpot)
    // 4. Send confirmation email to the user
    
    // For now, we'll just log the submission and return success
    console.log('Demo request received:', {
      ...validationResult.data,
      submittedAt: body.submittedAt,
      source: body.source,
    })

    // Simulate processing delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return success response
    return NextResponse.json(
      {
        message: 'Demo request submitted successfully',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          message: 'Invalid request format',
          error: 'Request body must be valid JSON',
        },
        { status: 400 }
      )
    }

    // Handle unexpected errors
    console.error('Error processing demo request:', error)
    
    return NextResponse.json(
      {
        message: 'An unexpected error occurred. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to submit demo requests.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to submit demo requests.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to submit demo requests.' },
    { status: 405 }
  )
}
