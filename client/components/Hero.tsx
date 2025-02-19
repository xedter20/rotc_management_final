import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-desert overflow-hidden pt-16">
      <Image
        src="https://scontent.fwnp1-1.fna.fbcdn.net/v/t39.30808-6/480233583_122196434378128225_7120130240336076094_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE0nTqFbF1_-Jtnb4QA0o5WhhqZ5i6IaeeGGpnmLohp5zt4Dnz8pHdLYfZ1PbMcF7GVD5t0dCR_sNdvgbKNEsxm&_nc_ohc=fVZCSZM_QmIQ7kNvgFNsr32&_nc_oc=AdiMnZQYaNN49x-70Wx-aWqgSKC3Y6qKNFR-A4RQGFOd1niaeU3q4hGkUxCUzZ2eN8k&_nc_zt=23&_nc_ht=scontent.fwnp1-1.fna&_nc_gid=AfXQcHDdpl8wW_TOUDmb-uQ&oh=00_AYBqKGQx0MV_i_fazF5dc-4l7RCUr_t5_iS0c3Zk61TGwg&oe=67BB4B15"
        alt="CBSUA-Sipocot ROTC cadets in formation"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />
      <div className="absolute inset-0 bg-gunmetal bg-opacity-50 z-10"></div>
      <div className="container mx-auto px-4 text-center relative z-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
          CBSUA-Sipocot ROTC: Forging Leaders
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Join the CBSUA-Sipocot ROTC program and develop the skills to become a leader in both military and civilian
          careers.
        </p>
        <Button className="bg-olive hover:bg-ranger text-desert font-bold py-3 px-8 text-lg transition-colors">
          Learn More
        </Button>
      </div>
    </section>
  )
}

