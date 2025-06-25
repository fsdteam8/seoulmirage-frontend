import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function FAQSection() {
    const faqs = [
      {
        question: "Where do you ship?",
        answer: `We currently ship throughout the United Arab Emirates. You can check availability during checkout.
  `,
      },
      {
        question: "How long does delivery take?",
        answer: `Orders are usually delivered within 2 to 5 business days, depending on your location. You’ll receive updates once your order is processed and shipped.
  `,
      },
      {
        question: "What payment methods do you accept?",
        answer: `We accept secure payments via credit cards, debit cards, and Stripe. All transactions are encrypted for your safety.
  `,
      },
      {
        question: "Can I return or exchange my order?",
        answer: `Yes, you can request a return or exchange within 7 days of receiving your order, as long as the item is unused and in its original packaging.`,
      },
      {
        question: " How can I track my order?",
        answer: `Once your order is shipped, you’ll receive a confirmation email with a tracking link so you can monitor your delivery in real-time.`,
      },
      {
        question: "How can I contact customer service?",
        answer: `You can reach out to us anytime via our contact form or email. Our team is happy to assist you with any inquiries or issues.
  `,
      },
    ];

//   const faqs = [
//     {
//       question: "What makes your SEO approach different?",
//       answer: `We use AI tools to reverse-engineer how modern search engines - including Google SGE and Bing Copilot
//   - are actually prioritizing sites now. It's not about guessing with keywords; it's about aligning your site with
//   how AI reads and ranks content.`,
//     },
//     {
//       question:
//         "How is this different from what a traditional SEO agency does?",
//       answer: `Most agencies still optimize for Google as it worked 3-5 years ago. We optimize for how search works now
//   - including AI summaries, voice search, and schema-driven visibility. Faster, leaner, and more aligned with
//   the future of search.`,
//     },
//     {
//       question: "What's included in the Basic Tune-Up?",
//       answer: `We analyze your existing pages, identify gaps, fix titles and descriptions, add schema markup, and give
//   you a smarter keyword plan - all powered by AI. It's a one-time checkup that sets the foundation.`,
//     },
//     {
//       question: "What if I need more than just a tune-up?",
//       answer: `That's where our Better and Full Rework packages come in. We'll rework your content, structure your
//   pages to match what search engines now expect, and prepare your site for long-term visibility - not just a
//   quick fix.`,
//     },
//     {
//       question: " Do you write or rewrite content?",
//       answer: `Yes - in the Better and Full Rework tiers, we offer AI-enhanced rewrites. You get smarter, better-targeted
//   content that still sounds like you, but works harder to get found.`,
//     },
//     {
//       question: "What is schema, and why does it matter?",
//       answer: `Schema is a behind-the-scenes code that tells search engines what your site is about. It's critical for
//   showing up in AI-driven results and voice search. We add the right schema types automatically in every
//   package.`,
//     },
//     {
//       question:
//         "Will this help me show up in Google's AI results or Bing Copilot?",
//       answer: `Yes - our audits and rewrites are designed with generative search in mind. We optimize for how your
//   business appears in AI answers, not just the old blue links.`,
//     },
//     {
//       question: "Is this a monthly service or a one-time project?",
//       answer: `These are one-time services - no contracts, no recurring fees. You can come back for more if needed, but`,
//     },
//     {
//       question: "How long does it take to complete?",
//       answer: `Most tune-ups are done in 5-7 business days. Full reworks may take 10-14 days depending on page count
//   and complexity.`,
//     },
//     {
//       question: "What if I'm not sure which tier I need?",
//       answer: `Start with a free visibility check - we'll let you know where your site stands and which option (if any) makes
//   the most sense for you.`,
//     },
//   ];

  return (
    <section className="py-8 md:py-12 lg:py-0">
        <div>
            <h1 className="text-center mt-10 mb-12 text-4xl ">FAQ & Help center</h1>
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Image Section */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="aspect-[686/969] w-full">
                <Image
                  src="/asset/contact2.png"
                  alt="Beauty products and cosmetics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="order-1 lg:order-2">
            <div className="mb-8 md:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000CC] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#000000CC] font-medium text-base sm:text-lg leading-tight">
                Find answers to our most commonly asked questions. If you
                can&lsquo;t find what you&lsquo;re looking for, please contact
                us.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-[#000000CC] px-2 sm:px-4 w-full"
                >
                  <AccordionTrigger className="text-left text-lg sm:text-xl lg:text-2xl font-medium text-[#000000] hover:no-underline py-4 pr-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#000000] text-base sm:text-lg leading-tight pb-4 pr-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
