import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About — News',
  description:
    'About our mission, journalism, culture, community impact, and more.',
};

const HERO_DESKTOP =
  'https://nytco-assets.nytimes.com/2025/05/cc-front-building-entrance-desktop-scaled.jpg?width=3000';
const HERO_MOBILE =
  'https://nytco-assets.nytimes.com/2025/06/cc-front-building-entrance-mobile.jpg?width=1000';

export default function About() {
  return (
    <main id="main" className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[560px] md:h-[80vh]">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://nytco-assets.nytimes.com/2025/06/cc-front-building-entrance-mobile.jpg?width=1000"
          />
          <img
            src="https://nytco-assets.nytimes.com/2025/05/cc-front-building-entrance-desktop-scaled.jpg?width=3000"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </picture>

        <div className="absolute inset-x-0 bottom-0">
          <div className="border-t border-gray-200/80 bg-gradient-to-t from-black/10 to-transparent">
            <div className="container mx-auto px-4">
              <div className="ml-auto w-full md:w-2/3 py-6">
                <p className="text-right text-xs text-white/80 mb-2">
                  Obie Ananda for The New York Times
                </p>
                <h1 className="text-white text-5xl md:text-6xl font-serif font-semibold leading-tight">
                  About Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-black/10">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="ml-auto w-full md:w-2/3">
            <p className="font-serif text-2xl md:text-3xl leading-relaxed">
              The New York Times is dedicated to helping people understand and
              engage with the world through on-the-ground, expert and deeply
              reported independent journalism.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT THE TIMES */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-2">
              About The Times
            </h2>
          </div>

          <div>
            <p className="text-lg leading-relaxed">
              Our mission is to seek the truth and help people understand the
              world. This mission is rooted in our belief that great journalism
              has the power to make each readers life richer and more
              fulfilling, and all of society stronger and more just.
            </p>
          </div>

          <aside>
            <p className="uppercase text-xs font-bold tracking-wider">Explore</p>
            <ul className="mt-2 divide-y">
              <li className="py-3">
                <Link href="/mission-and-values" className="hover:underline">
                  Our Mission and Values
                </Link>
              </li>
              <li className="py-3">
                <Link href="/press/our-strategy" className="hover:underline">
                  Our Business Strategy
                </Link>
              </li>
              <li className="py-3">
                <Link href="/standards-and-ethics" className="hover:underline">
                  Our Standards and Ethics
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8 md:mt-10">
          <div className="hidden md:block" />
          <div className="md:col-span-2">
            <figure>
              <Image
                src="https://nytco-assets.nytimes.com/2025/06/cc-lobby-front-page-installation.jpg"
                alt="Historic front-page installation at Times Square headquarters"
                width={2000}
                height={1250}
                className="w-full h-auto"
                priority
              />
              <figcaption className="mt-2 text-sm text-gray-600">
                In our Times Square headquarters, we display 32 noteworthy front
                pages from across our history, starting with the first edition
                on September 18, 1851. — Hiroko Masuike/The New York Times
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <Separator />

      {/* OUR JOURNALISM */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-2">
              Our Journalism
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              We cover the world in a variety of ways that help readers: breaking
              news that doesnt sacrifice quality for speed, expert beat
              reporting, signature investigations, and commentary and criticism
              that help readers interpret the world. In a typical year, we
              report on the ground from more than 160 countries.
            </p>
          </div>
          <div>
            <figure>
              <Image
                src="https://nytco-assets.nytimes.com/2025/06/cc-pulitzer-announcement-2025.jpg"
                alt="Pulitzer announcement 2025"
                width={2000}
                height={1250}
                className="w-full h-auto"
              />
              <figcaption className="mt-2 text-sm text-gray-600">
                Senior leaders and journalists celebrated an incredible year of
                journalism and spoke about the 2025 Pulitzer Prize winners. —
                Earl Wilson/The New York Times
              </figcaption>
            </figure>
          </div>
        </div>

        <CTA href="/journalism" label="learn more about our journalism" />
      </section>

      <Separator />

      {/* OUR CULTURE */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-2">
              Our Culture
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">
              Whether its bringing new truths to light through reporting,
              optimizing products to deliver a world-class digital experience, or
              analyzing data to better serve readers, Times employees work toward
              one mission. Our goal is a culture where all 6,000 of us can do our
              best work — and make a difference.
            </p>
          </div>
          <aside>
            <p className="uppercase text-xs font-bold tracking-wider">Explore</p>
            <ul className="mt-2 divide-y">
              <li className="py-3">
                <Link href="/our-culture" className="hover:underline">
                  Our Culture
                </Link>
              </li>
              <li className="py-3">
                <Link href="/people" className="hover:underline">
                  Our Colleagues
                </Link>
              </li>
              <li className="py-3">
                <Link href="/careers" className="hover:underline">
                  Career Opportunities
                </Link>
              </li>
            </ul>
          </aside>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8 md:mt-10">
          <figure>
            <Image
              src="https://nytco-assets.nytimes.com/2025/06/cc-cafeteria-interior.jpg"
              alt="Cafeteria interior"
              width={2000}
              height={1250}
              className="w-full h-auto"
            />
            <figcaption className="mt-2 text-sm text-gray-600">
              Caleb Bryant Miller for The New York Times
            </figcaption>
          </figure>

          <figure>
            <Image
              src="https://nytco-assets.nytimes.com/2025/06/cc-diversity-inclusion-report-2024-cover.jpg"
              alt="Diversity and Inclusion Report 2024"
              width={2000}
              height={1250}
              className="w-full h-auto"
            />
            <figcaption className="mt-2 text-sm text-gray-600">
              <Link
                href="/2024-new-york-times-diversity-and-inclusion-report/"
                className="underline"
              >
                The 2024 Diversity and Inclusion Report
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <Separator />

      {/* IN THE COMMUNITY */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl md:text-3xl font-serif mb-2">
              In the Community
            </h2>
          </div>
          <div className="md:col-span-2">
            <p className="text-lg leading-relaxed">
              The Times provides trustworthy journalism that empowers citizens to
              understand the world. We&aposre committed to considering our
              environmental impact and to supporting the broader journalistic
              community and the rights that make it possible to bring the public
              the information it needs.
            </p>
          </div>
        </div>

        <CTA
          href="/in-the-community"
          label="learn more about our impact in the community"
        />
      </section>

      {/* EXPLORE MORE */}
      <section className="border-t border-black/10">
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-serif">Explore More</h2>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <ExploreCard
              href="https://www.nytco.com/history/"
              title="History"
              img="https://nytco-assets.nytimes.com/2025/05/homepage-lobby-front-page-installation.jpg"
            />
            <ExploreCard
              href="https://www.nytco.com/awards/"
              title="Awards and Recognition"
              img="https://nytco-assets.nytimes.com/2025/07/cc-pulitzer-announcement-2025-square.jpg"
            />
            <ExploreCard
              href="https://www.nytco.com/press/"
              title="Press Room"
              img="https://nytco-assets.nytimes.com/2025/05/newsroom-exterior.jpg"
            />
            <ExploreCard
              href="https://www.nytco.com/careers/"
              title="Careers"
              img="https://nytco-assets.nytimes.com/2025/07/cc-nyt-building-facade-closeup-thumb.jpg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ——— Helpers ——— */

function Separator() {
  return (
    <div className="relative">
      <hr className="border-0 h-px bg-black/10" />
    </div>
  );
}

function CTA({ href, label }: { href: string; label: string }) {
  return (
    <div className="border-y border-black/10 mt-10">
      <Link
        href={href}
        className="flex items-center gap-3 py-6 md:py-8 group"
        title={label}
      >
        <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-black text-white">
          {/* play/chevron style glyph */}
          <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" />
            <path
              d="M21.8 15.6 12.8 10.1c-.4-.3-1.0.2-.7.6l2.9 5.3-2.9 5.3c-.2.4.3.9.7.6l9-5.5c.3-.2.3-.6 0-.8Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="uppercase text-sm font-bold tracking-wide group-hover:underline">
          {label}
        </span>
      </Link>
    </div>
  );
}

function ExploreCard({
  href,
  title,
  img,
}: {
  href: string;
  title: string;
  img: string;
}) {
  return (
    <Link href={href} className="group block no-underline">
      <div className="aspect-square overflow-hidden">
        <Image
          src={img}
          alt={title}
          width={1000}
          height={1000}
          className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-85"
        />
      </div>
      <p className="mt-3 font-sans font-bold text-lg">{title}</p>
    </Link>
  );
}
