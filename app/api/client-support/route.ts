import { NextRequest, NextResponse } from 'next/server'
import { clientSupportFormSchema } from '@/components/client-support/validation'

/**
 * API Route: POST /api/client-support
 * Handles client support form submissions
 * Validates: Requirements 6.1, 6.3, 6.4
 */

interface ClientSupportPayload {
  firstName: string
  lastName: string
  companyName: string
  phoneNumber: string
  email: string
  inquiryType: string
  message: string
  submittedAt: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json() as ClientSupportPayload

    // Server-side validation using the same zod schema
    const validationResult = clientSupportFormSchema.safeParse({
      firstName: body.firstName,
      lastName: body.lastName,
      companyName: body.companyName,
      phoneNumber: body.phoneNumber,
      email: body.email,
      inquiryType: body.inquiryType,
      message: body.message,
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
    // 2. Send notification emails to support team
    // 3. Create a support ticket in the ticketing system
    // 4. Send confirmation email to the client
    
    // For now, we'll just log the submission and return success
    console.log('Client support inquiry received:', {
      ...validationResult.data,
      submittedAt: body.submittedAt,
      source: body.source,
    })

    // Simulate processing delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500))

    // Return success response
    return NextResponse.json(
      {
        message: 'Support inquiry submitted successfully',
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
    console.error('Error processing client support inquiry:', error)
    
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
    { message: 'Method not allowed. Use POST to submit support inquiries.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to submit support inquiries.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed. Use POST to submit support inquiries.' },
    { status: 405 }
  )
}
