import { SectionDivider } from './section-divider'

/**
 * Example usage of the SectionDivider component
 * 
 * This component provides animated visual separators between major sections.
 * It supports three variants and respects user motion preferences.
 */
export default function SectionDividerExample() {
  return (
    <div className="space-y-16 p-8">
      <section className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Section 1</h2>
        <p className="text-gray-600">
          This is the first section with some content.
        </p>
      </section>

      {/* Line variant - simple horizontal line */}
      <SectionDivider variant="line" />

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Section 2</h2>
        <p className="text-gray-600">
          This section is separated by a line divider.
        </p>
      </section>

      {/* Gradient variant - colorful gradient bar */}
      <SectionDivider variant="gradient" />

      <section className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Section 3</h2>
        <p className="text-gray-600">
          This section is separated by a gradient divider.
        </p>
      </section>

      {/* Wave variant - animated SVG wave */}
      <SectionDivider variant="wave" />

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Section 4</h2>
        <p className="text-gray-600">
          This section is separated by a wave divider.
        </p>
      </section>

      {/* Default variant (line) */}
      <SectionDivider />

      <section className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Section 5</h2>
        <p className="text-gray-600">
          This section uses the default line divider.
        </p>
      </section>
    </div>
  )
}
