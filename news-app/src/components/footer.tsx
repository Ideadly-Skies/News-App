'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-black/10" role="contentinfo">
      {/* Top strip with wordmark + home link */}
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <p className="text-2xl font-serif font-semibold">The New York Times</p>
        <Link
          href="/"
          className="text-sm text-sky-700 hover:underline"
          aria-label="Go to Home Page"
        >
          Go to Home Page »
        </Link>
      </div>

      {/* Main columns */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* NEWS */}
          <div>
            <h3 className="font-bold uppercase text-sm tracking-wide mb-3">
              News
            </h3>
            <ul className="space-y-2">
              {[
                ['/', 'Home Page'],
                ['/category/us', 'U.S.'],
                ['/category/world', 'World'],
                ['/category/politics', 'Politics'],
                ['/category/business', 'Business'],
                ['/category/technology', 'Tech'],
                ['/category/science', 'Science'],
                ['/category/sports', 'Sports'],
                ['/category/magazine', 'The Magazine'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ARTS */}
          <div>
            <h3 className="font-bold uppercase text-sm tracking-wide mb-3">
              Arts
            </h3>
            <ul className="space-y-2">
              {[
                ['/category/books', 'Book Review'],
                ['https://www.nytimes.com/books/best-sellers/', 'Best Sellers Book List'],
                ['/category/arts', 'Dance'],
                ['/category/arts', 'Movies'],
                ['/category/arts', 'Music'],
                ['/category/arts', 'Pop Culture'],
                ['/category/arts', 'Television'],
                ['/category/arts', 'Theater'],
                ['/category/arts', 'Visual Arts'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LIFESTYLE */}
          <div>
            <h3 className="font-bold uppercase text-sm tracking-wide mb-3">
              Lifestyle
            </h3>
            <ul className="space-y-2">
              {[
                ['/category/health', 'Health'],
                ['https://www.nytimes.com/section/well', 'Well'],
                ['/category/food', 'Food'],
                ['https://www.nytimes.com/section/dining', 'Restaurant Reviews'],
                ['/category/travel', 'Travel'],
                ['/category/style', 'Style'],
                ['https://www.nytimes.com/section/fashion', 'Fashion'],
                ['https://www.nytimes.com/section/realestate', 'Real Estate'],
                ['/category/magazine', 'T Magazine'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline"
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* OPINION */}
          <div>
            <h3 className="font-bold uppercase text-sm tracking-wide mb-3">
              Opinion
            </h3>
            <ul className="space-y-2">
              {[
                ['/category/opinion', "Today's Opinion"],
                ['/category/opinion', 'Columnists'],
                ['/category/opinion', 'Editorials'],
                ['/category/opinion', 'Guest Essays'],
                ['/category/opinion', 'Letters'],
                ['/category/opinion', 'Sunday Opinion'],
                ['/category/opinion', 'Opinion Video'],
                ['/category/opinion', 'Opinion Audio'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MORE */}
          <div>
            <h3 className="font-bold uppercase text-sm tracking-wide mb-3">
              More
            </h3>
            <ul className="space-y-2">
              {[
                ['https://www.nytimes.com/audio', 'Audio'],
                ['https://www.nytimes.com/games', 'Games'],
                ['https://cooking.nytimes.com/', 'Cooking'],
                ['https://www.nytimes.com/wirecutter', 'Wirecutter'],
                ['https://theathletic.com/', 'The Athletic'],
                ['https://www.nytimes.com/video', 'Video'],
                ['https://www.nytimes.com/section/graphics', 'Graphics'],
                ['https://www.nytimes.com/section/trending', 'Trending'],
                ['https://www.nytimes.com/spotlight/live-events', 'Live Events'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3 className="font-bold uppercase text-sm tracking-wide mb-3">
              Account
            </h3>
            <ul className="space-y-2">
              {[
                ['https://www.nytimes.com/subscription', 'Subscribe'],
                ['https://myaccount.nytimes.com/', 'Manage My Account'],
                ['https://www.nytimes.com/subscription?campaignId=37WXW', 'Home Delivery'],
                ['https://www.nytimes.com/subscription/gift', 'Gift Subscriptions'],
                ['https://www.nytco.com/nyt-licensing/', 'NYT Licensing'],
                ['https://help.nytimes.com/hc/en-us/articles/115014792927', 'Replica Edition'],
                ['https://store.nytimes.com/', 'Times Store'],
              ].map(([href, label]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom legal / utility links */}
      <div className="border-t border-black/10">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {year} The New York Times Company</span>
            {[
              ['https://www.nytco.com/', 'NYTCo'],
              ['https://help.nytimes.com/hc/en-us', 'Contact Us'],
              ['https://www.nytimes.com/accessibility', 'Accessibility'],
              ['https://nytco-assets.nytimes.com/2020/10/Work-With-Us.pdf', 'Work with us'],
              ['https://nytmediakit.com/', 'Advertise'],
              ['https://www.tbrandstudio.com/', 'T Brand Studio'],
              ['https://www.nytimes.com/privacy/ads', 'Your Ad Choices'],
              ['https://www.nytimes.com/privacy', 'Privacy Policy'],
              ['https://help.nytimes.com/hc/en-us/articles/115014893968-Terms-of-service', 'Terms of Service'],
              ['https://help.nytimes.com/hc/en-us/articles/115014893908-Terms-of-sale', 'Terms of Sale'],
              ['https://www.nytimes.com/sitemap', 'Site Map'],
              ['https://help.nytimes.com/hc/en-us', 'Help'],
              ['https://www.nytimes.com/subscription', 'Subscriptions'],
            ].map(([href, label]) => (
              <Link
                key={label}
                href={href}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
