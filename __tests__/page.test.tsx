import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

describe('Hello World UI', () => {
    it('renders the hello world text', () => {
        render(<Home />)
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello World')
        expect(screen.getByText('Welcome to the WhatsUpCy MVP.')).toBeInTheDocument()
    })
})
