import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "www.koimoi.com" },
      { protocol: "https", hostname: "imgcdn.stablediffusionweb.com" },
      { protocol: "https", hostname: "tracktollywood.com" },
      { protocol: "https", hostname: "www.oddessemania.in" },
      { protocol: "https", hostname: "images.travelandleisureasia.com" },
      { protocol: "https", hostname: "static.tripzilla.in" },
      { protocol: "https", hostname: "www.swantour.com" },
      { protocol: "https", hostname: "pci.gov.in" },
      { protocol: "https", hostname: "png.pngtree.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "www.indiatravel.app" },
      { protocol: "https", hostname: "t3.ftcdn.net" },
      { protocol: "https", hostname: "www.postposmo.com" },
      { protocol: "https", hostname: "images3.alphacoders.com" },
      { protocol: "https", hostname: "staticdelivery.nexusmods.com" },
      { protocol: "https", hostname: "www.travelescape.in" },
      { protocol: "https", hostname: "alumni.harvard.edu" },
      { protocol: "https", hostname: "2.bp.blogspot.com" },
      { protocol: "https", hostname: "media.tacdn.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "www.transparenttextures.com" },
      { protocol: "https", hostname: "tse3.mm.bing.net" },
      { protocol: "https", hostname: "cdn.experienceandamans.com" },
      { protocol: "https", hostname: "andamantourism.org.in" },
      { protocol: "https", hostname: "www.andamanisland.in" },
      { protocol: "https", hostname: "gumlet.assettype.com" },
      { protocol: "https", hostname: "www.godigit.com" },
      { protocol: "https", hostname: "www.thegoavilla.com" },
      { protocol: "https", hostname: "files.prokerala.com" },
      { protocol: "https", hostname: "htoindia.com" },
      { protocol: "https", hostname: "tse4.mm.bing.net" },
      { protocol: "https", hostname: "live.staticflickr.com" },
      { protocol: "https", hostname: "chhattisgarhtourism.co.in" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  turbopack: {
    resolveAlias: {
      three: 'node_modules/three',
    },
  },
};

export default nextConfig;
