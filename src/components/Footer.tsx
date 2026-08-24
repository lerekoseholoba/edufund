export function Footer() {
  return (
    <footer className="mt-16 border-t border-greige-300 bg-brown-900 text-nude-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-nude-50">
              EduFund
            </p>
            <p className="mt-2 max-w-xs text-sm text-nude-100/70">
              Helping South African students find bursaries, NSFAS, and
              government funding in one place.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-nude-50">Contact</p>
            <a
              href="mailto:admin@edufund.co.za"
              className="mt-2 block text-sm text-nude-100/70 hover:text-nude-50"
            >
              admin@edufund.co.za
            </a>
          </div>

          <div>
            <p className="text-sm font-semibold text-nude-50">
              Also find us on
            </p>
            <div className="mt-2 flex gap-4 text-sm text-nude-100/70">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nude-50"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nude-50"
              >
                X / Twitter
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-nude-50"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 border-t border-nude-100/10 pt-6 text-xs text-nude-100/50">
          © {new Date().getFullYear()} EduFund. Bursary details are provided
          for informational purposes always confirm requirements on the
          provider&apos;s official application page.
        </p>
      </div>
    </footer>
  );
}