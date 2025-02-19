import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gunmetal text-desert py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-olive">CBSUA-Sipocot ROTC</h3>
            <p className="text-sm">
              Developing the next generation of military leaders through academic excellence and hands-on training at
              Central Bicol State University of Agriculture - Sipocot Campus.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-olive">Contact Us</h3>
            <p>CBSUA-Sipocot Campus</p>
            <p>Sipocot, Camarines Sur</p>
            <p>Phone: (054) 123-4567</p>
            <p>Email: rotc@cbsua.edu.ph</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-olive">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-steel transition-colors">
                <Facebook />
              </a>
              <a href="#" className="hover:text-steel transition-colors">
                <Twitter />
              </a>
              <a href="#" className="hover:text-steel transition-colors">
                <Instagram />
              </a>
              <a href="#" className="hover:text-steel transition-colors">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 CBSUA-Sipocot ROTC Program. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

