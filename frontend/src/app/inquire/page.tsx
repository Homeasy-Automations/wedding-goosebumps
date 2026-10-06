import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import InquiryForm from "./inquire-form";
import Link from "next/link";
import Image from "next/image";
import { Phone, Instagram, Facebook } from "lucide-react";

// New banner component
function ContactInfoBanner() {
  return (
    <section className="w-full bg-[#f7f5f2] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {/* Customer Support - Phone */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C2A770]">
              <Phone className="h-6 w-6 text-[#C2A770]" />
            </div>
            <h4 className="font-epicene-display text-charcoal mb-3 text-lg tracking-wide uppercase">
              Customer Support
            </h4>
            <p className="text-charcoal/70 font-lora mb-2 text-sm">Phone number:</p>
            <a
              href="tel:+917004734213"
              className="font-lora text-lg text-[#C2A770] hover:underline"
            >
              +91-7004734213
            </a>
          </div>

          {/* Other Enquiries - Email */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C2A770]">
              <svg
                className="h-6 w-6 text-[#C2A770]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7L13.03 12.7a1.94 1.94 0 01-2.06 0L2 7" />
              </svg>
            </div>
            <h4 className="font-epicene-display text-charcoal mb-3 text-lg tracking-wide uppercase">
              Other Enquiries
            </h4>
            <p className="text-charcoal/70 font-lora mb-2 text-sm">Email Us:</p>
            <a
              href="mailto:weddinggoosebumps@gmail.com"
              className="font-lora text-lg text-[#C2A770] hover:underline"
            >
              weddinggoosebumps@gmail.com
            </a>
          </div>

          {/* Find Us On - Social Icons */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C2A770]">
              <svg
                className="h-6 w-6 text-[#C2A770]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
              </svg>
            </div>
            <h4 className="font-epicene-display text-charcoal mb-3 text-lg tracking-wide uppercase">
              Find Us On
            </h4>
            <div className="mt-2 flex items-center justify-center gap-4">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-charcoal/70 rounded p-2 transition-colors duration-200 hover:text-[#C2A770]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/weddinggoosebumps?igsh=MWYybHN6cGQwbno4cQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-charcoal/70 rounded p-2 transition-colors duration-200 hover:text-[#C2A770]"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/share/1CpzZMFybm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-charcoal/70 rounded p-2 transition-colors duration-200 hover:text-[#C2A770]"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://pin.it/vC0ez3Sw5"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-charcoal/70 rounded p-2 transition-colors duration-200 hover:text-[#C2A770]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeddingGoosebumpsSection() {
  return (
    <section className="relative mb-16 sm:mb-20 md:mb-24">
      <div className="relative">
        <Image
          src="/inquire-page/DSC07075.jpg"
          alt="Wedding Goosebumps Hero"
          className="absolute inset-0 h-full w-full object-cover"
          fill
          loading="eager"
          priority={true}
          quality={30}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative container mx-auto px-10 py-24 text-center text-white">
          <p className="font-lora mb-3 tracking-wide italic">
            let’s celebrate your <span className="font-light italic">Special Day</span> together
          </p>
          <h2 className="font-playfair-display mb-8 text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
            Contact Us
          </h2>
          <Link
            href="/inquire"
            className="inline-block bg-white px-8 py-4 tracking-wide text-black transition hover:bg-white/90"
          >
            SEND US AN INQUIRY
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function InquirePage() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <div className="flex min-h-screen">
        {/* hide image < 760 width */}
        <div className="relative hidden w-1/2 md:block">
          <Image
            src="/inquire-page/JIY06150.jpg"
            alt="Romantic Bride"
            className="absolute inset-0 h-full w-full bg-gray-300 object-cover"
            fill
          />
        </div>

        <div className="flex w-full flex-col bg-[#F8F5F0] md:w-1/2">
          <div className="pt-6 pb-4 text-center" />
          <div className="flex-1 px-8 py-4 md:px-16">
            <div className="mb-8">
              <p className="text-charcoal/60 font-lora mb-4 text-xs tracking-[0.2em] uppercase">
                GET IN TOUCH
              </p>
              <h2 className="font-epicene-display text-charcoal mb-6 text-3xl leading-tight md:text-4xl">
                Lets create a goosebump <br /> moment together
              </h2>
              <p className="text-charcoal/70 font-lora mb-8 leading-relaxed">
                Please fill out our contact form or send us an email.
              </p>
              <div className="mt-6 max-w-lg">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact Info Banner placed after inquiry form and before Contact Us banner */}
      <ContactInfoBanner />
      <WeddingGoosebumpsSection />

      <Footer />
    </main>
  );
}
