import Link from 'next/link';
import Image from 'next/image';
import { Phone, Instagram, Facebook } from 'lucide-react';

// Footer gallery images
const footerImages = [
  { src: '/footer/footer-1.jpg', alt: 'Wedding gallery 1' },
  { src: '/footer/footer-2.jpg', alt: 'Wedding gallery 2' },
  { src: '/footer/footer-3.jpg', alt: 'Wedding gallery 3' },
  { src: '/footer/footer-4.jpg', alt: 'Wedding gallery 4' },
  { src: '/footer/footer-5.jpg', alt: 'Wedding gallery 5' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Offerings', href: '/offerings' },
  { name: 'Galleries', href: '/galleries' },
  { name: 'Inquire', href: '/inquire' },
];

export default function Footer() {
  return (
    <footer className="bg-ivory text-charcoal font-lora">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 pt-2 sm:pt-4 md:pt-6 pb-6 sm:pb-8 text-center">

        {/* Navigation Links Above Images */}
        <nav className="mb-10 sm:mb-[3.5rem]">
          <ul className="flex items-center justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-20 flex-wrap gap-y-6">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link href={link.href} className="text-[11px] sm:text-[12px] md:text-[13px] uppercase tracking-[0.4em] text-charcoal hover:text-gold transition-colors duration-300 font-light block pb-2">
                  {link.name}
                </Link>
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-charcoal/30 group-hover:bg-gold transition-colors duration-300"></div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Image Gallery Row */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 mb-12 sm:mb-16 max-w-4xl mx-auto">
          {footerImages.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 12vw"
              />
            </div>
          ))}
        </div>

        <div className="mb-[1.375rem] sm:mb-[2.875rem]">
          <h2 className="font-epicene-display uppercase text-[28px] sm:text-[36px] md:text-[42px] lg:text-5xl xl:text-6xl tracking-tight text-charcoal leading-none">
            Wedding Goosebumps
          </h2>
          <p className="mt-[0.625rem] sm:mt-[0.875rem] text-[8px] sm:text-[9px] md:text-xs uppercase tracking-[0.3em] font-light">
            Planning + Design
          </p>
        </div>

        <p className="max-w-xl mx-auto font-lora text-[13px] sm:text-[14px] md:text-[14.5px] leading-[1.7] sm:leading-[1.8] text-charcoal/90">
          Wedding Goosebumps is a{' '}
          <em className="font-lora">full service destination wedding planning and design agency</em>{' '}
          that specializes in creating elegant and exclusive weddings.
        </p>

        <div className="mt-8 sm:mt-12">
          <Link href="/inquire" className="inline-block bg-[#dedad3] hover:bg-[#d4cdc4] transition-colors duration-300 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-charcoal text-[10px] sm:text-[11px] md:text-xs font-normal uppercase tracking-[0.2em]">
            Inquire to begin your experience
          </Link>
        </div>

        <div className="mt-16 sm:mt-24 md:mt-32 max-w-[1240px] mx-auto">
          {/* Single row with copyright left, icons center, back to top right */}
          <div className="flex flex-col md:flex-row justify-between items-center my-6 sm:my-8 gap-4">
            {/* Copyright - left - with flex-1 for equal spacing */}
            <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.1em] order-3 md:order-1 md:flex-1 md:text-left">
              copyright 2026 wedding goosebumps
            </p>

            {/* Social icons - center - with flex-shrink-0 to maintain size */}
            <div className="flex items-center justify-center gap-6 text-charcoal/80 order-1 md:order-2 flex-shrink-0">
              <a
                href="tel:+917004734213"
                aria-label="Call Wedding Goosebumps"
                className="p-2 rounded hover:text-gold transition-colors duration-200"
              >
                <Phone className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/917004734213"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Wedding Goosebumps on WhatsApp"
                className="p-2 rounded hover:text-gold transition-colors duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/weddinggoosebumps?igsh=MWYybHN6cGQwbno4cQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wedding Goosebumps on Instagram"
                className="p-2 rounded hover:text-gold transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/share/1CpzZMFybm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wedding Goosebumps on Facebook"
                className="p-2 rounded hover:text-gold transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://pin.it/vC0ez3Sw5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wedding Goosebumps on Pinterest"
                className="p-2 rounded hover:text-gold transition-colors duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                </svg>
              </a>
            </div>

            {/* Back to top - right - with flex-1 for equal spacing */}
            <a href="#" className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.2em] text-charcoal hover:text-gold transition-colors duration-300 order-2 md:order-3 md:flex-1 md:text-right">
              Back to the top
            </a>
          </div>

          <div className="w-full h-px bg-charcoal/20 my-6 sm:my-8"></div>
        </div>

      </div>
    </footer>
  );
}
